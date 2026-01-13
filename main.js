const pins = [
  // {
  //   url: "https://code.xuyue.cc?query=30",
  //   description: "示例代码",
  // },
]

const sites = [
  {
    url: import.meta.env.VITE_OJ,
    title: "判题狗",
    description: "在线判题网站",
    icon: "noto--dog-face.svg",
  },
  {
    url: import.meta.env.VITE_CODE,
    title: "自测猫",
    description: "代码运行网站",
    icon: "noto--cat-face.svg",
  },
  {
    url: import.meta.env.VITE_WEB,
    title: "哈基米",
    description: "Web 前端开发",
    icon: "noto--honeybee.svg",
  },
  {
    url: import.meta.env.VITE_SHUATI,
    title: "刷题鸭",
    description: "梁老师的刷题网站",
    icon: "noto--paintbrush.svg",
  },
  {
    url: import.meta.env.VITE_BOOK,
    title: "编程书",
    description: "编程和计算机相关知识汇总",
    icon: "noto--bookmark-tabs.svg",
  },
  {
    url: import.meta.env.VITE_HUABU,
    title: "白板",
    description: "在线板书",
    icon: "noto--artist-palette.svg",
  },
  {
    url: import.meta.env.VITE_PPT,
    title: "Python PPT",
    description: "Python 第一学期上课用",
    icon: "material-icon-theme--python.svg",
  },
  {
    url: import.meta.env.VITE_PY,
    title: "Python 项目",
    description: "Python 第二学期上课用",
    icon: "material-icon-theme--folder-python-open.svg",
  },
].filter((i) => !!i.url)

const item = (site) => `
<a href="${site.url}" target="_blank" class="card">
<div class="title-icon">
${site.icon ? `<img src="/icons/${site.icon}" alt="${site.title}" class="icon" />` : ""}
<h2>${site.title} &rarr;</h2>
</div>
<p>${site.description}</p>
<p class="single">${site.url}</p>
</a>
`

const pin = (site) => `
<a href="${site.url}" target="_blank" class="card pin">
  <p>${site.description}</p>
</a>
`

if (pins.length) {
  document.querySelector(".subtitle").innerHTML = "置顶内容"
}

document.querySelector("#sites").innerHTML =
  pins.map(pin).join("") + sites.map(item).join("")

// 主题切换功能
const themeToggle = document.getElementById("themeToggle")
const designThemeButton = document.getElementById("designThemeButton")
const designThemeList = document.getElementById("designThemeList")

const DESIGN_THEMES = ["fluent", "material-you", "terminal", "cyberpunk"]
const FORCED_DARK_DESIGN_THEMES = new Set(["terminal", "cyberpunk"])
const THEME_BEFORE_FORCED_KEY = "themeBeforeForcedDark"

// 获取保存的主题或系统偏好
function getInitialTheme() {
  const savedTheme = localStorage.getItem("theme")
  if (savedTheme) {
    return savedTheme
  }
  // 如果没有保存的主题，使用系统偏好
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light"
}

// 应用主题
function setTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme)
  localStorage.setItem("theme", theme)
  // 图标通过 CSS 自动切换显示
}

// 切换主题
function toggleTheme() {
  const designTheme =
    document.documentElement.getAttribute("data-design-theme") || "fluent"
  if (FORCED_DARK_DESIGN_THEMES.has(designTheme)) return
  const currentTheme =
    document.documentElement.getAttribute("data-theme") || "light"
  const newTheme = currentTheme === "dark" ? "light" : "dark"
  setTheme(newTheme)
}

function getInitialDesignTheme() {
  const savedDesignTheme = localStorage.getItem("designTheme")
  if (savedDesignTheme && DESIGN_THEMES.includes(savedDesignTheme)) {
    return savedDesignTheme
  }
  return "fluent"
}

