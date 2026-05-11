export type Project = {
  title: string;
  tag: string;
  description: { zh: string; en: string };
  demoUrl: string;
  githubUrl: string;
  articleUrl?: string;
};

export const projects: Project[] = [
  {
    title: "Brooch Shop",
    tag: "AI AGENT · E-COMMERCE",
    description: {
      zh: "筛选器解决不了的问题，Agent 从这里开始。用 Claude API + tool calling 构建的 AI 导购 agent，演示自然语言意图理解如何替代传统多级筛选。",
      en: "Where filters fall short, agents begin. An AI shopping agent built with Claude API and tool calling — demonstrating how natural-language intent understanding replaces multi-level filter UX.",
    },
    demoUrl: "https://brooch-shop.vercel.app/",
    githubUrl: "https://github.com/yuki-uix/brooch-shop",
    articleUrl: "https://mp.weixin.qq.com/s/0cYIyTyU8XbWh4epNTGQqw",
  },
  {
    title: "Prompt Shop",
    tag: "CHECKOUT · STRIPE",
    description: {
      zh: "完整电商购物流程实验场，Stripe Checkout 集成，覆盖从商品列表到支付完成的全链路。",
      en: "End-to-end e-commerce checkout playground with Stripe integration — covering the full flow from product listing to payment confirmation.",
    },
    demoUrl: "https://prompt-shop-one.vercel.app/",
    githubUrl: "https://github.com/yuki-uix/prompt-shop",
  },
  {
    title: "Human vs AI Judge",
    tag: "AI · GAME · E-COMMERCE",
    description: {
      zh: "当 AI 已经做出判断，谁来按那个确认键？与 AI 同场竞技，对真实电商售后工单做意图分类，实时对比人类、Claude、GPT 三方判断差异。",
      en: "When AI has already decided, who presses confirm? Compete with AI on intent classification of real e-commerce support tickets — compare human, Claude, and GPT judgments in real time.",
    },
    demoUrl: "https://post-agent-game.vercel.app/",
    githubUrl: "https://github.com/yuki-uix/post-agent-game",
    articleUrl: "https://juejin.cn/post/7624378354167398451",
  },
  {
    title: "Particle Flow Generator",
    tag: "CANVAS · SIMULATION",
    description: {
      zh: "把时间垒进空间里。用粒子流模拟用户轨迹的空间残留——Canvas 2D 实时渲染，BFS 流场寻路，支持参数调节与 GIF 导出。",
      en: "Stacking time into space. Simulating the spatial residue of user trajectories with particle flows — Canvas 2D real-time rendering, BFS flow-field pathfinding, live parameter tuning and GIF export.",
    },
    demoUrl: "https://particle-flow-generator.vercel.app/",
    githubUrl: "https://github.com/yuki-uix/particle-flow-generator",
    articleUrl: "https://mp.weixin.qq.com/s/z-yCjuYR-Hq35w9BCJkpKA",
  },
];
