import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import { nitro } from "nitro/vite";

export default defineConfig({
  tanstackStart: {
    server: { entry: "server" },
  },
  vite: {
    plugins: [
      nitro({
        preset: "vercel",
      }),
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
