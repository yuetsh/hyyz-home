const DESIGN_THEMES = ["fluent", "material-you", "terminal", "cyberpunk"]
const FORCED_DARK_DESIGN_THEMES = new Set(["terminal", "cyberpunk"])
const THEME_BEFORE_FORCED_KEY = "themeBeforeForcedDark"

export function getInitialTheme() {
  const savedTheme = localStorage.getItem("theme")
  if (savedTheme) {
    return savedTheme
  }
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light"
}

export function setTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme)
  localStorage.setItem("theme", theme)
}

export function toggleTheme() {
  const designTheme =
    document.documentElement.getAttribute("data-design-theme") || "fluent"
  if (FORCED_DARK_DESIGN_THEMES.has(designTheme)) return
  const currentTheme =
    document.documentElement.getAttribute("data-theme") || "light"
  const newTheme = currentTheme === "dark" ? "light" : "dark"
  setTheme(newTheme)
}

export function getInitialDesignTheme() {
  const savedDesignTheme = localStorage.getItem("designTheme")
  if (savedDesignTheme && DESIGN_THEMES.includes(savedDesignTheme)) {
    return savedDesignTheme
  }
  return "fluent"
}

export function setDesignTheme(designTheme, themeToggle) {
  const safeDesignTheme = DESIGN_THEMES.includes(designTheme)
    ? designTheme
    : "fluent"
  const previousDesignTheme =
    document.documentElement.getAttribute("data-design-theme") || "fluent"
  document.documentElement.setAttribute("data-design-theme", safeDesignTheme)
  localStorage.setItem("designTheme", safeDesignTheme)

  const willForceDark = FORCED_DARK_DESIGN_THEMES.has(safeDesignTheme)
  const didForceDark = FORCED_DARK_DESIGN_THEMES.has(previousDesignTheme)

  if (willForceDark) {
    if (!didForceDark) {
      const currentTheme =
        document.documentElement.getAttribute("data-theme") || "light"
      localStorage.setItem(THEME_BEFORE_FORCED_KEY, currentTheme)
    }
    setTheme("dark")
  } else if (didForceDark) {
    const restoreTheme =
      localStorage.getItem(THEME_BEFORE_FORCED_KEY) ||
      localStorage.getItem("themeBeforeTerminal")
    if (restoreTheme === "dark" || restoreTheme === "light") {
      setTheme(restoreTheme)
    }
    localStorage.removeItem(THEME_BEFORE_FORCED_KEY)
    localStorage.removeItem("themeBeforeTerminal")
  }

  if (themeToggle) {
    themeToggle.disabled = willForceDark
    themeToggle.setAttribute("aria-disabled", willForceDark ? "true" : "false")
    themeToggle.tabIndex = willForceDark ? -1 : 0
  }
}

export function setSelectedDesignThemeUI({
  designThemeList,
  designThemeButton,
  designTheme,
  getLabel,
}) {
  if (!designThemeList) return
  const options = [...designThemeList.querySelectorAll('[role="option"]')]
  options.forEach((el) => {
    el.setAttribute(
      "aria-selected",
      el.getAttribute("data-value") === designTheme ? "true" : "false",
    )
  })
  if (designThemeButton) {
    designThemeButton.textContent = getLabel(designTheme)
  }
}

export function setDesignThemeMenuOpen({
  designThemeButton,
  designThemeList,
  open,
}) {
  if (!designThemeButton || !designThemeList) return
  designThemeButton.setAttribute("aria-expanded", open ? "true" : "false")
  designThemeList.hidden = !open
  if (open) {
    designThemeList.focus()
  }
}

export function getCurrentDesignTheme() {
  return document.documentElement.getAttribute("data-design-theme") || "fluent"
}

export function updateDesignThemeOptions({
  designThemeList,
  getLabel,
  language,
}) {
  if (!designThemeList) return
  const options = [...designThemeList.querySelectorAll('[role="option"]')]
  options.forEach((el) => {
    const value = el.getAttribute("data-value")
    el.textContent = getLabel(value, language)
  })
}
