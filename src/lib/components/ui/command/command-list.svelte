<script lang="ts">
import { cn } from "$lib/utils.js"
import { Command as CommandPrimitive } from "cmdk-sv"
import type { Snippet } from "svelte"

type Props = CommandPrimitive.ListProps & {
  children?: Snippet
}

let { class: className, children, ...restProps }: Props = $props()
</script>

<CommandPrimitive.List class={cn("max-h-[300px] overflow-y-auto overflow-x-hidden", className)} {...restProps}>
  {#if children}
    {@render children()}
  {/if}
</CommandPrimitive.List>
