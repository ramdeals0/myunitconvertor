import { createFileRoute } from "@tanstack/react-router";
import { Scale } from "lucide-react";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms of Service — Unit Convertor" },
      { name: "description", content: "Unit Convertor Terms of Service. Read the terms and conditions governing your use of our free unit conversion tools." },
      { property: "og:title", content: "Terms of Service — Unit Convertor" },
      { property: "og:description", content: "Unit Convertor Terms of Service. Read the terms and conditions governing your use of our free unit conversion tools." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://myunitconvertor.lovable.app/terms" },
      { name: "twitter:title", content: "Terms of Service — Unit Convertor" },
      { name: "twitter:description", content: "Unit Convertor Terms of Service. Read the terms and conditions governing your use of our free unit conversion tools." },
    ],
    links: [
      { rel: "canonical", href: "https://myunitconvertor.lovable.app/terms" },
    ],
  }),
  component: TermsPage,
});

function TermsPage() {
  return (
    <div className="min-h-screen bg-background">
      <section className="bg-surface-elevated border-b border-border">
        <div className="max-w-6xl mx-auto px-4 md:px-6 py-16 md:py-20 text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary-soft text-primary px-3 py-1 text-xs font-semibold uppercase tracking-wider mb-5">
            <Scale className="h-3.5 w-3.5" />
            Legal
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight">
            Terms of Service
          </h1>
          <p className="mt-3 text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
            Please read these terms carefully before using Unit Convertor.
          </p>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-4 md:px-6 py-12 md:py-16 space-y-10">
        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-foreground">1. Acceptance of Terms</h2>
          <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
            By accessing or using Unit Convertor, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-foreground">2. Description of Service</h2>
          <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
            Unit Convertor provides free online unit conversion tools. Our service allows you to convert between various units of measurement across multiple categories including length, weight, temperature, volume, area, speed, and more.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-foreground">3. Use of the Service</h2>
          <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
            You may use Unit Convertor for personal, educational, and professional purposes. You agree not to:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-sm md:text-base text-muted-foreground leading-relaxed">
            <li>Use the service for any illegal or unauthorized purpose.</li>
            <li>Attempt to interfere with the proper functioning of the service.</li>
            <li>Reverse engineer, decompile, or disassemble any part of the service.</li>
            <li>Use automated systems or software to extract data from the service without permission.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-foreground">4. Accuracy Disclaimer</h2>
          <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
            While we strive for maximum accuracy, Unit Convertor is provided "as is" without warranties of any kind. Conversion factors are based on standard reference data, but we cannot guarantee that all conversions are 100% accurate in every context. For critical applications (medical, engineering, financial), please verify results with authoritative sources.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-foreground">5. Limitation of Liability</h2>
          <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
            To the fullest extent permitted by law, Unit Convertor and its operators shall not be liable for any direct, indirect, incidental, special, or consequential damages arising from your use of or inability to use the service.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-foreground">6. Intellectual Property</h2>
          <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
            All content on Unit Convertor, including text, graphics, logos, and software, is the property of Unit Convertor or its licensors and is protected by copyright and other intellectual property laws.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-foreground">7. Modifications to Terms</h2>
          <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
            We reserve the right to modify these Terms of Service at any time. Changes will be effective immediately upon posting. Your continued use of the service after changes constitutes acceptance of the updated terms.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-foreground">8. Governing Law</h2>
          <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
            These terms shall be governed by and construed in accordance with the laws applicable in the jurisdiction where Unit Convertor operates, without regard to conflict of law principles.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-foreground">9. Contact</h2>
          <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
            For questions about these Terms of Service, please contact us through our <a href="/contact" className="text-primary hover:underline">Contact page</a>.
          </p>
        </section>

        <p className="text-xs text-muted-foreground pt-4 border-t border-border">
          Last updated: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
        </p>
      </div>
    </div>
  );
}
