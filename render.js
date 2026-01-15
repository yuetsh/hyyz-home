import { getLocalizedText } from "./i18n.js"

const renderItem = (site, language) => {
  const title = getLocalizedText(site.title, language)
  const description = getLocalizedText(site.description, language)
  const iconName =
    language === "meow" ? "noto--cat-face.svg" : site.icon
  return `
<a href="${site.url}" target="_blank" class="card">
<div class="title-icon">
${iconName ? `<img src="/icons/${iconName}" alt="${title}" class="icon" />` : ""}
<h2>${title} &rarr;</h2>
</div>
<p>${description}</p>
<p class="single">${site.url}</p>
</a>
`
}

const renderPin = (site, language) => {
  const description = getLocalizedText(site.description, language)
  return `
<a href="${site.url}" target="_blank" class="card pin">
  <p>${description}</p>
</a>
`
}

export function renderSites({ container, sites, pins, language }) {
  if (!container) return
  container.innerHTML =
    pins.map((site) => renderPin(site, language)).join("") +
    sites.map((site) => renderItem(site, language)).join("")
}
