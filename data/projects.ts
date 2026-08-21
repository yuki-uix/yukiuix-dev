export type ProjectStatus = "live" | "experiment" | "hackathon" | "design" | "award";

export type Project = {
  title: string;
  tag: string;
  description: { zh: string; en: string };
  status?: ProjectStatus;
  /** Show on home page Projects section */
  featuredOnHome?: boolean;
  /** Primary interactive entry — live demo */
  demoUrl?: string;
  /** Source code */
  githubUrl?: string;
  gitlabUrl?: string;
  /** Hackathon / competition submission page */
  submissionUrl?: string;
  /** Intro / walkthrough video */
  videoUrl?: string;
  /** Cover image for design projects (path under /public) */
  coverImage?: string;
  /** Related article */
  articleUrl?: string;
};

export const projects: Project[] = [
  {
    title: "RepoCoach",
    tag: "AI AGENT · COST & EVALUATION",
    status: "experiment",
    featuredOnHome: true,
    description: {
      zh: "纸面推断错了两次，实测才对。一个源码学习 agent 的垂直切片——真正的产出是把 agent 工程里几个反直觉的问题跑到了有数据：成本随调用次数超线性增长、工具调用降 28% 而 token 反升 17%、缓存命中 65.6% 让预算指标高估约 3 倍。同时验证了安全闸如何双向覆盖、状态怎么跨进程活下来、以及为什么只写在 prompt 里的约束必须在出口再校验一遍。638 个测试、22 个合并 PR，Claude 定计划、DeepSeek 实现、GPT 复审。项目已主动收尾，把跑出数据的部分整理成可复用的经验。",
      en: "Two paper estimates, both wrong — only measurement got it right. A vertical slice of a source-reading agent whose real output is data on the counter-intuitive parts of agent engineering: cost grows super-linearly with call count, 28% fewer tool calls raised tokens by 17%, and a 65.6% cache-hit rate inflated the budget metric roughly threefold. It also pinned down how safety gates have to be checked in both directions, how state survives across processes, and why a constraint written only into a prompt still needs a gate at the exit. 638 tests, 22 merged PRs — planned by Claude, implemented by DeepSeek, reviewed by GPT. Development has since been wound down, with the measured parts written up as reusable findings.",
    },
    githubUrl: "https://github.com/yuki-uix/RepoCoach",
  },
  {
    title: "Agent Cost Lab",
    tag: "AI COST · MEASUREMENT",
    status: "experiment",
    featuredOnHome: false,
    description: {
      zh: "Token 不是钱。几乎每个上下文压缩工具都宣传 token 降低多少，但缓存过的 input token 只要标价的约 10%，而压缩靠改写历史——这会打断缓存前缀，让后面全部重新计价。「省 40% token」和「账单更贵」完全兼容。这个仓库测的是账单：代理探针走真实调用路径，预测先锁进 git，导出闸写成测试而不是清单。装置已建成，结论待测。",
      en: "Tokens are not money. Nearly every context-compression tool advertises a token-reduction number, but a cached input token costs ~10% of list price and compression works by rewriting history — which breaks the cached prefix and reprices everything after it. \"40% fewer tokens\" and \"a bigger bill\" are entirely compatible. This repo measures the bill: a proxy probe on the real call path, predictions locked into git before measuring, export gates written as tests rather than checklists. Instrument built; results pending.",
    },
    githubUrl: "https://github.com/yuki-uix/agent-cost-lab",
  },
  {
    title: "Image to Code",
    tag: "AI AGENT · DESIGN TO CODE",
    status: "experiment",
    featuredOnHome: false,
    description: {
      zh: "不是「一张截图生成一个页面」。把 AI 生成的设计稿变成可复用、可验证的前端包——保留真实素材与设计语言，产出带 props、variants、tokens 和 manifest 的组件文件，而不是拍平成单个页面组件。中间产物可观察、契约确定、验证廉价，只在仍需视觉判断的地方保留人工评审。",
      en: "Not \"a pixel-perfect page from one screenshot\". A Claude Code workflow that turns AI-generated design sources into reusable, validated frontend packages — preserving real assets and design language, materialising component files with props, variants, tokens, and manifests instead of flattening everything into one page component. Observable intermediate artifacts, deterministic contracts, cheap validation, and human review only where visual judgment is still necessary.",
    },
    githubUrl: "https://github.com/yuki-uix/image-to-code-agent",
  },
  {
    title: "Design Reasoning Lab",
    tag: "AI DESIGN · RESEARCH",
    status: "experiment",
    featuredOnHome: false,
    description: {
      zh: "不问「这个工具能生成什么」，问「它怎么思考」。用可复现的行为实验逆向 AI 原生设计工具的推理方式——它向人索取什么信息、把哪些决策留给人、不同输出模式之间如何关联。当前案例是 Claude Design，v0 作对照；结论按 Fact / Interpretation / Hypothesis / Conclusion 四级分层，事实与解释永远分开记录。",
      en: "Not \"what can this tool generate\" but \"how does it think\". Reproducible behavioural experiments reverse-engineering how AI-native design tools reason — what they ask the human for, which decisions they delegate, and how output modes relate. The current case study is Claude Design with v0 as contrast; claims are kept at four distinct epistemic levels — fact, interpretation, hypothesis, conclusion — so observation is never merged into explanation.",
    },
    githubUrl: "https://github.com/yuki-uix/design-reasoning-lab",
  },
  {
    title: "Brooch Shop",
    tag: "AI AGENT · E-COMMERCE",
    status: "live",
    featuredOnHome: true,
    description: {
      zh: "筛选器解决不了的问题，Agent 从这里开始。用 Claude API + tool calling 构建的 AI 导购 agent，演示自然语言意图理解如何替代传统多级筛选。",
      en: "Where filters fall short, agents begin. An AI shopping agent built with Claude API and tool calling — demonstrating how natural-language intent understanding replaces multi-level filter UX.",
    },
    coverImage: "/images/projects/brooch-shop.png",
    demoUrl: "https://brooch-shop.vercel.app/",
    githubUrl: "https://github.com/yuki-uix/brooch-shop",
    articleUrl: "https://mp.weixin.qq.com/s/0cYIyTyU8XbWh4epNTGQqw",
  },
  {
    title: "Prompt Shop",
    tag: "CHECKOUT · STRIPE",
    status: "live",
    featuredOnHome: false,
    description: {
      zh: "完整电商购物流程实验场，Stripe Checkout 集成，覆盖从商品列表到支付完成的全链路。",
      en: "End-to-end e-commerce checkout playground with Stripe integration — covering the full flow from product listing to payment confirmation.",
    },
    coverImage: "/images/projects/prompt-shop.png",
    demoUrl: "https://prompt-shop-one.vercel.app/",
    githubUrl: "https://github.com/yuki-uix/prompt-shop",
  },
  {
    title: "Human vs AI Judge",
    tag: "AI · GAME · E-COMMERCE",
    status: "live",
    featuredOnHome: true,
    description: {
      zh: "当 AI 已经做出判断，谁来按那个确认键？与 AI 同场竞技，对真实电商售后工单做意图分类，实时对比人类、Claude、GPT 三方判断差异。",
      en: "When AI has already decided, who presses confirm? Compete with AI on intent classification of real e-commerce support tickets — compare human, Claude, and GPT judgments in real time.",
    },
    coverImage: "/images/projects/human-vs-ai-agent.png",
    demoUrl: "https://post-agent-game.vercel.app/",
    githubUrl: "https://github.com/yuki-uix/post-agent-game",
    articleUrl: "https://juejin.cn/post/7624378354167398451",
  },
  {
    title: "Readable & Shareable",
    tag: "CLAUDE CODE · SKILL · VISUALIZATION",
    status: "live",
    featuredOnHome: true,
    description: {
      zh: "你写了好文章，但大多数人不会点开链接。Claude Code `/viz` skill：自动识别文章结构，生成思维导图、交互 HTML、图片卡片等可分享产出，每种形式都链回原文，让不同受众找到自己的入口。",
      en: "You wrote a great article — most people won't click the link. A Claude Code `/viz` skill that detects article structure and generates mind maps, interactive HTML, and shareable image cards — each output links back to the source so every audience finds their entry point.",
    },
    coverImage: "/images/projects/readable-and-shareable.png",
    demoUrl: "https://yuki-uix.github.io/readable-and-shareable/",
    githubUrl: "https://github.com/yuki-uix/readable-and-shareable",
  },
  {
    title: "Particle Flow Generator",
    tag: "CANVAS · SIMULATION",
    status: "live",
    featuredOnHome: false,
    description: {
      zh: "把时间垒进空间里。用粒子流模拟用户轨迹的空间残留——Canvas 2D 实时渲染，BFS 流场寻路，支持参数调节与 GIF 导出。",
      en: "Stacking time into space. Simulating the spatial residue of user trajectories with particle flows — Canvas 2D real-time rendering, BFS flow-field pathfinding, live parameter tuning and GIF export.",
    },
    coverImage: "/images/projects/particle-flow-generator.png",
    demoUrl: "https://particle-flow-generator.vercel.app/",
    githubUrl: "https://github.com/yuki-uix/particle-flow-generator",
    articleUrl: "https://mp.weixin.qq.com/s/z-yCjuYR-Hq35w9BCJkpKA",
  },
  {
    title: "SSB Website",
    tag: "DESIGN ENGINEERING · FRAMER MOTION",
    status: "live",
    featuredOnHome: true,
    description: {
      zh: "从零搭建的 B2B 营销站设计工程练习。四页完整实现，含自定义物理弹跳动效 hook（速度向量 + 边界反射）、响应式布局与 Framer Motion 动画。Lighthouse 性能 91 / 无障碍 96 / SEO 100。",
      en: "A design engineering exercise — four-page B2B marketing site built from scratch. Features a custom physics bounce hook with velocity vectors and wall-reflection, responsive layout, and Framer Motion animations. Lighthouse: Performance 91 / Accessibility 96 / SEO 100.",
    },
    coverImage: "/images/projects/ssb-website.png",
    demoUrl: "https://ssb-website-three.vercel.app/",
    githubUrl: "https://github.com/yuki-uix/ssb-website",
  },
  {
    title: "Design Token Signals",
    tag: "DESIGN SYSTEM · EXPERIMENT",
    status: "experiment",
    featuredOnHome: true,
    description: {
      zh: "设计令牌不只是存储数值，它们携带意义。一个用于分析 design token 组合所传达视觉信号的实验工具——映射颜色、圆角、字重的语义，在组件开发之前识别视觉冲突。",
      en: "Design tokens don't just store values — they carry meaning. An experimental tool for analyzing the visual signals that token combinations transmit: mapping the semantics of color, radius, and weight to surface conflicts before a component is built.",
    },
    coverImage: "/images/projects/design-token-signals.png",
    demoUrl: "https://yuki-uix.github.io/design-token-signals/",
    githubUrl: "https://github.com/yuki-uix/design-token-signals",
    articleUrl: "https://mp.weixin.qq.com/s/zcSAZLYUh05r3De_hjrxFQ",
  },
  {
    title: "EaseBuy",
    tag: "UX DESIGN · E-COMMERCE · MOBILE",
    status: "award",
    featuredOnHome: false,
    description: {
      zh: "UXcel × UX Pilot 竞赛 Top 10 获奖作品。以「无感购物」为核心，11 个页面覆盖完整电商链路——极简留白、卡片式信息架构、透明结算流程。用 AI 辅助完成从线框到高保真的全流程。",
      en: "Top 10 in UXcel × UX Pilot Design Competition. A minimalist mobile e-commerce app covering the full shopping journey across 11 screens — generous whitespace, card-based IA, transparent checkout. Full flow from wireframe to hi-fi with AI assistance.",
    },
    coverImage: "/images/projects/easebuy-cover.png",
    submissionUrl: "https://app.uxcel.com/showcase/easebuy-265",
  },
  {
    title: "Spec-Driven Scenario Updater",
    tag: "AI AGENT · GITLAB HACKATHON",
    status: "hackathon",
    featuredOnHome: false,
    description: {
      zh: "GitLab AI Hackathon 参赛项目。以「规格鸿沟」为切入点——业务逻辑在产品、设计、开发之间反复翻译导致的失真。用单一 spec 数据源驱动 AI 自动生成代码、测试与文档。",
      en: "GitLab AI Hackathon submission. Targeting the \"spec gap\" — the distortion that accumulates as business logic is translated across product, design, and engineering. A single spec source drives AI to auto-generate code, tests, and docs.",
    },
    coverImage: "/images/projects/spec-driven-updater.png",
    gitlabUrl: "https://gitlab.com/gitlab-ai-hackathon/participants/35552697",
    submissionUrl: "https://devpost.com/software/spec-driven-scenario-updater",
    videoUrl: "https://www.youtube.com/watch?v=8s4e-s4HmzI",
    articleUrl: "https://juejin.cn/post/7619524626254970921",
  },
];
