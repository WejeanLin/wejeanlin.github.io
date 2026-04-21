# 🌿 Wejean Lin 个人展示页设计规范

## 📖 项目概述
- **定位**：静态个人展示页，托管于 GitHub Pages
- **技术栈**：纯 HTML5 + CSS3 + Vanilla JavaScript（无框架、无构建工具）
- **设计语言**：低饱和度莫兰迪色系、大量留白、稀疏排版、精致微动效、优雅英文字体
- **适配终端**：Desktop / Tablet / Mobile 全端响应式
- **内容语言**：全站英文

---

## 🎨 视觉与设计规范

### 1. 色彩系统（莫兰迪低饱和度）
| 模式 | 背景色 | 主文字色 | 次要文字色 | 强调/交互色 |
|------|--------|----------|------------|-------------|
| ☀️ Day | `#FAFAF9` (暖白) | `#2D3748` | `#718096` | `#8B9DAB` (灰蓝) |
| 🌙 Night | `#1C1F26` (深灰蓝) | `#E2E8F0` | `#A0AEC0` | `#94A3B8` (雾灰) |

> 💡 仅背景色参与主题切换动画，文字与组件颜色通过 CSS 变量平滑过渡，保持视觉稳定。

### 2. 字体与排版
- **标题字体**：`Playfair Display` 或 `Cormorant Garamond`（优雅衬线）
- **正文字体**：`Inter`, `SF Pro Display`, `Segoe UI`, sans-serif（现代无衬线）
- **基础字号**：`18px ~ 20px`（桌面端），移动端按比例缩放
- **行高**：`1.8 ~ 2.0`
- **字间距**：`0.02em ~ 0.04em`
- **排版原则**：纵向稀疏排列，区块间距 `≥ 4rem`，段落间距 `≥ 1.5rem`，保证内容“呼吸感”

### 3. 响应式策略
- 使用 `clamp()` 控制字号与间距弹性缩放
- Desktop：左右分栏或宽幅居中布局
- Tablet/Mobile：单列堆叠，触摸目标 `≥ 44px`，边距自适应收缩但保持留白比例

---

## 🧩 页面结构与组件

### 🔹 左上角：主题切换按钮
- 固定定位 `position: fixed; top: 2rem; left: 2rem;`
- 图标建议：`☀️ / 🌙` 或极简线条切换图标
- 点击触发对角线背景切换动画

### 🔹 左侧信息区
- **头像**：矩形占位图（预留后续动漫头像替换位置），圆角 `8px`，带极淡阴影
- **下方链接**（纵向排列，可点击）：
  - `wejeanlin@qq.com`
  - `wejeanlin@outlook.com`
  - `https://github.com/WejeanLin`（新标签页打开）

### 🔹 主内容区（右侧/居中）
1. **打招呼区**：👋 Emoji + 简短欢迎语 + 姓名 `Wejean Lin`
2. **个人简介**：自然谦逊的英文自我介绍
3. **兴趣方向**：`Agent` / `Agent's Memory` / `Computer Vision`
4. **教育经历**：`Guangdong University of Education` | `Electronic Information Engineering` | `Sep 2024 – Present`
5. **联系方式**：重复邮箱地址（带复制功能）

### 🔹 顶部居中：复制提示窗（Toast）
- 触发条件：点击任意邮箱链接
- 文案：`Copied. Feel free to contact me.`
- 右侧带 `✕` 关闭按钮
- 底部内置 3 秒倒计时进度条

---

## ✨ 交互与动画规范

### 1. 🌗 主题切换动画（对角线扫光）
- **效果**：从切换按钮坐标出发，沿对角线方向平滑展开新背景色
- **速率**：`0.8s ~ 1.0s`，缓动函数 `cubic-bezier(0.4, 0, 0.2, 1)`
- **实现建议**：
  ```css
  /* 使用 clip-path 或 ::before 伪元素配合 transform-origin 动态定位 */
  .theme-wipe {
    position: fixed; inset: 0; z-index: -1;
    background: var(--bg-next);
    clip-path: polygon(0 0, 0 0, 0 100%, 0 100%);
    transition: clip-path 0.9s cubic-bezier(0.4, 0, 0.2, 1);
  }
  .theme-wipe.active {
    clip-path: polygon(0 0, 200% 0, 200% 200%, 0 200%);
  }
  ```

### 2. 📥 首次加载入场序列
页面初始全白，按以下顺序渐显（`opacity: 0 → 1`, `translateY(24px) → 0`）：
1. `0.0s`：👋 Emoji 与打招呼文字浮现（同时启动挥手动画）
2. `0.4s`：左侧头像及下方链接渐显
3. `0.8s ~ 1.6s`：主内容区块自上而下依次 stagger 入场（间隔 `0.15s`）
- 全部使用 GPU 加速属性（`transform`, `opacity`），避免重排

