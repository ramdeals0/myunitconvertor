import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { CATEGORIES } from "@/lib/converters/data";
import { AdBanner } from "@/components/AdBanner";
import { GROUP_LABELS, CategoryGroup } from "@/lib/converters/types";
import { Search } from "lucide-react";

export const Route = createFileRoute("/converters")({
  head: () => ({
    meta: [
      { title: "All Converters — UnitPrecise" },
      { name: "description", content: "Browse every unit converter category — common, engineering, electricity, fluids and more." },
      { property: "og:title", content: "All Converters — UnitPrecise" },
      { property: "og:description", content: "Browse every unit converter category." },
    ],
    links: [{ rel: "canonical", href: "/converters" }],
  }),
  component: AllConverters,
});

function AllConverters() {
  const [q, setQ] = useState("");
  const groups = Array.from(new Set(CATEGORIES.map((c) => c.group))) as CategoryGroup[];

  return (
    <div className="max-w-6xl mx-auto px-4 md:px-6 py-8 md:py-12">
      <div className="mb-8 text-center">
        <h1 className="text-3xl md:text-5xl font-bold tracking-tight">All converters</h1>
        <p className="text-muted-foreground mt-2">Every category, every unit — one place.</p>
      </div>

      <div className="relative max-w-xl mx-auto mb-10">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Filter converters…"
          aria-label="Filter converter categories"
          className="w-full bg-surface-elevated border border-border rounded-full pl-12 pr-4 py-3.5 outline-none focus:border-primary focus:shadow-[var(--shadow-glow)]"
        />
      </div>

      <div className="space-y-10">
        {groups.map((g) => {
          const items = CATEGORIES.filter(
            (c) => c.group === g && (!q || c.name.toLowerCase().includes(q.toLowerCase())),
          );
          if (!items.length) return null;
          return (
            <div key={g}>
              <h2 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">
                {GROUP_LABELS[g]}
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                {items.map((c) => (
                  <Link key={c.id} to="/c/$category" params={{ category: c.id }}
                    className="bg-surface-elevated border border-border rounded-xl p-4 hover:border-primary transition">
                    <div className="font-semibold">{c.name}</div>
                    <div className="text-xs text-muted-foreground mt-1">{c.units.length} units</div>
                  </Link>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <AdBanner className="mt-12" />
    </div>
  );
}
