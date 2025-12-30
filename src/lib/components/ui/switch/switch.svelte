<script lang="ts">
  import { cn } from "$lib/utils.js"
  import { Switch as SwitchPrimitive } from "bits-ui"

  type Props = {
    class?: string
    checked?: boolean
    onCheckedChange?: (checked: boolean) => void
  }

  let {
    class: className,
    checked = $bindable(false),
    onCheckedChange,
    ...restProps
  }: Props = $props()
</script>

<SwitchPrimitive.Root
  bind:checked
  {onCheckedChange}
  class={cn(
    "switch peer inline-flex h-[20px] w-[40px] shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input",
    className,
  )}
  data-slot="switch"
  {...restProps}
>
  <SwitchPrimitive.Thumb
    class={cn(
      "switch pointer-events-none block size-[16px] rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0",
    )}
  />
</SwitchPrimitive.Root>
