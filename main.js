import "./style.css"

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
    url: "https://book.xuyue.cc",
    title: "编程书",
    description: "编程和计算机相关知识汇总",
  },
  {
    url: "https://play.xuyue.cc",
    title: "练习册",
    description: "用来练习基本的代码格式",
  },
  {
    url: "https://lc.xuyue.cc",
    title: "低代码",
    description: "用来生成简单的表单和数据库教学",
  },
  {
    url: "https://python.xuyue.cc",
    title: "Python 基础",
    description: "Python 第二学期上课用",
  },
  {
    url: "https://ppt.xuyue.cc/py",
    title: "Python PPT",
    description: "上课用的 PPT",
  },
  {
    url: "https://huabu.xuyue.cc",
    title: "画布",
    description: "在线板书",
  },
]

const item = (site) => `
<a href="${site.url}" target="_blank" class="card">
  <h2>${site.title} &rarr;</h2>
  <p>${site.description}\n${site.url}</p>
</a>
`

document.querySelector("#sites").innerHTML = sites.map(item).join("")
