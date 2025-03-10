import "./style.css"

const pins = [
  {
    url: "https://code.xuyue.cc?query=30",
    description: "示例代码",
  },
  {
    url: "https://lc.xuyue.cc/public-forms/do0zqi0xlpe",
    description: "数据记录单",
  },
  {
    url: "https://lc.xuyue.cc/",
    description: "账号 stu 密码 123456",
  },
  {
    url: "https://play.xuyue.cc/",
    description: "选择自己的名字做小测试",
  },
]

const sites = [
  {
    url: "https://oj.xuyue.cc",
    title: "判题狗",
    description: "在线判题网站",
  },
  {
    url: "https://code.xuyue.cc",
    title: "自测猫",
    description: "代码运行网站",
  },
  {
    url: "https://web.xuyue.cc",
    title: "Web前端",
    description: "Web前端开发预览",
  },
  {
    url: "https://play.xuyue.cc",
    title: "练习册",
    description: "用来练习基本的代码格式",
  },
  {
    url: "https://book.xuyue.cc",
    title: "编程书",
    description: "编程和计算机相关知识汇总",
  },
  {
    url: "https://huabu.xuyue.cc",
    title: "白板",
    description: "在线板书",
  },
  {
    url: "https://ppt.xuyue.cc/py",
    title: "Python PPT",
    description: "Python 第一学期上课用",
  },
  {
    url: "https://python.xuyue.cc",
    title: "Python 项目",
    description: "Python 第二学期上课用",
  },
]

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
  document.querySelector(".subtitle").innerHTML = "置顶：3月11日所需要的内容"
}

document.querySelector("#sites").innerHTML =
  pins.map(pin).join("") + sites.map(item).join("")
