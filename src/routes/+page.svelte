<script lang="ts">
  import Experiences from "$lib/components/Experiences.svelte"
  import Projects from "$lib/components/Projects.svelte"
  import RecentPosts from "$lib/components/RecentPosts.svelte"
  import { Button } from "$lib/components/ui/button"
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
      target="_blank"
      rel="noreferrer"
      class="underline underline-offset-4 hover:text-foreground">Bracky</a
    >.
  </p>
</section>

<section class="mt-16">
  <h3 class="mb-5 font-medium">Blog</h3>
  <RecentPosts />
  <Button href="/blog" variant="outline" class="mx-auto mt-8 block w-fit">Read more posts</Button>
</section>

<section class="mt-16">
  <h3 class="mb-5 font-medium">Projects</h3>
  <Projects />
</section>

<section class="mt-16">
  <h3 class="mb-5 font-medium">Experience</h3>
  <Experiences />
</section>
