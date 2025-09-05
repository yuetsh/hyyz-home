// 下雨动画：让 public/icons 下的所有图片像下雨一样掉落
const ICONS_PATH = "/icons/"
const IMAGES_PATH = "/images/"
const ICONS = [
  "material-icon-theme--folder-python-open.svg",
  "material-icon-theme--python.svg",
  "noto--artist-palette.svg",
  "noto--bookmark-tabs.svg",
  "noto--cat-face.svg",
  "noto--dog-face.svg",
  "noto--duck.svg",
  "noto--honeybee.svg",
  "noto--paintbrush.svg",
]
const IMAGES = ["1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg"]

function createRainIcon(src, left, delay, speed, size, isImage = false) {
  const img = document.createElement("img")
  img.src = (isImage ? IMAGES_PATH : ICONS_PATH) + src
  img.className = "rain-icon"
  img.style.left = left + "px"
  img.style.width = img.style.height = size + "px"
  img.style.animationDelay = delay + "s"
  img.style.animationDuration = speed + "s"
  img.addEventListener('animationend', () => {
    img.remove();
  });
  document.body.appendChild(img)
}

function startRain() {
  const ww = window.innerWidth
  for (let i = 0; i < 30; i++) {
    // 随机选择 icons 或 images
    const useImage = Math.random() < 0.5
    if (useImage) {
      const imgName = IMAGES[Math.floor(Math.random() * IMAGES.length)]
      const left = Math.random() * (ww - 48)
      const delay = Math.random() * 5
      const speed = 3 + Math.random() * 3
      const size = 48 + Math.random() * 32
      createRainIcon(imgName, left, delay, speed, size, true)
    } else {
      const icon = ICONS[Math.floor(Math.random() * ICONS.length)]
      const left = Math.random() * (ww - 48)
      const delay = Math.random() * 5
      const speed = 3 + Math.random() * 3
      const size = 32 + Math.random() * 32
      createRainIcon(icon, left, delay, speed, size, false)
    }
  }
}

window.addEventListener("DOMContentLoaded", startRain)

// 让动画持续下雨

setInterval(() => {
  startRain()
}, 4000)