import adapter from "@sveltejs/adapter-vercel"
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte"
import fs from "fs"
import { escapeSvelte, mdsvex } from "mdsvex"
import { getSingletonHighlighter } from "shiki"

const theme = JSON.parse(fs.readFileSync("./static/fonts/monokai-pro.json", "utf-8"))
const themeName = theme.name ?? "Monokai Pro"
const highlighterPromise = getSingletonHighlighter({
  themes: [theme],
  langs: ["html", "css", "javascript", "typescript", "svelte", "solidity"],
})

/** @type {import('@sveltejs/kit').Config} */
const config = {
  extensions: [".svelte", ".md"],
  preprocess: [
    vitePreprocess(),
    mdsvex({
      extension: ".md",
      highlight: {
        highlighter: async (code, lang = "text") => {
          const highlighter = await highlighterPromise
          const html = escapeSvelte(highlighter.codeToHtml(code, { theme: themeName, lang }))
          return `{@html \`${html}\` }`
        },
      },
    }),
  ],
  kit: {
    adapter: adapter(),
    alias: { $: "./src" },
  },
}

export default config
