import { defineCollection, z } from "astro:content"
import { glob } from "astro/loaders"

const posts = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/posts" }),
  schema: z.object({
    title: z.string().min(1, "Post title is required"),
    date: z.coerce
      .date({ required_error: "Post date is required", invalid_type_error: "Invalid date format" })
      .refine((date) => date <= new Date(), { message: "Post date cannot be in the future" }),
    description: z.string().optional(),
    image: z.string().optional(),
    categories: z.array(z.string()).optional(),
  }),
})

export const collections = { posts }
