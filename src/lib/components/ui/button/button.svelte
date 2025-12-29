<script lang="ts">
  import { cn } from "$lib/utils.js"
  import type { Snippet } from "svelte"
  import type { HTMLAnchorAttributes, HTMLButtonAttributes } from "svelte/elements"
  import { buttonVariants, type ButtonSize, type ButtonVariant } from "./index.js"

  type Props = {
    variant?: ButtonVariant
    size?: ButtonSize
    class?: string
    href?: string
    children?: Snippet
  } & HTMLAnchorAttributes &
    HTMLButtonAttributes

  let { class: className, variant = "default", size = "default", href, children, ...restProps }: Props = $props()
</script>

{#if href}
  <a {href} class={cn(buttonVariants(variant, size), className)} {...restProps}>
    {@render children?.()}
  </a>
{:else}
  <button type="button" class={cn(buttonVariants(variant, size), className)} {...restProps}>
    {@render children?.()}
  </button>
{/if}
