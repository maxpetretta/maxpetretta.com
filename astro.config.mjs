import mdx from "@astrojs/mdx"
import sitemap from "@astrojs/sitemap"
import vercel from "@astrojs/vercel"
import tailwindcss from "@tailwindcss/vite"
import { defineConfig } from "astro/config"
import embeds from "astro-embed/integration"
import monokaiPro from "./src/themes/monokai-pro.json"

export default defineConfig({
  site: "https://maxpetretta.com",
  integrations: [embeds(), mdx(), sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
  adapter: vercel({
    webAnalytics: { enabled: true },
    speedInsights: { enabled: true },
  }),
  output: "static",
  markdown: {
    shikiConfig: {
      themes: {
        light: "gruvbox-light-hard",
        dark: monokaiPro,
      },
    },
  },
})
