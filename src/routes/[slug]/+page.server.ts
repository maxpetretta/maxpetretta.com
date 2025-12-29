import * as fs from "node:fs"
import * as path from "node:path"

export const prerender = true

export function entries() {
  const directory = path.resolve("src/lib/posts")
  const files = fs.readdirSync(directory)
  return files.map((file: string) => ({ slug: file.replace(".md", "") }))
}
