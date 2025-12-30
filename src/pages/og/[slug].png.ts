import { type CollectionEntry, getCollection } from "astro:content"
import { ImageResponse } from "@vercel/og"
import type { APIRoute, GetStaticPaths } from "astro"

export const getStaticPaths: GetStaticPaths = async () => {
  const posts: CollectionEntry<"posts">[] = await getCollection("posts")
  return posts.map((post) => ({
    params: { slug: post.id },
    props: { post },
  }))
}

export const GET: APIRoute = ({ props }) => {
  const post = props.post as CollectionEntry<"posts">

  const title = post?.data.title ?? "Max Petretta"
  const date = post?.data.date
    ? post.data.date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : ""

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
          backgroundColor: "#0a0a0a",
          padding: "60px",
        },
        children: [
          {
            type: "div",
            props: {
              style: {
                display: "flex",
                flexDirection: "column",
                gap: "16px",
              },
              children: [
                {
                  type: "div",
                  props: {
                    style: {
                      fontSize: "64px",
                      fontWeight: "600",
                      color: "#fafafa",
                      lineHeight: "1.2",
                    },
                    children: title,
                  },
                },
                date
                  ? {
                      type: "div",
                      props: {
                        style: {
                          fontSize: "32px",
                          color: "#a1a1aa",
                        },
                        children: date,
                      },
                    }
                  : null,
              ].filter(Boolean),
            },
          },
          {
            type: "div",
            props: {
              style: {
                position: "absolute",
                bottom: "60px",
                left: "60px",
                fontSize: "28px",
                color: "#71717a",
              },
              children: "maxpetretta.com",
            },
          },
        ],
      },
    },
    {
      width: 1200,
      height: 630,
    },
  )
}
