<script lang="ts">
  import { cn } from "$lib/utils.js"
  import { Command as CommandPrimitive } from "cmdk-sv"
  import type { Snippet } from "svelte"

  type Props = {
    class?: string
    value?: string
    children?: Snippet
  }

  let { class: className, value = $bindable(""), children, ...restProps }: Props = $props()
</script>

<CommandPrimitive.Root
  class={cn("flex h-full w-full flex-col overflow-hidden rounded-md bg-popover text-popover-foreground", className)}
  bind:value
  data-slot="command"
  {...restProps}
>
  {@render children?.()}
</CommandPrimitive.Root>
