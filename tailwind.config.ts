import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./data/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        /* avoid naming tokens `bg` / `text` / `border` — they collide with Tailwind utility namespaces */
        canvas: "var(--color-bg)",
        primary: "var(--color-primary)",
        "primary-hover": "var(--color-primary-hover)",
        ink: "var(--color-text)",
        muted: "var(--color-text-muted)",
        hairline: "var(--color-border)",
      },
      fontFamily: {
        sans: [
          "var(--font-dm-sans)",
          "PingFang SC",
          "Hiragino Sans GB",
          "Microsoft YaHei",
          "sans-serif",
        ],
        mono: ["var(--font-dm-mono)", "ui-monospace", "monospace"],
      },
    },
  },
  plugins: [],
};
export default config;
