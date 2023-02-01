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
    url: "https://survey.hyyz.izhai.net",
    title: "问卷系统网站",
    description: "问卷姬",
  },
  {
    url: "https://huabu.hyyz.izhai.net",
    title: "在线画布",
    description: "咖喱棒",
  },
]

const item = (site) => `
<a href="${site.url}" class="card">
  <h2>${site.title} &rarr;</h2>
  <p>徐越的${site.description} ${site.url}</p>
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