function setDesignTheme(designTheme) {
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

function getDesignThemeLabel(designTheme) {
  const optionEl = designThemeList?.querySelector(
    `[role="option"][data-value="${designTheme}"]`,
  )
  if (optionEl) return optionEl.textContent?.trim() || "流光"
  const fallback = {
    fluent: "流光",
    "material-you": "Material You",
    terminal: "终端",
    cyberpunk: "Cyberpunk",
  }
  return fallback[designTheme] || "流光"
}

function setSelectedDesignThemeUI(designTheme) {
  if (!designThemeList) return
  const options = [...designThemeList.querySelectorAll('[role="option"]')]
  options.forEach((el) => {
    el.setAttribute(
      "aria-selected",
      el.getAttribute("data-value") === designTheme ? "true" : "false",
    )
  })
  if (designThemeButton) {
    designThemeButton.textContent = getDesignThemeLabel(designTheme)
  }
}

function setDesignThemeMenuOpen(open) {
  if (!designThemeButton || !designThemeList) return
  designThemeButton.setAttribute("aria-expanded", open ? "true" : "false")
  designThemeList.hidden = !open
  if (open) {
    designThemeList.focus()
  }
}

function getCurrentDesignTheme() {
  return document.documentElement.getAttribute("data-design-theme") || "fluent"
}

const titleEl = document.querySelector(".title")
if (titleEl && !titleEl.dataset.text) {
  titleEl.dataset.text = titleEl.textContent?.trim() || ""
}

const subtitleEl = document.querySelector(".subtitle")
if (subtitleEl && !subtitleEl.dataset.text) {
  subtitleEl.dataset.text = subtitleEl.textContent?.trim() || ""
}

// 初始化主题
const initialTheme = getInitialTheme()
setTheme(initialTheme)

const initialDesignTheme = getInitialDesignTheme()
setDesignTheme(initialDesignTheme)
setSelectedDesignThemeUI(initialDesignTheme)
setDesignThemeMenuOpen(false)

if (designThemeButton && designThemeList) {
  designThemeButton.addEventListener("click", () => {
    const isOpen = designThemeButton.getAttribute("aria-expanded") === "true"
    setDesignThemeMenuOpen(!isOpen)
  })

  designThemeList.addEventListener("click", (e) => {
    const option = e.target.closest?.('[role="option"][data-value]')
    if (!option) return
    const value = option.getAttribute("data-value")
    setDesignTheme(value)
    setSelectedDesignThemeUI(value)
    setDesignThemeMenuOpen(false)
  })

  document.addEventListener("click", (e) => {
    if (!designThemeButton || !designThemeList) return
    const clickedInside =
      designThemeButton.contains(e.target) || designThemeList.contains(e.target)
    if (!clickedInside) setDesignThemeMenuOpen(false)
  })

  document.addEventListener("keydown", (e) => {
    const isOpen = designThemeButton.getAttribute("aria-expanded") === "true"
    if (!isOpen) return

    if (e.key === "Escape") {
      e.preventDefault()
      setDesignThemeMenuOpen(false)
      designThemeButton.focus()
      return
    }

    const options = [...designThemeList.querySelectorAll('[role="option"]')]
    if (!options.length) return
    const current = getCurrentDesignTheme()
    const currentIndex = Math.max(
      0,
      options.findIndex((el) => el.getAttribute("data-value") === current),
    )

    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault()
      const delta = e.key === "ArrowDown" ? 1 : -1
      const nextIndex = (currentIndex + delta + options.length) % options.length
      const nextValue = options[nextIndex].getAttribute("data-value")
      setDesignTheme(nextValue)
      setSelectedDesignThemeUI(nextValue)
      return
    }

    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault()
      setDesignThemeMenuOpen(false)
      designThemeButton.focus()
    }
  })
}

// 监听系统主题变化（仅在用户未手动设置时）
window
  .matchMedia("(prefers-color-scheme: dark)")
  .addEventListener("change", (e) => {
    // 如果用户没有手动设置过主题，则跟随系统
    if (!localStorage.getItem("theme")) {
      setTheme(e.matches ? "dark" : "light")
    }
  })

// 绑定点击事件
themeToggle.addEventListener("click", toggleTheme)
