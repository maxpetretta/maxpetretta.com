<script lang="ts">
import type { HTMLAttributes } from "svelte/elements"
import type { Snippet } from "svelte"
import { cn } from "$lib/utils.js"

type Props = HTMLAttributes<HTMLSpanElement> & {
  children?: Snippet
}

let { class: className, children, ...restProps }: Props = $props()
</script>

<span class={cn("ml-auto text-xs tracking-widest text-muted-foreground", className)} {...restProps}>
  {#if children}
    {@render children()}
  {/if}
</span>
