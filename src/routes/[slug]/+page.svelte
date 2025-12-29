<script lang="ts">
  import ReadingProgress from "$lib/components/ReadingProgress.svelte"
  import SubstackEmbed from "$lib/components/SubstackEmbed.svelte"
  import { formatDate } from "$lib/utils.js"

  const { data } = $props()
  const { metadata, content: Content } = $derived(data)
</script>

<svelte:head>
  <title>{metadata.title} | Max Petretta</title>
  <meta property="og:title" content={metadata.title} />
  <meta property="og:type" content="article" />
  <meta property="og:image" content="https://maxpetretta.com/og/{metadata.slug}.png" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:image" content="https://maxpetretta.com/og/{metadata.slug}.png" />
</svelte:head>

<ReadingProgress />

<article class="prose prose-stone dark:prose-invert prose-headings:text-base prose-headings:font-medium">
  <h1 class="-mb-0.5 mt-6">{metadata.title}</h1>
  <time class="mb-6 text-muted-foreground">{formatDate(metadata.date)}</time>

  <Content />

  <SubstackEmbed class="my-12" />
</article>
