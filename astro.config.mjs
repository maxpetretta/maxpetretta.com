import tailwind from "@astrojs/tailwind"
import vercel from "@astrojs/vercel"
import { defineConfig } from "astro/config"

export default defineConfig({
  integrations: [tailwind()],
  adapter: vercel({
    webAnalytics: { enabled: true },
    speedInsights: { enabled: true },
  }),
  output: "static",
  markdown: {
    shikiConfig: {
      theme: "vitesse-dark",
    },
  },
})
