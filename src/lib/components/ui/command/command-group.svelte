<script lang="ts">
  import { cn } from "$lib/utils.js"
  import { Command as CommandPrimitive } from "cmdk-sv"
  import type { Snippet } from "svelte"

  type Props = {
    heading?: string
    class?: string
    children?: Snippet
  }

  let { heading, class: className, children, ...restProps }: Props = $props()
</script>

<CommandPrimitive.Group
  {heading}
  class={cn(
    "overflow-hidden p-2 text-foreground [&_[data-cmdk-group-heading]]:px-2 [&_[data-cmdk-group-heading]]:py-1.5 [&_[data-cmdk-group-heading]]:text-xs [&_[data-cmdk-group-heading]]:font-medium [&_[data-cmdk-group-heading]]:text-muted-foreground",
    className,
  )}
  {...restProps}
>
  {@render children?.()}
</CommandPrimitive.Group>
