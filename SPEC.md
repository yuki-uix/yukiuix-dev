请帮我搭建一个个人 portfolio 网站，技术栈是 Next.js 14 (App Router) + Tailwind CSS + TypeScript，部署到 Vercel，域名 yukiuix.dev。

# 视觉规范
色彩：
- 背景 #FAF8F3（暖米白）
- 主蓝 #2B6CB0（地中海蓝）
- 亮蓝 #63B3ED（天空蓝，hover 用）
- 主文字 #1A202C
- 次文字 #718096
- 边框 #E2D9C8

字体：DM Sans（正文）+ DM Mono（标签/logo），从 Google Fonts 引入。

背景：全局固定网格纹理，用 #E2D9C8 1px 线，40px 间距，opacity 0.35，fixed 定位。

设计原则：无阴影无渐变，0.5px 细边框，卡片 hover 变蓝色边框 + translateY(-2px)。

# 页面结构（单页滚动）
Nav → Hero → Projects → Writing → About → Footer

# 各区块内容

Nav：左边 logo "yuki.uix"（DM Mono，"uix" 用主蓝），右边导航（项目/文章/关于/EN），sticky 定位。

Hero：
- Tag 行：DM Mono 11px，亮蓝色，前有 24px 横线
- 标题："始于建筑，深入工程，探索 AI 与交付的边界"（"AI"用主蓝）
- 副标题：建筑学训练了我用空间动线理解系统，现在用在电商 SaaS，用 AI 放大判断力。
- 两个按钮：主按钮"查看项目"（主蓝背景）+ 幽灵按钮"联系我"

Projects（三列网格）：
数据从 data/projects.ts 读取，三个项目：
1. Brooch Shop / AI · E-COMMERCE / AI 导购 agent，tool calling，Claude API / demo: https://brooch-shop.vercel.app/ / github: https://github.com/yuki-uix/brooch-shop
2. Prompt Shop / CHECKOUT · STRIPE / 完整购物流程，Stripe Checkout / demo: https://prompt-shop-one.vercel.app/ / github: https://github.com/yuki-uix/prompt-shop
3. IA 结构演示 / IA · INTERACTIVE / 切换三种电商导航结构 / demo: https://yuki-uix.github.io/yukiss-store/ia-demo.html / github: https://github.com/yuki-uix/yukiss-store

Writing（文章列表）：
数据从 data/articles.ts 读取，每行左边标题右边日期，hover 变蓝：
- 好逛还是好找？电商独立站 IA 设计的核心取舍 / 2026.05
- 筛选器解决不了的问题，Agent 从这里开始 / 2026.04
- SEO 做好了，为什么 AI 还是搜不到你的页面？/ 2026.05
- 你的页面对 Google 来说不存在——一次 SEO 链路排查 / 2026.05
- AI 能做什么，不能做什么：一次 Hackathon 复盘的真实答案 / 2026.04
- 把时间垒进空间里——如何让 AI 读懂消失的用户轨迹 / 2026.04

About（两列 1fr 2fr）：
左：现在在做 + 技术栈 pill（React/Next.js/TypeScript/Claude API/Vertex AI/Mixpanel）
右：建筑学→UX→前端的背景介绍，两段文字。

Footer：左边 "yukiuix.dev · 2026"，右边 GitHub/LinkedIn/掘金/yuki.uix@gmail.com

# 注意事项
1. 颜色用 CSS 变量，不硬编码 hex
2. 数据从 data/ 目录读取
3. 背景网格 fixed，内容区块 relative + z-index: 1
4. 移动端响应式：导航折叠，项目卡片单列
5. EN 按钮暂时 href 到 https://www.linkedin.com/in/kunyu-xu/

请先完成项目初始化 + Nav + Hero，我确认视觉后再继续。