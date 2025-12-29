<script lang="ts">
import { Dialog as DialogPrimitive } from "bits-ui"
import type { Snippet } from "svelte"

type Props = DialogPrimitive.PortalProps & {
  children?: Snippet
}

let { children, ...restProps }: Props = $props()
</script>

<DialogPrimitive.Portal {...restProps}>
  {#if children}
    {@render children()}
  {/if}
</DialogPrimitive.Portal>
