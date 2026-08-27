"use client";

import { useEffect, useState } from "react";

/**
 * 顶部 2px 进度条。
 *
 * 35 分钟的文章，读者需要知道自己在哪儿——滚动条在 macOS 上默认是隐藏的，
 * 指望不上。量的是正文本身走完了多少，不是整页：页脚和「更多文章」不该
 * 算进阅读进度，否则读到正文结尾时进度条还差一截，反而让人以为没读完。
 */
export default function ReadingProgress({ targetId }: { targetId: string }) {
  const [pct, setPct] = useState(0);

  useEffect(() => {
    const el = document.getElementById(targetId);
    if (!el) return;

    let frame = 0;
    const measure = () => {
      frame = 0;
      const rect = el.getBoundingClientRect();
      // 正文顶端进入视口上沿算 0，底端离开视口上沿算 100
      const total = rect.height - window.innerHeight;
      if (total <= 0) {
        setPct(100);
        return;
      }
      const scrolled = -rect.top;
      setPct(Math.min(100, Math.max(0, (scrolled / total) * 100)));
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
  }, [targetId]);

  return (
    <div
      className="fixed inset-x-0 top-0 z-50 h-0.5 bg-transparent"
      aria-hidden
    >
      <div
        className="h-full bg-primary transition-[width] duration-75 ease-out"
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}
