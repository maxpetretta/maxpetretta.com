<script lang="ts">
  import { browser } from "$app/environment"

  let progress = $state(0)

  function updateProgress() {
    const scrollTop = window.scrollY
    const docHeight = document.documentElement.scrollHeight - window.innerHeight
    progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0
  }

  $effect(() => {
    if (!browser) return
    window.addEventListener("scroll", updateProgress, { passive: true })
    updateProgress()
    return () => window.removeEventListener("scroll", updateProgress)
  })
</script>

<div
  class="fixed left-0 top-0 z-50 h-0.5 bg-foreground transition-[width] duration-100 ease-out"
  style="width: {progress}%"
  role="progressbar"
  aria-valuenow={Math.round(progress)}
  aria-valuemin={0}
  aria-valuemax={100}
  aria-label="Reading progress"
></div>
