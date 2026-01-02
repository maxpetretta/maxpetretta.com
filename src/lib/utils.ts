import { type CollectionEntry, getCollection } from "astro:content"

export function formatDate(date: Date, short = false): string {
  const options: Intl.DateTimeFormatOptions = short
    ? { year: "numeric", month: "short", day: "numeric" }
    : { year: "numeric", month: "long", day: "numeric" }
  options.timeZone = "America/New_York"
  return date.toLocaleDateString("en-US", options)
}

export async function getSortedPosts(): Promise<CollectionEntry<"posts">[]> {
  const posts: CollectionEntry<"posts">[] = await getCollection("posts")
  return posts.sort((a, b) => b.data.date.getTime() - a.data.date.getTime())
}
