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
    title: "IA 结构演示",
    tag: "IA · INTERACTIVE",
    description: "切换三种电商导航结构",
    demoUrl: "https://yuki-uix.github.io/yukiss-store/ia-demo.html",
    githubUrl: "https://github.com/yuki-uix/yukiss-store",
  },
];
