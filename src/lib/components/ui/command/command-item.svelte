<script lang="ts">
import { cn } from "$lib/utils.js"
import { Command as CommandPrimitive } from "cmdk-sv"
import type { Snippet } from "svelte"

type Props = CommandPrimitive.ItemProps & {
  children?: Snippet
}

let { class: className, children, ...restProps }: Props = $props()
</script>

<CommandPrimitive.Item
  class={cn(
    "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-hidden aria-selected:bg-accent aria-selected:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
    className,
  )}
  {...restProps}
>
  {#if children}
    {@render children()}
  {/if}
</CommandPrimitive.Item>
