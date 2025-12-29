import { ImageResponse } from "@vercel/og"
import type { RequestHandler } from "./$types"

// Post metadata - hardcoded to avoid fs access in serverless
const POSTS: Record<string, { title: string; date: string }> = {
  hello: { title: "Hello World", date: "2022-02-04" },
  stack: { title: "Building This Blog", date: "2022-02-11" },
  backpack: { title: "Travel Backpacks", date: "2022-09-27" },
  twitt3r: { title: "Twitt3r.xyz", date: "2022-08-24" },
}

export const GET: RequestHandler = async ({ params }) => {
  const { slug } = params

  const post = POSTS[slug]
  const title = post?.title ?? "Max Petretta"
  const date = post?.date
    ? new Date(post.date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : ""

  const html = {
    type: "div",
    props: {
      style: {
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "center",
        backgroundColor: "#0a0a0a",
        padding: "80px",
      },
      children: [
        {
          type: "div",
          props: {
            style: {
              display: "flex",
              alignItems: "center",
              marginBottom: "40px",
            },
            children: [
              {
                type: "img",
                props: {
                  src: "https://maxpetretta.com/favicons/android-chrome-192x192.png",
                  width: 80,
                  height: 80,
                  style: {
                    borderRadius: "50%",
                    marginRight: "24px",
                  },
                },
              },
              {
                type: "div",
                props: {
                  style: {
                    display: "flex",
                    flexDirection: "column",
                  },
                  children: [
                    {
                      type: "span",
                      props: {
                        style: {
                          fontSize: "32px",
                          fontWeight: 600,
                          color: "#fafafa",
                        },
                        children: "Max Petretta",
                      },
                    },
                    {
                      type: "span",
                      props: {
                        style: {
                          fontSize: "20px",
                          color: "#a1a1aa",
                        },
                        children: "maxpetretta.com",
                      },
                    },
                  ],
                },
              },
            ],
          },
        },
        {
          type: "h1",
          props: {
            style: {
              fontSize: "64px",
              fontWeight: 700,
              color: "#fafafa",
              lineHeight: 1.2,
              marginBottom: "20px",
              maxWidth: "900px",
            },
            children: title,
          },
        },
        date
          ? {
              type: "span",
              props: {
                style: {
                  fontSize: "28px",
                  color: "#a1a1aa",
                },
                children: date,
              },
            }
          : null,
      ].filter(Boolean),
    },
  }

  return new ImageResponse(html, {
    width: 1200,
    height: 630,
  })
}
