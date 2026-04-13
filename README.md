# 保持思考

一个很轻的 Astro Markdown 博客。

## 写文章

把新的 Markdown 文件放进 `src/content/posts/`，并使用下面的 frontmatter：

```md
---
title: 文章标题
date: 2026-04-13
description: 首页和归档中使用的文章摘要
tags:
  - 随笔
draft: false
---
```

把 `draft` 改成 `true` 后，文章不会出现在正式构建的列表和详情页里。

## 本地运行

```sh
npm install
npm run dev
```

## 构建

```sh
npm run build
npm run preview
```

GitHub Pages 工作流已经放在 `.github/workflows/deploy.yml`。当前配置适合 `username.github.io` 这种用户主页仓库，不需要设置 Astro 的 `base`。
