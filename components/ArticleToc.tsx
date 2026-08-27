"use client";

import { useEffect, useState } from "react";

import type { Heading } from "@/lib/headings";

/**
 * 长文目录。
 *
 * 这篇正文 7 个 h2、15 个 h3、手机上三万多像素高，读者原先是盲滚的：
 * 中途离开回不到原位，也没法给出某一节的链接。
 *
 * 两种形态，同一份数据：
 * - xl 以上放进左边距（正文固定 48rem 居中，两侧本来就空着）
 * - 以下收成 `<details>`，原生开合，不等 hydration 也能用
 */
export default function ArticleToc({
  headings,
  label,
}: {
  headings: Heading[];
  label: string;
}) {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const nodes = headings
      .map((h) => document.getElementById(h.id))
      .filter((n): n is HTMLElement => n !== null);
    if (nodes.length === 0) return;

    /**
     * 按位置直接算，不用 IntersectionObserver。
     *
     * IO 只在标题「穿过」观察带的那一刻回调。跳转式的滚动——点目录、
     * 带 hash 进来、快速拖滚动条——标题根本不经过那条带，于是一个回调
     * 都不触发，高亮永远是空的。实测就是这样：滚到 9000px，进度条 39.6%，
     * 高亮 null。改成每帧取当前位置，跳到哪儿都算得出来。
     */
    const NAV = 88; // 与 html 的 scroll-padding-top 一致
    let frame = 0;
    const measure = () => {
      frame = 0;
      let current = "";
      for (const n of nodes) {
        if (n.getBoundingClientRect().top - NAV <= 1) current = n.id;
        else break;
      }
      // 还没滚到第一个标题时，高亮第一节而不是留空
      setActiveId(current || nodes[0].id);
    };
    const onScroll = () => {
      if (frame === 0) frame = requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [headings]);

  if (headings.length === 0) return null;

  const list = (
    <ol className="space-y-1.5">
      {headings.map((h) => {
        const active = h.id === activeId;
        return (
          <li key={h.id} className={h.depth === 3 ? "pl-3" : ""}>
            <a
              href={`#${h.id}`}
              aria-current={active ? "location" : undefined}
              className={`block border-l-[1.5px] py-0.5 pl-2.5 leading-snug transition-colors ${
                active
                  ? "border-primary text-primary"
                  : "border-transparent text-muted hover:text-ink"
              } ${h.depth === 3 ? "text-[11px]" : "text-xs"}`}
            >
              {h.text}
            </a>
          </li>
        );
      })}
    </ol>
  );

  return (
    <>
      {/* 窄屏：正文上方的折叠块 */}
      <details className="mt-8 border-[0.5px] border-hairline px-4 py-3 xl:hidden">
        <summary className="cursor-pointer font-mono text-xs tracking-[0.08em] text-muted marker:text-hairline">
          {label}
        </summary>
        <nav className="mt-3" aria-label={label}>
          {list}
        </nav>
      </details>

      {/* xl 以上：钉在正文左侧的空白里。
          left = 50% − 正文半宽(24rem) − 目录宽+间距(14rem) */}
      <nav
        aria-label={label}
        className="fixed top-28 hidden max-h-[calc(100vh-9rem)] w-52 overflow-y-auto xl:block"
        style={{ left: "calc(50% - 24rem - 14rem)" }}
      >
        <p className="mb-3 font-mono text-[11px] tracking-[0.14em] text-muted">
          {label}
        </p>
        {list}
      </nav>
    </>
  );
}
