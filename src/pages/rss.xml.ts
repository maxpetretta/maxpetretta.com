import rss from "@astrojs/rss"
import type { APIContext } from "astro"
import { getSortedPosts } from "@/lib/utils"

export async function GET(context: APIContext) {
  const posts = await getSortedPosts()

  return rss({
    title: "Max Petretta",
    description: "Posts, notes, and thoughts",
    site: context.site ?? "https://maxpetretta.com",
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.date,
      link: `/${post.id}/`,
    })),
  })
}
