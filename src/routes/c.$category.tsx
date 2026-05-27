import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Converter } from "@/components/Converter";
import { CATEGORY_MAP, CATEGORIES, convert, formatResult } from "@/lib/converters/data";
import type { Category, Unit } from "@/lib/converters/types";
import { ArrowRight } from "lucide-react";

export const Route = createFileRoute("/c/$category")({
  head: ({ params }) => {
    const c = CATEGORY_MAP[params.category];
    const title = c ? `${c.name} Converter — UnitPrecise` : "Converter";
    const desc = c?.description ?? "Unit converter";
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
      ],
      links: [{ rel: "canonical", href: `/c/${params.category}` }],
    };
  },
  loader: ({ params }) => {
    const c = CATEGORY_MAP[params.category];
    if (!c) throw notFound();
    return { category: c };
  },
  component: CategoryPage,
  notFoundComponent: () => (
    <div className="max-w-6xl mx-auto px-6 py-20 text-center">
      <h1 className="text-2xl font-semibold">Category not found</h1>
    </div>
  ),
});

function CategoryPage() {
  const { category } = Route.useLoaderData();
  const related = CATEGORIES.filter((c) => c.group === category.group && c.id !== category.id).slice(0, 6);

  return (
    <div className="max-w-6xl mx-auto px-4 md:px-6 py-8 md:py-12">
      <nav className="text-xs text-muted-foreground mb-4">
        <Link to="/" className="hover:text-primary">Home</Link>
        <span className="mx-2">/</span>
        <span className="text-foreground">{category.name}</span>
      </nav>

      <Converter category={category} />

      {category.popular?.length ? (
        <section className="mt-12">
          <h2 className="text-xl font-semibold mb-4">Popular {category.name.toLowerCase()} conversions</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {category.popular.map((p: { from: string; to: string }) => {
              const f = category.units.find((u: Unit) => u.id === p.from);
              const t = category.units.find((u: Unit) => u.id === p.to);
              return (
                <Link key={`${p.from}-${p.to}`} to="/c/$category/$pair"
                  params={{ category: category.id, pair: `${p.from}-to-${p.to}` }}
                  className="bg-surface-elevated border border-border rounded-xl p-4 hover:border-primary transition flex items-center justify-between">
                  <span className="font-semibold text-sm">{f?.symbol} <ArrowRight className="inline h-3.5 w-3.5 mx-1 text-primary" /> {t?.symbol}</span>
                  <span className="text-xs text-muted-foreground">{f?.name.split(" ")[0]} → {t?.name.split(" ")[0]}</span>
                </Link>
              );
            })}
          </div>
        </section>
      ) : null}

      <section className="mt-12">
        <h2 className="text-xl font-semibold mb-4">All {category.name.toLowerCase()} units</h2>
        <div className="bg-surface-elevated border border-border rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-muted/50 text-xs uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="text-left p-3 font-semibold">Unit</th>
                <th className="text-left p-3 font-semibold">Symbol</th>
                <th className="text-right p-3 font-semibold">1 {category.baseUnit} equals</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {category.units.map((u) => (
                <tr key={u.id} className="hover:bg-muted/30">
                  <td className="p-3 font-medium">{u.name}</td>
                  <td className="p-3 text-muted-foreground">{u.symbol}</td>
                  <td className="p-3 text-right font-mono-num">{formatResult(convert(category, 1, category.baseUnit, u.id))}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {related.length > 0 && (
        <section className="mt-12">
          <h2 className="text-xl font-semibold mb-4">Related converters</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {related.map((c) => (
              <Link key={c.id} to="/c/$category" params={{ category: c.id }}
                className="bg-surface-elevated border border-border rounded-xl p-3 text-sm font-medium hover:border-primary transition text-center">
                {c.name}
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
