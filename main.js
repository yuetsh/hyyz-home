import "./style.css"

const pins = [
  // {
  //   url: "https://code.xuyue.cc?query=30",
  //   description: "示例代码",
  // },
  // {
  //   url: "https://lc.xuyue.cc/public-forms/do0zqi0xlpe",
  //   description: "数据记录单",
  // },
  // {
  //   url: "https://lc.xuyue.cc/",
  //   description: "账号 stu 密码 123456",
  // },
  // {
  //   url: "https://play.xuyue.cc/",
  //   description: "选择自己的名字做小测试",
  // },
]

const sites = [
  {
    url: import.meta.env.VITE_OJ,
    title: "判题狗",
    description: "在线判题网站",
  },
  {
    url: import.meta.env.VITE_CODE,
    title: "自测猫",
    description: "代码运行网站",
  },
  {
    url: import.meta.env.VITE_WEB,
    title: "AI x Web",
    description: "AI x Web 新势力",
  },
  {
    url: import.meta.env.VITE_PLAY,
    title: "限时鸭",
    description: "用来练习基本的代码格式",
  },
  {
    url: import.meta.env.VITE_BOOK,
    title: "编程书",
    description: "编程和计算机相关知识汇总",
  },
  {
    url: import.meta.env.VITE_HUABU,
    title: "白板",
    description: "在线板书",
  },
  {
    url: import.meta.env.VITE_PPT,
    title: "Python PPT",
    description: "Python 第一学期上课用",
  },
  {
    url: import.meta.env.VITE_PY,
    title: "Python 项目",
    description: "Python 第二学期上课用",
  },
].filter(i => !!i.url)

const item = (site) => `
<a href="${site.url}" target="_blank" class="card">
  <h2>${site.title} &rarr;</h2>
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
