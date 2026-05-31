export type Topic = "frontend" | "ai" | "ecommerce";

export type Article = {
  title: string;
  /** English title for Chinese articles shown in the English locale */
  titleEn?: string;
  /** Topic tags for filtering */
  topics?: Topic[];
  /** 发布日期 ISO `YYYY-MM-DD`，用于排序；界面用 `articleMonthLabel` 只显示到月 */
  publishedAt: string;
  /** 原文链接（掘金、公众号等） */
  url?: string;
  /** 封面图，置于 public/ 下时使用以 / 开头的路径 */
  coverImage?: string;
  /** 封面图简短说明，供无障碍与搜索引擎 */
  coverAlt?: string;
  /** 列表内推荐语 / 摘要 */
  blurb?: string;
  /** English blurb for Chinese articles shown in the English locale */
  blurbEn?: string;
  /** 发布平台 */
  platform?: "juejin" | "wechat" | "devto";
  /** 是否在首页精选展示 */
  featured?: boolean;
};

/** 界面展示：仅到月，如 `2026.05` */
export function articleMonthLabel(publishedAt: string): string {
  const [y, m] = publishedAt.split("-");
  return `${y}.${m}`;
}

export const articles: Article[] = [
  // ── 首页精选 ──────────────────────────────────────────
  {
    title: "我以为 9 种 token 风格都能用——直到我换了一个 IA",
    titleEn: "I Thought All 9 Token Styles Were Valid — Until I Changed the IA",
    topics: ["ai", "frontend"],
    publishedAt: "2026-05-28",
    url: "https://mp.weixin.qq.com/s/7I7MCgEYu_M3BvahqVHbKg",
    coverImage: "/images/articles/token-ia-coherence.png",
    coverAlt: "插图：几何网格结构上叠着不同色块，对齐的发光，错位的产生干扰，比喻 token 与 IA 的适配关系",
    blurb:
      "做了一个 demo：同一套 HTML，9 种不同的 design token，每种呈现出完全不同的产品人格。看起来每套都能用——直到我追了一个问题：换一个 IA 还成立吗？把 Playful 放进数据 dashboard，把 AI Gradient 放进支付流程——感觉立刻不对了。",
    blurbEn:
      "Nine token profiles, one HTML structure — each presenting a completely different product personality. They all seemed valid, until I asked: what if this weren't a landing page? Move Playful into a data dashboard, drop AI Gradient into a payment flow — the wrongness is immediate.",
    platform: "wechat",
    featured: true,
  },
  {
    title: "「好逛」和「好找」不是同一件事——电商独立站的 IA 取舍",
    titleEn: "\"Easy to Browse\" vs \"Easy to Find\" — IA Trade-offs in E-commerce Storefronts",
    topics: ["ecommerce"],
    publishedAt: "2026-05-07",
    url: "https://mp.weixin.qq.com/s/OX441mHruOlWVpQx3YdoWQ",
    coverImage: "/images/articles/boutique-vs-grid-ia.png",
    coverAlt: "插图：精品店式陈列与电商栅格界面的对照",
    blurb:
      "假期逛精品小店，遇到喜欢的东西直接拿下，完全不费力气。但同样的商品放到网上，打开页面却感觉脑袋嗡嗡的——分类、筛选、产品卡片铺天盖地，反而不知道从哪里看起。同样是挑东西，为什么体验差这么多？这篇文章从这个问题出发，聊聊电商独立站的信息架构设计，以及「好逛」和「好找」背后那个很少被说清楚的取舍。",
    blurbEn:
      "Browsing a boutique feels effortless — shopping the same item online feels overwhelming. This piece unpacks the IA trade-off between \"enjoyable to browse\" and \"easy to find\" in e-commerce storefronts.",
    platform: "wechat",
    featured: true,
  },
  {
    title: "赛博纺织工厂：一个比喻，讲透 AI Agent 工作流的四次进化",
    titleEn: "The Cyber Textile Factory: Four Generations of AI Agent Workflow Design",
    topics: ["ai"],
    publishedAt: "2026-02-27",
    url: "https://juejin.cn/post/7611064285586440219",
    coverImage: "/images/articles/cyber-textile-factory-agent.png",
    coverAlt: "插图：工业织机与数字线程并置，比喻 AI Agent 工作流的四次进化",
    blurb:
      "用纺织工厂改造比喻 Agent 系统的演进——V1 结构化执行，V2 规划反思，V3 记忆管理，V4 安全护栏。能力越强，需要的约束越精密。工程化的关键不在 AI 本身，而在于通过流程设计与安全防护让复杂系统在生产环境里稳定运作。",
    blurbEn:
      "A textile factory metaphor to explain four generations of AI Agent workflow design — from structured execution to planning, memory, and safety guardrails. The more capable the system, the more precise the constraints need to be.",
    platform: "juejin",
    featured: true,
  },
  {
    title: "当系统「没了头」(headless)，AI 反而更好接手了？",
    titleEn: "When a System Goes Headless, Does AI Take Over More Easily?",
    topics: ["frontend", "ai"],
    publishedAt: "2026-02-19",
    url: "https://juejin.cn/post/7607255854146273318",
    coverImage: "/images/articles/headless-ai-robot-api.png",
    coverAlt: "插图：开顶建筑结构与机器人直连 API 接口，比喻 Headless 架构被 AI 接管",
    blurb:
      "Headless 架构的本质是「只暴露能力接口，不预设 UI 形态」。AI Agent 作为新型消费方，恰好不需要 UI——这让 Headless 成为最易被 AI 接手的系统形态。但 API 设计与治理成本并没有因此消失。",
    blurbEn:
      "Headless architecture exposes capabilities without prescribing UI. AI agents — which don't need UI — turn out to be its ideal consumers. But API governance costs don't disappear; they just shift.",
    platform: "juejin",
    featured: true,
  },
  {
    title: "你的页面对 Google 来说不存在 —— 一次微前端 SEO 链路排查",
    titleEn: "Your Page Doesn't Exist to Google — A Micro-Frontend SEO Post-mortem",
    topics: ["frontend"],
    publishedAt: "2026-05-03",
    url: "https://juejin.cn/post/7635275904798326838",
    coverImage: "/images/articles/seo-google-chain-four-layers.png",
    coverAlt: "插图：四层纵向栈，第三层断裂，比喻 SEO 链路中的渲染断点",
    blurb:
      "不是排名低，是页面对 Google 完全不存在。这篇记录了一次微前端项目的完整 SEO 排查过程，以及从中整理出的四层诊断框架：链接发现、可访问性、内容渲染、语义理解。断点找错了层，改再多也没用。",
    blurbEn:
      "Not low-ranking — completely invisible to Google. A micro-frontend SEO post-mortem and a four-layer diagnostic framework: link discovery, accessibility, content rendering, semantic understanding. Fix the wrong layer and nothing changes.",
    platform: "juejin",
    featured: true,
  },

  {
    title: "双 RAF + MutationObserver：微前端跳转后的滚动复原完整方案",
    titleEn: "Double RAF + MutationObserver: Scroll Restoration After Micro-Frontend Redirects",
    topics: ["frontend"],
    publishedAt: "2026-05-10",
    url: "https://juejin.cn/post/7637770855154548771",
    coverImage: "/images/articles/micro-frontend-focus.png",
    coverAlt: "插图：两帧之间的边界，节点从暗到亮的状态变化，比喻渲染管线时序",
    blurb:
      "微前端跳转后滚动复原，不是一个 scrollTo 能解决的。状态要活过跳转、元素要出现在 DOM、还要等渲染真正完成——三件事都得在浏览器渲染管线的正确时机触发。「元素在 DOM 里」和「元素画好了」是两个不同的问题，用错 API 就会踩坑。",
    blurbEn:
      "Scroll restoration after a redirect isn't a scroll problem — it's a timing problem. State must survive the jump, the element must appear in the DOM, and it must be fully painted — in that order, at the right moment in the browser rendering pipeline.",
    platform: "juejin",
    featured: true,
  },

  {
    title: "一张微前端技术卡的 AI 协作复盘：业务之下，还有一层",
    titleEn: "AI Pair Programming Retrospective: There's a Layer Beneath the Business Logic",
    topics: ["frontend", "ai"],
    publishedAt: "2026-05-10",
    url: "https://mp.weixin.qq.com/s/ZiGE1HKMhjBxiWETbTbJ2Q",
    coverImage: "/images/articles/looking-layer.png",
    coverAlt: "插图：人向下俯视，地面以下多层地质剖面清晰可见，比喻认知深度决定你能看到的层次",
    blurb:
      "做了一张微前端技术卡，AI 给的代码能跑，但一直有个元素找不到。loop 了三四次才意识到：不是 AI 不行，是我从没给过它业务之下那一层的信息。这篇是对这次 pair coding 的复盘，也是对 AI 协作模式的一次重新想。",
    blurbEn:
      "AI wrote code that ran — but kept missing one element. After a few loops I realized: I'd never given it the layer beneath the business logic. A reflection on what context actually means in AI pair programming.",
    platform: "wechat",
    featured: true,
  },

  {
    title: "你让 AI 改的不是 UI，是你从来没做过的那个决定",
    titleEn: "It's Not the UI You're Asking AI to Change — It's the Decision You've Never Made",
    topics: ["ai", "frontend"],
    publishedAt: "2026-05-26",
    url: "https://mp.weixin.qq.com/s/zcSAZLYUh05r3De_hjrxFQ",
    coverImage: "/images/articles/how-to-beautify-ui.png",
    coverAlt: "插图：design token 把视觉决策从感觉变成定义，比喻设计系统的本质",
    blurb:
      "功能跑通了，界面差点意思，让 AI 优化，改了十几轮越来越乱——很多人都经历过这个过程。这篇文章记录了我从「prompt 写得不够好」到「原来根本没有设计系统」的认知转变，以及 design token 是怎么把这件事从玄学变成可以被执行的定义。",
    blurbEn:
      "The functionality works, but the interface is lacking. We get AI to optimize it, but after a dozen rounds of revisions, it just gets messier — many people have experienced this process. This article documents my shift in understanding from \"the prompt wasn't written well enough\" to \"there's no design system at all,\" and how design tokens transform this from something mystical into an actionable definition.",
    platform: "wechat",
    featured: true,
  },

  // ── 归档（/writing 页面建好后展示）────────────────────
  {
    title: "用设计系统的眼光读 baoyu-skills 源码，发现了三个熟悉的模式",
    titleEn: "Reading baoyu-skills Source Code Through a Design Systems Lens — Three Familiar Patterns",
    topics: ["ai", "frontend"],
    publishedAt: "2026-05-31",
    url: "https://mp.weixin.qq.com/s/YSckbphLlJbh6DMwzplLXg",
    coverImage: "/images/articles/baoyu-skills-layers.png",
    coverAlt: "插图：三层架构示意，token 参数层、级联优先级层、不可变输出层，比喻 baoyu-skills 的工程设计模式",
    blurb:
      "我想用 baoyu-skills 生成技术讲解图，第一张信息密度不够，说不清该怎么调。试着去问参数系统为什么，结果读进了 SKILL.md 源码，发现它在做三件设计系统里很熟悉的事：design token 的正交参数、CSS 的优先级级联、migration 文件的不可变性。",
    blurbEn:
      "I wanted to adjust an infographic but couldn't explain what was wrong. Reading the SKILL.md source to find out, I found three patterns straight out of design systems: orthogonal parameters like design tokens, a priority cascade like CSS specificity, and immutable outputs like migration files.",
    platform: "wechat",
    featured: false,
  },
  {
    title: "I Asked AI to Fix My UI 20 Times. The Problem Wasn't My Prompts.",
    topics: ["ai", "frontend"],
    publishedAt: "2026-05-26",
    url: "https://dev.to/yuki-uix/i-asked-ai-to-fix-my-ui-20-times-the-problem-wasnt-my-prompts-527j",
    blurb:
      "The functionality works, but the interface is lacking. We get AI to optimize it, but after a dozen rounds of revisions, it just gets messier. The problem isn't the prompt — it's that there's no design system at all. This piece documents that realization, and how design tokens turn visual decisions from intuition into something executable.",
    platform: "devto",
    featured: false,
  },
  {
    title: "筛选器解决不了的问题，Agent 从这里开始",
    titleEn: "When Filters Fail: Where AI Shopping Agents Begin",
    topics: ["ecommerce", "ai"],
    publishedAt: "2026-04-06",
    url: "https://mp.weixin.qq.com/s/0cYIyTyU8XbWh4epNTGQqw",
    coverImage: "/images/articles/agent-filter-notebook-flatlay.png",
    coverAlt: "插图：俯视 flat lay，打开的方格笔记本与墨水、胶带、笔等文具",
    blurb:
      "用户在筛选器里反复试探，点了又清空，清空了又重来——这不是用户的问题，是筛选器语言和意图语言之间的翻译鸿沟。这篇文章在聊AI导购Agent怎样填上这道鸿沟，以及什么时候介入、如何优雅退出。",
    platform: "wechat",
    featured: false,
  },
  {
    title: "SEO 做好了，为什么 AI 还是搜不到你的页面？",
    titleEn: "Your SEO Is Fine — So Why Can't AI Search Find Your Page?",
    topics: ["frontend", "ai"],
    publishedAt: "2026-05-05",
    url: "https://mp.weixin.qq.com/s/iUC_p9gGz9lA5LMSszDNYQ",
    coverImage: "/images/articles/seo-vs-geo-ai-search.png",
    coverAlt: "插图：传统搜索场景下的文档与 AI 搜索中的问号",
    blurb:
      "上一篇排查完 SEO 三个断点，以为可以收工了。但后来想到一个问题：修好这些，用 AI 搜得到吗？去查了一下，发现 SEO 和 GEO 是两套完全不同的标准——Googlebot 会等 JS 执行，AI 爬虫不会。",
    platform: "wechat",
    featured: false,
  },
  {
    title: "AI 能做什么，不能做什么：一次 Hackathon 复盘的真实答案",
    titleEn: "What AI Can and Can't Do: Honest Answers from a Hackathon Retrospective",
    topics: ["ai"],
    publishedAt: "2026-04-29",
    url: "https://mp.weixin.qq.com/s/cvBMXhEQ5PCSRncBPsJVtg",
    coverImage: "/images/articles/hackathon-ai-capabilities-brain.png",
    coverAlt: "插图：左右分半的大脑，对比 AI 的能力边界与人机交互",
    blurb:
      "不是所有问题都适合 AI 解决。这篇文章从一次 Hackathon 复盘出发，用「缺失的反馈回路」这个概念，解释为什么大奖项目能拿大奖——以及怎么找到你自己领域里真正值得用 AI 解决的问题。",
    platform: "wechat",
    featured: false,
  },
  {
    title: "把时间垒进空间里——如何让 AI 读懂消失的用户轨迹",
    titleEn: "Stacking Time into Space: Helping AI Read Invisible User Journeys",
    topics: ["ecommerce", "ai"],
    publishedAt: "2026-04-04",
    url: "https://mp.weixin.qq.com/s/z-yCjuYR-Hq35w9BCJkpKA",
    coverImage: "/images/articles/time-stacked-space-heatmap.png",
    coverAlt: "插图：平面布局上的彩色行为气泡热力图",
    blurb:
      "互联网打破了空间的边界，AI 正在打破时间的边界。这篇文章用「把时间垒进空间里」这一意象，将用户行为数据还原成发光的粒子轨迹——帮你重新理解动线、流失与增长背后，那张从未被完整看见的图。",
    platform: "wechat",
    featured: false,
  },
  {
    title: "你的页面对 Google 来说不存在 —— 一次 SEO 链路排查",
    titleEn: "Your Page Doesn't Exist to Google — An SEO Chain Audit",
    topics: ["frontend"],
    publishedAt: "2026-05-03",
    url: "https://mp.weixin.qq.com/s/83A4fxu6dG6LHySt8-O9tg",
    coverImage: "/images/articles/seo-google-chain-four-layers.png",
    coverAlt: "插图：四层纵向栈，第三层断裂，比喻 SEO 链路中的渲染断点",
    blurb:
      "接到一个微前端项目的 SEO 需求，直到打开 Google Search Console，看到「URL is not on Google」——不是排名低，是页面对 Google 完全不存在。这篇记录了那次排查的完整过程与四层诊断框架。",
    platform: "wechat",
    featured: false,
  },
  {
    title: "WebSocket 连上了，然后呢？聊聊实时数据的「后半场」",
    titleEn: "WebSocket Connected — Now What? The Second Half of Real-Time Data",
    topics: ["frontend"],
    publishedAt: "2026-02-25",
    url: "https://juejin.cn/post/7610160716067569674",
    platform: "juejin",
    featured: false,
  },
  {
    title: "用 AI 解决项目痛点：一个前端开发者的 Hackathon 实录",
    titleEn: "Using AI to Solve Real Dev Pain Points: A Frontend Hackathon Story",
    topics: ["ai"],
    publishedAt: "2026-03-22",
    url: "https://juejin.cn/post/7619524626254970921",
    blurb:
      "GitLab AI Hackathon 参赛记录。用 TypeScript 构建 spec-driven 系统，以「规格鸿沟」为切入点——业务逻辑在产品、设计、开发之间反复翻译导致的失真。单一数据源让 AI 自动生成代码、测试与文档。",
    platform: "juejin",
    featured: false,
  },
  {
    title: "Scroll Restoration After Micro-Frontend Redirects: Double RAF + MutationObserver",
    topics: ["frontend"],
    publishedAt: "2026-05-11",
    url: "https://dev.to/yuki-uix/scroll-restoration-after-micro-frontend-redirects-double-raf-mutationobserver-3h77",
    blurb:
      "Scroll restoration after a redirect isn't a scroll problem — it's a timing problem. Three things must happen in sequence at the right moment in the browser's rendering pipeline: state survives the redirect, the element appears in the DOM, and the element is actually painted. Wrong API, wrong moment, broken behavior.",
    platform: "devto",
    featured: false,
  },
  {
    title: "Deep Dive into Array.reduce(): From Interview Questions to Design Thinking",
    topics: ["frontend"],
    publishedAt: "2026-02-24",
    url: "https://dev.to/yuki-uix/deep-dive-into-arrayreduce-from-interview-questions-to-design-thinking-15ih",
    blurb:
      "Why does reduce() appear in interviews but rarely in real projects? This piece reframes it as a paradigm for data transformation — \"reductive thinking\" — and walks through aggregation, restructuring, function composition, and sequential async patterns.",
    platform: "devto",
    featured: false,
  },
];