### 3. 👋 Emoji 挥手动画
- **默认状态**：轻微自然摆动，幅度小、速度慢（模拟真人打招呼）
- **Hover 状态**：摆动幅度与频率略微提升，提供交互反馈
- **关键帧参考**：
  ```css
  @keyframes wave {
    0%, 100% { transform: rotate(0deg); }
    25% { transform: rotate(12deg); }
    75% { transform: rotate(-8deg); }
  }
  .emoji-wave {
    display: inline-block;
    transform-origin: 70% 70%;
    animation: wave 2.5s ease-in-out infinite;
  }
  .emoji-wave:hover { animation-duration: 1.2s; }
  ```

### 4. 📋 邮箱复制与 Toast 动画
- **点击行为**：调用 `navigator.clipboard.writeText()` 复制邮箱
- **出现动画**：从顶部居中滑入 + 淡入（`0.4s`）
- **倒计时进度条**：
  - 宽度 `0% → 100%`，耗时 `3s`
  - 背景色从浅莫兰迪渐变至深莫兰迪（`var(--toast-light) → var(--toast-dark)`）
  - 进度条填满瞬间，Toast 整体淡出上滑消失
- **手动关闭**：点击 `✕` 立即中断计时并执行退出动画
- **JS 逻辑提示**：使用 `requestAnimationFrame` 或 CSS `@property` 控制进度，避免 `setInterval` 卡顿

### 5. 🖱️ 全局微交互
- 链接 Hover：颜色微变 + 下划线从中心向两侧展开（`0.3s`）
- 按钮/卡片 Hover：`transform: translateY(-2px)` + 阴影微增
- 所有过渡统一使用 `transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)`
- 尊重系统设置：`@media (prefers-reduced-motion: reduce)` 时禁用非必需动画

---

## 📝 英文内容草案（可直接填入 HTML）

```text
👋 Hi there, I'm Wejean Lin.

A curious learner navigating the intersection of electronics and intelligent systems. 
I’m currently exploring the evolving landscape of AI agents, with a particular focus on 
memory mechanisms and vision transformers. I believe in building things step by step, 
staying humble, and letting curiosity lead the way. Welcome to my little corner of the internet.

Interests
• AI Agents
• Agent Memory
• Computer Vision

Education
Guangdong University of Education
B.Eng. in Electronic Information Engineering
Sep 2024 – Present

Contact
wejeanlin@qq.com
wejeanlin@outlook.com
```

---

## 🛠️ 技术实现建议

### 📁 推荐文件结构
```
/
├── index.html
├── style.css
├── script.js
└── assets/
    └── avatar.jpg  (预留矩形头像)
```

### 🔑 关键实现要点
1. **CSS 变量管理主题**：
   ```css
   :root {
     --bg: #FAFAF9; --text: #2D3748; --accent: #8B9DAB;
     --toast-light: #D6DEE5; --toast-dark: #8B9DAB;
   }
   [data-theme="dark"] {
     --bg: #1C1F26; --text: #E2E8F0; --accent: #94A3B8;
     --toast-light: #2A303A; --toast-dark: #64748B;
   }
   ```
2. **对角线切换坐标追踪**：JS 获取按钮 `getBoundingClientRect()`，动态设置 CSS `--wipe-x` / `--wipe-y`，配合 `clip-path: circle()` 或 `polygon()` 实现精准发散。
3. **入场动画控制**：使用 CSS `@keyframes fadeUp` 配合 `animation-delay`，或 JS 依次添加 `.visible` class，避免复杂库依赖。
4. **Toast 进度同步**：CSS `@keyframes progressFill` 控制宽度与背景色，JS 仅负责触发/销毁与剪贴板交互，保持轻量。
5. **GitHub Pages 兼容**：确保所有路径为相对路径，禁用服务端特性，开启 `CNAME`（如需自定义域名）。

---

## ⚠️ 注意事项
- 所有动画仅使用 `transform` 与 `opacity`，确保 60fps 流畅度
- 移动端测试重点：触摸区域大小、Toast 不遮挡内容、字体缩放不破坏留白比例
- 头像替换时保持 `object-fit: cover` 与固定宽高比，避免布局抖动
- 代码需添加基础 SEO 标签（`<meta name="description">`, `<title>`, Open Graph）
- 遵循无障碍标准：链接添加 `aria-label`，颜色对比度 ≥ 4.5:1

**按照以上要求，帮我完成该页面的开发**