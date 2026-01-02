import type { APIRoute } from "astro"
import { getMarkdownFooter, getSortedPosts } from "@/lib/utils"

const projects = [
  { name: "maxpetretta.com", description: "Astro blog", href: "https://github.com/maxpetretta/maxpetretta.com" },
  { name: "quickcast.xyz", description: "Farcaster client", href: "https://quickcast.xyz" },
  { name: "twitt3r.xyz", description: "Twitter on Ethereum", href: "https://github.com/maxpetretta/twitt3r.xyz" },
  { name: "keymap", description: "ZMK combo keymap", href: "https://github.com/maxpetretta/keymap" },
]

const experiences = [
  { title: "Bracket, Cofounder & CTO", start: "2023", end: "Now", href: "https://bracky.app/home" },
  { title: "Worldcoin, Sr. Software Engineer", start: "2022", end: "2023", href: "https://world.org" },
  { title: "GEHC, Sr. Software Engineer", start: "2020", end: "2022", href: "https://gehealthcare.com" },
  { title: "GE, Software Engineer (DTLP)", start: "2018", end: "2020", href: "https://www.ge.com" },
]

export const GET: APIRoute = async () => {
  const recentPosts = (await getSortedPosts()).slice(0, 5)

  const formatDate = (date: Date) =>
    date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })

  const markdown = `# Max Petretta

Software Engineer
Detroit, MI

## Now

Currently working on making prediction markets social with [Bracky](https://bracky.app/home).

## Blog

${recentPosts
  .map(
    (post) =>
      `- [${post.data.title}](/${post.id}.md) - ${post.data.description || ""} *(${formatDate(post.data.date)})*`,
  )
  .join("\n")}

[All posts →](/blog.md)

## Projects

${projects.map((p) => `- [${p.name}](${p.href}) - ${p.description}`).join("\n")}

## Experience

${experiences.map((e) => `- [${e.title}](${e.href}) *(${e.start} ~ ${e.end})*`).join("\n")}
${getMarkdownFooter("maxpetretta.com", "https://maxpetretta.com")}`

  return new Response(markdown, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
    },
  })
}
