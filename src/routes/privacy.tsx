import { createFileRoute } from "@tanstack/react-router";
import { ShieldCheck } from "lucide-react";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — My Unit Convertor" },
      { name: "description", content: "My Unit Convertor Privacy Policy. Learn how we protect your data. We do not collect personal information and all conversions happen locally in your browser." },
      { property: "og:title", content: "Privacy Policy — My Unit Convertor" },
      { property: "og:description", content: "My Unit Convertor Privacy Policy. We do not collect personal information and all conversions happen locally in your browser." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://myunitconvertor.lovable.app/privacy" },
      { name: "twitter:title", content: "Privacy Policy — My Unit Convertor" },
      { name: "twitter:description", content: "My Unit Convertor Privacy Policy. We do not collect personal information and all conversions happen locally in your browser." },
    ],
    links: [
      { rel: "canonical", href: "https://myunitconvertor.lovable.app/privacy" },
    ],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background">
      <section className="bg-surface-elevated border-b border-border">
        <div className="max-w-6xl mx-auto px-4 md:px-6 py-16 md:py-20 text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary-soft text-primary px-3 py-1 text-xs font-semibold uppercase tracking-wider mb-5">
            <ShieldCheck className="h-3.5 w-3.5" />
            Privacy
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight">
            Privacy Policy
          </h1>
          <p className="mt-3 text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
            Your privacy is important to us. This policy explains how My Unit Convertor handles your data.
          </p>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-4 md:px-6 py-12 md:py-16 space-y-10">
        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-foreground">1. Information We Do Not Collect</h2>
          <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
            My Unit Convertor is designed with privacy at its core. We do not require you to create an account, sign in, or provide any personal information to use our tools. All unit conversions are performed entirely in your web browser — no data is sent to our servers for processing.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-foreground">2. Contact Form Data</h2>
          <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
            If you choose to contact us through our Contact page, we collect the name, email address, subject, and message you provide. This information is stored securely in our database and used solely to respond to your inquiry. We do not share this information with third parties or use it for marketing purposes.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-foreground">3. Cookies and Tracking</h2>
          <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
            We do not use tracking cookies or third-party analytics services that collect personal data. We only use a localStorage item to remember your preferred theme (light or dark mode), which stays on your device and is never transmitted to us.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-foreground">4. Third-Party Services</h2>
          <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
            We may display advertisements through third-party ad networks. These partners may use cookies or similar technologies to serve relevant ads. Please refer to the respective privacy policies of our advertising partners for more information.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-foreground">5. Data Security</h2>
          <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
            We take reasonable measures to protect any data you provide through our contact form. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-foreground">6. Changes to This Policy</h2>
          <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
            We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated effective date. We encourage you to review this policy periodically.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-foreground">7. Contact Us</h2>
          <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
            If you have any questions about this Privacy Policy, please reach out through our <a href="/contact" className="text-primary hover:underline">Contact page</a>.
          </p>
        </section>

        <p className="text-xs text-muted-foreground pt-4 border-t border-border">
          Last updated: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
        </p>
      </div>
    </div>
  );
}
