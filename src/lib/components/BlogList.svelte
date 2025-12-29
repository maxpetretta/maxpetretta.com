<script lang="ts">
  import type { Post } from "$lib/utils"
  import { formatDate } from "$lib/utils"

  type Props = {
    posts: Post[]
    limit?: number
  }

  const { posts, limit }: Props = $props()

  const displayPosts = $derived(limit ? posts.slice(0, limit) : posts)
</script>

<ul class="space-y-2 text-sm sm:text-base">
  {#each displayPosts as { path, metadata }}
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
