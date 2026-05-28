import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Converter } from "@/components/Converter";
import { AdBanner } from "@/components/AdBanner";
import { CATEGORY_MAP, convert, formatResult } from "@/lib/converters/data";
import type { Category, Unit } from "@/lib/converters/types";

export const Route = createFileRoute("/c/$category/$pair")({
  head: ({ params }) => {
    const c = CATEGORY_MAP[params.category];
    const [from, to] = parsePair(params.pair);
    const f = c?.units.find((u: Unit) => u.id === from);
    const t = c?.units.find((u: Unit) => u.id === to);
    const title = f && t ? `${f.name} to ${t.name} — UnitPrecise` : "Converter";
    const desc =
      f && t && c
        ? `Convert ${f.name} (${f.symbol}) to ${t.name} (${t.symbol}) instantly with engineering-grade precision. Includes formula, conversion table, and reference values for ${c.name.toLowerCase()}.`
        : "Unit converter with engineering-grade precision for everyday and professional calculations.";
    const factor = c && f && t ? convert(c, 1, f.id, t.id) : null;
    return {
      meta: [
        { title },
        { name: "description", content: desc.slice(0, 160) },
        { property: "og:title", content: title },
        { property: "og:description", content: desc.slice(0, 160) },
      ],
      links: [{ rel: "canonical", href: `/c/${params.category}/${params.pair}` }],
      scripts:
        f && t && factor !== null
          ? [
              {
                type: "application/ld+json",
                children: JSON.stringify({
                  "@context": "https://schema.org",
                  "@type": "HowTo",
                  name: `How to convert ${f.name} to ${t.name}`,
                  description: `Convert ${f.name} (${f.symbol}) to ${t.name} (${t.symbol}).`,
                  step: [
                    { "@type": "HowToStep", name: "Enter value", text: `Enter a value in ${f.name} (${f.symbol}).` },
                    { "@type": "HowToStep", name: "Apply factor", text: `Multiply by ${formatResult(factor)} to get the value in ${t.name}.` },
                    { "@type": "HowToStep", name: "Read result", text: `Read the converted result in ${t.name} (${t.symbol}).` },
                  ],
                }),
              },
            ]
          : [],
    };
  },
  loader: ({ params }) => {
    const c = CATEGORY_MAP[params.category];
    if (!c) throw notFound();
    const [from, to] = parsePair(params.pair);
    const f = c.units.find((u: Unit) => u.id === from);
    const t = c.units.find((u: Unit) => u.id === to);
    if (!f || !t) throw notFound();
    return { category: c, from: f.id, to: t.id };
  },
  component: PairPage,
});

function parsePair(pair: string): [string, string] {
  const parts = pair.split("-to-");
  return [parts[0] ?? "", parts[1] ?? ""];
}

function PairPage() {
  const data = Route.useLoaderData() as { category: Category; from: string; to: string };
  const { category, from, to } = data;
  const f = category.units.find((u) => u.id === from)!;
  const t = category.units.find((u) => u.id === to)!;

  const examples = [1, 2, 5, 10, 25, 50, 100, 250, 500, 1000];

  return (
    <div className="max-w-6xl mx-auto px-4 md:px-6 py-8 md:py-12">
      <nav className="text-xs text-muted-foreground mb-4">
        <Link to="/" className="hover:text-primary">Home</Link>
        <span className="mx-2">/</span>
        <Link to="/c/$category" params={{ category: category.id }} className="hover:text-primary">{category.name}</Link>
        <span className="mx-2">/</span>
        <span className="text-foreground">{f.symbol} → {t.symbol}</span>
      </nav>

      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-5xl font-bold tracking-tight">
          {f.name} to {t.name}
        </h1>
        <p className="text-muted-foreground mt-2">
          Convert {f.symbol} to {t.symbol} with precision.
        </p>
      </div>

      <Converter category={category} initialFrom={from} initialTo={to} />

      <AdBanner className="mt-10" />

      <section className="mt-12 grid md:grid-cols-2 gap-6">
        <div className="bg-surface-elevated border border-border rounded-xl p-6">
          <h2 className="font-semibold mb-3">Conversion table</h2>
          <table className="w-full text-sm">
            <tbody className="divide-y divide-border">
              {examples.map((v) => (
                <tr key={v}>
                  <td className="py-2 font-mono-num">{v} {f.symbol}</td>
                  <td className="py-2 text-right font-mono-num text-primary font-semibold">
                    {formatResult(convert(category, v, from, to))} {t.symbol}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="bg-surface-elevated border border-border rounded-xl p-6">
          <h2 className="font-semibold mb-3">About this conversion</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            This converter transforms values from <strong className="text-foreground">{f.name}</strong> ({f.symbol}) into <strong className="text-foreground">{t.name}</strong> ({t.symbol}).
            Calculations use double-precision math with adaptive rounding for clarity at both very small and very large magnitudes.
          </p>
          <div className="mt-4 text-sm">
            <div className="text-muted-foreground">Reference:</div>
            <div className="font-mono-num mt-1">
              1 {f.symbol} = <span className="text-primary font-semibold">{formatResult(convert(category, 1, from, to))}</span> {t.symbol}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
