<script lang="ts">
	import type { Post } from "$lib/utils";
	import { formatDate } from "$lib/utils";
	import { getContext } from "svelte";

	const posts = getContext<Post[]>("posts");
</script>

<section class="mt-6">
	<h1 class="font-medium">Blog</h1>
	<p class="text-muted-foreground">Posts, notes, and thoughts</p>

	<div class="my-8 flex justify-center">
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
</section>
