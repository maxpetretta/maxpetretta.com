<script lang="ts">
  import type { Post } from "$lib/utils"
  import { formatDate } from "$lib/utils"
  import { getContext } from "svelte"

  const posts = getContext<Post[]>("posts")
  const recentPosts = $derived(posts.slice(0, 5))
</script>

<ul class="space-y-2 text-sm sm:text-base">
  {#each recentPosts as { path, metadata }}
    <li>
      <a href={path} class="clickable -mx-2 block rounded-xs px-2 py-1.5 hover:bg-accent hover:text-accent-foreground">
        <div class="flex justify-between border-b border-dotted border-muted-foreground">
          <span>{metadata.title}</span>
          <span class="hidden whitespace-nowrap text-left font-mono text-muted-foreground sm:inline">
            {formatDate(metadata.date, { year: "numeric", month: "long", day: "numeric" })}
          </span>
          <span class="whitespace-nowrap text-left font-mono text-muted-foreground sm:hidden">
            {formatDate(metadata.date, { year: "numeric", month: "short", day: "numeric" })}
          </span>
        </div>
      </a>
    </li>
  {/each}
</ul>
