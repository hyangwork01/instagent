# InstAgent 网站开发

本仓库仅维护用户选定的 08 Orbital / 轨道研究站网站。

- 回复、维护说明使用中文，专有名词与代码标识符保留英文。
- 保留深靛暖金、光环、完整作者署名、真实 Demo 和五站协作机制。
- 页面结构和样式在 `src/main.jsx`、`src/styles.css`；数据与署名在 `src/results.json`、`src/authors.js`。
- 不虚构实验数字、出版信息或公开研究代码 URL。Code 保留 Coming Soon，直到用户确认发布。
- 不将机器人运行源码、配置、数据或其他仓库的提交历史复制至本仓库。
- 发布资源仅来自 `public/`，构建只输出 `dist/`。相对资源 URL 支持 `/instagent/`。
- 用 `npm ci`、`npm run build`、`npm run check` 验证构建。
- `.github/workflows/pages.yml` 从 `main` 部署 `dist/`。
- 本地截图和验证报告放在 `qa/`，不提交。
