<script lang="ts">
  import { cn } from "$lib/utils.js"
  import { buttonVariants, type Variant, type Size } from "./index.js"
  import type { Snippet } from "svelte"
  import type { HTMLAnchorAttributes, HTMLButtonAttributes } from "svelte/elements"

  type Props = {
    variant?: Variant
    size?: Size
    class?: string
    children?: Snippet
    href?: string
  } & (HTMLButtonAttributes | HTMLAnchorAttributes)

  let {
    class: className,
    variant = "default",
    size = "default",
    href,
    children,
    ...restProps
  }: Props = $props()
</script>

{#if href}
  <a
    {href}
    class={cn(buttonVariants({ variant, size, className }))}
    data-slot="button"
    {...restProps as HTMLAnchorAttributes}
  >
    {@render children?.()}
  </a>
{:else}
  <button
    class={cn(buttonVariants({ variant, size, className }))}
    type="button"
    data-slot="button"
    {...restProps as HTMLButtonAttributes}
  >
    {@render children?.()}
  </button>
{/if}
