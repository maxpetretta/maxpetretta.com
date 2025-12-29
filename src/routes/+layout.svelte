<script lang="ts">
import "$/app.css"
import { browser } from "$app/environment"

import CommandMenu from "$lib/components/CommandMenu.svelte"
import Footer from "$lib/components/Footer.svelte"
import Header from "$lib/components/Header.svelte"
import { createFlag } from "$lib/stores/flag.svelte"
import { setContext } from "svelte"
import { Toaster } from "svelte-sonner"

const { data, children } = $props()

// Pass posts as a getter to avoid capturing stale value
setContext("posts", {
  get value() {
    return data.posts
  },
})

const opener = createFlag()
setContext("opener", opener)

const theme = createFlag(browser && document.documentElement.classList.contains("dark"))
setContext("theme", theme)

const themeName = $derived(theme.value ? "dark" : "light")
const themeColor = $derived(theme.value ? "#09090b" : "#ffffff")

$effect(() => {
  const themeColorMetaTag = document.querySelector('meta[name="theme-color"]') as HTMLMetaElement | null
  if (themeColorMetaTag) themeColorMetaTag.content = themeColor
})
</script>

<div class="mx-auto flex min-h-screen max-w-2xl flex-col px-5 md:px-0">
  <Header />

  <main class="grow">
    {@render children()}
  </main>

  <Footer />

  <CommandMenu />
  <Toaster theme={themeName} />
</div>
