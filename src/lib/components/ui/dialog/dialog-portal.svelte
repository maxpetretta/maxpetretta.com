<script lang="ts">
  import { Dialog as DialogPrimitive } from "bits-ui"
  import type { Snippet } from "svelte"

  type Props = {
    children?: Snippet
  }

  let { children, ...restProps }: Props = $props()
</script>

<DialogPrimitive.Portal {...restProps}>
  {@render children?.()}
</DialogPrimitive.Portal>
