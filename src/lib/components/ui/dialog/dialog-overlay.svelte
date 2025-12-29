<script lang="ts">
  import { cn } from "$lib/utils.js"
  import { Dialog as DialogPrimitive } from "bits-ui"
  import type { Snippet } from "svelte"

  type Props = {
    class?: string
    children?: Snippet
  }

  let { class: className, children, ...restProps }: Props = $props()
</script>

<DialogPrimitive.Overlay class={cn("fixed inset-0 z-50 bg-background/80 backdrop-blur-sm", className)} {...restProps}>
  {@render children?.()}
</DialogPrimitive.Overlay>
