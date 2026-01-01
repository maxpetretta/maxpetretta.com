import { type CollectionEntry, getCollection } from "astro:content"
import { ImageResponse } from "@vercel/og"
import type { APIRoute, GetStaticPaths } from "astro"
import { readFile } from "node:fs/promises"
import { join } from "node:path"

export const getStaticPaths: GetStaticPaths = async () => {
  const posts: CollectionEntry<"posts">[] = await getCollection("posts")
  return posts.map((post) => ({
    params: { slug: post.id },
    props: { post },
  }))
}

export const GET: APIRoute = async ({ props }) => {
  const post = props.post as CollectionEntry<"posts">

  // Load Monaspace fonts (stripped of GSUB ligature tables for Satori compatibility)
  const monaspaceRegular = await readFile(
    join(process.cwd(), "src/fonts/MonaspaceArgon-Regular-stripped.woff")
  )
  const monaspaceBold = await readFile(
    join(process.cwd(), "src/fonts/MonaspaceArgon-Bold-stripped.woff")
  )

  // Load favicon
  const faviconPath = join(process.cwd(), "public/favicons/favicon-96x96.png")
  const faviconBuffer = await readFile(faviconPath)
  const faviconBase64 = `data:image/png;base64,${faviconBuffer.toString("base64")}`

  // Get post data
  const title = post?.data.title ?? "Max Petretta"
  const imageUrl = post?.data.image

  // Load post image if available
  let imageBase64: string | null = null
  if (imageUrl) {
    if (imageUrl.startsWith("/")) {
      const imagePath = join(process.cwd(), "public", imageUrl)
      const imageBuffer = await readFile(imagePath)
      const ext = imageUrl.split(".").pop()?.toLowerCase() ?? "png"
      const mimeType = ext === "jpg" || ext === "jpeg" ? "image/jpeg" : `image/${ext}`
      imageBase64 = `data:${mimeType};base64,${imageBuffer.toString("base64")}`
    } else {
      const response = await fetch(imageUrl)
      const arrayBuffer = await response.arrayBuffer()
      const buffer = Buffer.from(arrayBuffer)
      const contentType = response.headers.get("content-type") ?? "image/png"
      imageBase64 = `data:${contentType};base64,${buffer.toString("base64")}`
    }
  }

  // Branding overlay component (bottom-right, reversed: domain then favicon)
  const brandingOverlay = {
    type: "div",
    props: {
      style: {
        position: "absolute",
        bottom: "40px",
        right: "40px",
        display: "flex",
        alignItems: "center",
        gap: "16px",
      },
      children: [
        {
          type: "div",
          props: {
            style: {
              fontFamily: "Monaspace",
              fontSize: "28px",
              fontWeight: 400,
              color: "#ffffff",
            },
            children: "maxpetretta.com",
          },
        },
        {
          type: "img",
          props: {
            src: faviconBase64,
            width: 56,
            height: 56,
            style: { borderRadius: "50%" },
          },
        },
      ],
    },
  }

  // Mode 1: Post has an image - show image with minimal branding overlay
  if (imageBase64) {
    return new ImageResponse(
      {
        type: "div",
        props: {
          style: {
            height: "100%",
            width: "100%",
            display: "flex",
            position: "relative",
            backgroundColor: "#0a0a0a",
          },
          children: [
            // Background image
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
            // Subtle gradient for overlay readability (bottom-right corner)
            {
              type: "div",
              props: {
                style: {
                  position: "absolute",
                  bottom: 0,
                  right: 0,
                  width: "100%",
                  height: "200px",
                  background: "linear-gradient(0deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0) 100%)",
                },
              },
            },
            // Bottom right: domain + favicon
            brandingOverlay,
          ],
        },
      },
      {
        width: 1200,
        height: 630,
        fonts: [
          { name: "Monaspace", data: monaspaceRegular, weight: 400, style: "normal" },
        ],
      }
    )
  }

  // Mode 2: No image - branded fallback with title
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
          // Dark base for mesh gradient
          backgroundColor: "#0a0a0a",
        },
        children: [
          // Mesh gradient: multiple overlapping radial gradients
          // Orange blob - top right
          {
            type: "div",
            props: {
              style: {
                position: "absolute",
                top: "-20%",
                right: "-10%",
                width: "70%",
                height: "80%",
                borderRadius: "50%",
                background: "radial-gradient(ellipse, rgba(232,139,77,0.5) 0%, rgba(232,139,77,0) 70%)",
              },
            },
          },
          // Orange blob - bottom center
          {
            type: "div",
            props: {
              style: {
                position: "absolute",
                bottom: "-30%",
                left: "20%",
                width: "60%",
                height: "70%",
                borderRadius: "50%",
                background: "radial-gradient(ellipse, rgba(232,139,77,0.25) 0%, rgba(232,139,77,0) 70%)",
              },
            },
          },
          // Subtle light accent - center left
          {
            type: "div",
            props: {
              style: {
                position: "absolute",
                top: "20%",
                left: "-15%",
                width: "50%",
                height: "60%",
                borderRadius: "50%",
                background: "radial-gradient(ellipse, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0) 70%)",
              },
            },
          },
          // Deep orange accent - mid right
          {
            type: "div",
            props: {
              style: {
                position: "absolute",
                top: "40%",
                right: "5%",
                width: "40%",
                height: "50%",
                borderRadius: "50%",
                background: "radial-gradient(ellipse, rgba(200,100,50,0.2) 0%, rgba(200,100,50,0) 70%)",
              },
            },
          },
          // Centered title
          {
            type: "div",
            props: {
              style: {
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                padding: "0 80px",
                textAlign: "center",
              },
              children: {
                type: "div",
                props: {
                  style: {
                    fontFamily: "Monaspace",
                    fontSize: "72px",
                    fontWeight: 700,
                    color: "#fafafa",
                    lineHeight: 1.2,
                    textAlign: "center",
                  },
                  children: title,
                },
              },
            },
          },
          // Bottom right: domain + favicon (with muted color for fallback)
          {
            type: "div",
            props: {
              style: {
                position: "absolute",
                bottom: "40px",
                right: "40px",
                display: "flex",
                alignItems: "center",
                gap: "16px",
              },
              children: [
                {
                  type: "div",
                  props: {
                    style: {
                      fontFamily: "Monaspace",
                      fontSize: "28px",
                      fontWeight: 400,
                      color: "#a1a1aa",
                    },
                    children: "maxpetretta.com",
                  },
                },
                {
                  type: "img",
                  props: {
                    src: faviconBase64,
                    width: 56,
                    height: 56,
                    style: { borderRadius: "50%" },
                  },
                },
              ],
            },
          },
          // Bottom accent line (brand color)
          {
            type: "div",
            props: {
              style: {
                position: "absolute",
                bottom: "0",
                left: "0",
                width: "100%",
                height: "4px",
                background: "linear-gradient(90deg, #E88B4D 0%, #E88B4D 30%, transparent 100%)",
              },
            },
          },
        ],
      },
    },
    {
      width: 1200,
      height: 630,
      fonts: [
        { name: "Monaspace", data: monaspaceRegular, weight: 400, style: "normal" },
        { name: "Monaspace", data: monaspaceBold, weight: 700, style: "normal" },
      ],
    }
  )
}
