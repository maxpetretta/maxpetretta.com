<script lang="ts">
  import Command from "./command.svelte"
  import * as Dialog from "$lib/components/ui/dialog/index.js"
  import type { Snippet } from "svelte"

  type Props = {
    open?: boolean
    onOpenChange?: (open: boolean) => void
    value?: string
    children?: Snippet
  }

  let { open = $bindable(false), onOpenChange, value = $bindable(""), children, ...restProps }: Props = $props()
</script>

<Dialog.Root bind:open {onOpenChange} {...restProps}>
  <Dialog.Content class="overflow-hidden p-0 shadow-lg">
    <Command
      class="[&_[data-cmdk-group-heading]]:px-2 [&_[data-cmdk-group-heading]]:font-medium [&_[data-cmdk-group-heading]]:text-muted-foreground [&_[data-cmdk-group]:not([hidden])_~[data-cmdk-group]]:pt-0 [&_[data-cmdk-group]]:px-2 [&_[data-cmdk-input-wrapper]_svg]:size-5 [&_[data-cmdk-input]]:h-12 [&_[data-cmdk-item]]:px-2 [&_[data-cmdk-item]]:py-3 [&_[data-cmdk-item]_svg]:size-5"
      bind:value
    >
      {@render children?.()}
    </Command>
  </Dialog.Content>
</Dialog.Root>
