import { THEME_COLORS } from "@/lib/constants"

/** Apply theme class and update meta theme-color */
function applyTheme() {
  const isDark = localStorage.theme !== "light"
  document.documentElement.classList.toggle("dark", isDark)
  updateThemeColor(isDark)
}

/** Update the theme-color meta tag */
function updateThemeColor(isDark: boolean) {
  const themeColor = isDark ? THEME_COLORS.dark : THEME_COLORS.light
  let meta = document.querySelector('meta[name="theme-color"]')
  if (!meta) {
    meta = document.createElement("meta")
    meta.setAttribute("name", "theme-color")
    document.head.appendChild(meta)
  }
  meta.setAttribute("content", themeColor)
}

/** Sync toggle switch position with current theme */
function syncToggleState() {
  const isDark = document.documentElement.classList.contains("dark")
  const thumb = document.getElementById("theme-toggle-thumb")
  const toggle = document.getElementById("theme-toggle")
  if (thumb) thumb.style.transform = isDark ? "translateX(0)" : "translateX(1rem)"
  if (toggle) toggle.setAttribute("aria-checked", isDark.toString())
}

/** Initialize all theme functionality */
export function initTheme() {
  applyTheme()
  syncToggleState()
  initThemeToggle()
}

/** Initialize theme toggle click handler */
function initThemeToggle() {
  const toggle = document.getElementById("theme-toggle")
  const thumb = document.getElementById("theme-toggle-thumb")

  if (!(toggle && thumb)) return
  if (toggle.dataset.themeToggleBound === "true") return
  toggle.dataset.themeToggleBound = "true"

  toggle.addEventListener("click", () => {
    const isDark = document.documentElement.classList.contains("dark")
    document.documentElement.classList.add("no-transition")

    const nextIsDark = !isDark
    if (nextIsDark) {
      document.documentElement.classList.add("dark")
      localStorage.theme = "dark"
      thumb.style.transform = "translateX(0)"
    } else {
      document.documentElement.classList.remove("dark")
      localStorage.theme = "light"
      thumb.style.transform = "translateX(1rem)"
    }

    toggle.setAttribute("aria-checked", nextIsDark.toString())
    updateThemeColor(nextIsDark)

    requestAnimationFrame(() => {
      document.documentElement.classList.remove("no-transition")
    })
  })
}
