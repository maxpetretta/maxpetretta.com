<script lang="ts">
  import { cn } from "$lib/utils.js"
  import { Command as CommandPrimitive } from "cmdk-sv"
  import type { Snippet } from "svelte"

  type Props = {
    class?: string
    value?: string
    onSelect?: (value: string) => void
    children?: Snippet
  }

  let { class: className, value, onSelect, children, ...restProps }: Props = $props()
</script>

<CommandPrimitive.Item
  class={cn(
    "relative flex cursor-default select-none items-center rounded-xs px-2 py-1.5 text-sm outline-hidden aria-selected:bg-accent aria-selected:text-accent-foreground data-disabled:pointer-events-none data-disabled:opacity-50",
    className,
  )}
  {value}
  {onSelect}
  data-slot="command-item"
  {...restProps}
>
  {@render children?.()}
</CommandPrimitive.Item>
