import { createFileRoute } from "@tanstack/react-router";
import { Info, Shield, Zap, Globe, Heart } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us — UnitPrecise" },
      { name: "description", content: "Learn about UnitPrecise, the professional unit converter built for accuracy. Meet our mission to provide fast, reliable conversions for engineers, students, and travelers." },
      { property: "og:title", content: "About Us — UnitPrecise" },
      { property: "og:description", content: "Learn about UnitPrecise, the professional unit converter built for accuracy." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://myunitconvertor.lovable.app/about" },
      { name: "twitter:title", content: "About Us — UnitPrecise" },
      { name: "twitter:description", content: "Learn about UnitPrecise, the professional unit converter built for accuracy." },
    ],
    links: [
      { rel: "canonical", href: "https://myunitconvertor.lovable.app/about" },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="bg-surface-elevated border-b border-border">
        <div className="max-w-6xl mx-auto px-4 md:px-6 py-16 md:py-20 text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary-soft text-primary px-3 py-1 text-xs font-semibold uppercase tracking-wider mb-5">
            <Info className="h-3.5 w-3.5" />
            About Us
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight">
            About UnitPrecise
          </h1>
          <p className="mt-3 text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
            Engineering-grade precision meets everyday simplicity. We built UnitPrecise to be the most reliable unit conversion tool on the web.
          </p>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-4 md:px-6 py-12 md:py-16 space-y-12">
        {/* Mission */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 text-foreground">
            <Zap className="h-5 w-5 text-primary" />
            <h2 className="text-xl font-semibold">Our Mission</h2>
          </div>
          <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
            UnitPrecise was created with a single goal: to make unit conversion effortless, accurate, and accessible to everyone. Whether you are an engineer working on complex calculations, a student learning the sciences, a traveler navigating foreign measurements, or a home cook experimenting with international recipes — we have got you covered.
          </p>
          <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
            We believe that precision matters. A small rounding error can lead to big problems in engineering, medicine, and science. That is why every conversion on UnitPrecise is calculated with the highest degree of accuracy and cross-verified against standard reference data.
          </p>
        </section>

        {/* What We Offer */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 text-foreground">
            <Globe className="h-5 w-5 text-primary" />
            <h2 className="text-xl font-semibold">What We Offer</h2>
          </div>
          <ul className="space-y-3 text-sm md:text-base text-muted-foreground leading-relaxed">
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
              <span><strong className="text-foreground">75+ Conversion Categories</strong> — From everyday units like length, weight, and volume to specialized categories like acceleration, magnetic flux, and radiation dose.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
              <span><strong className="text-foreground">Real-Time Results</strong> — See conversions update instantly as you type. No clicks, no waiting.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
              <span><strong className="text-foreground">Privacy-First</strong> — All conversions happen in your browser. We do not store your data or track your activity.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
              <span><strong className="text-foreground">Completely Free</strong> — No paywalls, no signups, no ads that get in your way. Just pure conversion power.</span>
            </li>
          </ul>
        </section>

        {/* Trust & Values */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 text-foreground">
            <Shield className="h-5 w-5 text-primary" />
            <h2 className="text-xl font-semibold">Built on Trust</h2>
          </div>
          <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
            Accuracy is not just a feature for us — it is a commitment. Every conversion factor in our database is sourced from authoritative standards including NIST, BIPM, and ISO. We regularly audit and update our data to ensure you always get the right answer.
          </p>
        </section>

        {/* Community */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 text-foreground">
            <Heart className="h-5 w-5 text-primary" />
            <h2 className="text-xl font-semibold">Open to Feedback</h2>
          </div>
          <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
            We are constantly expanding our converter database based on user requests. If there is a unit or category you would like to see added, we would love to hear from you. Visit our <a href="/contact" className="text-primary hover:underline">Contact page</a> to send us your suggestions.
          </p>
        </section>
      </div>
    </div>
  );
}
