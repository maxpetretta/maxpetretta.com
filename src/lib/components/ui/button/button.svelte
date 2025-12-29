<script lang="ts">
import { Button as ButtonPrimitive } from "bits-ui"
import { buttonVariants } from "./index.js"
import { cn } from "$lib/utils.js"
import type { Snippet } from "svelte"
import type { VariantProps } from "tailwind-variants"
import type { HTMLAnchorAttributes, HTMLButtonAttributes } from "svelte/elements"

type Variant = VariantProps<typeof buttonVariants>["variant"]
type Size = VariantProps<typeof buttonVariants>["size"]

type Props = (HTMLButtonAttributes | HTMLAnchorAttributes) & {
  variant?: Variant
  size?: Size
  class?: string
  children?: Snippet
  href?: string
}

let { class: className, variant = "default", size = "default", children, ...restProps }: Props = $props()
</script>

<ButtonPrimitive.Root
  class={cn(buttonVariants({ variant, size }), className)}
  type="button"
  {...restProps as Record<string, unknown>}
>
  {#if children}
    {@render children()}
  {/if}
</ButtonPrimitive.Root>
