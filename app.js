import { pins, sites } from "./data.js"
import {
  getDesignThemeLabel,
  getInitialLanguage,
  LANGUAGE_KEY,
  LANGUAGE_NAMES,
  SUPPORTED_LANGUAGES,
  t,
} from "./i18n.js"
import { renderSites } from "./render.js"
import {
  getCurrentDesignTheme,
  getInitialDesignTheme,
  getInitialTheme,
  setDesignTheme,
  setDesignThemeMenuOpen,
  setSelectedDesignThemeUI,
  setTheme,
  toggleTheme,
  updateDesignThemeOptions,
} from "./theme.js"

export function initApp() {
  const CAT_ICON = "/icons/noto--cat-face.svg"
  const themeToggle = document.getElementById("themeToggle")
  const designThemeButton = document.getElementById("designThemeButton")
  const designThemeList = document.getElementById("designThemeList")
  const languageButton = document.getElementById("languageButton")
  const languageList = document.getElementById("languageList")
  const titleEl = document.querySelector(".title")
  const designThemeLabelEl = document.querySelector(
    '[data-i18n="designThemeLabel"]',
  )
  const languageLabelEl = document.querySelector('[data-i18n="languageLabel"]')
  const moonIcon = document.querySelector(".theme-icon-moon")
  const sunIcon = document.querySelector(".theme-icon-sun")
  const sitesContainer = document.querySelector("#sites")
  const faviconEl = document.querySelector('link[rel~="icon"]')
  const beianIcpEl = document.querySelector('[data-i18n="beianIcp"]')
  const beianMpsEl = document.querySelector('[data-i18n="beianMps"]')

  let currentLanguage = getInitialLanguage()

  const getThemeLabel = (designTheme, language = currentLanguage) =>
    getDesignThemeLabel(designTheme, language)

  function setSelectedLanguageUI(language) {
    if (!languageList) return
    const options = [...languageList.querySelectorAll('[role="option"]')]
    options.forEach((el) => {
      const value = el.getAttribute("data-value")
      const label = LANGUAGE_NAMES[value] || value || ""
      el.setAttribute("aria-selected", value === language ? "true" : "false")
      el.textContent = label
    })
    if (languageButton) {
      languageButton.textContent = LANGUAGE_NAMES[language] || language
    }
  }

  function setLanguageMenuOpen(open) {
    if (!languageButton || !languageList) return
    languageButton.setAttribute("aria-expanded", open ? "true" : "false")
    languageList.hidden = !open
    if (open) {
      languageList.focus()
    }
  }

  function setTitleText(titleText) {
    if (!titleEl) return
    const cursorEl = titleEl.querySelector(".title-cursor")
    if (cursorEl) {
      let textNode = [...titleEl.childNodes].find(
        (node) => node.nodeType === Node.TEXT_NODE && node.nodeValue?.trim(),
      )
      if (!textNode) {
        textNode = document.createTextNode(titleText)
        titleEl.insertBefore(textNode, cursorEl)
      } else {
        textNode.nodeValue = titleText
      }
    } else {
      titleEl.textContent = titleText
    }
    titleEl.dataset.text = titleText
  }

  function getDocumentLang(language) {
    if (language === "zh-Hant") return "zh-Hant"
    if (language === "zh-Hans") return "zh-Hans"
    if (language === "wenyan") return "zh-Hans"
    if (language === "mars") return "zh-Hans"
    if (language === "ja") return "ja"
    if (language === "ko") return "ko"
    return "en"
  }

  function setSwappableIcon(element, language) {
    if (!element) return
    if (!element.dataset.defaultSrc) {
      element.dataset.defaultSrc = element.getAttribute("src") || ""
    }
    element.setAttribute(
      "src",
      language === "meow" ? CAT_ICON : element.dataset.defaultSrc,
    )
  }

  function setFavicon(language) {
    if (!faviconEl) return
    if (!faviconEl.dataset.defaultHref) {
      faviconEl.dataset.defaultHref = faviconEl.getAttribute("href") || ""
    }
    faviconEl.setAttribute(
      "href",
      language === "meow" ? CAT_ICON : faviconEl.dataset.defaultHref,
    )
  }

  function applyTranslations() {
    const language = currentLanguage
    document.documentElement.setAttribute("lang", getDocumentLang(language))
    document.title = t("appTitle", language)
    if (titleEl) {
      const titleText = t("appTitle", language)
      setTitleText(titleText)
    }
    if (designThemeLabelEl) {
      designThemeLabelEl.textContent = t("designThemeLabel", language)
    }
    if (languageLabelEl) {
      languageLabelEl.textContent = t("languageLabel", language)
    }
    if (beianIcpEl) {
      beianIcpEl.textContent = t("beianIcp", language)
    }
    if (beianMpsEl) {
      beianMpsEl.textContent = t("beianMps", language)
    }
    if (designThemeButton) {
      designThemeButton.setAttribute(
        "aria-label",
        t("designThemeLabel", language),
      )
    }
    if (languageButton) {
      languageButton.setAttribute("aria-label", t("languageLabel", language))
    }
    if (themeToggle) {
      themeToggle.setAttribute("aria-label", t("themeToggleLabel", language))
      themeToggle.setAttribute("title", t("themeToggleTitle", language))
    }
    if (moonIcon) {
      moonIcon.setAttribute("alt", t("moonAlt", language))
    }
    if (sunIcon) {
      sunIcon.setAttribute("alt", t("sunAlt", language))
    }
    setSwappableIcon(moonIcon, language)
    setSwappableIcon(sunIcon, language)
    setFavicon(language)
    updateDesignThemeOptions({
      designThemeList,
      getLabel: getThemeLabel,
      language,
    })
    setSelectedDesignThemeUI({
      designThemeList,
      designThemeButton,
      designTheme: getCurrentDesignTheme(),
      getLabel: getThemeLabel,
    })
    setSelectedLanguageUI(language)
    renderSites({ container: sitesContainer, sites, pins, language })
  }

  function setLanguage(language) {
    const safeLanguage = SUPPORTED_LANGUAGES.includes(language)
      ? language
      : "zh-Hans"
    currentLanguage = safeLanguage
    localStorage.setItem(LANGUAGE_KEY, safeLanguage)
    applyTranslations()
  }

  if (titleEl && !titleEl.dataset.text) {
    titleEl.dataset.text = titleEl.textContent?.trim() || ""
  }


  const initialTheme = getInitialTheme()
  setTheme(initialTheme)

  const initialDesignTheme = getInitialDesignTheme()
  setDesignTheme(initialDesignTheme, themeToggle)
  setSelectedDesignThemeUI({
    designThemeList,
    designThemeButton,
    designTheme: initialDesignTheme,
    getLabel: getThemeLabel,
  })
  setDesignThemeMenuOpen({
    designThemeButton,
    designThemeList,
    open: false,
  })
  setLanguage(currentLanguage)

  if (designThemeButton && designThemeList) {
    designThemeButton.addEventListener("click", () => {
      const isOpen = designThemeButton.getAttribute("aria-expanded") === "true"
      setDesignThemeMenuOpen({
        designThemeButton,
        designThemeList,
        open: !isOpen,
      })
    })

    designThemeList.addEventListener("click", (e) => {
      const option = e.target.closest?.('[role="option"][data-value]')
      if (!option) return
      const value = option.getAttribute("data-value")
      setDesignTheme(value, themeToggle)
      setSelectedDesignThemeUI({
        designThemeList,
        designThemeButton,
        designTheme: value,
        getLabel: getThemeLabel,
      })
      setDesignThemeMenuOpen({
        designThemeButton,
        designThemeList,
        open: false,
      })
    })

    document.addEventListener("click", (e) => {
      if (!designThemeButton || !designThemeList) return
      const clickedInside =
        designThemeButton.contains(e.target) ||
        designThemeList.contains(e.target)
      if (!clickedInside) {
        setDesignThemeMenuOpen({
          designThemeButton,
          designThemeList,
          open: false,
        })
      }
    })

    document.addEventListener("keydown", (e) => {
      const isOpen = designThemeButton.getAttribute("aria-expanded") === "true"
      if (!isOpen) return

      if (e.key === "Escape") {
        e.preventDefault()
        setDesignThemeMenuOpen({
          designThemeButton,
          designThemeList,
          open: false,
        })
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
        const nextIndex =
          (currentIndex + delta + options.length) % options.length
        const nextValue = options[nextIndex].getAttribute("data-value")
        setDesignTheme(nextValue, themeToggle)
        setSelectedDesignThemeUI({
          designThemeList,
          designThemeButton,
          designTheme: nextValue,
          getLabel: getThemeLabel,
        })
        return
      }

      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault()
        setDesignThemeMenuOpen({
          designThemeButton,
          designThemeList,
          open: false,
        })
        designThemeButton.focus()
      }
    })
  }

  if (languageButton && languageList) {
    languageButton.addEventListener("click", () => {
      const isOpen = languageButton.getAttribute("aria-expanded") === "true"
      setLanguageMenuOpen(!isOpen)
    })

    languageList.addEventListener("click", (e) => {
      const option = e.target.closest?.('[role="option"][data-value]')
      if (!option) return
      const value = option.getAttribute("data-value")
      setLanguage(value)
      setLanguageMenuOpen(false)
    })

    document.addEventListener("click", (e) => {
      if (!languageButton || !languageList) return
      const clickedInside =
        languageButton.contains(e.target) || languageList.contains(e.target)
      if (!clickedInside) setLanguageMenuOpen(false)
    })

    document.addEventListener("keydown", (e) => {
      const isOpen = languageButton.getAttribute("aria-expanded") === "true"
      if (!isOpen) return

      if (e.key === "Escape") {
        e.preventDefault()
        setLanguageMenuOpen(false)
        languageButton.focus()
        return
      }

      const options = [...languageList.querySelectorAll('[role="option"]')]
      if (!options.length) return
      const currentIndex = Math.max(
        0,
        options.findIndex(
          (el) => el.getAttribute("data-value") === currentLanguage,
        ),
      )

      if (e.key === "ArrowDown" || e.key === "ArrowUp") {
        e.preventDefault()
        const delta = e.key === "ArrowDown" ? 1 : -1
        const nextIndex =
          (currentIndex + delta + options.length) % options.length
        const nextValue = options[nextIndex].getAttribute("data-value")
        setLanguage(nextValue)
        return
      }

      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault()
        setLanguageMenuOpen(false)
        languageButton.focus()
      }
    })
  }

  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", (e) => {
      if (!localStorage.getItem("theme")) {
        setTheme(e.matches ? "dark" : "light")
      }
    })

  if (themeToggle) {
    themeToggle.addEventListener("click", toggleTheme)
  }
}
