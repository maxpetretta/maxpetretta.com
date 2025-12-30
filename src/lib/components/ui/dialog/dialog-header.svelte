<script lang="ts">
  import type { HTMLAttributes } from "svelte/elements"
  import { cn } from "$lib/utils.js"
  import type { Snippet } from "svelte"

  type Props = HTMLAttributes<HTMLDivElement> & {
    class?: string
    children?: Snippet
  }

  let { class: className, children, ...restProps }: Props = $props()
</script>

<div class={cn("flex flex-col space-y-1.5 text-center sm:text-left", className)} data-slot="dialog-header" {...restProps}>
  {@render children?.()}
</div>
