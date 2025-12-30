<script lang="ts">
  import { page } from "$app/stores"
  import ReadingProgress from "$lib/components/ReadingProgress.svelte"
  import SubstackEmbed from "$lib/components/SubstackEmbed.svelte"
  import { formatDate } from "$lib/utils.js"

  const { data } = $props()
  const { metadata, content: Content } = $derived(data)

  const slug = $derived($page.params.slug)
  const ogImageUrl = $derived(`https://maxpetretta.com/og/${slug}`)
</script>

<svelte:head>
  <title>{metadata.title} | Max Petretta</title>
  <meta name="description" content={metadata.title} />
  <meta property="og:title" content={metadata.title} />
  <meta property="og:description" content="A blog post by Max Petretta" />
  <meta property="og:image" content={ogImageUrl} />
  <meta property="og:type" content="article" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content={metadata.title} />
  <meta name="twitter:description" content="A blog post by Max Petretta" />
  <meta name="twitter:image" content={ogImageUrl} />
</svelte:head>

<ReadingProgress />

<article class="prose prose-stone dark:prose-invert prose-headings:text-base prose-headings:font-medium">
  <h1 class="-mb-0.5 mt-6">{metadata.title}</h1>
  <time class="mb-6 text-muted-foreground">{formatDate(metadata.date)}</time>

  <Content />

  <div class="my-12">
    <SubstackEmbed />
  </div>
</article>
