<script lang="ts">
  import SubstackEmbed from "$lib/components/SubstackEmbed.svelte"
  import { formatDate } from "$lib/utils.js"
  import { onMount } from "svelte"

  const { data } = $props()
  const { metadata, content: Content, slug } = $derived(data)
  const siteUrl = "https://maxpetretta.com"
  const description = `Post by Max Petretta`
  const ogImageUrl = $derived(`${siteUrl}/og/${slug}.png`)

  let progress = $state(0)

  onMount(() => {
    const updateProgress = () => {
      const { scrollTop, scrollHeight } = document.documentElement
      const scrollable = scrollHeight - window.innerHeight
      const next = scrollable > 0 ? (scrollTop / scrollable) * 100 : 0
      progress = Math.min(100, Math.max(0, next))
    }

    updateProgress()
    window.addEventListener("scroll", updateProgress, { passive: true })
    window.addEventListener("resize", updateProgress)

    return () => {
      window.removeEventListener("scroll", updateProgress)
      window.removeEventListener("resize", updateProgress)
    }
  })
</script>

<svelte:head>
  <title>{metadata.title} | Max Petretta</title>
  <meta name="description" content={description} />
  <meta property="og:title" content={metadata.title} />
  <meta property="og:description" content={description} />
  <meta property="og:type" content="article" />
  <meta property="og:url" content={`${siteUrl}/${slug}`} />
  <meta property="og:image" content={ogImageUrl} />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content={metadata.title} />
  <meta name="twitter:description" content={description} />
  <meta name="twitter:image" content={ogImageUrl} />
</svelte:head>

<div class="fixed left-0 top-0 z-50 h-0.5 w-full" aria-hidden="true">
  <div class="h-full bg-foreground" style={`width: ${progress}%`}></div>
</div>

<article class="prose prose-stone dark:prose-invert prose-headings:text-base prose-headings:font-medium">
  <h1 class="-mb-0.5 mt-6">{metadata.title}</h1>
  <time class="mb-6 text-muted-foreground">{formatDate(metadata.date)}</time>

  <Content />

  <div class="my-12">
    <SubstackEmbed />
  </div>
</article>
