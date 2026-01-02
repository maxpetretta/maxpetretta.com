import rss from "@astrojs/rss"
import type { APIContext } from "astro"
import { getSortedPosts } from "@/lib/utils"

export async function GET(context: APIContext) {
  const posts = await getSortedPosts()
  const site = context.site ?? "https://maxpetretta.com"

  return rss({
    title: "Max Petretta",
    description: "Posts, notes, and thoughts",
    site,
    items: posts.map((post) => {
      const postUrl = `${site}/${post.id}`
      return {
        title: post.data.title,
        description: post.data.description,
        pubDate: post.data.date,
        link: postUrl,
        author: "max@maxpetretta.com",
        categories: post.data.categories,
        content: post.data.description
          ? `${post.data.description}<p><a href="${postUrl}">Read more →</a></p>`
          : `<a href="${postUrl}">Read more →</a>`,
      }
    }),
  })
}
