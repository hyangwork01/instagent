# InstAgent — Project Website

InstAgent: A Recursively Self-Improving Agent Operating System for Heterogeneous Robot Collaboration

论文项目网站，采用 Orbital 视觉方案。包含作者与机构信息、真实机器人 Demo、协作机制、系统架构、实验结果和 BibTeX。

网站地址：<https://hyangwork01.github.io/instagent/>

本仓库提供网站前端和公开展示素材。研究项目代码尚未发布，页面 Code 入口保留 Coming Soon。

## 本地运行

使用 Node.js 24，在本仓库目录中执行：

```sh
npm ci
npm run build
npm run check
npm run preview
```

本地预览：<http://127.0.0.1:4174/instagent/>。

## 内容维护

| 内容 | 文件 |
| --- | --- |
| 页面结构及机制叙事 | `src/main.jsx` |
| 视觉与响应式 | `src/styles.css` |
| 作者、单位与 BibTeX | `src/authors.js` |
| 展示组件和资源入口 | `src/components.jsx` |
| 实验数据 | `src/results.json` |
| PDF、视频、字幕、Logo、架构图 | `public/assets/` |
| 自动部署 | `.github/workflows/pages.yml` |

## 发布

推送到 `main` 后，GitHub Actions 安装锁定依赖、构建和检查，并将 `dist/` 部署至 GitHub Pages。也可手动运行 `Build and deploy InstAgent`。Pages Source 使用 GitHub Actions。

页面资源采用相对 URL，支持 `/instagent/` 项目路径。Actions 根据当前仓库自动生成 canonical、Open Graph、robots 和 sitemap；自定义域名可设置仓库变量 `SITE_URL`。

组件与字体许可证见 `licenses/`。论文、视频和机构标志未附加新的开放许可。
