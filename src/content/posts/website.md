---
title: Website Redesign v3.0
date: 2026-01-08
description: New year, new personal website. We all know the drill.
categories: ["webdev"]
---

## Prologue

It has been four (!!!) years since I published the [initial version](https://github.com/maxpetretta/maxpetretta.com/releases/tag/v1.0) of this website. Since then, a lot has happened. We now have intelligence (almost) too cheap to meter, and software development has changed more in the last three months than in the ten years that I've been programming.

I still like having a home online, so I wanted to see what the latest in web tech had to offer. As it turns out, a lot of the things that took so much effort to configure in 2022, *just work* in 2026, even without the help of magic intelligence in the sky.

## Astro

[Astro](https://astro.build) is the magic that makes so much of this easy. With its built-in [Markdown](https://docs.astro.build/en/guides/markdown-content/), [Routing](https://docs.astro.build/en/reference/modules/astro-transitions/), and [Shiki](https://docs.astro.build/en/guides/syntax-highlighting/) support, the toughest features in my old Next.js site are covered out-of-the-box.

Add in the [MDX](https://docs.astro.build/en/guides/integrations-guide/mdx/), [RSS](https://docs.astro.build/en/recipes/rss/), and [sitemap](https://docs.astro.build/en/guides/integrations-guide/sitemap/) first-party integrations, and we wind up with a more fully featured site. With significantly less dependencies and lines of code to boot.

## JavaScript Minimalism

My only goal for the v3 revision was to *simplify, simplify, simplify*. How many lines of code do I need for a landing page + blog, really?

- For v1, based on Next.js, the answer was roughly 2000 LoC
- The unmentioned v2, based on SvelteKit, was 1300 LoC
- This version, v3 Astro, is just barely over 1000 LoC

Does this *actually* matter? No. Definitely no. But it makes me happy.

## A Svelte Detour

In early 2024 there was a [v2 redesign](https://github.com/maxpetretta/maxpetretta.com/releases/tag/v2.0) I worked on to play with early beta releases of [Svelte v5](https://svelte.dev/blog/svelte-5-is-alive) / [SvelteKit v2](https://svelte.dev/blog/sveltekit-2). While Svelte was nice to work with, and a breath of fresh air after being stuck in React-land for so long, it still had it's problems.

Namely, the amount of file juggling that had to be done: should it be a `.svelte` or `.svelte.ts`? What about `+page.svelte`, `+page.ts`, `+page.server.ts`, or `+layout.svelte`? And where do the `+error.ts` and `+server.ts` go!?

Sure, we won't have to remember much of this soon. But while I had to build the filetree myself, it was annoying.

## Design

My styles are very [shadcn](https://ui.shadcn.com/) inspired, pulling some of it's CSS directly since Astro has no native equivalent. I prefer warmer tones these days, which is why I chose stone as the base color and **ultra orange** for an accent.

I also love the simplification of [Tailwind v4](https://tailwindcss.com/), letting us drop not one, but *two* root-level configs.

Design inspiration taken from: [Lee Robinson](https://leerob.com/), [Paco Coursey](https://paco.me/), and [Emil Kowalski](https://emilkowal.ski/).

## Epilogue

Now that the codebase is all in order, the only thing left to do is to write more. I've even created a Substack (linked below, if you're inclined).
