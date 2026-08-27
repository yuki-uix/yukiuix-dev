export type Topic = "frontend" | "ai" | "ecommerce";
export type Platform = "juejin" | "wechat" | "devto";
export type Locale = "zh" | "en";

/**
 * 站外发布的变体。同一篇文章在不同平台会做结构调整，
 * 所以标题、语言都可能与本站原文不同。
 */
export type Variant = {
  platform: Platform;
  url: string;
  /** 该平台上的标题，与本站原文不一致时填写 */
  title?: string;
  /** 变体语言，默认 `zh` */
  lang?: Locale;
};

export type Article = {
  /** 本站地址 `/writing/<slug>`，同时作为稳定的列表 key */
  slug: string;
  /**
   * `self`     — 正文在 `content/writing/<slug>.<locale>.mdx`，本站是原文出处
   * `external` — 本站只做索引，点击跳到 `variants` 里的站外原文
   */
  source: "self" | "external";
  title: string;
  /** English title for Chinese articles shown in the English locale */
  titleEn?: string;
  /** Topic tags for filtering */
  topics?: Topic[];
  /** 发布日期 ISO `YYYY-MM-DD`，用于排序；界面用 `articleMonthLabel` 只显示到月 */
  publishedAt: string;
  /** 封面图，置于 public/ 下时使用以 / 开头的路径 */
  coverImage?: string;
  /** 封面图简短说明，供无障碍与搜索引擎 */
  coverAlt?: string;
  /** 列表内推荐语 / 摘要 */
  blurb?: string;
  /** English blurb for Chinese articles shown in the English locale */
  blurbEn?: string;
  /** `source` 为 `self` 时，本站已有正文的语言 */
  bodyLocales?: Locale[];
  /** 站外发布的变体，按希望展示的顺序排列 */
  variants?: Variant[];
  /** 是否在首页精选展示 */
  featured?: boolean;
};

/** 界面展示：仅到月，如 `2026.05` */
export function articleMonthLabel(publishedAt: string): string {
  const [y, m] = publishedAt.split("-");
  return `${y}.${m}`;
}

export function articleTitle(a: Article, locale: string): string {
  return locale === "en" && a.titleEn ? a.titleEn : a.title;
}

export function articleBlurb(a: Article, locale: string): string | undefined {
  return locale === "en" && a.blurbEn ? a.blurbEn : a.blurb;
}

export type ArticleLink =
  | { href: string; external: false }
  | { href: string; external: true; platform: Platform };

/**
 * 列表项该链去哪里。本站有正文一律走站内——即使当前语言还没译好，
 * 也胜过把读者送去站外，文章页会在顶部给出可用的语言与站外变体。
 */
export function articleLink(a: Article, locale: string): ArticleLink | null {
  if ((a.bodyLocales ?? []).length > 0 && a.source === "self") {
    return { href: `/writing/${a.slug}`, external: false };
  }
  const variants = a.variants ?? [];
  const chosen = variants.find((v) => (v.lang ?? "zh") === locale) ?? variants[0];
  return chosen
    ? { href: chosen.url, external: true, platform: chosen.platform }
    : null;
}

