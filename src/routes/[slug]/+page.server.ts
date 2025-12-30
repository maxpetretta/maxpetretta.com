import { readdirSync } from "node:fs";
import { resolve } from "node:path";

export const prerender = true;

export function entries() {
  const directory = resolve("src/lib/posts");
  const files = readdirSync(directory);
  return files.map((file: string) => ({ slug: file.replace(".md", "") }));
}
