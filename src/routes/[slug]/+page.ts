import { error } from "@sveltejs/kit"
import type { PageLoad } from "./$types"

export const load: PageLoad = async ({ params }) => {
  try {
    const post = await import(`../../lib/posts/${params.slug}.md`)
    const metadata = post.metadata
    const content = post.default

    return {
      slug: params.slug,
      metadata: {
        title: metadata.title,
        date: metadata.date,
      },
      content,
    }
  } catch (err) {
    const message = err instanceof Error ? err.message : "Not found"
    throw error(404, message)
  }
}
