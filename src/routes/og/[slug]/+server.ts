import fs from "node:fs"
import path from "node:path"
import { error } from "@sveltejs/kit"
import satori from "satori"
import { html } from "satori-html"
import sharp from "sharp"
import { fetchMarkdownPosts, formatDate } from "$lib/utils"

export const prerender = true

async function loadGoogleFont(font: string, weight: number): Promise<ArrayBuffer> {
  const url = `https://fonts.googleapis.com/css2?family=${font}:wght@${weight}&display=swap`
  const css = await (await fetch(url)).text()

  const resource = css.match(/src: url\((.+)\) format\('(opentype|truetype)'\)/)
  if (!resource?.[1]) {
    throw new Error("Failed to load font")
  }

  const fontData = await fetch(resource[1])
  return fontData.arrayBuffer()
}

export async function entries() {
  const posts = await fetchMarkdownPosts()
  return posts.map((post) => {
    const parts = post.path.split("/")
    const slug = parts[parts.length - 1] ?? ""
    return { slug }
  })
}

export async function GET({ params }) {
  const posts = await fetchMarkdownPosts()
  const post = posts.find((p) => {
    const parts = p.path.split("/")
    const slug = parts[parts.length - 1]
    return slug === params.slug
  })

  if (!post) {
    error(404, "Post not found")
  }

  const interRegular = await loadGoogleFont("Inter", 400)
  const interBold = await loadGoogleFont("Inter", 700)

  const pfpPath = path.join(process.cwd(), "static/favicons/android-chrome-512x512.png")
  const pfpBuffer = fs.readFileSync(pfpPath)
  const pfpBase64 = `data:image/png;base64,${pfpBuffer.toString("base64")}`

  const markup = html`
    <div
      style="
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        width: 100%;
        height: 100%;
        padding: 60px;
        background: linear-gradient(135deg, #09090b 0%, #18181b 100%);
        color: #fafafa;
        font-family: 'Inter', sans-serif;
      "
    >
      <div style="display: flex; align-items: center; gap: 20px;">
        <img
          src="${pfpBase64}"
          width="80"
          height="80"
          style="border-radius: 50%;"
        />
        <div style="display: flex; flex-direction: column;">
          <span style="font-size: 28px; font-weight: 600;">Max Petretta</span>
          <span style="font-size: 20px; color: #a1a1aa;">maxpetretta.com</span>
        </div>
      </div>

      <div style="display: flex; flex-direction: column; gap: 16px; flex: 1; justify-content: center;">
        <h1 style="font-size: 56px; font-weight: 700; margin: 0; line-height: 1.2;">
          ${post.metadata.title}
        </h1>
        <p style="font-size: 24px; color: #a1a1aa; margin: 0;">
          ${formatDate(post.metadata.date)}
        </p>
      </div>
    </div>
  `

  const svg = await satori(markup, {
    width: 1200,
    height: 630,
    fonts: [
      {
        name: "Inter",
        data: interRegular,
        weight: 400,
        style: "normal",
      },
      {
        name: "Inter",
        data: interBold,
        weight: 700,
        style: "normal",
      },
    ],
  })

  const png = await sharp(Buffer.from(svg)).png().toBuffer()

  return new Response(new Uint8Array(png), {
    headers: {
      "Content-Type": "image/png",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  })
}
