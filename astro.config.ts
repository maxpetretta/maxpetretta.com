import { fileURLToPath } from "node:url"
import mdx from "@astrojs/mdx"
import sitemap from "@astrojs/sitemap"
import vercel from "@astrojs/vercel"
import tailwindcss from "@tailwindcss/vite"
import { defineConfig } from "astro/config"
import embeds from "astro-embed/integration"
import type { ThemeRegistration } from "shiki"
import gruvboxLightHard from "./src/themes/gruvbox-light-hard.json"
import monokaiPro from "./src/themes/monokai-pro.json"

export default defineConfig({
  site: "https://maxpetretta.com",
  integrations: [embeds(), mdx(), sitemap()],
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
  },
  adapter: vercel({
    webAnalytics: { enabled: true },
  }),
  output: "static",
  markdown: {
    shikiConfig: {
      themes: {
        light: gruvboxLightHard as unknown as ThemeRegistration,
        dark: monokaiPro as unknown as ThemeRegistration,
      },
    },
  },
})
