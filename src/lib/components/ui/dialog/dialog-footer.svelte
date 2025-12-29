<script lang="ts">
import type { HTMLAttributes } from "svelte/elements"
import type { Snippet } from "svelte"
import { cn } from "$lib/utils.js"

type Props = HTMLAttributes<HTMLDivElement> & {
  children?: Snippet
}

let { class: className, children, ...restProps }: Props = $props()
</script>

<div class={cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className)} {...restProps}>
  {#if children}
    {@render children()}
  {/if}
</div>
