<script lang="ts">
  import Experiences from "$lib/components/Experiences.svelte"
  import Projects from "$lib/components/Projects.svelte"
  import { Button } from "$lib/components/ui/button"
  import type { Post } from "$lib/utils"
  import { formatDate } from "$lib/utils"

  const { data } = $props()
  const posts = $derived((data.posts as Post[]).slice(0, 5))
</script>

<section class="mt-6 text-muted-foreground">
  <h2>Software Engineer</h2>
  <h3>Detroit, MI</h3>
</section>

<section class="mt-16 space-y-5">
  <h3 class="mb-5 font-medium">About</h3>
  <p>
    Currently working on making prediction markets social with
    <a href="https://bracky.app/home" target="_blank" rel="noreferrer" class="font-medium underline underline-offset-4"
      >Bracky</a
    >.
  </p>
</section>

<section class="mt-16">
  <h3 class="mb-5 font-medium">Blog</h3>
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
  <Button href="/blog" variant="outline" class="mt-6 w-fit">Read more posts</Button>
</section>

<section class="mt-16">
  <h3 class="mb-5 font-medium">Projects</h3>
  <Projects />
</section>

<section class="mt-16">
  <h3 class="mb-5 font-medium">Experience</h3>
  <Experiences />
</section>
