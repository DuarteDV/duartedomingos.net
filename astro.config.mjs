// @ts-check
import { defineConfig } from "astro/config";

import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: "https://duartedomingos.net",
  trailingSlash: "always",
  build: {
    format: "directory",
  },
  i18n: {
    defaultLocale: "es",
    locales: ["es", "en", "ca"],
    routing: { prefixDefaultLocale: false },
  },
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [
    sitemap({
      i18n: { defaultLocale: "es", locales: { es: "es-ES", en: "en", ca: "ca" } },
    }),
  ],
});