export const articles: Article[] = [
  // ── 首页精选 ──────────────────────────────────────────
  {
    slug: "token-ia-coherence",
    source: "external",
    title: "我以为 9 种 token 风格都能用——直到我换了一个 IA",
    titleEn: "I Thought All 9 Token Styles Were Valid — Until I Changed the IA",
    topics: ["ai", "frontend"],
    publishedAt: "2026-05-28",
    coverImage: "/images/articles/token-ia-coherence.png",
    coverAlt: "插图：几何网格结构上叠着不同色块，对齐的发光，错位的产生干扰，比喻 token 与 IA 的适配关系",
    blurb:
      "做了一个 demo：同一套 HTML，9 种不同的 design token，每种呈现出完全不同的产品人格。看起来每套都能用——直到我追了一个问题：换一个 IA 还成立吗？把 Playful 放进数据 dashboard，把 AI Gradient 放进支付流程——感觉立刻不对了。",
    blurbEn:
      "Nine token profiles, one HTML structure — each presenting a completely different product personality. They all seemed valid, until I asked: what if this weren't a landing page? Move Playful into a data dashboard, drop AI Gradient into a payment flow — the wrongness is immediate.",
    variants: [
      { platform: "wechat", url: "https://mp.weixin.qq.com/s/7I7MCgEYu_M3BvahqVHbKg" },
      {
        platform: "devto",
        url: "https://dev.to/yuki-uix/built-a-token-switcher-with-9-profiles-they-all-worked-that-made-me-ask-questions-2f6a",
        title: "Built a token switcher with 9 profiles. They all worked. That made me ask questions.",
        lang: "en",
      },
    ],
    featured: true,
  },
  {
    slug: "seo-google-chain-audit",
    source: "external",
    title: "你的页面对 Google 来说不存在 —— 一次微前端 SEO 链路排查",
    titleEn: "Your Page Doesn't Exist to Google — A Micro-Frontend SEO Post-mortem",
    topics: ["frontend"],
    publishedAt: "2026-05-03",
    coverImage: "/images/articles/seo-google-chain-four-layers.png",
    coverAlt: "插图：四层纵向栈，第三层断裂，比喻 SEO 链路中的渲染断点",
    blurb:
      "不是排名低，是页面对 Google 完全不存在。这篇记录了一次微前端项目的完整 SEO 排查过程，以及从中整理出的四层诊断框架：链接发现、可访问性、内容渲染、语义理解。断点找错了层，改再多也没用。",
    blurbEn:
      "Not low-ranking — completely invisible to Google. A micro-frontend SEO post-mortem and a four-layer diagnostic framework: link discovery, accessibility, content rendering, semantic understanding. Fix the wrong layer and nothing changes.",
    variants: [
      {
        platform: "juejin",
        url: "https://juejin.cn/post/7635275904798326838",
        title: "你的页面对 Google 来说不存在 —— 一次微前端 SEO 链路排查",
      },
      {
        platform: "wechat",
        url: "https://mp.weixin.qq.com/s/83A4fxu6dG6LHySt8-O9tg",
        title: "你的页面对 Google 来说不存在 —— 一次 SEO 链路排查",
      },
    ],
    featured: true,
  },
  {
    slug: "scroll-restoration-double-raf",
    source: "external",
    title: "双 RAF + MutationObserver：微前端跳转后的滚动复原完整方案",
    titleEn: "Double RAF + MutationObserver: Scroll Restoration After Micro-Frontend Redirects",
    topics: ["frontend"],
    publishedAt: "2026-05-10",
    coverImage: "/images/articles/micro-frontend-focus.png",
    coverAlt: "插图：两帧之间的边界，节点从暗到亮的状态变化，比喻渲染管线时序",
    blurb:
      "微前端跳转后滚动复原，不是一个 scrollTo 能解决的。状态要活过跳转、元素要出现在 DOM、还要等渲染真正完成——三件事都得在浏览器渲染管线的正确时机触发。「元素在 DOM 里」和「元素画好了」是两个不同的问题，用错 API 就会踩坑。",
    blurbEn:
      "Scroll restoration after a redirect isn't a scroll problem — it's a timing problem. State must survive the jump, the element must appear in the DOM, and it must be fully painted — in that order, at the right moment in the browser rendering pipeline.",
    variants: [
      { platform: "juejin", url: "https://juejin.cn/post/7637770855154548771" },
      {
        platform: "devto",
        url: "https://dev.to/yuki-uix/scroll-restoration-after-micro-frontend-redirects-double-raf-mutationobserver-3h77",
        title: "Scroll Restoration After Micro-Frontend Redirects: Double RAF + MutationObserver",
        lang: "en",
      },
    ],
    featured: true,
  },
  {
    slug: "design-tokens-not-prompts",
    source: "external",
    title: "你让 AI 改的不是 UI，是你从来没做过的那个决定",
    titleEn: "It's Not the UI You're Asking AI to Change — It's the Decision You've Never Made",
    topics: ["ai", "frontend"],
    publishedAt: "2026-05-26",
    coverImage: "/images/articles/how-to-beautify-ui.png",
    coverAlt: "插图：design token 把视觉决策从感觉变成定义，比喻设计系统的本质",
    blurb:
      "功能跑通了，界面差点意思，让 AI 优化，改了十几轮越来越乱——很多人都经历过这个过程。这篇文章记录了我从「prompt 写得不够好」到「原来根本没有设计系统」的认知转变，以及 design token 是怎么把这件事从玄学变成可以被执行的定义。",
    blurbEn:
      "The functionality works, but the interface is lacking. We get AI to optimize it, but after a dozen rounds of revisions, it just gets messier. This article documents my shift in understanding from \"the prompt wasn't written well enough\" to \"there's no design system at all,\" and how design tokens transform this from something mystical into an actionable definition.",
    variants: [
      { platform: "wechat", url: "https://mp.weixin.qq.com/s/zcSAZLYUh05r3De_hjrxFQ" },
      {
        platform: "devto",
        url: "https://dev.to/yuki-uix/i-asked-ai-to-fix-my-ui-20-times-the-problem-wasnt-my-prompts-527j",
        title: "I Asked AI to Fix My UI 20+ Times. The Problem Wasn't My Prompts.",
        lang: "en",
      },
    ],
    featured: true,
  },

  // ── 归档 ──────────────────────────────────────────────
  {
    slug: "agent-demo-to-delivery",
    source: "self",
    bodyLocales: ["zh"],
    title: "我们十分钟就能搭一个 agent，为什么还要几周才能交付",
    titleEn: "We Can Build an Agent in Ten Minutes — Why Does Shipping It Still Take Weeks?",
    topics: ["ai"],
    publishedAt: "2026-08-27",
    blurb:
      "所有人都说搭一个 agent 太快了，也都说 agent 上线怎么这么难——两句都对，说的不是同一件事。这篇拆开从 demo 到交付的那几周：先是发现它会怎么坏，再是定出什么叫「做对了」，最后是每改一次都得重新验一次。成本没有降下来，只是从「写」挪到了「验」，挪过去之后还更贵。",
    blurbEn:
      "Everyone says building an agent has never been faster; everyone also says shipping one is brutally hard. Both are true — they describe different things. This piece unpacks the weeks between demo and delivery: discovering how it fails, defining what \"correct\" means, and re-verifying after every change. The cost didn't drop, it moved from writing to verifying — and got more expensive on the way.",
    featured: false,
  },
  {
    slug: "boutique-vs-grid-ia",
    source: "external",
    title: "「好逛」和「好找」不是同一件事——电商独立站的 IA 取舍",
    titleEn: "\"Easy to Browse\" vs \"Easy to Find\" — IA Trade-offs in E-commerce Storefronts",
    topics: ["ecommerce"],
    publishedAt: "2026-05-07",
    coverImage: "/images/articles/boutique-vs-grid-ia.png",
    coverAlt: "插图：精品店式陈列与电商栅格界面的对照",
    blurb:
      "假期逛精品小店，遇到喜欢的东西直接拿下，完全不费力气。但同样的商品放到网上，打开页面却感觉脑袋嗡嗡的——分类、筛选、产品卡片铺天盖地，反而不知道从哪里看起。同样是挑东西，为什么体验差这么多？这篇文章从这个问题出发，聊聊电商独立站的信息架构设计，以及「好逛」和「好找」背后那个很少被说清楚的取舍。",
    blurbEn:
      "Browsing a boutique feels effortless — shopping the same item online feels overwhelming. This piece unpacks the IA trade-off between \"enjoyable to browse\" and \"easy to find\" in e-commerce storefronts.",
    variants: [
      { platform: "wechat", url: "https://mp.weixin.qq.com/s/OX441mHruOlWVpQx3YdoWQ" },
    ],
    featured: false,
  },
  {
    slug: "cyber-textile-factory-agent",
    source: "external",
    title: "赛博纺织工厂：一个比喻，讲透 AI Agent 工作流的四次进化",
    titleEn: "The Cyber Textile Factory: Four Generations of AI Agent Workflow Design",
    topics: ["ai"],
    publishedAt: "2026-02-27",
    coverImage: "/images/articles/cyber-textile-factory-agent.png",
    coverAlt: "插图：工业织机与数字线程并置，比喻 AI Agent 工作流的四次进化",
    blurb:
      "用纺织工厂改造比喻 Agent 系统的演进——V1 结构化执行，V2 规划反思，V3 记忆管理，V4 安全护栏。能力越强，需要的约束越精密。工程化的关键不在 AI 本身，而在于通过流程设计与安全防护让复杂系统在生产环境里稳定运作。",
    blurbEn:
      "A textile factory metaphor to explain four generations of AI Agent workflow design — from structured execution to planning, memory, and safety guardrails. The more capable the system, the more precise the constraints need to be.",
    variants: [
      { platform: "juejin", url: "https://juejin.cn/post/7611064285586440219" },
    ],
    featured: false,
  },
  {
    slug: "headless-ai-api",
    source: "external",
    title: "当系统「没了头」(headless)，AI 反而更好接手了？",
    titleEn: "When a System Goes Headless, Does AI Take Over More Easily?",
    topics: ["frontend", "ai"],
    publishedAt: "2026-02-19",
    coverImage: "/images/articles/headless-ai-robot-api.png",
    coverAlt: "插图：开顶建筑结构与机器人直连 API 接口，比喻 Headless 架构被 AI 接管",
    blurb:
      "Headless 架构的本质是「只暴露能力接口，不预设 UI 形态」。AI Agent 作为新型消费方，恰好不需要 UI——这让 Headless 成为最易被 AI 接手的系统形态。但 API 设计与治理成本并没有因此消失。",
    blurbEn:
      "Headless architecture exposes capabilities without prescribing UI. AI agents — which don't need UI — turn out to be its ideal consumers. But API governance costs don't disappear; they just shift.",
    variants: [
      { platform: "juejin", url: "https://juejin.cn/post/7607255854146273318" },
    ],
    featured: false,
  },
  {
    slug: "ai-pair-hidden-layer",
    source: "external",
    title: "一张微前端技术卡的 AI 协作复盘：业务之下，还有一层",
    titleEn: "AI Pair Programming Retrospective: There's a Layer Beneath the Business Logic",
    topics: ["frontend", "ai"],
    publishedAt: "2026-05-10",
    coverImage: "/images/articles/looking-layer.png",
    coverAlt: "插图：人向下俯视，地面以下多层地质剖面清晰可见，比喻认知深度决定你能看到的层次",
    blurb:
      "做了一张微前端技术卡，AI 给的代码能跑，但一直有个元素找不到。loop 了三四次才意识到：不是 AI 不行，是我从没给过它业务之下那一层的信息。这篇是对这次 pair coding 的复盘，也是对 AI 协作模式的一次重新想。",
    blurbEn:
      "AI wrote code that ran — but kept missing one element. After a few loops I realized: I'd never given it the layer beneath the business logic. A reflection on what context actually means in AI pair programming.",
    variants: [
      { platform: "wechat", url: "https://mp.weixin.qq.com/s/ZiGE1HKMhjBxiWETbTbJ2Q" },
    ],
    featured: false,
  },
  {
    slug: "baoyu-skills-design-patterns",
    source: "external",
    title: "用设计系统的眼光读 baoyu-skills 源码，发现了三个熟悉的模式",
    titleEn: "Reading baoyu-skills Source Code Through a Design Systems Lens — Three Familiar Patterns",
    topics: ["ai", "frontend"],
    publishedAt: "2026-05-31",
    coverImage: "/images/articles/baoyu-skills-layers.png",
    coverAlt: "插图：三层架构示意，token 参数层、级联优先级层、不可变输出层，比喻 baoyu-skills 的工程设计模式",
    blurb:
      "我想用 baoyu-skills 生成技术讲解图，第一张信息密度不够，说不清该怎么调。试着去问参数系统为什么，结果读进了 SKILL.md 源码，发现它在做三件设计系统里很熟悉的事：design token 的正交参数、CSS 的优先级级联、migration 文件的不可变性。",
    blurbEn:
      "I wanted to adjust an infographic but couldn't explain what was wrong. Reading the SKILL.md source to find out, I found three patterns straight out of design systems: orthogonal parameters like design tokens, a priority cascade like CSS specificity, and immutable outputs like migration files.",
    variants: [
      { platform: "wechat", url: "https://mp.weixin.qq.com/s/YSckbphLlJbh6DMwzplLXg" },
    ],
    featured: false,
  },
  {
    slug: "filters-to-shopping-agent",
    source: "external",
    title: "筛选器解决不了的问题，Agent 从这里开始",
    titleEn: "When Filters Fail: Where AI Shopping Agents Begin",
    topics: ["ecommerce", "ai"],
    publishedAt: "2026-04-06",
    coverImage: "/images/articles/agent-filter-notebook-flatlay.png",
    coverAlt: "插图：俯视 flat lay，打开的方格笔记本与墨水、胶带、笔等文具",
    blurb:
      "用户在筛选器里反复试探，点了又清空，清空了又重来——这不是用户的问题，是筛选器语言和意图语言之间的翻译鸿沟。这篇文章在聊AI导购Agent怎样填上这道鸿沟，以及什么时候介入、如何优雅退出。",
    variants: [
      { platform: "wechat", url: "https://mp.weixin.qq.com/s/0cYIyTyU8XbWh4epNTGQqw" },
    ],
    featured: false,
  },
  {
    slug: "seo-vs-geo-ai-search",
    source: "external",
    title: "SEO 做好了，为什么 AI 还是搜不到你的页面？",
    titleEn: "Your SEO Is Fine — So Why Can't AI Search Find Your Page?",
    topics: ["frontend", "ai"],
    publishedAt: "2026-05-05",
    coverImage: "/images/articles/seo-vs-geo-ai-search.png",
    coverAlt: "插图：传统搜索场景下的文档与 AI 搜索中的问号",
    blurb:
      "上一篇排查完 SEO 三个断点，以为可以收工了。但后来想到一个问题：修好这些，用 AI 搜得到吗？去查了一下，发现 SEO 和 GEO 是两套完全不同的标准——Googlebot 会等 JS 执行，AI 爬虫不会。",
    variants: [
      { platform: "wechat", url: "https://mp.weixin.qq.com/s/iUC_p9gGz9lA5LMSszDNYQ" },
    ],
    featured: false,
  },
  {
    slug: "hackathon-ai-capability-boundary",
    source: "external",
    title: "AI 能做什么，不能做什么：一次 Hackathon 复盘的真实答案",
    titleEn: "What AI Can and Can't Do: Honest Answers from a Hackathon Retrospective",
    topics: ["ai"],
    publishedAt: "2026-04-29",
    coverImage: "/images/articles/hackathon-ai-capabilities-brain.png",
    coverAlt: "插图：左右分半的大脑，对比 AI 的能力边界与人机交互",
    blurb:
      "不是所有问题都适合 AI 解决。这篇文章从一次 Hackathon 复盘出发，用「缺失的反馈回路」这个概念，解释为什么大奖项目能拿大奖——以及怎么找到你自己领域里真正值得用 AI 解决的问题。",
    variants: [
      { platform: "wechat", url: "https://mp.weixin.qq.com/s/cvBMXhEQ5PCSRncBPsJVtg" },
    ],
    featured: false,
  },
  {
    slug: "time-stacked-into-space",
    source: "external",
    title: "把时间垒进空间里——如何让 AI 读懂消失的用户轨迹",
    titleEn: "Stacking Time into Space: Helping AI Read Invisible User Journeys",
    topics: ["ecommerce", "ai"],
    publishedAt: "2026-04-04",
    coverImage: "/images/articles/time-stacked-space-heatmap.png",
    coverAlt: "插图：平面布局上的彩色行为气泡热力图",
    blurb:
      "互联网打破了空间的边界，AI 正在打破时间的边界。这篇文章用「把时间垒进空间里」这一意象，将用户行为数据还原成发光的粒子轨迹——帮你重新理解动线、流失与增长背后，那张从未被完整看见的图。",
    variants: [
      { platform: "wechat", url: "https://mp.weixin.qq.com/s/z-yCjuYR-Hq35w9BCJkpKA" },
    ],
    featured: false,
  },
  {
    slug: "websocket-second-half",
    source: "external",
    title: "WebSocket 连上了，然后呢？聊聊实时数据的「后半场」",
    titleEn: "WebSocket Connected — Now What? The Second Half of Real-Time Data",
    topics: ["frontend"],
    publishedAt: "2026-02-25",
    variants: [
      { platform: "juejin", url: "https://juejin.cn/post/7610160716067569674" },
    ],
    featured: false,
  },
  {
    slug: "spec-driven-hackathon",
    source: "external",
    title: "用 AI 解决项目痛点：一个前端开发者的 Hackathon 实录",
    titleEn: "Using AI to Solve Real Dev Pain Points: A Frontend Hackathon Story",
    topics: ["ai"],
    publishedAt: "2026-03-22",
    blurb:
      "GitLab AI Hackathon 参赛记录。用 TypeScript 构建 spec-driven 系统，以「规格鸿沟」为切入点——业务逻辑在产品、设计、开发之间反复翻译导致的失真。单一数据源让 AI 自动生成代码、测试与文档。",
    variants: [
      { platform: "juejin", url: "https://juejin.cn/post/7619524626254970921" },
      {
        platform: "devto",
        url: "https://dev.to/yuki-uix/how-i-solved-my-own-pain-point-with-ai-a-frontend-devs-gitlab-hackathon-diary-5a00",
        title: "How I Solved My Own Pain Point with AI: A Frontend Dev's GitLab Hackathon Diary",
        lang: "en",
      },
    ],
    featured: false,
  },
  {
    slug: "array-reduce-deep-dive",
    source: "self",
    bodyLocales: ["en"],
    title: "Deep Dive into Array.reduce(): From Interview Questions to Design Thinking",
    topics: ["frontend"],
    publishedAt: "2026-02-24",
    blurb:
      "Why does reduce() appear in interviews but rarely in real projects? This piece reframes it as a paradigm for data transformation — \"reductive thinking\" — and walks through aggregation, restructuring, function composition, and sequential async patterns.",
    variants: [
      {
        platform: "devto",
        url: "https://dev.to/yuki-uix/deep-dive-into-arrayreduce-from-interview-questions-to-design-thinking-15ih",
        lang: "en",
      },
    ],
    featured: false,
  },
];
