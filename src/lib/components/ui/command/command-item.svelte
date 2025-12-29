<script lang="ts">
  import { cn } from "$lib/utils.js"
  import { Command as CommandPrimitive } from "cmdk-sv"
  import type { Snippet } from "svelte"

  type Props = {
    value?: string
    onSelect?: () => void
    class?: string
    children?: Snippet
  }

  let { value, onSelect, class: className, children, ...restProps }: Props = $props()
</script>

<CommandPrimitive.Item
  {value}
  {onSelect}
  class={cn(
    "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50",
    className,
  )}
  {...restProps}
>
  {@render children?.()}
</CommandPrimitive.Item>
