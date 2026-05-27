import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Converter } from "@/components/Converter";
import { CATEGORIES, CATEGORY_MAP } from "@/lib/converters/data";
import { GROUP_LABELS } from "@/lib/converters/types";
import { Search, ArrowRight, Ruler, Weight, Thermometer, Beaker, Square, Gauge, Zap, Clock, Wind, Compass, HardDrive, Fuel } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "UnitPrecise — Fast, Precise Unit Conversion" },
      { name: "description", content: "Convert length, weight, temperature, volume, and dozens more — instantly and accurately." },
      { property: "og:title", content: "UnitPrecise — Fast, Precise Unit Conversion" },
      { property: "og:description", content: "Convert anything instantly with engineering-grade precision." },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: HomePage,
});

const ICONS: Record<string, any> = {
  length: Ruler, weight: Weight, temperature: Thermometer, volume: Beaker,
  area: Square, pressure: Gauge, energy: Zap, power: Zap, time: Clock,
  speed: Wind, angle: Compass, data: HardDrive, fuel: Fuel,
};

const COMMON_CONVERSIONS = [
  ["length", "cm", "in"], ["length", "in", "cm"],
  ["weight", "kg", "lb"], ["weight", "lb", "kg"],
  ["temperature", "c", "f"], ["temperature", "f", "c"],
  ["length", "mm", "in"], ["length", "in", "mm"],
  ["length", "m", "ft"], ["length", "ft", "m"],
  ["length", "km", "mi"], ["length", "mi", "km"],
  ["volume", "L", "gal_us"], ["volume", "gal_us", "L"],
  ["speed", "mph", "kph"], ["speed", "kph", "mph"],
  ["angle", "rad", "deg"], ["angle", "deg", "rad"],
  ["power", "hp", "kW"], ["power", "kW", "hp"],
] as const;

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
      <section className="mb-12">
        <div className="text-center mb-8 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary-soft px-3 py-1 text-xs font-semibold text-primary mb-4">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" /> Engineering-grade precision
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground">
            Convert anything,<br />instantly.
          </h1>
          <p className="text-muted-foreground mt-4 text-lg">
            A clean, fast, modern unit converter for every category you need.
          </p>
        </div>

        {/* Category quick chips */}
        <div className="flex flex-wrap gap-2 justify-center mb-6">
          {["length", "weight", "temperature", "volume", "area", "time", "speed"].map((id) => {
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

      {/* Search */}
      <section className="mb-12">
        <div className="relative max-w-xl mx-auto">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search units, categories, or symbols…"
            className="w-full bg-surface-elevated border border-border rounded-full pl-12 pr-4 py-3.5 outline-none focus:border-primary focus:shadow-[var(--shadow-glow)]"
          />
        </div>
        {query && (
          <div className="mt-4 max-w-xl mx-auto bg-surface-elevated border border-border rounded-xl divide-y divide-border max-h-72 overflow-auto shadow-[var(--shadow-card)]">
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
      </section>

      {/* Common conversions */}
      <section className="mb-14">
        <SectionHeader title="Common conversions" subtitle="Jump straight to the most-used pairs." />
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
                <div className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">{c.name}</div>
                <div className="mt-2 font-semibold flex items-center gap-1.5">
                  {f?.symbol} <ArrowRight className="h-3.5 w-3.5 text-primary" /> {t?.symbol}
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Browse all */}
      <section>
        <SectionHeader title="Browse all converters" subtitle="Every category, organized." />
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
                          <div className="h-9 w-9 rounded-lg bg-primary-soft text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition">
                            <Icon className="h-4.5 w-4.5" />
                          </div>
                          <div>
                            <div className="font-semibold text-sm">{c.name}</div>
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
    </div>
  );
}

function SectionHeader({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="mb-5">
      <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-foreground">{title}</h2>
      <p className="text-muted-foreground text-sm mt-1">{subtitle}</p>
    </div>
  );
}
