<script lang="ts">
import type { Post } from "$lib/utils"
import { formatDate } from "$lib/utils"
import { getContext } from "svelte"

type Props = {
  limit?: number
}

const { limit }: Props = $props()

const postsContext = getContext<{ value: Post[] }>("posts")
const allPosts = $derived(postsContext.value)
const posts = $derived(limit ? allPosts.slice(0, limit) : allPosts)
</script>

<ul class="space-y-2 text-sm sm:text-base">
  {#each posts as { path, metadata }}
    <li>
      <a
        href={path}
        class="clickable -mx-2 block rounded-sm px-2 py-1.5 hover:bg-accent hover:text-accent-foreground"
      >
        <div class="flex justify-between border-b border-dotted border-muted-foreground">
          <span>{metadata.title}</span>

          <span class="whitespace-nowrap text-left font-mono text-muted-foreground sm:hidden"
            >{formatDate(metadata.date, { year: "numeric", month: "short", day: "numeric" })}</span
          >
          <span class="hidden whitespace-nowrap text-left font-mono text-muted-foreground sm:inline"
            >{formatDate(metadata.date, { year: "numeric", month: "long", day: "numeric" })}</span
          >
        </div>
      </a>
    </li>
  {/each}
</ul>
