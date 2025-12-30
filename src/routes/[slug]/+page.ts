import { error } from "@sveltejs/kit"
import type { PageLoad } from "./$types"
import type { Metadata } from "$lib/utils"
import type { Component } from "svelte"

export const load: PageLoad = async ({ params }) => {
  try {
    const post = await import(`../../lib/posts/${params.slug}.md`)
    const metadata = post.metadata as Metadata
    const content = post.default as Component

    return {
      metadata: {
        title: metadata.title,
        date: metadata.date,
      },
      content,
    }
  } catch (err) {
    error(404, `Post not found: ${params.slug}`)
  }
}
