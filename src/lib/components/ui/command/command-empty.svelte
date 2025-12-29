<script lang="ts">
import { Command as CommandPrimitive } from "cmdk-sv"
import { cn } from "$lib/utils.js"
import type { Snippet } from "svelte"

type Props = CommandPrimitive.EmptyProps & {
  children?: Snippet
}

let { class: className, children, ...restProps }: Props = $props()
</script>

<CommandPrimitive.Empty class={cn("py-6 text-center text-sm", className)} {...restProps}>
  {#if children}
    {@render children()}
  {/if}
</CommandPrimitive.Empty>
