import "./style.css"

const sites = [
  {
    url: "https://oj.hyyz.izhai.net",
    title: "在线判题网站",
    description: "判题狗",
  },
  {
    url: "https://code.hyyz.izhai.net",
    title: "代码运行网站",
    description: "自测猫",
  },
  {
    url: "https://book.hyyz.izhai.net",
    title: "编程知识网站",
    description: "编程书",
  },
  {
    url: "https://play.hyyz.izhai.net",
    title: "格式练习网站",
    description: "练习册",
  },
  {
    url: "https://ppt.hyyz.izhai.net/py",
    title: "Python PPT",
    description: "Python课件",
  },
  {
    url: "https://huabu.hyyz.izhai.net",
    title: "画布",
    description: "在线板书",
  },
]

const item = (site) => `
<a href="${site.url}" class="card">
  <h2>${site.title} &rarr;</h2>
  <p>徐越的${site.description}\n${site.url}</p>
</a>
`

document.querySelector("#app").innerHTML = `
<div class="container">
  <main class="main">
    <h1 class="title">你是不是要找以下网站？</h1>
    <div class="grid" id="sites"></div>
  </main>
</div>
`

document.querySelector("#sites").innerHTML = sites.map(item).join("")
