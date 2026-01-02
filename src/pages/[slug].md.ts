import { getCollection } from "astro:content"
import type { APIRoute, GetStaticPaths } from "astro"
import { getMarkdownFooter } from "@/lib/utils"

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getCollection("posts")
  return posts.map((post) => ({
    params: { slug: post.id },
    props: { post },
  }))
}

export const GET: APIRoute = ({ props }) => {
  const { post } = props

  // Reconstruct the frontmatter
  const frontmatter = [
    "---",
    `title: ${post.data.title}`,
    `date: ${post.data.date.toISOString().split("T")[0]}`,
    post.data.description ? `description: ${post.data.description}` : null,
    post.data.categories?.length
      ? `categories: [${post.data.categories.map((c: string) => `"${c}"`).join(", ")}]`
      : null,
    "---",
  ]
    .filter(Boolean)
    .join("\n")

  const markdown = `${frontmatter}\n\n${post.body}${getMarkdownFooter(`maxpetretta.com/${post.id}`, `https://maxpetretta.com/${post.id}`)}`

  return new Response(markdown, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
    },
  })
}
