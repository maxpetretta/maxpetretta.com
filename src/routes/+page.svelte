<script lang="ts">
  import BlogList from "$lib/components/BlogList.svelte"
  import Experiences from "$lib/components/Experiences.svelte"
  import Projects from "$lib/components/Projects.svelte"
  import { Button } from "$lib/components/ui/button"
  import type { Post } from "$lib/utils"
  import { getContext } from "svelte"

  const posts = getContext<Post[]>("posts")
</script>

<section class="mt-6 text-muted-foreground">
  <h2>Software Engineer</h2>
  <h3>Detroit, MI</h3>
</section>

<section class="mt-16">
  <h3 class="mb-5 font-medium">About</h3>
  <p>
    Currently working on making prediction markets social with <a
      href="https://bracky.app/home"
      class="underline hover:text-foreground"
      target="_blank"
      rel="noreferrer">Bracky</a
    >.
  </p>
</section>

<section class="mt-16">
  <h3 class="mb-5 font-medium">Blog</h3>
  <BlogList {posts} limit={5} />
  <Button href="/blog" variant="outline" class="mx-auto mt-6 block w-fit">Read more posts</Button>
</section>

<section class="mt-16">
  <h3 class="mb-5 font-medium">Projects</h3>
  <Projects />
</section>

<section class="mt-16">
  <h3 class="mb-5 font-medium">Experience</h3>
  <Experiences />
</section>
