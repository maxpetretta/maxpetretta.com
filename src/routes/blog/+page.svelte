<script lang="ts">
  import BlogList from "$lib/components/BlogList.svelte"
  import SubstackEmbed from "$lib/components/SubstackEmbed.svelte"
  import type { Post } from "$lib/utils"
  import { getContext } from "svelte"

  const posts = getContext<Post[]>("posts")
</script>

<section class="mt-6">
  <h1 class="font-medium">Blog</h1>
  <p class="text-muted-foreground">Posts, notes, and thoughts</p>

  <SubstackEmbed class="mt-6" />

  <div class="mt-6">
    <BlogList {posts} />
  </div>
</section>
