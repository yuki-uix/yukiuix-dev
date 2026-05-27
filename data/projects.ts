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
    featuredOnHome: true,
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
    title: "Design Token Signals",
    tag: "DESIGN SYSTEM · EXPERIMENT",
    status: "experiment",
    featuredOnHome: true,
    description: {
      zh: "设计令牌不只是存储数值，它们携带意义。一个用于分析 design token 组合所传达视觉信号的实验工具——映射颜色、圆角、字重的语义，在组件开发之前识别视觉冲突。",
      en: "Design tokens don't just store values — they carry meaning. An experimental tool for analyzing the visual signals that token combinations transmit: mapping the semantics of color, radius, and weight to surface conflicts before a component is built.",
    },
    demoUrl: "https://yuki-uix.github.io/design-token-signals/",
    githubUrl: "https://github.com/yuki-uix/design-token-signals",
    articleUrl: "https://mp.weixin.qq.com/s/zcSAZLYUh05r3De_hjrxFQ",
  },
  {
    title: "EaseBuy",
    tag: "UX DESIGN · E-COMMERCE · MOBILE",
    status: "award",
    featuredOnHome: true,
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
    featuredOnHome: true,
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
