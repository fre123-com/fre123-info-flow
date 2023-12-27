<p align="center">
  <img src="https://cdn.jsdelivr.net/gh/fre123-com/fre123-info-flow@main/.files/logo.png" width="100" height="100">
</p>
<h1 align="center">Fre123 Info Flow</h1>

> 👀 聚合全网热榜、技术资讯&文章&周刊等信息流，为用户提供一站式的信息获取平台，快速了解行业动态。

简体中文 | [English](./README_EN.md)

在线体验：

- 技术周刊精选：[https://www.fre123.com/weekly](https://www.fre123.com/weekly)
- 全网热点资讯：[https://www.fre123.com/news](https://www.fre123.com/news)
- 技术热点资讯：[https://www.fre123.com/tech](https://www.fre123.com/tech)

## 特性

| ![image](https://cdn.jsdelivr.net/gh/fre123-com/fre123-info-flow@main/.files/news.jpg)        | ![image](https://cdn.jsdelivr.net/gh/fre123-com/fre123-info-flow@main/.files/weekly.jpg)        |
| --------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| ![image](https://cdn.jsdelivr.net/gh/fre123-com/fre123-info-flow@main/.files/news_darker.jpg) | ![image](https://cdn.jsdelivr.net/gh/fre123-com/fre123-info-flow@main/.files/weekly_darker.jpg) |

项目特点：

- 信息全面：聚合全网热榜、技术热榜、技术文章、技术周刊等信息
- 拓展方便：只要后端格式统一，前端可以轻松拓展新的信息源
- 简洁易用： 界面简洁易用，用户可以轻松找到自己感兴趣的信息

## 部署

> 为了防止后端接口被滥用，部署请先通过公众号申请后端访问密钥。

本项目使用 `node v18.16.0` 版本环境 `yarn`作为包管理工具：

```
git clone https://github.com/fre123-com/fre123-info-flow.git

# 安装依赖
cd fre123-info-flow
yarn install

# 环境配置，打开 .env 文件
NUXT_BACKEND_API=https://www.fre123.com/api/
NUXT_APP_ID=fre123.com
NUXT_APP_TOKEN=关注公众号获取 Token

# 启动成功，访问 http://localhost:3000 
yarn dev
```

**推荐一键部署：👇**

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/fre123-com/fre123-info-flow&env=NUXT_APP_ID,NUXT_APP_TOKEN,NUXT_BACKEND_API&project-name=fre123-info-flow&repository-name=fre123-info-flow&demo-title=fre123-info-flow&demo-description=fre123-info-flow&demo-url=https%3A%2F%2Ffre123.com&demo-image=https%3A%2F%2Fgeminiprochat.com%2Ficon.svg)

## QA

> 为什么要做这个项目？

详情见：[FRE123 启动计划](https://mp.weixin.qq.com/s/6El2AW93K4RiEHhma3vVPg)

> 我要如何申请后端部署密钥

关注公众号[老胡的储物柜](https://cdn.jsdelivr.net/gh/fre123-com/fre123-info-flow@main/.files/wechat.jpeg)，和老胡联系申请密钥即可

> 有资源共享群么？

有的，同上联系老胡后拉你进群，本群都是热爱分享的朋友，只想潜水勿进，谢谢

## 说明

欢迎加入我们的交流群，一起交流学习：

- 关注公众号：[老胡的储物柜](https://cdn.jsdelivr.net/gh/fre123-com/fre123-info-flow@main/.files/wechat.jpeg)
- 回复 `加群` 即可加入我们的交流群

该项目由 `FRE123` 团队维护，如果您在使用该项目时遇到任何问题，请随时提交 `issue` 或联系我们。
