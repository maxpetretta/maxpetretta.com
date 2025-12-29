<script lang="ts">
import { Dialog as DialogPrimitive } from "bits-ui"
import type { Snippet } from "svelte"
import { cn } from "$lib/utils.js"

type Props = DialogPrimitive.TitleProps & {
  children?: Snippet
}

let { class: className, children, ...restProps }: Props = $props()
</script>

<DialogPrimitive.Title class={cn("text-lg font-semibold leading-none tracking-tight", className)} {...restProps}>
  {#if children}
    {@render children()}
  {/if}
</DialogPrimitive.Title>
