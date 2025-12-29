<script lang="ts">
  import { cn } from "$lib/utils.js"
  import type { Snippet } from "svelte"

  type Props = {
    class?: string
    children?: Snippet
  }

  let { class: className, children, ...restProps }: Props = $props()
</script>

<span class={cn("ml-auto text-xs tracking-widest text-muted-foreground", className)} {...restProps}>
  {@render children?.()}
</span>
