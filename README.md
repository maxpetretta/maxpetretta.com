# maxpetretta.com

Personal site and blog built with [Astro](https://astro.build).

## Tech Stack

- **Framework**: Astro 5 (static output)
- **Styling**: Tailwind CSS 4
- **Content**: MDX with Astro Content Collections
- **Linting**: Biome
- **Deployment**: Vercel

## Prerequisites

- [Bun](https://bun.sh) (v1.0+)
- Node.js 18+ (for Astro compatibility)

## Getting Started

```bash
# Install dependencies
bun install

# Start development server
bun run dev

# Build for production
bun run build

# Preview production build
bun run preview
```

## Project Structure

```
src/
├── components/     # Astro components
├── content/
│   └── posts/      # Blog posts (MDX)
├── fonts/          # Custom fonts for OG images
├── layouts/        # Page layouts
├── lib/            # Utilities and constants
├── pages/          # Routes
│   ├── og/         # Dynamic OG image generation
│   └── *.md.ts     # Markdown routes for CLI access
├── styles/         # Global CSS
└── themes/         # Syntax highlighting themes
```

## Scripts

| Command | Description |
|---------|-------------|
| `bun run dev` | Start development server |
| `bun run build` | Build for production |
| `bun run preview` | Preview production build locally |
| `bun run lint` | Run all linters (Astro, Biome, TypeScript) |
| `bun run fix` | Auto-fix linting issues |

## Features

- Zero JavaScript runtime (static HTML)
- Custom OG images per post
- RSS feed at `/rss.xml`
- Automatic sitemap
- View Transitions
- Dark/light theme support
- Markdown routes for CLI access (`/index.md`, `/blog.md`, `/[slug].md`)

## Adding Blog Posts

Create a new `.mdx` file in `src/content/posts/`:

```mdx
---
title: "Post Title"
date: 2024-01-15
description: "Optional description"
image: "/images/cover.jpg"
categories: ["category"]
---

Post content here...
```

## License

MIT
