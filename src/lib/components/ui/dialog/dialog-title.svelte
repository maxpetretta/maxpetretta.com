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

<DialogPrimitive.Title
  class={cn("text-lg font-semibold leading-none tracking-tight", className)}
  data-slot="dialog-title"
  {...restProps}
>
  {@render children?.()}
</DialogPrimitive.Title>
