import { toast } from "svelte-sonner"
import { browser } from "$app/environment"
import { goto } from "$app/navigation"
import { RESUME, SOCIALS } from "$lib/constants"
import type { Flag } from "$lib/stores/flag.svelte"
import type { Post } from "$lib/utils"

export type CommandType = {
  id: string
  name: string
  group: string
  icon?: string
  shortcut?: string[]
  action: (theme?: Flag) => void
}

async function gotoPage(path: string) {
  await goto(path)
}

async function gotoSocial(platform: keyof typeof SOCIALS) {
  window.open(SOCIALS[platform], "_blank")
}

export async function sharePageUrl(url: string) {
  try {
    if (navigator.share) {
      await navigator.share({ url })
    } else {
      await navigator.clipboard.writeText(url)
      toast.success("Link copied!")
    }
  } catch (error) {
    console.error(error)
  }
}

export function toggleTheme(theme?: Flag) {
  if (!(browser && theme)) return
  document.documentElement.classList.add("no-transition")

  theme.toggle()
  const isDark = document.documentElement.classList.toggle("dark")
  window.localStorage.setItem("theme", isDark ? "dark" : "light")

  setTimeout(() => document.documentElement.classList.remove("no-transition"), 100)
}

function secretThirdThing() {
  toast.info("Nothing happened... or did it?")
  console.log("Well you're determined, aren't you?")
}

export function runCommand(id: string, opener: Flag, theme: Flag) {
  const command = COMMANDS.find((cmd) => cmd.id === id)
  if (!(command && opener)) return

  opener.toggle(false)
  command.action(theme)
}

export async function getPostCommands(posts: Post[]) {
  const postCommands: CommandType[] = []
  for (const post of posts) {
    const slug = post.path.split("/")[1]
    if (slug) {
      const command = {
        id: slug,
        name: post.metadata.title,
        group: "Posts",
        action: () => gotoPage(post.path),
      }
      postCommands.push(command)
    }
  }

  return postCommands
}

export const COMMANDS: CommandType[] = [
  {
    id: "share-link",
    name: "Share Link",
    group: "General",
    shortcut: ["S"],
    action: () => sharePageUrl(window.location.href),
  },
  {
    id: "toggle-theme",
    name: "Toggle Theme",
    group: "General",
    shortcut: ["T"],
    action: (theme) => toggleTheme(theme),
  },
  {
    id: "secret-third-thing",
    name: "Secret Third Thing",
    group: "General",
    shortcut: ["3"],
    action: () => secretThirdThing(),
  },
  {
    id: "home",
    name: "Home",
    group: "Pages",
    shortcut: ["G", "H"],
    action: () => gotoPage("/"),
  },
  {
    id: "blog",
    name: "Blog",
    group: "Pages",
    shortcut: ["G", "B"],
    action: () => gotoPage("/blog"),
  },
  {
    id: "email",
    name: "Email",
    group: "Contact",
    shortcut: ["E"],
    action: () => gotoSocial("email"),
  },
  {
    id: "twitter",
    name: "Twitter",
    group: "Contact",
    shortcut: ["X"],
    action: () => gotoSocial("twitter"),
  },
  {
    id: "substack",
    name: "Substack",
    group: "Contact",
    shortcut: ["U"],
    action: () => gotoSocial("substack"),
  },
  {
    id: "github",
    name: "GitHub",
    group: "Contact",
    shortcut: ["I"],
    action: () => gotoSocial("github"),
  },
  {
    id: "resume",
    name: "Resume",
    group: "Contact",
    shortcut: ["R"],
    action: () => window.open(RESUME, "_blank"),
  },
]
