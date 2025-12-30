<script lang="ts">
  import type { HTMLAttributes } from "svelte/elements"
  import { cn } from "$lib/utils.js"
  import type { Snippet } from "svelte"

  type Props = HTMLAttributes<HTMLSpanElement> & {
    class?: string
    children?: Snippet
  }

  let { class: className, children, ...restProps }: Props = $props()
</script>

<span class={cn("ml-auto text-xs tracking-widest text-muted-foreground", className)} data-slot="command-shortcut" {...restProps}>
  {@render children?.()}
</span>
