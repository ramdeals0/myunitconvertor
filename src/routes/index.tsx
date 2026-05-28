import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Converter } from "@/components/Converter";
import { AdBanner } from "@/components/AdBanner";
import { CATEGORIES, CATEGORY_MAP } from "@/lib/converters/data";
import { GROUP_LABELS } from "@/lib/converters/types";
import {
  Search, ArrowRight, Ruler, Weight, Thermometer, Beaker, Square, Gauge, Zap, Clock,
  Wind, Compass, HardDrive, Fuel, ShieldCheck, Cpu, FlaskConical, GraduationCap,
  Building2, BadgeCheck, Bolt, Lock, Waves, Activity, Wrench, RefreshCw, Droplet,
  Atom, Magnet, Radiation, Type, TreePine, Sigma, Lightbulb, Sun, Aperture, Grid3x3,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "My Unit Convertor — Professional Unit Converter & Engineering Tools" },
      { name: "description", content: "Convert length, weight, temperature, volume, and dozens more — instantly and accurately, with engineering-grade precision." },
      { property: "og:title", content: "My Unit Convertor — Professional Unit Converter & Engineering Tools" },
      { property: "og:description", content: "A clean, fast, modern unit converter for every category you need." },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: HomePage,
});

const ICONS: Record<string, any> = {
  length: Ruler, weight: Weight, temperature: Thermometer, volume: Beaker,
  area: Square, pressure: Gauge, energy: Zap, power: Zap, time: Clock,
  speed: Wind, angle: Compass, data: HardDrive, fuel: Fuel,
  density: Waves, acceleration: Activity, torque: Wrench, angular_velocity: RefreshCw,
  current: Bolt, frequency: Activity, luminance: Sun, luminous_intensity: Aperture,
  illumination: Lightbulb, resolution: Grid3x3, flow: Droplet, viscosity: Droplet,
  molar: FlaskConical, surface_tension: Waves, magnetic_flux: Magnet,
  flux_density: Grid3x3, mmf: Bolt, radiation_activity: Radiation,
  dose_equivalent: Radiation, absorbed_dose: Radiation, si_prefix: Sigma,
  data_transfer: HardDrive, typography: Type, lumber: TreePine, atom: Atom,
};

const COMMON_CONVERSIONS = [
  ["length", "cm", "in"], ["length", "in", "cm"],
  ["weight", "kg", "lb"], ["weight", "lb", "kg"],
  ["temperature", "c", "f"], ["temperature", "f", "c"],
  ["length", "mm", "in"], ["length", "m", "ft"],
  ["speed", "mph", "kph"], ["power", "kW", "hp"],
] as const;


const FEATURES = [
  { icon: BadgeCheck, title: "Engineering-Grade Precision",
    text: "Our algorithms are verified against NIST standards for high-fidelity technical calculations." },
  { icon: Zap, title: "Instant Real-Time Results",
    text: "Get conversions as you type. No page reloads or waiting for servers — pure client-side speed." },
  { icon: Lock, title: "Privacy-Focused",
    text: "We don't store your input data. All conversions happen directly in your browser for total security." },
];

const FAQS = [
  { q: "How accurate is the conversion?",
    a: "My Unit Convertor uses double-precision floating-point arithmetic and NIST-verified conversion factors. We support up to 12 decimal places of precision for critical technical tasks." },
  { q: "Is this tool free to use?",
    a: "Yes, My Unit Convertor is 100% free for students and professional engineers. We sustain the platform through minimal, non-intrusive advertisements." },
  { q: "Does it work offline?",
    a: "Initial loading needs a connection, but once the page is open the conversion logic runs entirely in your browser." },
  { q: "Can I suggest a new unit?",
    a: "Absolutely. Use the contact link in the footer to suggest new categories or specialized units." },
];

const QUICK_CATEGORIES = ["length", "weight", "temperature", "volume", "area", "time", "speed"];

