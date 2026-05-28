import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { CATEGORIES } from "@/lib/converters/data";
import { AdBanner } from "@/components/AdBanner";
import { GROUP_LABELS, CategoryGroup } from "@/lib/converters/types";
import { Search } from "lucide-react";

export const Route = createFileRoute("/converters")({
  head: () => ({
    meta: [
      { title: "All Converters — My Unit Convertor" },
      { name: "description", content: "Browse every unit converter category — common, engineering, electricity, fluids and more." },
      { property: "og:title", content: "All Converters — My Unit Convertor" },
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

      <div className="space-y-12">
        {groups.map((g) => {
          const items = CATEGORIES.filter((c) => {
            if (!q) return c.group === g;
            const ql = q.toLowerCase();
            return (
              c.group === g &&
              (c.name.toLowerCase().includes(ql) ||
                c.units.some((u) => u.name.toLowerCase().includes(ql) || u.symbol.toLowerCase().includes(ql)))
            );
          });
          if (!items.length) return null;
          return (
            <section key={g}>
              <h2 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4">
                {GROUP_LABELS[g]}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {items.map((c) => {
                  const base = c.units[0];
                  return (
                    <div key={c.id} className="bg-surface-elevated border border-border rounded-xl p-5 hover:border-primary transition">
                      <div className="flex items-baseline justify-between mb-3">
                        <Link
                          to="/c/$category"
                          params={{ category: c.id }}
                          className="font-semibold text-lg hover:text-primary"
                        >
                          {c.name}
                        </Link>
                        <span className="text-xs text-muted-foreground">{c.units.length} units</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {c.units.slice(0, 12).map((u) => {
                          const other = c.units.find((x) => x.id !== u.id) ?? u;
                          const pair = u.id === base.id ? `${u.id}-to-${other.id}` : `${u.id}-to-${base.id}`;
                          return (
                            <Link
                              key={u.id}
                              to="/c/$category/$pair"
                              params={{ category: c.id, pair }}
                              className="text-xs px-2.5 py-1 rounded-full border border-border bg-background hover:border-primary hover:text-primary transition"
                            >
                              {u.name}
                            </Link>
                          );
                        })}
                        {c.units.length > 12 && (
                          <Link
                            to="/c/$category"
                            params={{ category: c.id }}
                            className="text-xs px-2.5 py-1 rounded-full text-muted-foreground hover:text-primary"
                          >
                            +{c.units.length - 12} more
                          </Link>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          );
        })}
      </div>

      <AdBanner className="mt-12" />
    </div>
  );
}
