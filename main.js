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
const themeToggle = document.getElementById("themeToggle");

// 获取保存的主题或系统偏好
function getInitialTheme() {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme) {
    return savedTheme;
  }
  // 如果没有保存的主题，使用系统偏好
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

// 应用主题
function setTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);
  // 图标通过 CSS 自动切换显示
}

// 切换主题
function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute("data-theme") || "light";
  const newTheme = currentTheme === "dark" ? "light" : "dark";
  setTheme(newTheme);
}

// 初始化主题
const initialTheme = getInitialTheme();
setTheme(initialTheme);

// 监听系统主题变化（仅在用户未手动设置时）
window
  .matchMedia("(prefers-color-scheme: dark)")
  .addEventListener("change", (e) => {
    // 如果用户没有手动设置过主题，则跟随系统
    if (!localStorage.getItem("theme")) {
      setTheme(e.matches ? "dark" : "light");
    }
  });

// 绑定点击事件
themeToggle.addEventListener("click", toggleTheme);
