<script lang="ts">
import { Dialog as DialogPrimitive } from "bits-ui"
import type { Snippet } from "svelte"
import { cn } from "$lib/utils.js"

type Props = DialogPrimitive.DescriptionProps & {
  children?: Snippet
}

let { class: className, children, ...restProps }: Props = $props()
</script>

<DialogPrimitive.Description class={cn("text-sm text-muted-foreground", className)} {...restProps}>
  {#if children}
    {@render children()}
  {/if}
</DialogPrimitive.Description>
