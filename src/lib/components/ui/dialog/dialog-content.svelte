<script lang="ts">
  import { cn } from "$lib/utils.js"
  import { Dialog as DialogPrimitive } from "bits-ui"
  import X from "lucide-svelte/icons/x"
  import * as Dialog from "./index.js"
  import type { Snippet } from "svelte"

  type Props = {
    class?: string
    children?: Snippet
  }

  let { class: className, children, ...restProps }: Props = $props()
</script>

<Dialog.Portal>
  <Dialog.Overlay />
  <DialogPrimitive.Content
    class={cn(
      "fixed left-[50%] top-[25vh] z-50 grid w-[94%] max-w-lg translate-x-[-50%] items-start gap-4 rounded-lg border border-border bg-background p-6 shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 md:w-full",
      className,
    )}
    data-slot="dialog-content"
    {...restProps}
  >
    {@render children?.()}
    <DialogPrimitive.Close
      class="absolute right-4 top-4 rounded-xs opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-hidden focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
    >
      <X class="size-4" />
      <span class="sr-only">Close</span>
    </DialogPrimitive.Close>
  </DialogPrimitive.Content>
</Dialog.Portal>
