<script lang="ts">
import type { HTMLAttributes } from "svelte/elements"
import type { Snippet } from "svelte"
import { cn } from "$lib/utils.js"

type Props = HTMLAttributes<HTMLDivElement> & {
  children?: Snippet
}

let { class: className, children, ...restProps }: Props = $props()
</script>

<div class={cn("flex flex-col space-y-1.5 text-center sm:text-left", className)} {...restProps}>
  {#if children}
    {@render children()}
  {/if}
</div>
