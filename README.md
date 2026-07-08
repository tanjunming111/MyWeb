（更新时间：2026-07-07）

# Jimmy 的个人日记网站

一个基于纯前端技术构建的个人日记网站，部署在 GitHub Pages 上。

## 功能

- **日记浏览** — 按日期查看日记，支持 Markdown 渲染（加粗、斜体、标题、列表、引用、代码块、图片、表格等）
- **菜单导航** — 按月分组展示所有日记，快速跳转到任意日期
- **上一篇 / 下一篇** — 阅读日记时快速切换相邻日期的内容
- **日记编辑** — 新增、编辑、删除日记，编辑/预览实时切换，附带字数统计
- **本地文件同步** — 关联本地 `diary-data.js` 文件后，保存时自动写入磁盘
- **加载动画** — 页面内容渲染完成后一次性呈现，避免文字闪烁

## 页面

| 页面 | 用途 |
|------|------|
| `index.html` | 首页，含欢迎信息和入口按钮 |
| `menu.html` | 按月份展示所有日记 |
| `diary.html?date=YYYY-MM-DD` | 单篇日记阅读页 |
| `edit.html` | 新增/编辑/删除日记 |
| `changelog.html` | 更新日志 |

## 技术栈

- 原生 HTML + CSS + JavaScript（无框架）
- [Marked.js](https://marked.js.org/) — Markdown 渲染
- File System Access API — 本地文件读写
- IndexedDB — 持久化存储文件句柄
- GitHub Pages — 部署托管

## 数据

所有日记数据存储在 `diary-data.js` 的 `defaultDiaryData` 数组中。使用 Git 更新数据后推送到 GitHub 即可同步到线上。

数据格式：

```javascript
{
    date: "2026-07-04",
    paragraphs: [
        "第一段内容。",
        "第二段内容。"
    ]
}
```

## 本地使用

1. 克隆或下载本项目
2. 用浏览器打开 `index.html`
3. 要获得编辑同步功能，在编辑页面点击"关联本地文件"，选择 `diary-data.js`

## 部署

推送到 GitHub 仓库，启用 GitHub Pages 即可。