import "./style.css"

const sites = [
  {
    url: "https://oj.xuyue.cc",
    title: "在线判题网站",
    description: "判题狗",
  },
  {
    url: "https://code.xuyue.cc",
    title: "代码运行网站",
    description: "自测猫",
  },
  {
    url: "https://ppt.xuyue.cc/py",
    title: "Python PPT",
    description: " Python 课件",
  },
  {
    url: "https://book.xuyue.cc",
    title: "编程知识网站",
    description: "编程书",
  },
  {
    url: "https://play.xuyue.cc",
    title: "格式练习网站",
    description: "练习册",
  },
  {
    url: "https://huabu.hyyz.izhai.net",
    title: "画布",
    description: "在线板书",
  },
]

const item = (site) => `
<a href="${site.url}" target="_blank" class="card">
  <h2>${site.title} &rarr;</h2>
  <p>徐越的${site.description}\n${site.url}</p>
</a>
`

document.querySelector("#sites").innerHTML = sites.map(item).join("")
