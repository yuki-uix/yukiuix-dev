"use client";

import { useState, useRef, useCallback } from "react";

interface Props {
  text: string;
  className?: string;
}

/**
 * Shows a fixed-position tooltip with the full text on hover.
 * Uses position:fixed so it escapes overflow:hidden carousel containers.
 */
export default function DescTooltip({ text, className }: Props) {
  const ref = useRef<HTMLParagraphElement>(null);
  const [rect, setRect] = useState<DOMRect | null>(null);

  const show = useCallback(() => {
    setRect(ref.current?.getBoundingClientRect() ?? null);
  }, []);

  const hide = useCallback(() => setRect(null), []);

  return (
    <>
      <p ref={ref} className={className} onMouseEnter={show} onMouseLeave={hide}>
        {text}
      </p>

      {rect && (
        <div
          style={{
            position: "fixed",
            top: rect.bottom + 8,
            left: rect.left,
            width: Math.min(rect.width + 48, 380),
            zIndex: 9999,
            pointerEvents: "none",
          }}
          className="bg-ink px-3 py-2.5 text-xs leading-relaxed text-white shadow-xl"
        >
          {text}
        </div>
      )}
    </>
  );
}
