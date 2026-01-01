const DARK_COLOR = "#181716"
const LIGHT_COLOR = "#ffffff"

/** Apply theme class and update meta theme-color */
export function applyTheme() {
  const isDark = localStorage.theme !== "light"
  document.documentElement.classList.toggle("dark", isDark)
  updateThemeColor(isDark)
}

/** Update the theme-color meta tag */
function updateThemeColor(isDark: boolean) {
  const themeColor = isDark ? DARK_COLOR : LIGHT_COLOR
  let meta = document.querySelector('meta[name="theme-color"]')
  if (!meta) {
    meta = document.createElement("meta")
    meta.setAttribute("name", "theme-color")
    document.head.appendChild(meta)
  }
  meta.setAttribute("content", themeColor)
}

/** Sync toggle switch position with current theme */
export function syncToggleState() {
  const isDark = document.documentElement.classList.contains("dark")
  const thumb = document.getElementById("theme-toggle-thumb")
  const toggle = document.getElementById("theme-toggle")
  if (thumb) thumb.style.transform = isDark ? "translateX(0)" : "translateX(1rem)"
  if (toggle) toggle.setAttribute("aria-checked", (!isDark).toString())
}

/** Initialize theme toggle click handler */
export function initThemeToggle() {
  const toggle = document.getElementById("theme-toggle")
  const thumb = document.getElementById("theme-toggle-thumb")

  if (!(toggle && thumb)) return

  toggle.addEventListener("click", () => {
    const isDark = document.documentElement.classList.contains("dark")
    document.documentElement.classList.add("no-transition")

    if (isDark) {
      document.documentElement.classList.remove("dark")
      localStorage.theme = "light"
      thumb.style.transform = "translateX(1rem)"
    } else {
      document.documentElement.classList.add("dark")
      localStorage.theme = "dark"
      thumb.style.transform = "translateX(0)"
    }

    toggle.setAttribute("aria-checked", isDark.toString())
    updateThemeColor(!isDark)

    requestAnimationFrame(() => {
      document.documentElement.classList.remove("no-transition")
    })
  })
}
