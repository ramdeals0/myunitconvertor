import { createFileRoute } from "@tanstack/react-router";
import { createClient } from "@supabase/supabase-js";

export const Route = createFileRoute("/api/public/contact")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        let body: Record<string, any> = {};
        try {
          body = await request.json();
        } catch {
          return new Response(
            JSON.stringify({ error: "Invalid JSON body" }),
            { status: 400, headers: { "Content-Type": "application/json" } }
          );
        }

        const { name, email, subject, message } = body;

        // Validate required fields
        if (!name || typeof name !== "string" || name.trim().length === 0 || name.length > 100) {
          return new Response(
            JSON.stringify({ error: "Name is required and must be under 100 characters." }),
            { status: 400, headers: { "Content-Type": "application/json" } }
          );
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email || typeof email !== "string" || !emailRegex.test(email) || email.length > 200) {
          return new Response(
            JSON.stringify({ error: "A valid email is required." }),
            { status: 400, headers: { "Content-Type": "application/json" } }
          );
        }

        if (!subject || typeof subject !== "string" || subject.trim().length === 0) {
          return new Response(
            JSON.stringify({ error: "Subject is required." }),
            { status: 400, headers: { "Content-Type": "application/json" } }
          );
        }

        if (!message || typeof message !== "string" || message.trim().length < 10 || message.length > 2000) {
          return new Response(
            JSON.stringify({ error: "Message is required and must be between 10 and 2000 characters." }),
            { status: 400, headers: { "Content-Type": "application/json" } }
          );
        }

        const cleanName = name.trim();
        const cleanEmail = email.trim().toLowerCase();
        const cleanSubject = subject.trim();
        const cleanMessage = message.trim();

        // Store in database using anon key (public insert is allowed by RLS policy)
        const supabase = createClient(
          process.env.SUPABASE_URL!,
          process.env.SUPABASE_PUBLISHABLE_KEY!,
          {
            auth: { autoRefreshToken: false, persistSession: false },
          }
        );

        const { error } = await supabase.from("contact_submissions").insert({
          name: cleanName,
          email: cleanEmail,
          subject: cleanSubject,
          message: cleanMessage,
        });

        if (error) {
          console.error("Contact form insert error:", error);
          return new Response(
            JSON.stringify({ error: "Failed to save your message. Please try again later." }),
            { status: 500, headers: { "Content-Type": "application/json" } }
          );
        }

        // Optionally send email notification if Resend is configured
        const resendApiKey = process.env.RESEND_API_KEY;
        if (resendApiKey) {
          try {
            await fetch("https://api.resend.com/emails", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${resendApiKey}`,
              },
              body: JSON.stringify({
                from: "Unit Convertor Contact <onboarding@resend.dev>",
                to: ["ramdeals0@gmail.com"],
                subject: `[Unit Convertor Contact] ${cleanSubject}`,
                text: `Name: ${cleanName}\nEmail: ${cleanEmail}\nSubject: ${cleanSubject}\n\nMessage:\n${cleanMessage}`,
              }),
            });
          } catch (emailErr) {
            // Non-fatal: the message is already saved in the database
            console.error("Email notification failed:", emailErr);
          }
        }

        return new Response(
          JSON.stringify({ success: true, message: "Message received. Thank you!" }),
          { status: 200, headers: { "Content-Type": "application/json" } }
        );
      },
    },
  },
});
