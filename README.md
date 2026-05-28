# Turbo Unit Converter

A fast, precise, and fully-featured online unit conversion calculator built with modern web technologies. Supports 75+ conversion categories with engineering-grade precision, multi-language support (English, Spanish, Hindi), and a clean, responsive UI.

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | [TanStack Start](https://tanstack.com/start) v1 — Full-stack React 19 with SSR/SSG |
| Build Tool | [Vite](https://vitejs.dev/) 7 |
| Styling | [Tailwind CSS](https://tailwindcss.com/) v4 + CSS custom properties (OKLCH tokens) |
| UI Components | [Radix UI](https://www.radix-ui.com/) primitives + custom variants |
| State & Data | [TanStack Query](https://tanstack.com/query) v5 |
| Icons | [Lucide React](https://lucide.dev/) |
| Charts | [Recharts](https://recharts.org/) |

---

## Project Structure

```text
src/
  components/           # Reusable UI components (Header, Footer, AdBanner, Converter, ScientificCalculator, etc.)
  lib/
    i18n.tsx            # i18n provider & dictionaries (en, es, hi)
    converters/         # Conversion logic, category data, unit definitions
  routes/               # TanStack Start file-based routes
    index.tsx           # Homepage
    converters.tsx      # All Converters listing page
    c.$category.index.tsx    # Category overview page
    c.$category.$pair.tsx    # Specific conversion pair page
    about.tsx           # About page
    privacy.tsx         # Privacy Policy page
    terms.tsx           # Terms of Service page
    sitemap[.]xml.ts    # Dynamic sitemap generator (server route)
  styles.css            # Tailwind v4 entry + design tokens
  router.tsx            # TanStack Router bootstrap
  start.ts              # SSR / server function middleware wiring
```

---

## Local Development

```bash
# 1. Install dependencies
bun install

# 2. Start dev server
bun run dev
# → http://localhost:3000

# 3. Lint & format
bun run lint
bun run format
```

---

## Build

```bash
# Production build
bun run build

# Development build (faster, larger bundles)
bun run build:dev

# Preview the production build locally
bun run preview
```

The build output is written to `dist/`. By default, the Nitro config targets a **Cloudflare Worker** runtime (via `@lovable.dev/vite-tanstack-config`).

---

## Deployment Guides

### 1. Vercel

Vercel works well with TanStack Start + Nitro.

**Option A — Vercel CLI**
```bash
# Install Vercel CLI globally
npm i -g vercel

# Link and deploy
vercel --prod
```

**Option B — Git Push (Git Integration)**
1. Push the repo to GitHub.
2. Import the project in the [Vercel Dashboard](https://vercel.com/dashboard).
3. Set **Framework Preset** to *Other* (or let it auto-detect Vite).
4. Vercel will run `bun run build` and deploy.

> **Build Settings:**
> - Build Command: `bun run build`
> - Output Directory: `dist/client` (static) or configure serverless function for SSR.
> - For SSR on Vercel, you may need to override the Nitro preset to `vercel` in `vite.config.ts`:
>   ```ts
>   export default defineConfig({
>     tanstackStart: { server: { entry: "server" } },
>     nitro: { preset: "vercel" },
>   });
>   ```

---

### 2. Netlify

**Option A — Netlify CLI**
```bash
# Install Netlify CLI globally
npm i -g netlify-cli

# Deploy
netlify deploy --build --prod
```

**Option B — Git Integration**
1. Push the repo to GitHub.
2. Import the project in the [Netlify Dashboard](https://app.netlify.com).
3. Set **Build Command:** `bun run build`
4. Set **Publish Directory:** `dist/client`
5. For SSR, configure `netlify.toml`:
   ```toml
   [build]
     command = "bun run build"
     publish = "dist/client"
   
   [[edge_functions]]
     function = "server"
     path = "/*"
   ```

---

### 3. Cloudflare Pages

This is the **native target** preset used by the Lovable template.

**Option A — Wrangler CLI**
```bash
# Install Wrangler
npm i -g wrangler

# Build first
bun run build

# Deploy (uses dist/ output)
wrangler pages deploy dist/client --project-name=turbo-unit-converter
```

**Option B — Git Integration**
1. Push the repo to GitHub.
2. In the [Cloudflare Dashboard](https://dash.cloudflare.com) → **Pages**, create a new project.
3. Connect your GitHub repo.
4. Set **Build Command:** `bun run build`
5. Set **Build Output:** `dist/client`

> The `@lovable.dev/vite-tanstack-config` already sets `nitro.preset = "cloudflare-pages"` by default, so no extra config is needed.

---

### 4. Railway / Render (Docker / Node)

If you want to run on a traditional Node server instead of an edge worker, you can build and serve with a small Node script.

**Dockerfile**
```dockerfile
# Stage 1 — Build
FROM oven/bun:1 AS builder
WORKDIR /app
COPY package.json bun.lockb ./
RUN bun install --frozen-lockfile
COPY . .
RUN bun run build

# Stage 2 — Serve with a lightweight static server
FROM nginx:alpine
COPY --from=builder /app/dist/client /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

**nginx.conf** (for SPA routing)
```nginx
server {
  listen 80;
  root /usr/share/nginx/html;
  index index.html;
  location / {
    try_files $uri $uri/ /index.html;
  }
}
```

**Railway / Render steps:**
1. Add the `Dockerfile` and `nginx.conf` to your repo root.
2. Push to GitHub.
3. Create a new service in Railway or Render and point it at the repo.
4. Deploy — the container will build and serve the static output.

---

### 5. Self-Hosted (Node + PM2)

If you prefer a plain Node server:

```bash
# Build
bun run build

# Serve the static dist/client folder with any static server
npx serve dist/client -l 3000

# Or use a simple Express server for custom routing
```

**Express fallback (server.js)**
```js
import express from "express";
const app = express();
app.use(express.static("dist/client"));
app.get("*", (_, res) => res.sendFile("dist/client/index.html"));
app.listen(3000, () => console.log("http://localhost:3000"));
```

---

## Important Notes for External Hosting

1. **No backend required** — This is a fully static/client-side application. No database, authentication, or API keys are needed for deployment. The app runs entirely in the browser with client-side conversion logic.

2. **SSR / Server Functions** — TanStack Start uses Nitro under the hood. The default preset targets Cloudflare Workers. If you deploy to Vercel, Netlify, or a raw Node server, you may need to change the Nitro preset in `vite.config.ts` (see the Vercel section above).

3. **Edge runtime compatibility** — Some Node-only APIs (`child_process`, `fs.watch`, native binaries like `sharp`) are **not available** in Cloudflare Workers or Vercel Edge Functions. The current codebase does not use these, but avoid adding them if you stay on an edge target.

4. **i18n routing** — Language switching is client-side (React Context + `localStorage`). No server-side locale routing is required.

---

## License

MIT — feel free to fork, customize, and deploy anywhere.
