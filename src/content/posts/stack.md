---
title: Building This Blog
date: "2022-02-11"
description: A deep dive into the tech stack powering this site
image: /images/stack.png
categories: ["web development", "tutorial"]
---

<img src="/images/stack.png" alt="An image of the Next.js and TailwindCSS logos" width="400" height="400" loading="eager" class="mx-auto" />

It is 2022, and before anything else _you should have a personal website._

"What!? Why would I need that?" may be your reaction. "I have a Twitter, Instagram, a half-forgotten YouTube channel, and maybe a Vine somewhere [(no, you don't)](https://vine.co/)". With all this social media and engagement elsewhere, the little personal website seems overrated.

But I still find that the content I enjoy most comes from regular, small websites. Not the giant media aggregators, like Twitter and Reddit. And I've spent a very, _very long time_ on Reddit.

One of the largest stories last year was the [mass-exodus of writers](https://stratechery.com/2021/sovereign-writers-and-substack/) from traditional media companies to [Substack](https://substack.com/), a platform for paid newsletter subscriptions. I would argue that personal sites accomplish the exact same result. And that result is you want to have somewhere, online, where you aren't locked in to someone else's business model.

Plus, if you happen to be a developer, a personal website is a wonderful excuse to goof-off and practice the craft.

## Framework: Next.js

When I set out to make this site, I had a couple of goals in mind. I wanted to it to be React-based, simple to add content to, and everything to be fast. Fortunately, the [JAMstack](https://jamstack.org/) was waiting for me.

After all, why generate a page literally everytime it's served? Instead you can do that just once, right at deploy-time, and pass the savings on to the ~~consumer~~ reader! The two frameworks I considered here were [Gatsby](https://www.gatsbyjs.com/) and [Next.js](https://nextjs.org/). Gatsby seemed to have the advantage of being ready right out-of-the-box, with a huge system of add-ons available and [GraphQL](https://graphql.org/) underpinning everything.

Next.js was a bit different, only adding static generation in [v9.3](https://nextjs.org/blog/next-9-3) and not really nailing things down until [v10.0](https://nextjs.org/blog/next-10). Plug-ins also don't really exist in the same sense as Gatsby, it's more of a do-it-yourself with the typical gamut of **npm** packages.

I was more interested in having full control, and I didn't really like the idea of a weird data engine sitting beneath everything, out of sight, that I wasn't totally familiar with. The concept of [getStaticProps](https://nextjs.org/docs/basic-features/data-fetching/get-static-props) in Next was more comfortable to me. AKA fetch your data here, then weave it into your content with **props**.

Another bonus of Next.js was the dead-simple file router. Here's what the directory structure of this website looks like:

```
├── components/
├── lib/
├── pages/
│ ├── \_app.js
│ ├── blog/
│ │ ├── post-1.mdx
│ │ ├── post-2.mdx
│ │ └── post-3.mdx
│ └── index.js
├── public/
└── styles/
```

Want to add another page? Just drop a **.js/.jsx/.mdx** file anywhere in the **pages** directory and it will get generated. Simple as that. The website path mirrors the folder structure exactly. This allows me to customize the structure surrounding my content (the .mdx files, more on that later), and my blog posts separately.

If you'd like to read more about Next.js, I'd recommend [this post](https://leerob.io/blog/things-ive-learned-building-nextjs-apps) and [this post](https://leerob.io/blog/mdx) by Lee Robinson. Lee is the Head of Developer Relations at Vercel, and pretty much the goat when it comes to Next.js. I've learned a ton from his [personal site's repo](https://github.com/leerob/leerob.io).

## Styling: Tailwind CSS

Ahh, website styling. _Hello darkness my old friend..._

To be honest, I've never really had a knack for design. I feel I can come up with _decent_ designs, but it generally takes me longer than I'd like to admit. Hopefully you don't find the site's current styling too offensive!

Not to mention, I always found CSS pretty cumbersome. For example, here's what it takes to style a button using "proper" CSS classes:

```html
<div class="container--centered container">
  <button class="btn btn--large btn--green">Click me!</button>
</div>

<style>
  .container {
    display: flex;
    border-width: 2px;
    padding: 1rem;
  }
  .container--centered: {
    justify-content: centered;
  }
  .btn {
    font-weight: 700;
    border-radius: 0.75rem;
  }
  .btn--green {
    color: white;
    background-color: #22c55e;
  }
  .btn--large {
    padding: 2rem;
  }
</style>
```

This is known as the [Block, Element, Modifier (BEM)](https://css-tricks.com/bem-101/) methodology for CSS, and it's the way I was taught to do things. Obviously, this takes a while to get started, since you have to write five (!) classes before you even see what things will look like. Then, if you're like me, you start the process of slowly tweaking things one-by-one to get your desired look.

Here's the same example using [Tailwind CSS](https://tailwindcss.com/):

```html
<div className="flex justify-center border-2 p-4">
  <button className="rounded-xl bg-green-500 p-8 font-bold text-white">Click me!</button>
</div>
```

To me, this is a no brainer. Not only is everything co-located in the same file, but all styles are scoped to the component _by default_. And when you are making reusable React components anyways, why not just have the styles embedded right on the structure?

The other huge benefit of Tailwind is it provides sane defaults for all the various CSS properties. These have been curated by people that design web UIs professionally. So, theoretically, I shouldn't be able to get into too much trouble.

That's not to say that you cannot customize things if you need. You can still define [global styles](https://tailwindcss.com/docs/adding-custom-styles#using-css-and-layer) and add your own properties [like brand colors](https://tailwindcss.com/docs/customizing-colors#adding-additional-colors).

All in all, I really enjoy using Tailwind. And with their latest release of [Just-in-Time mode](https://tailwindcss.com/blog/tailwindcss-v3), it fits even better with a static-first site.

## Content: MDX

When it comes to writing content online, it seems like Markdown has won. After all, how many people actually code the HTML for each page, laying out each heading and paragraph tag with care? So, obviously, we need a way to go from Markdown > HTML.

Another aspect that you might consider is "How easy is it to embed a custom component in my page?", say a fancy floating card to showcase a project or blog post. In React-land, that's very easy with JSX. Just import the component, and drop it in where necessary! You can probably see where this is going...

[Markdown + JSX = MDX](https://mdxjs.com/). All the goodness of Markdown, plus the flexibility of JSX, in one file.

_Note: there used to be `<Badge>` components here in a previous version of this site_

In order to insert the above badges, here's what my Markdown looks like:

```javascript
import Badge from "../../components/Badge.jsx"

<div className="grid grid-cols-3">
  <Badge logo="React" />
  <Badge logo="Next.js" />
  <Badge logo="Tailwind" />
</div>

In order to insert the above badges, here's what my Markdown looks like: ...
```

Pretty seamless! And by using the [next/mdx](https://www.npmjs.com/package/@next/mdx), all of my MDX files in the pages directory are automatically compiled for me. This works well for my static setup, but if you are in need of dynamic routes or server-side content, you might want to look at [next-mdx-remote](https://github.com/hashicorp/next-mdx-remote) or [mdx-bundler](https://github.com/kentcdodds/mdx-bundler).

### Syntax Highlighting: Shiki

Part of getting the content right on this site is having proper syntax highlighting. The go-to these days is [Prism.js](https://prismjs.com/), which generally gets included as a remark/rehype plugin.

I tried this out, and it works... buuuut I'm not a fan of the included color themes. In fact, there's only one theme I've ever used more than a day: [Monokai Pro](https://monokai.pro/).

I love Monokai Pro so much that I ported it to my [Xcode](https://github.com/maxpetretta/monokai-pro-xcode) and terminal settings, just to be consistent everywhere.

Another thing I noticed with Prism was that the highlighting was ever-so-slightly inconsistent between what the site would show and what I saw in VSCode. Thankfully, I stumbled upon [this article](https://miguelpiedrafita.com/vscode-highlighting) about Shiki by [Miguel Piedrafita](https://twitter.com/m1guelpf). Shiki, turns out, is the _exact same highlighter_ that VSCode uses under the hood. That means that I could simply export any color theme in it's JSON format and voila, perfectly colored code blocks!

I didn't follow Miguel's exact implementation, opting for rsclarke's [rehype plugin](https://github.com/rsclarke/rehype-shiki) instead. To be honest, I still am a bit fuzzy on remark/rehype, so this seems like a magic black-box solution with just a few lines of code.

### Fonts: Public Sans & FiraCode

Yes, I really am going to talk about website fonts, briefly.

First, [FiraCode](https://github.com/tonsky/FiraCode). This one is easy, it's what I use in my editor. Even though I turn off ligatures, I still like the design choices more than other monospaced options.

The obvious choice for a webfont these days is [Inter](https://rsms.me/inter/). Nothing against it, but it's a bit boring to see the same typeface on every single website. Plus, c'mon, how can you say no to a fancy **g** !?

My main content font is [Public Sans](https://public-sans.digital.gov/). Pretty clean, comes in the variable format, and I think it's amusing that my font is made by the US government.

## Inspiration

When building any website, it's impossible to not survey the landscape, to see what others in the space are doing. I am no different, and there were quite a few sites that I studied while making mine:

- [Lee Robinson](https://leerob.io/), mentioned earlier, not only has a fantastic open source site, but also wrote extensively about using Next.js, MDX, and Tailwind. I learned a ton from checking out [his code here](https://github.com/leerob/leerob.io)
- [Tania Rascia](https://www.taniarascia.com/), who wrote the first guide on [React Hooks](https://www.taniarascia.com/crud-app-in-react-with-hooks/) I went through. You can see her Gatsby-based site [here](https://github.com/taniarascia/taniarascia.com)
- [Paul Stamatiou](https://paulstamatiou.com/), his site is one of the best looking I've seen
- [Brittany Chiang](https://brittanychiang.com/), the fade-in transitions on her site are fantastic
- [Marc Barrowclift](https://barrowclift.me/), whose hover interactions on components are really top-notch

## Future Changes

There are a lot of features that did not make it into my v1.0 release; things like an RSS feed, email newsletter, and webmentions all spring to mind.

When I started this project, I initially toyed with skipping React altogether in favor of [Svelte](https://svelte.dev/). At the time though, Sapper had just been declared dead (with no obvious replacement). Since then, [SvelteKit](https://kit.svelte.dev/) has been released and is nearing it's [v1.0 release](https://github.com/sveltejs/kit/issues/2100). Maybe next year!

Lastly, there have been some really stunning personal site revamps in the last year (a positive of being stuck inside). Sites like [Brian Lovin's](https://brianlovin.com/), or [Rauno Freiberg's](https://rauno.me/) really turn things up to eleven. I would love to build UIs like that, someday.

If you would like to see exactly how I implemented any of the above, make sure to check out the [source code on GitHub](https://github.com/maxpetretta/maxpetretta.com). And feel free to [tweet any questions](https://twitter.com/maxpetretta) you have at me!
