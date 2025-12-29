<script lang="ts">
import { browser } from "$app/environment"
import { COMMANDS, getPostCommands, runCommand, type CommandType } from "$lib/commands"
import CommandItem from "$lib/components/CommandItem.svelte"
import * as Command from "$lib/components/ui/command"
import type { Flag } from "$lib/stores/flag.svelte"
import type { Post } from "$lib/utils"
import { getContext } from "svelte"

const postsContext = getContext<{ value: Post[] }>("posts")
const posts = $derived(postsContext.value)
const commands = $state(COMMANDS)

// split commands into their respective groups
const groups = $derived(
  commands.reduce<Record<string, CommandType[]>>((group, command) => {
    ;(group[command.group] = group[command.group] ?? []).push(command)
    return group
  }, {}),
)

// map shortcut keys to commands for performance
const shortcuts = $derived(
  commands.reduce<Record<string, CommandType>>((shortcut, command) => {
    if (command.shortcut) {
      shortcut[command.shortcut.join("")] = command
    }
    return shortcut
  }, {}),
)

const theme = getContext<Flag>("theme")
const opener = getContext<Flag>("opener")
const isOpen = $derived(opener.value)
let lastKey = $state("")

function handleKeydown(e: KeyboardEvent) {
  // always allow escape key
  if (e.key === "Escape" && isOpen) {
    e.preventDefault()
    opener.toggle(false)
    return
  }

  // open command bar on command/ctrl + k
  if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
    e.preventDefault()
    opener.toggle()
  }

  // run shortcut for given key or chord
  if (!isOpen) {
    const chord = `${lastKey}${e.key}`.trim().toUpperCase()
    const command = shortcuts[chord]
    if (command) runCommand(command.id, opener, theme)
  }

  // save the keypress for chords
  lastKey = e.key

  // clear the last key after a timeout
  setTimeout(() => {
    lastKey = ""
  }, 500)
}

// pull post commands on mount
$effect(() => {
  async function initCommands(postList: Post[]) {
    const postCommands = await getPostCommands(postList)
    commands.push(...postCommands)
  }
  initCommands(posts)
})

// add keyboard listener on page mount
$effect(() => {
  if (!browser) return
  document.addEventListener("keydown", handleKeydown)
  return () => {
    document.removeEventListener("keydown", handleKeydown)
  }
})
</script>

{#if opener}
  <!-- see: https://github.com/huntabyte/bits-ui/issues/164 -->
  <Command.Dialog open={isOpen} onOpenChange={opener.toggle}>
    <Command.Input placeholder="Type a command or search..." />
    <Command.List>
      <Command.Empty>No results found.</Command.Empty>

      {#each Object.entries(groups) as [group, groupCommands], index}
        <Command.Group heading={group}>
          {#each groupCommands as command}
            <CommandItem {command} {opener} {theme} />
          {/each}
        </Command.Group>
        {#if index !== Object.entries(groups).length - 1}
          <Command.Separator />
        {/if}
      {/each}
    </Command.List>
  </Command.Dialog>
{/if}
