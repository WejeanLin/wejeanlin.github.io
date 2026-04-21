# 🌿 Wejean Lin | 个人作品集

<p align="center"><a href="./README.md">English</a></p>

<div align="center">

[Live Demo](https://wejeanlin.github.io)

</div>

<p align="center">
  <img src="image-light.png" width="48%" style="vertical-align: middle;">
  <img src="image-dark.png" width="48%" style="vertical-align: middle;">
</p>

一个使用纯 **HTML5 + CSS3 + Vanilla JavaScript** 构建的极简主义响应式静态个人展示页。采用低饱和度莫兰迪色系、大量留白设计与精致微动效，零构建工具，直接托管于 GitHub Pages。

## ✨ 核心特性
- 🎨 **莫兰迪色彩系统**：暖白浅色系 / 深灰蓝夜间模式，通过 CSS 变量实现平滑过渡
- 🌗 **对角线主题扫光**：基于 `clip-path` 的 GPU 加速动画，从切换按钮位置发散展开
- ✨ **精致微交互**：自然挥手 Emoji、阶梯式入场动画、从中心向两侧展开的下划线
- 📱 **全端响应式**：流体字号（`clamp()`）、自适应网格/弹性布局、触摸友好目标（≥44px）
- 📋 **智能剪贴板**：一键复制邮箱，带动画 Toast 提示与自动消失的进度条
- ♿ **无障碍优先**：语义化 HTML、支持 `prefers-reduced-motion`、WCAG AA 对比度标准、键盘导航友好

## 🛠️ 技术栈
| 层级 | 技术实现 |
|------|----------|
| 结构 | 语义化 HTML5 |
| 样式 | CSS3（自定义变量、Grid、Flexbox、`@keyframes`、`clip-path`） |
| 逻辑 | 原生 JavaScript（ES6+、`navigator.clipboard`、requestAnimationFrame） |
| 字体 | `Cormorant Garamond`（标题）+ `Inter`（正文），通过 Google Fonts 加载 |
| 部署 | GitHub Pages（静态托管） |

## 🚀 快速开始
1. **克隆或下载** 本仓库
2. 将你的头像添加至 `assets/avatar.jpg`（建议 1:1 比例，约 400×400 像素）
3. 在浏览器中直接打开 `index.html`，或使用本地服务预览：
   ```bash
   python3 -m http.server 8000
   ```
4. **部署到 GitHub Pages**：推送到 `main` 分支 → 仓库 Settings → Pages → 选择 `/ (root)` → 保存。

## 📁 项目结构
```
/
├── index.html          # 语义化结构与内容
├── style.css           # 莫兰迪主题系统、响应式布局、动画定义
├── script.js           # 主题切换、剪贴板、Toast 逻辑
└── assets/
    └── avatar.jpg      # 头像占位图
```

## 📝 自定义指南
- **颜色**：修改 `:root` 与 `[data-theme="dark"]` 中的 CSS 变量
- **字体**：调整 `style.css` 中的 `--font-title`、`--font-body` 及 `clamp()` 参数
- **动画**：修改 `--duration-*` 变量或 `@keyframes` 定义，自定义入场/挥手/Toast 效果
- **内容**：直接在 `index.html` 中编辑文本（全站内容为英文，可按需替换）

## 📄 开源许可
本项目开放用于个人学习与教育用途。欢迎 Fork、改编与二次创作。  
*如果您使用了本模板，一个 ⭐ 星标或注明出处将是莫大的鼓励，但并非强制要求。*

---
💌 **联系**：[wejeanlin@outlook.com](mailto:wejeanlin@outlook.com) | [我的 GitHub](https://github.com/WejeanLin)  
🌐 **在线预览**：`https://wejeanlin.github.io/` 