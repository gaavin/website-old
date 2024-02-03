import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import node from "@astrojs/node";

export default defineConfig({
  site: "https://gavinpower.dev",
  output: "hybrid",
  integrations: [react()],
  adapter: node({
    mode: "standalone",
  }),
});
