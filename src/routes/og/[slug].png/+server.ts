import { ImageResponse } from "@vercel/og"
import { createElement } from "react"
import type { RequestHandler } from "./$types"

type Metadata = {
  title: string
  date: string
}

const posts = import.meta.glob("/src/lib/posts/*.md", { eager: true })
const dateFormatter = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "long",
  day: "numeric",
})

const getPostMetadata = (slug: string): Metadata | null => {
  const entry = posts[`/src/lib/posts/${slug}.md`]
  if (!entry || typeof entry !== "object" || !("metadata" in entry)) return null
  return (entry as { metadata: Metadata }).metadata
}

export const prerender = false

export const GET: RequestHandler = async ({ params, url }) => {
  const metadata = getPostMetadata(params.slug)
  if (!metadata) {
    return new Response("Not found", { status: 404 })
  }

  const avatarUrl = new URL("/favicons/android-chrome-192x192.png", url.origin).toString()
  const fontUrl = new URL("/fonts/InterVariable.woff2", url.origin)

  const fontData = await fetch(fontUrl).then((res) => res.arrayBuffer())
  const formattedDate = dateFormatter.format(new Date(metadata.date))

  const element = createElement(
    "div",
    {
      style: {
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "64px",
        background: "#ffffff",
        color: "#0a0a0a",
        fontFamily: "Inter",
      },
    },
    createElement(
      "div",
      {
        style: {
          display: "flex",
          alignItems: "center",
          gap: "16px",
        },
      },
      createElement("img", {
        src: avatarUrl,
        width: 72,
        height: 72,
        style: {
          borderRadius: "999px",
          border: "2px solid #0a0a0a",
        },
      }),
      createElement(
        "div",
        {
          style: {
            fontSize: 28,
            fontWeight: 700,
            letterSpacing: "-0.02em",
          },
        },
        "Max Petretta",
      ),
    ),
    createElement(
      "div",
      {
        style: {
          fontSize: 64,
          fontWeight: 700,
          lineHeight: 1.1,
          letterSpacing: "-0.02em",
        },
      },
      metadata.title,
    ),
    createElement(
      "div",
      {
        style: {
          display: "flex",
          justifyContent: "space-between",
          fontSize: 24,
          color: "#52525b",
        },
      },
      createElement("span", null, formattedDate),
      createElement("span", null, "maxpetretta.com"),
    ),
  )

  return new ImageResponse(element, {
    width: 1200,
    height: 630,
    fonts: [
      { name: "Inter", data: fontData, weight: 400, style: "normal" },
      { name: "Inter", data: fontData, weight: 700, style: "normal" },
    ],
  })
}
