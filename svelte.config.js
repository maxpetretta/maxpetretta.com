import fs from "node:fs"
import adapter from "@sveltejs/adapter-vercel"
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte"
import { escapeSvelte, mdsvex } from "mdsvex"
import { createHighlighter } from "shiki"

const theme = JSON.parse(fs.readFileSync("./static/fonts/monokai-pro.json", "utf-8"))
const highlighter = await createHighlighter({
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
        highlighter: (code, lang = "text") => {
          const html = escapeSvelte(highlighter.codeToHtml(code, { theme, lang }))
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
