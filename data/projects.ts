export type Project = {
  title: string;
  tag: string;
  description: { zh: string; en: string };
  demoUrl: string;
  githubUrl: string;
};

export const projects: Project[] = [
  {
    title: "Brooch Shop",
    tag: "AI · E-COMMERCE",
    description: {
      zh: "AI 导购 agent，tool calling，Claude API",
      en: "AI shopping agent with tool calling and Claude API",
    },
    demoUrl: "https://brooch-shop.vercel.app/",
    githubUrl: "https://github.com/yuki-uix/brooch-shop",
  },
  {
    title: "Prompt Shop",
    tag: "CHECKOUT · STRIPE",
    description: {
      zh: "完整购物流程，Stripe Checkout",
      en: "Full purchase flow with Stripe Checkout",
    },
    demoUrl: "https://prompt-shop-one.vercel.app/",
    githubUrl: "https://github.com/yuki-uix/prompt-shop",
  },
  {
    title: "Human vs AI Judge",
    tag: "AI · GAME · E-COMMERCE",
    description: {
      zh: "与 AI 同场竞技，对真实电商售后工单做意图分类，实时对比三方判断差异",
      en: "Compete with AI on intent classification of real e-commerce support tickets — compare all three judgments in real time",
    },
    demoUrl: "https://post-agent-game.vercel.app/",
    githubUrl: "https://github.com/yuki-uix/post-agent-game",
  },
  {
    title: "Particle Flow Generator",
    tag: "CANVAS · SIMULATION",
    description: {
      zh: "粒子流模拟实验场，Canvas 2D 实时渲染；传送门 + BFS 流场绕墙寻路，支持参数实时调节与 GIF 导出",
      en: "Particle flow simulation playground with Canvas 2D real-time rendering; portal + BFS flow-field pathfinding, live parameter tuning and GIF export",
    },
    demoUrl: "https://particle-flow-generator.vercel.app/",
    githubUrl: "https://github.com/yuki-uix/particle-flow-generator",
  },
];
