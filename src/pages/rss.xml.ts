import { type CollectionEntry, getCollection } from "astro:content"
import rss from "@astrojs/rss"
import type { APIContext } from "astro"

export async function GET(context: APIContext) {
  const posts: CollectionEntry<"posts">[] = await getCollection("posts")
  const sortedPosts = posts.sort((a, b) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime())

  return rss({
    title: "Max Petretta",
    description: "Posts, notes, and thoughts",
    site: context.site ?? "https://maxpetretta.com",
    items: sortedPosts.map((post) => ({
      title: post.data.title,
      pubDate: new Date(post.data.date),
      link: `/${post.id}/`,
    })),
  })
}
