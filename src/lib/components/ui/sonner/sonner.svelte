<script lang="ts">
  import { cn } from "$lib/utils.js"
  import { Toaster as Sonner, type ToasterProps as SonnerProps } from "svelte-sonner"
  import { mode } from "mode-watcher"

  const { class: className, ...restProps } = $props() as SonnerProps
  const theme = $derived(mode.current === "dark" ? "dark" : "light")
</script>

<Sonner
  theme={theme}
  class={cn("toaster group", className)}
  toastOptions={{
    classes: {
      toast:
        "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
      description: "group-[.toast]:text-muted-foreground",
      actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
      cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
    },
  }}
  {...restProps}
/>
