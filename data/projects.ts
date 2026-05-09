export type Project = {
  title: string;
  tag: string;
  description: string;
  demoUrl: string;
  githubUrl: string;
};

export const projects: Project[] = [
  {
    title: "Brooch Shop",
    tag: "AI · E-COMMERCE",
    description: "AI 导购 agent，tool calling，Claude API",
    demoUrl: "https://brooch-shop.vercel.app/",
    githubUrl: "https://github.com/yuki-uix/brooch-shop",
  },
  {
    title: "Prompt Shop",
    tag: "CHECKOUT · STRIPE",
    description: "完整购物流程，Stripe Checkout",
    demoUrl: "https://prompt-shop-one.vercel.app/",
    githubUrl: "https://github.com/yuki-uix/prompt-shop",
  },
  {
    title: "Human vs AI Judge",
    tag: "AI · GAME · E-COMMERCE",
    description: "与 AI 同场竞技，对真实电商售后工单做意图分类，实时对比三方判断差异",
    demoUrl: "https://post-agent-game.vercel.app/",
    githubUrl: "https://github.com/yuki-uix/post-agent-game",
  },
  {
    title: "Particle Flow Generator",
    tag: "CANVAS · SIMULATION",
    description: "粒子流模拟实验场，Canvas 2D 实时渲染；传送门 + BFS 流场绕墙寻路，支持参数实时调节与 GIF 导出",
    demoUrl: "https://particle-flow-generator.vercel.app/",
    githubUrl: "https://github.com/yuki-uix/particle-flow-generator",
  },
];
