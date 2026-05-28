import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { SiteHeader, SiteFooter } from "@/components/SiteChrome";
import { ScientificCalculator } from "@/components/ScientificCalculator";
import { I18nProvider } from "@/lib/i18n";
import { AdBanner } from "@/components/AdBanner";

import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 pt-16">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The converter you're looking for doesn't exist.
        </p>
        <a href="/" className="mt-6 inline-flex rounded-lg bg-primary text-primary-foreground px-4 py-2 text-sm font-medium">
          Back home
        </a>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold">Something went wrong</h1>
        <p className="mt-2 text-sm text-muted-foreground">Please try again.</p>
        <button
          onClick={() => { router.invalidate(); reset(); }}
          className="mt-6 rounded-lg bg-primary text-primary-foreground px-4 py-2 text-sm font-medium"
        >
          Try again
        </button>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Turbo Unit Converter — All-in-One Unit Conversion Calculator" },
      { name: "description", content: "MyUnitConvertor.com: Fast, accurate online unit converter for 75+ categories. Convert length, weight, temperature, currency & more instantly. Free, no signup." },
      { property: "og:title", content: "Turbo Unit Converter — All-in-One Unit Conversion Calculator" },
      { property: "og:description", content: "MyUnitConvertor.com: Fast, accurate online unit converter for 75+ categories. Convert length, weight, temperature, currency & more instantly. Free, no signup." },
      { property: "og:type", content: "website" },
      { name: "twitter:title", content: "Turbo Unit Converter — All-in-One Unit Conversion Calculator" },
      { name: "twitter:description", content: "MyUnitConvertor.com: Fast, accurate online unit converter for 75+ categories. Convert length, weight, temperature, currency & more instantly. Free, no signup." },
      { property: "og:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/attachments/og-images/58eb67bc-fad4-418c-8095-ffe652183be5" },
      { name: "twitter:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/attachments/og-images/58eb67bc-fad4-418c-8095-ffe652183be5" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "stylesheet", href: appCss }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "Turbo Unit Converter",
          description: "Fast, precise unit conversion for length, weight, temperature, volume, and dozens more categories.",
          applicationCategory: "UtilitiesApplication",
          operatingSystem: "Any",
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "Turbo Unit Converter",
          url: "https://myunitconvertor.lovable.app",
          potentialAction: {
            "@type": "SearchAction",
            target: "https://myunitconvertor.lovable.app/converters?q={search_term_string}",
            "query-input": "required name=search_term_string",
          },
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "Turbo Unit Converter",
          url: "https://myunitconvertor.lovable.app",
          logo: "https://myunitconvertor.lovable.app/favicon.ico",
          email: "ramdeals0@gmail.com",
        }),
      },
    ],

  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head><HeadContent /></head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <I18nProvider>
        <SiteHeader />
        <div className="pt-16 min-h-screen flex flex-col">
          <main className="flex-1">
            <Outlet />
          </main>
          <div className="max-w-6xl mx-auto px-4 md:px-6 w-full">
            <AdBanner className="mt-10" />
          </div>
          <SiteFooter />
        </div>
        <ScientificCalculator />
      </I18nProvider>
    </QueryClientProvider>
  );
}