function HomePage() {
  const [categoryId, setCategoryId] = useState("length");
  const category = CATEGORY_MAP[categoryId];
  const [query, setQuery] = useState("");

  const filtered = CATEGORIES.filter((c) =>
    c.name.toLowerCase().includes(query.toLowerCase()) ||
    c.units.some((u) => u.name.toLowerCase().includes(query.toLowerCase()) || u.symbol.toLowerCase().includes(query.toLowerCase()))
  );

  const groups = Array.from(new Set(CATEGORIES.map((c) => c.group)));

  return (
    <div className="max-w-6xl mx-auto px-4 md:px-6 py-8 md:py-12">
      {/* Hero */}
      <section className="mb-10">
        <div className="text-center mb-8 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary-soft px-3 py-1 text-xs font-semibold text-primary mb-5">
            <BadgeCheck className="h-3.5 w-3.5" /> Engineering-grade precision
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground leading-[1.05]">
            Professional Unit Converter <span className="text-primary">&amp; Engineering Tools</span>
          </h1>
          <p className="text-muted-foreground mt-5 text-lg leading-relaxed">
            A clean, fast, modern unit converter for every category you need. Precision-engineered for students, engineers, and travelers.
          </p>
        </div>

        {/* Category quick chips */}
        <div className="flex flex-wrap gap-2 justify-center mb-6">
          {QUICK_CATEGORIES.map((id) => {
            const c = CATEGORY_MAP[id];
            const Icon = ICONS[id] ?? Ruler;
            const active = categoryId === id;
            return (
              <button
                key={id}
                onClick={() => setCategoryId(id)}
                className={`flex items-center gap-1.5 rounded-full px-3.5 py-2 text-xs font-semibold transition border ${
                  active
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-surface-elevated text-foreground border-border hover:border-primary/40"
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                {c.name}
              </button>
            );
          })}
        </div>

        <Converter category={category} />
      </section>

      <AdBanner className="mb-14" />

      {/* Common conversions */}
      <section className="mb-16">
        <SectionHeader title="Common Unit Conversions" subtitle="Jump straight to the most-used unit pairs for quick calculation." />
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {COMMON_CONVERSIONS.map(([cat, from, to]) => {
            const c = CATEGORY_MAP[cat];
            const f = c.units.find((u) => u.id === from);
            const t = c.units.find((u) => u.id === to);
            return (
              <Link
                key={`${cat}-${from}-${to}`}
                to="/c/$category/$pair"
                params={{ category: cat, pair: `${from}-to-${to}` }}
                className="group bg-surface-elevated border border-border rounded-xl p-4 hover:border-primary hover:shadow-[var(--shadow-card)] transition"
              >
                <div className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold">{c.name}</div>
                <div className="mt-2 font-semibold flex items-center gap-1.5">
                  {f?.symbol} <ArrowRight className="h-3.5 w-3.5 text-primary" /> {t?.symbol}
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Why choose */}
      <section className="mb-16">
        <SectionHeader title="Why Choose My Unit Convertor?" subtitle="Built for engineers, students, and anyone who needs answers they can trust." centered />
        <div className="grid md:grid-cols-3 gap-5">
          {FEATURES.map(({ icon: Icon, title, text }) => (
            <div key={title} className="bg-surface-elevated border border-border rounded-2xl p-6 hover:border-primary/40 hover:shadow-[var(--shadow-card)] transition">
              <div className="h-11 w-11 rounded-xl bg-primary-soft text-primary flex items-center justify-center mb-4">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="font-semibold text-lg mb-2">{title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Search + Browse all */}
      <section className="mb-16">
        <SectionHeader title="Browse All Unit Converters" subtitle="Every major scientific and engineering category, organized for easy access." centered />
        <div className="relative max-w-xl mx-auto mb-8">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search units, categories, or symbols…"
            aria-label="Search unit converters"
            className="w-full bg-surface-elevated border border-border rounded-full pl-12 pr-4 py-3.5 outline-none focus:border-primary focus:shadow-[var(--shadow-glow)]"
          />
          {query && (
            <div className="absolute z-10 inset-x-0 top-full mt-2 bg-surface-elevated border border-border rounded-xl divide-y divide-border max-h-72 overflow-auto shadow-[var(--shadow-card)]">
              {filtered.length === 0 && (
                <div className="p-4 text-sm text-muted-foreground">No matches.</div>
              )}
              {filtered.slice(0, 12).map((c) => (
                <Link key={c.id} to="/c/$category" params={{ category: c.id }}
                  className="flex items-center justify-between p-3 hover:bg-muted/50 text-sm">
                  <span className="font-medium">{c.name}</span>
                  <span className="text-xs text-muted-foreground">{c.units.length} units</span>
                </Link>
              ))}
            </div>
          )}
        </div>

        <div className="space-y-8">
          {groups.map((g) => {
            const items = CATEGORIES.filter((c) => c.group === g);
            if (!items.length) return null;
            return (
              <div key={g}>
                <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">
                  {GROUP_LABELS[g]}
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                  {items.map((c) => {
                    const Icon = ICONS[c.id] ?? Ruler;
                    return (
                      <Link key={c.id} to="/c/$category" params={{ category: c.id }}
                        className="bg-surface-elevated border border-border rounded-xl p-4 hover:border-primary transition group">
                        <div className="flex items-center gap-3">
                          <div className="h-9 w-9 rounded-lg bg-primary-soft text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition shrink-0">
                            <Icon className="h-4 w-4" />
                          </div>
                          <div className="min-w-0">
                            <div className="font-semibold text-sm truncate">{c.name}</div>
                            <div className="text-xs text-muted-foreground">{c.units.length} units</div>
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* FAQ */}
      <section>
        <SectionHeader title="Frequently Asked Questions" subtitle="Answers to common questions about My Unit Convertor." centered />
        <div className="max-w-3xl mx-auto space-y-3">
          {FAQS.map((f) => (
            <details key={f.q} className="group bg-surface-elevated border border-border rounded-xl p-5 open:shadow-[var(--shadow-card)] transition">
              <summary className="flex items-center justify-between cursor-pointer list-none font-semibold">
                {f.q}
                <ArrowRight className="h-4 w-4 text-primary transition-transform group-open:rotate-90" />
              </summary>
              <p className="text-sm text-muted-foreground leading-relaxed mt-3">{f.a}</p>
            </details>
          ))}
        </div>
      </section>
    </div>
  );
}

function SectionHeader({ title, subtitle, centered }: { title: string; subtitle: string; centered?: boolean }) {
  return (
    <div className={`mb-6 ${centered ? "text-center max-w-2xl mx-auto" : ""}`}>
      <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-foreground">{title}</h2>
      <p className="text-muted-foreground text-sm mt-2">{subtitle}</p>
    </div>
  );
}
