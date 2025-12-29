<script lang="ts">
  import { browser } from "$app/environment"
  import { COMMANDS, getPostCommands, runCommand, type CommandType } from "$lib/commands"
  import CommandItem from "$lib/components/CommandItem.svelte"
  import * as Command from "$lib/components/ui/command"
  import type { Flag } from "$lib/stores/flag.svelte"
  import type { Post } from "$lib/utils"
  import { getContext } from "svelte"

  const posts = getContext<Post[]>("posts")
  const commands = $state([...COMMANDS])

  const groups = $derived(
    commands.reduce<Record<string, CommandType[]>>((group, command) => {
      const g = group[command.group] ?? []
      g.push(command)
      group[command.group] = g
      return group
    }, {}),
  )

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
    if (e.key === "Escape" && isOpen) {
      e.preventDefault()
      opener.toggle(false)
      return
    }

    if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
      e.preventDefault()
      opener.toggle()
    }

    if (!isOpen) {
      const chord = `${lastKey}${e.key}`.trim().toUpperCase()
      const command = shortcuts[chord]
      if (command) runCommand(command.id, opener, theme)
    }

    lastKey = e.key

    setTimeout(() => {
      lastKey = ""
    }, 500)
  }

  $effect(() => {
    async function initCommands(postList: Post[]) {
      const postCommands = await getPostCommands(postList)
      commands.push(...postCommands)
    }
    initCommands(posts)
  })

  $effect(() => {
    if (!browser) return
    document.addEventListener("keydown", handleKeydown)
    return () => {
      document.removeEventListener("keydown", handleKeydown)
    }
  })
</script>

{#if opener}
  <Command.Dialog open={isOpen} onOpenChange={opener.toggle}>
    <Command.Input placeholder="Type a command or search..." />
    <Command.List>
      <Command.Empty>No results found.</Command.Empty>

      {#each Object.entries(groups) as [group, cmds], index}
        <Command.Group heading={group}>
          {#each cmds as command}
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
