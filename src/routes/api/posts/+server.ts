import { fetchMarkdownPosts } from "$lib/utils"
import { json } from "@sveltejs/kit"

export const prerender = true

export const GET = async () => {
  const posts = await fetchMarkdownPosts()
  const sortedPosts = posts.sort((a, b) => {
    return new Date(b.metadata.date).getTime() - new Date(a.metadata.date).getTime()
  })

  return json(sortedPosts)
}
