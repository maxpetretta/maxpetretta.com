<script lang="ts">
import { goto } from "$app/navigation"
import { page } from "$app/stores"
import { sharePageUrl, toggleTheme } from "$lib/commands"
import { Button } from "$lib/components/ui/button"
import { Switch } from "$lib/components/ui/switch"
import type { Flag } from "$lib/stores/flag.svelte"
import { Command } from "lucide-svelte"
import { getContext } from "svelte"

const opener = getContext<Flag>("opener")
const theme = getContext<Flag>("theme")
const isDark = $derived(theme.value)

async function handleNameClick() {
  if ($page.url.pathname === "/") {
    await sharePageUrl($page.url.href)
  } else {
    await goto("/")
  }
}
</script>

<header class="mt-6 md:mt-16">
  <nav class="flex items-center justify-between">
    <Button href="/" onclick={handleNameClick} variant="ghost" class="-ml-3 text-base">
      {#if $page.url.pathname === "/"}
        <h1>Max Petretta</h1>
      {:else}
        Max Petretta
      {/if}
    </Button>

    <div class="flex items-center space-x-5">
      {#if $page.url.pathname !== "/"}
        <Button onclick={() => sharePageUrl($page.url.href)} variant="ghost" title="Share this page"
          >{$page.url.pathname}</Button
        >
      {/if}

      <Switch checked={!isDark} onCheckedChange={() => toggleTheme(theme)} />

      <Button onclick={() => opener.toggle(true)} variant="outline" size="icon" class="transition-none">
        <Command onclick={() => opener.toggle(true)} />
      </Button>
    </div>
  </nav>
</header>
