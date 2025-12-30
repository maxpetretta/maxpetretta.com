import { Resvg } from "@resvg/resvg-js";
import satori from "satori";
import { html } from "satori-html";
import type { RequestHandler } from "./$types";
import type { Metadata } from "$lib/utils";

// Fetch a static (non-variable) Inter font from Google Fonts CDN
const fontResponse = await fetch(
  "https://fonts.gstatic.com/s/inter/v18/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuLyfAZ9hjp-Ek-_EeA.woff",
);
const fontData = await fontResponse.arrayBuffer();

export const prerender = true;

export async function entries() {
  const files = import.meta.glob("/src/lib/posts/*.md");
  return Object.keys(files).map((file) => ({
    slug: file.replace("/src/lib/posts/", "").replace(".md", ""),
  }));
}

export const GET: RequestHandler = async ({ params }) => {
  const { slug } = params;

  let metadata: Metadata;
  try {
    const post = await import(`../../../lib/posts/${slug}.md`);
    metadata = post.metadata as Metadata;
  } catch {
    return new Response("Post not found", { status: 404 });
  }

  const formattedDate = new Date(metadata.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const markup = html`
    <div
      style="height: 100%; width: 100%; display: flex; flex-direction: column; background: #0c0a09; color: #fafaf9; padding: 60px;"
    >
      <div style="display: flex; flex-direction: column; flex: 1; justify-content: center;">
        <div style="font-size: 64px; font-weight: 600; line-height: 1.2; margin-bottom: 24px;">${metadata.title}</div>
        <div style="font-size: 28px; color: #a8a29e;">${formattedDate}</div>
      </div>
      <div style="display: flex; justify-content: space-between; align-items: center;">
        <div style="font-size: 32px; font-weight: 500;">Max Petretta</div>
        <div style="font-size: 24px; color: #a8a29e;">maxpetretta.com</div>
      </div>
    </div>
  `;

  const svg = await satori(markup, {
    width: 1200,
    height: 630,
    fonts: [
      {
        name: "Inter",
        data: fontData,
        weight: 400,
        style: "normal",
      },
    ],
  });

  const resvg = new Resvg(svg, {
    fitTo: {
      mode: "width",
      value: 1200,
    },
  });

  const pngData = resvg.render();
  const pngBuffer = pngData.asPng();

  return new Response(pngBuffer as unknown as BodyInit, {
    headers: {
      "Content-Type": "image/png",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
};
