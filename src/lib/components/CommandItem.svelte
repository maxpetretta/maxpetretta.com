<script lang="ts">
import type { CommandType } from "$lib/commands"
import { runCommand } from "$lib/commands"
import * as Command from "$lib/components/ui/command"
import type { Flag } from "$lib/stores/flag.svelte"

type CommandItemProps = {
  command: CommandType
  opener: Flag
  theme: Flag
}

const { command, opener, theme }: CommandItemProps = $props()
</script>

<Command.Item onSelect={() => runCommand(command.id, opener, theme)}>
  <span>{command.name}</span>
  {#if command.shortcut}
    <Command.Shortcut>
      {#each command.shortcut as key}
        <div class="ml-1.5 inline-flex h-5 w-5 items-center justify-center rounded-sm bg-secondary">
          <kbd class="indent-[1px] font-sans">{key}</kbd>
        </div>
      {/each}
    </Command.Shortcut>
  {/if}
</Command.Item>
