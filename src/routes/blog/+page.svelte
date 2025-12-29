<script lang="ts">
import BlogList from "$lib/components/BlogList.svelte"
import SubstackEmbed from "$lib/components/SubstackEmbed.svelte"
</script>

<section class="mt-6">
  <h1 class="font-medium">Blog</h1>
  <p class="text-muted-foreground">Posts, notes, and thoughts</p>

  <SubstackEmbed class="my-8" />

  <BlogList />
</section>
