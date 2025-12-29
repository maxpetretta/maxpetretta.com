import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(
  dateString: string,
  options: Intl.DateTimeFormatOptions = { year: "numeric", month: "long", day: "numeric" },
): string {
  return new Date(dateString).toLocaleDateString(undefined, options)
}

type Metadata = {
  title: string
  date: string
  description?: string
}

export type Post = {
  path: string
  metadata: Metadata
}

export async function fetchMarkdownPosts() {
  const files = import.meta.glob("/src/lib/posts/*.md")
  const fileEntries = Object.entries(files)

  const posts: Post[] = await Promise.all(
    fileEntries.map(async ([filePath, resolver]) => {
      const path = filePath.slice(14, -3)
      const { metadata } = (await resolver()) as { metadata: Metadata }

      return { path, metadata }
    }),
  )

  return posts
}
