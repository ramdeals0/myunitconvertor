import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  tanstackStart: {
    server: { entry: "server" },
  },
  nitro: {
    preset: "vercel",
  },
  vite: {
    plugins: [
      {
        name: "force-exit-after-build",
        apply: "build",
        closeBundle() {
          setTimeout(() => process.exit(0), 0);
        },
      },
    ],
  },
});
