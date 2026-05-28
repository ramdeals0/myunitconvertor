import { createFileRoute } from "@tanstack/react-router";
import { Mail, MessageSquare } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Us — My Unit Convertor" },
      { name: "description", content: "Get in touch with the My Unit Convertor team. Contact us via email at ramdeals0@gmail.com for questions, feedback, or suggestions." },
      { property: "og:title", content: "Contact Us — My Unit Convertor" },
      { property: "og:description", content: "Get in touch with the My Unit Convertor team. Contact us via email at ramdeals0@gmail.com for questions, feedback, or suggestions." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://myunitconvertor.lovable.app/contact" },
      { name: "twitter:title", content: "Contact Us — My Unit Convertor" },
      { name: "twitter:description", content: "Get in touch with the My Unit Convertor team. Contact us via email at ramdeals0@gmail.com for questions, feedback, or suggestions." },
    ],
    links: [
      { rel: "canonical", href: "https://myunitconvertor.lovable.app/contact" },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="bg-surface-elevated border-b border-border">
        <div className="max-w-6xl mx-auto px-4 md:px-6 py-16 md:py-20 text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary-soft text-primary px-3 py-1 text-xs font-semibold uppercase tracking-wider mb-5">
            <MessageSquare className="h-3.5 w-3.5" />
            Get in Touch
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight">
            Contact My Unit Convertor
          </h1>
          <p className="mt-3 text-base md:text-lg text-muted-foreground max-w-xl mx-auto">
            Have a question, suggestion, or found an issue? We would love to hear from you.
          </p>
        </div>
      </section>

      <div className="max-w-xl mx-auto px-4 md:px-6 py-16 md:py-24">
        <div className="rounded-xl border border-border bg-card p-8 md:p-10 text-center space-y-6">
          <div className="mx-auto w-14 h-14 rounded-full bg-primary-soft flex items-center justify-center">
            <Mail className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-foreground mb-2">Email Us</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              We read every email and typically reply within 24–48 hours.
            </p>
          </div>
          <a
            href="mailto:ramdeals0@gmail.com"
            className="inline-flex items-center gap-2 rounded-lg bg-primary text-primary-foreground px-6 py-3 text-sm font-medium hover:opacity-90 transition-opacity"
          >
            <Mail className="h-4 w-4" />
            ramdeals0@gmail.com
          </a>
        </div>
      </div>
    </div>
  );
}
