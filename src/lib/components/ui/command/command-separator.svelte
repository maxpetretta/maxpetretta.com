<script lang="ts">
  import { cn } from "$lib/utils.js"
  import { Command as CommandPrimitive } from "cmdk-sv"

  type Props = {
    class?: string
  }

  let { class: className, ...restProps }: Props = $props()
</script>

<CommandPrimitive.Separator class={cn("-mx-1 h-px bg-border", className)} {...restProps} />
