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
];
