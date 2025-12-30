<script lang="ts">
  import { cn } from "$lib/utils.js"
  import { Command as CommandPrimitive } from "cmdk-sv"
  import type { Snippet } from "svelte"

  type Props = {
    class?: string
    heading?: string
    children?: Snippet
  }

  let { class: className, heading, children, ...restProps }: Props = $props()
</script>

<CommandPrimitive.Group
  class={cn(
    "overflow-hidden p-2 text-foreground [&_[data-cmdk-group-heading]]:px-2 [&_[data-cmdk-group-heading]]:py-1.5 [&_[data-cmdk-group-heading]]:text-xs [&_[data-cmdk-group-heading]]:font-medium [&_[data-cmdk-group-heading]]:text-muted-foreground",
    className,
  )}
  {heading}
  data-slot="command-group"
  {...restProps}
>
  {@render children?.()}
</CommandPrimitive.Group>
