import type { APIRoute } from "astro"
import { getMarkdownFooter, getSortedPosts } from "@/lib/utils"

export const GET: APIRoute = async () => {
  const posts = await getSortedPosts()

  const formatDate = (date: Date) =>
    date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })

  const markdown = `# Blog

Posts, notes, and thoughts

${posts
  .map((post) => `- [${post.data.title}](/${post.id}.md) - ${post.data.description || ""} *(${formatDate(post.data.date)})*`)
  .join("\n")}
${getMarkdownFooter("maxpetretta.com/blog", "https://maxpetretta.com/blog")}`

  return new Response(markdown, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
    },
  })
}
