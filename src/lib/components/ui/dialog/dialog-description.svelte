<script lang="ts">
  import { Dialog as DialogPrimitive } from "bits-ui"
  import { cn } from "$lib/utils.js"
  import type { Snippet } from "svelte"

  type Props = {
    class?: string
    children?: Snippet
  }

  let { class: className, children, ...restProps }: Props = $props()
</script>

<DialogPrimitive.Description class={cn("text-sm text-muted-foreground", className)} data-slot="dialog-description" {...restProps}>
  {@render children?.()}
</DialogPrimitive.Description>
