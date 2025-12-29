<script lang="ts">
	import { formatDate } from "$lib/utils";
	import { browser } from "$app/environment";

	const { data } = $props();
	const { metadata, content: Content } = $derived(data);

	let progress = $state(0);

	if (browser) {
		$effect(() => {
			const handleScroll = () => {
				const scrollTop = window.scrollY;
				const docHeight = document.documentElement.scrollHeight - window.innerHeight;
				progress = docHeight > 0 ? scrollTop / docHeight : 0;
			};

			window.addEventListener("scroll", handleScroll);
			handleScroll();

			return () => window.removeEventListener("scroll", handleScroll);
		});
	}
</script>

<svelte:head>
	<meta name="viewport" content="width=device-width, initial-scale=1" />
</svelte:head>

<div class="fixed left-0 right-0 top-0 z-50 h-1 bg-zinc-200 dark:bg-zinc-800">
	<div
		class="h-full bg-white transition-all duration-150 ease-out dark:bg-black"
		style:width={`${progress * 100}%`}
	></div>
</div>

<article class="prose prose-stone dark:prose-invert prose-headings:text-base prose-headings:font-medium">
	<h1 class="-mb-0.5 mt-6">{metadata.title}</h1>
	<time class="mb-6 text-muted-foreground">{formatDate(metadata.date)}</time>

	<Content />

	<div class="my-12 flex justify-center">
		<iframe
			src="https://maxpetretta.substack.com/embed"
			width="480"
			height="320"
			class="rounded-lg border border-zinc-200 bg-white dark:border-zinc-800"
			frameborder="0"
			scrolling="no"
			title="Substack subscription form"
		></iframe>
	</div>
</article>
