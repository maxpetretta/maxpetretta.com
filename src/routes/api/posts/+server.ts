import { json } from "@sveltejs/kit"
import { fetchMarkdownPosts } from "$lib/utils"

export const GET = async () => {
  const posts = await fetchMarkdownPosts()
  const sortedPosts = posts.sort((a, b) => {
    return new Date(b.metadata.date).getTime() - new Date(a.metadata.date).getTime()
  })

  return json(sortedPosts)
}
