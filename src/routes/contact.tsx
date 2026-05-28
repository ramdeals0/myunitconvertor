import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Mail, MessageSquare, User, Send, CheckCircle, AlertCircle, Loader2 } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Us — UnitPrecise" },
      { name: "description", content: "Get in touch with the UnitPrecise team. Send us your questions, feedback, or suggestions for new units and features." },
      { property: "og:title", content: "Contact Us — UnitPrecise" },
      { property: "og:description", content: "Get in touch with the UnitPrecise team. Send us your questions, feedback, or suggestions." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://myunitconvertor.lovable.app/contact" },
      { name: "twitter:title", content: "Contact Us — UnitPrecise" },
      { name: "twitter:description", content: "Get in touch with the UnitPrecise team. Send us your questions, feedback, or suggestions." },
      { rel: "canonical", href: "https://myunitconvertor.lovable.app/contact" },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    setErrorMsg("");

    try {
      const res = await fetch("/api/public/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(data.error || "Something went wrong. Please try again.");
      }

      setStatus("success");
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch (err: any) {
      setStatus("error");
      setErrorMsg(err.message || "Something went wrong. Please try again.");
    }
  };

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
            Contact UnitPrecise
          </h1>
          <p className="mt-3 text-base md:text-lg text-muted-foreground max-w-xl mx-auto">
            Have a question, suggestion, or found an issue? We would love to hear from you. Drop us a message and we will get back to you as soon as possible.
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 md:px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">
          {/* Contact Info */}
          <div className="lg:col-span-1 space-y-8">
            <div>
              <h2 className="text-lg font-semibold text-foreground mb-4">How can we help?</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Whether you want to suggest a new unit, report a bug, or just say hello, we read every message.
              </p>
            </div>

            <div className="space-y-5">
              <div className="flex items-start gap-3">
                <div className="mt-0.5 rounded-lg bg-primary-soft p-2">
                  <Mail className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <div className="text-sm font-medium text-foreground">Email us</div>
                  <div className="text-sm text-muted-foreground">ramdeals0@gmail.com</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="mt-0.5 rounded-lg bg-primary-soft p-2">
                  <MessageSquare className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <div className="text-sm font-medium text-foreground">Response time</div>
                  <div className="text-sm text-muted-foreground">We typically reply within 24–48 hours.</div>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-2">
            {status === "success" ? (
              <div className="rounded-xl border border-border bg-card p-8 text-center">
                <CheckCircle className="h-12 w-12 text-primary mx-auto mb-4" />
                <h2 className="text-xl font-semibold text-foreground mb-2">Message Sent!</h2>
                <p className="text-sm text-muted-foreground mb-6">
                  Thank you for reaching out. We have received your message and will get back to you soon.
                </p>
                <button
                  onClick={() => setStatus("idle")}
                  className="inline-flex items-center gap-2 rounded-lg bg-primary text-primary-foreground px-4 py-2 text-sm font-medium hover:opacity-90 transition-opacity"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="rounded-xl border border-border bg-card p-6 md:p-8 space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label htmlFor="name" className="text-sm font-medium text-foreground flex items-center gap-1.5">
                      <User className="h-3.5 w-3.5 text-muted-foreground" />
                      Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      minLength={1}
                      maxLength={100}
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="email" className="text-sm font-medium text-foreground flex items-center gap-1.5">
                      <Mail className="h-3.5 w-3.5 text-muted-foreground" />
                      Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      maxLength={200}
                      value={form.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="subject" className="text-sm font-medium text-foreground">
                    Subject
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    required
                    value={form.subject}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  >
                    <option value="">Select a subject</option>
                    <option value="general">General Inquiry</option>
                    <option value="suggestion">Suggest a New Unit</option>
                    <option value="bug">Report a Bug</option>
                    <option value="feedback">Feedback</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="message" className="text-sm font-medium text-foreground">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    minLength={10}
                    maxLength={2000}
                    rows={5}
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Tell us what's on your mind..."
                    className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-y"
                  />
                  <div className="text-xs text-muted-foreground text-right">{form.message.length}/2000</div>
                </div>

                {status === "error" && (
                  <div className="flex items-center gap-2 rounded-lg bg-destructive/10 text-destructive px-3 py-2 text-sm">
                    <AlertCircle className="h-4 w-4 shrink-0" />
                    {errorMsg}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="inline-flex items-center gap-2 rounded-lg bg-primary text-primary-foreground px-5 py-2.5 text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {status === "submitting" ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
