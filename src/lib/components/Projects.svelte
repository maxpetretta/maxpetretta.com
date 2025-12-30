<script lang="ts">
  import AppWindow from "lucide-svelte/icons/app-window"
  import Keyboard from "lucide-svelte/icons/keyboard"
  import Twitter from "lucide-svelte/icons/twitter"
  import Zap from "lucide-svelte/icons/zap"

  type Project = {
    icon: typeof AppWindow
    name: string
    description: string
    href: string
  }

  const projects: Project[] = [
    {
      icon: AppWindow,
      name: "maxpetretta.com",
      description: "Svelte 5 blog",
      href: "https://github.com/maxpetretta/maxpetretta.com",
    },
    {
      icon: Zap,
      name: "quickcast.xyz",
      description: "Farcaster client",
      href: "https://quickcast.xyz",
    },
    {
      icon: Twitter,
      name: "twitt3r.xyz",
      description: "Twitter on Ethereum",
      href: "https://github.com/maxpetretta/twitt3r.xyz",
    },
    {
      icon: Keyboard,
      name: "keymap",
      description: "ZMK combo keymap",
      href: "https://github.com/maxpetretta/keymap",
    },
  ]
</script>

<ul class="grid grid-cols-1 gap-0.5 sm:grid-cols-2 sm:gap-1.5">
  {#each projects as { icon: Icon, name, description, href }}
    <li
      class="clickable bg-muted first:rounded-t-lg last:rounded-b-lg hover:text-card-foreground hover:brightness-95 dark:hover:brightness-125 sm:rounded-lg"
    >
      <a
        {href}
        target="_blank"
        rel="noreferrer"
        class="relative flex items-center justify-between p-2.5 sm:flex-col sm:items-start sm:px-3.5"
      >
        <div class="flex items-center">
          <Icon class="inline size-4 stroke-2 sm:absolute sm:right-3 sm:top-3 sm:size-[1.375rem]" />
          <span class="ml-2 font-medium sm:ml-0">{name}</span>
        </div>
        <span class="font-mono text-sm text-muted-foreground sm:text-base">{description}</span>
      </a>
    </li>
  {/each}
</ul>
