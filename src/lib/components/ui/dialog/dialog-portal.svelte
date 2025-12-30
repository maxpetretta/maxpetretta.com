<script lang="ts">
  import { Dialog as DialogPrimitive } from "bits-ui"
  import type { Snippet } from "svelte"

  type Props = {
    children?: Snippet
  }

  let { children }: Props = $props()
</script>

<DialogPrimitive.Portal>
  {@render children?.()}
</DialogPrimitive.Portal>
