import { type CollectionEntry, getCollection } from "astro:content"
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: Date, short = false): string {
  const options: Intl.DateTimeFormatOptions = short
    ? { year: "numeric", month: "short", day: "numeric" }
    : { year: "numeric", month: "long", day: "numeric" }
  return date.toLocaleDateString(undefined, options)
}

export async function getSortedPosts(): Promise<CollectionEntry<"posts">[]> {
  const posts = await getCollection("posts")
  return posts.sort((a, b) => b.data.date.getTime() - a.data.date.getTime())
}
