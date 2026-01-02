import { type CollectionEntry, getCollection } from "astro:content"
import { readFile } from "node:fs/promises"
import { join } from "node:path"
import { ImageResponse } from "@vercel/og"
import type { APIRoute, GetStaticPaths } from "astro"
import { SITE, THEME_COLORS } from "@/lib/constants"

export const getStaticPaths: GetStaticPaths = async () => {
  const posts: CollectionEntry<"posts">[] = await getCollection("posts")
  return posts.map((post) => ({
    params: { slug: post.id },
    props: { post },
  }))
}

// Generate a simple fallback OG image when the main generation fails
function generateFallbackImage(title: string): Response {
  return new ImageResponse(
    {
      type: "div",
      props: {
        style: {
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: THEME_COLORS.dark,
          padding: "60px",
        },
        children: [
          {
            type: "div",
            props: {
              style: {
                fontSize: "64px",
                fontWeight: 700,
                color: THEME_COLORS.foreground,
                textAlign: "center",
                maxWidth: "1000px",
              },
              children: title,
            },
          },
          {
            type: "div",
            props: {
              style: {
                position: "absolute",
                bottom: "40px",
                right: "40px",
                fontSize: "28px",
                fontWeight: 700,
                color: THEME_COLORS.foreground,
              },
              children: SITE.domain,
            },
          },
        ],
      },
    },
    { width: 1200, height: 630 },
  )
}

export const GET: APIRoute = async ({ props }) => {
  const post = props.post as CollectionEntry<"posts">
  const title = post?.data.title ?? "Max Petretta"

  try {
    // Load Monaspace font (stripped of GSUB ligature tables for Satori compatibility)
    const monaspaceBold = await readFile(join(process.cwd(), "src/fonts/MonaspaceArgon-Bold-stripped.woff"))

    // Load favicon
    const faviconPath = join(process.cwd(), "public/favicons/favicon-96x96.png")
    const faviconBuffer = await readFile(faviconPath)
    const faviconBase64 = `data:image/png;base64,${faviconBuffer.toString("base64")}`

    // Get post image URL
    const imageUrl = post?.data.image

    // Load post image if available
    let imageBase64: string | null = null
    if (imageUrl) {
      try {
        if (imageUrl.startsWith("/")) {
          const imagePath = join(process.cwd(), "public", imageUrl.replace(/^\//, ""))
          const imageBuffer = await readFile(imagePath)
          const ext = imageUrl.split(".").pop()?.toLowerCase() ?? "png"
          const mimeType = ext === "jpg" || ext === "jpeg" ? "image/jpeg" : `image/${ext}`
          imageBase64 = `data:${mimeType};base64,${imageBuffer.toString("base64")}`
        } else {
          const response = await fetch(imageUrl)
          if (response.ok) {
            const contentType = response.headers.get("content-type") ?? "image/png"
            const buffer = Buffer.from(await response.arrayBuffer())
            imageBase64 = `data:${contentType};base64,${buffer.toString("base64")}`
          }
        }
      } catch {
        // Fall back to text-only OG image (no post image)
      }
    }

    // Build children array with base layout
    const children: unknown[] = [
      // Centered title (background layer)
      {
        type: "div",
        props: {
          style: {
            fontFamily: "Monaspace",
            fontSize: "72px",
            fontWeight: 700,
            color: THEME_COLORS.foreground,
            lineHeight: 1.2,
            textAlign: "center",
            maxWidth: "1100px",
          },
          children: title,
        },
      },
      // Optional image overlay
      ...(imageBase64
        ? [
            {
              type: "img",
              props: {
                src: imageBase64,
                style: {
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                },
              },
            },
          ]
        : []),
      // Top right: favicon
      {
        type: "img",
        props: {
          src: faviconBase64,
          width: 64,
          height: 64,
          style: {
            position: "absolute",
            top: "40px",
            right: "40px",
          },
        },
      },
      // Bottom right: domain
      {
        type: "div",
        props: {
          style: {
            position: "absolute",
            bottom: "40px",
            right: "40px",
            fontFamily: "Monaspace",
            fontSize: "32px",
            fontWeight: 700,
            color: THEME_COLORS.foreground,
          },
          children: SITE.domain,
        },
      },
    ]

    return new ImageResponse(
      {
        type: "div",
        props: {
          style: {
            height: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            position: "relative",
            padding: "60px",
            backgroundColor: THEME_COLORS.dark,
          },
          children,
        },
      },
      {
        width: 1200,
        height: 630,
        fonts: [{ name: "Monaspace", data: monaspaceBold, weight: 700, style: "normal" }],
      },
    )
  } catch (error) {
    console.error("OG image generation failed:", error)
    return generateFallbackImage(title)
  }
}
