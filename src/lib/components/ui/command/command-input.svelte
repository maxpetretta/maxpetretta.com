<script lang="ts">
  import { cn } from "$lib/utils.js"
  import { Command as CommandPrimitive } from "cmdk-sv"
  import Search from "lucide-svelte/icons/search"

  type Props = {
    class?: string
    value?: string
    placeholder?: string
  }

  let { class: className, value = $bindable(""), placeholder, ...restProps }: Props = $props()
</script>

<div class="flex items-center border-b px-2" data-cmdk-input-wrapper="">
  <Search class="mr-2 size-4 shrink-0 opacity-50" />
  <CommandPrimitive.Input
    class={cn(
      "flex h-11 w-full rounded-md bg-transparent py-3 outline-hidden placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",
      className,
    )}
    {placeholder}
    bind:value
    data-slot="command-input"
    {...restProps}
  />
</div>
