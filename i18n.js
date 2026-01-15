export const I18N = {
  "zh-Hans": {
    appTitle: "物联网专业在线学习平台",
    pinnedSubtitle: "置顶内容",
    designThemeLabel: "设计主题",
    themeToggleLabel: "切换主题",
    themeToggleTitle: "切换深色/浅色模式",
    moonAlt: "月亮",
    sunAlt: "太阳",
    languageLabel: "语言",
    beianIcp: "浙ICP备2023044109号",
    beianMps: "浙公网安备33100402331786号",
  },
  "zh-Hant": {
    appTitle: "物聯網專業在線學習平台",
    pinnedSubtitle: "置頂內容",
    designThemeLabel: "設計主題",
    themeToggleLabel: "切換主題",
    themeToggleTitle: "切換深色/淺色模式",
    moonAlt: "月亮",
    sunAlt: "太陽",
    languageLabel: "語言",
    beianIcp: "浙ICP備2023044109號",
    beianMps: "浙公網安備33100402331786號",
  },
  en: {
    appTitle: "IoT Program Online Learning Hub",
    pinnedSubtitle: "Pinned",
    designThemeLabel: "Design theme",
    themeToggleLabel: "Toggle theme",
    themeToggleTitle: "Toggle dark/light mode",
    moonAlt: "Moon",
    sunAlt: "Sun",
    languageLabel: "Language",
    beianIcp: "Zhejiang ICP 2023044109",
    beianMps: "Zhejiang Public Security 33100402331786",
  },
  ja: {
    appTitle: "IoT専攻オンライン学習プラットフォーム",
    pinnedSubtitle: "ピン留め",
    designThemeLabel: "デザインテーマ",
    themeToggleLabel: "テーマ切替",
    themeToggleTitle: "ダーク/ライト切替",
    moonAlt: "月",
    sunAlt: "太陽",
    languageLabel: "言語",
    beianIcp: "浙江ICP 2023044109",
    beianMps: "浙江公安 33100402331786",
  },
  ko: {
    appTitle: "IoT 전공 온라인 학습 플랫폼",
    pinnedSubtitle: "고정",
    designThemeLabel: "디자인 테마",
    themeToggleLabel: "테마 전환",
    themeToggleTitle: "다크/라이트 전환",
    moonAlt: "달",
    sunAlt: "태양",
    languageLabel: "언어",
    beianIcp: "저장 ICP 2023044109",
    beianMps: "저장 공안 33100402331786",
  },
  es: {
    appTitle: "Plataforma de aprendizaje en linea de IoT",
    pinnedSubtitle: "Fijado",
    designThemeLabel: "Tema de diseno",
    themeToggleLabel: "Cambiar tema",
    themeToggleTitle: "Cambiar modo oscuro/claro",
    moonAlt: "Luna",
    sunAlt: "Sol",
    languageLabel: "Idioma",
    beianIcp: "ICP de Zhejiang 2023044109",
    beianMps: "Seguridad publica de Zhejiang 33100402331786",
  },
  meow: {
    appTitle: "喵喵喵喵喵喵喵喵喵喵喵喵",
    pinnedSubtitle: "喵喵喵喵",
    designThemeLabel: "喵喵喵喵",
    themeToggleLabel: "喵喵喵喵",
    themeToggleTitle: "喵喵喵喵喵喵喵喵喵",
    moonAlt: "喵喵",
    sunAlt: "喵喵",
    languageLabel: "喵喵",
    beianIcp: "喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵",
    beianMps: "喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵",
  },
}

export const DESIGN_THEME_LABELS = {
  "zh-Hans": {
    fluent: "Fluent",
    "material-you": "Material You",
    terminal: "终端",
    cyberpunk: "赛博朋克",
  },
  "zh-Hant": {
    fluent: "Fluent",
    "material-you": "Material You",
    terminal: "終端",
    cyberpunk: "賽博龐克",
  },
  en: {
    fluent: "Fluent",
    "material-you": "Material You",
    terminal: "Terminal",
    cyberpunk: "Cyberpunk",
  },
  ja: {
    fluent: "Fluent",
    "material-you": "Material You",
    terminal: "ターミナル",
    cyberpunk: "サイバーパンク",
  },
  ko: {
    fluent: "Fluent",
    "material-you": "Material You",
    terminal: "터미널",
    cyberpunk: "사이버펑크",
  },
  es: {
    fluent: "Fluent",
    "material-you": "Material You",
    terminal: "Terminal",
    cyberpunk: "Cyberpunk",
  },
  meow: {
    fluent: "喵喵",
    "material-you": "喵喵喵",
    terminal: "喵喵",
    cyberpunk: "喵喵喵喵",
  },
}

export const LANGUAGE_NAMES = {
  "zh-Hans": "简体中文",
  "zh-Hant": "繁體中文",
  en: "English",
  ja: "日本語",
  ko: "한국어",
  es: "Espanol",
  meow: "喵喵喵",
}

export const LANGUAGE_KEY = "language"
export const SUPPORTED_LANGUAGES = Object.keys(LANGUAGE_NAMES)

export function getLocalizedText(value, language) {
  if (!value) return ""
  if (typeof value === "object") {
    return (
      value[language] || value["zh-Hans"]
    )
  }
  return value
}

export function getInitialLanguage() {
  const saved = localStorage.getItem(LANGUAGE_KEY)
  if (saved && SUPPORTED_LANGUAGES.includes(saved)) return saved
  const normalized = (navigator.language || "").toLowerCase()
  if (normalized.startsWith("zh")) {
    return normalized.includes("hant") || normalized.includes("tw")
      ? "zh-Hant"
      : "zh-Hans"
  }
  if (normalized.startsWith("ja")) return "ja"
  if (normalized.startsWith("ko")) return "ko"
  if (normalized.startsWith("es")) return "es"
  return "zh-Hans"
}

export function t(key, language) {
  return I18N[language]?.[key] || I18N["zh-Hans"][key] || ""
}

export function getDesignThemeLabel(designTheme, language) {
  const labels = DESIGN_THEME_LABELS[language] || DESIGN_THEME_LABELS["zh-Hans"]
  return labels[designTheme] || labels.fluent
}
