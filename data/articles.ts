export type Article = {
  title: string;
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
  /** 发布平台 */
  platform?: "juejin" | "wechat";
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
    title: "「好逛」和「好找」不是同一件事——电商独立站的 IA 取舍",
    publishedAt: "2026-05-07",
    url: "https://mp.weixin.qq.com/s/OX441mHruOlWVpQx3YdoWQ",
    coverImage: "/images/articles/boutique-vs-grid-ia.png",
    coverAlt: "插图：精品店式陈列与电商栅格界面的对照",
    blurb:
      "假期逛精品小店，遇到喜欢的东西直接拿下，完全不费力气。但同样的商品放到网上，打开页面却感觉脑袋嗡嗡的——分类、筛选、产品卡片铺天盖地，反而不知道从哪里看起。同样是挑东西，为什么体验差这么多？这篇文章从这个问题出发，聊聊电商独立站的信息架构设计，以及「好逛」和「好找」背后那个很少被说清楚的取舍。",
    platform: "wechat",
    featured: true,
  },
  {
    title: "赛博纺织工厂：一个比喻，讲透 AI Agent 工作流的四次进化",
    publishedAt: "2026-02-27",
    url: "https://juejin.cn/post/7611064285586440219",
    blurb:
      "用纺织工厂改造比喻 Agent 系统的演进——V1 结构化执行，V2 规划反思，V3 记忆管理，V4 安全护栏。能力越强，需要的约束越精密。工程化的关键不在 AI 本身，而在于通过流程设计与安全防护让复杂系统在生产环境里稳定运作。",
    platform: "juejin",
    featured: true,
  },
  {
    title: "当系统「没了头」(headless)，AI 反而更好接手了？",
    publishedAt: "2026-02-19",
    url: "https://juejin.cn/post/7607255854146273318",
    blurb:
      "Headless 架构的本质是「只暴露能力接口，不预设 UI 形态」。AI Agent 作为新型消费方，恰好不需要 UI——这让 Headless 成为最易被 AI 接手的系统形态。但 API 设计与治理成本并没有因此消失。",
    platform: "juejin",
    featured: true,
  },
  {
    title: "你的页面对 Google 来说不存在 —— 一次微前端 SEO 链路排查",
    publishedAt: "2026-05-03",
    url: "https://juejin.cn/post/7635275904798326838",
    blurb:
      "不是排名低，是页面对 Google 完全不存在。这篇记录了一次微前端项目的完整 SEO 排查过程，以及从中整理出的四层诊断框架：链接发现、可访问性、内容渲染、语义理解。断点找错了层，改再多也没用。",
    platform: "juejin",
    featured: true,
  },

  // ── 归档（/writing 页面建好后展示）────────────────────
  {
    title: "筛选器解决不了的问题，Agent 从这里开始",
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
    publishedAt: "2026-02-25",
    url: "https://juejin.cn/post/7610160716067569674",
    platform: "juejin",
    featured: false,
  },
];
