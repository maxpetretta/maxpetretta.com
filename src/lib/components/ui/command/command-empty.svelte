<script lang="ts">
  import { Command as CommandPrimitive } from "cmdk-sv"
  import { cn } from "$lib/utils.js"
  import type { Snippet } from "svelte"

  type Props = {
    class?: string
    children?: Snippet
  }

  let { class: className, children, ...restProps }: Props = $props()
</script>

<CommandPrimitive.Empty class={cn("py-6 text-center text-sm", className)} data-slot="command-empty" {...restProps}>
  {@render children?.()}
</CommandPrimitive.Empty>
