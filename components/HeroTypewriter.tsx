"use client";

import { useEffect, useRef, useState } from "react";
import type { TypewriterClass } from "typewriter-effect";

type Copy = {
  prefix: string; first: string; second: string; final: string;
  label: string; pause: string; resume: string; replay: string;
};

export default function HeroTypewriter({ copy }: { copy: Copy }) {
  const target = useRef<HTMLSpanElement>(null);
  const writer = useRef<TypewriterClass | null>(null);
  const [status, setStatus] = useState<"static" | "playing" | "paused" | "done">("static");
  const [run, setRun] = useState(0);

  useEffect(() => {
    const element = target.current;
    if (!element) return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let cancelled = false;
    const showStatic = () => {
      writer.current?.stop();
      writer.current = null;
      element.textContent = copy.prefix + copy.final;
      setStatus("static");
    };
    const start = async () => {
      if (preference.matches) { showStatic(); return; }
      try {
        const { default: TypewriterCore } = await import("typewriter-effect/dist/core");
        if (cancelled || preference.matches) return;
        element.textContent = "";
        const instance = new TypewriterCore(element, {
          delay: 65, deleteSpeed: 32, cursor: "▍", loop: false,
          skipAddStyles: true,
        });
        writer.current = instance;
        setStatus("playing");
        instance.typeString(copy.prefix).typeString(copy.first)
          .pauseFor(850).deleteChars(Array.from(copy.first).length)
          .typeString(copy.second).pauseFor(1000)
          .deleteChars(Array.from(copy.second).length)
          .typeString(copy.final)
          .callFunction(() => { if (!cancelled) setStatus("done"); })
          .start();
      } catch { if (!cancelled) showStatic(); }
    };
    const onPreference = () => {
      // Switching motion preferences ends this run; replay remains opt-in.
      showStatic();
    };
    preference.addEventListener("change", onPreference);
    void start();
    return () => {
      cancelled = true;
      preference.removeEventListener("change", onPreference);
      writer.current?.stop();
      writer.current = null;
    };
  }, [copy, run]);

  const toggle = () => {
    if (status === "playing") { writer.current?.stop(); setStatus("paused"); }
    else if (status === "paused") { writer.current?.start(); setStatus("playing"); }
    else setRun((value) => value + 1);
  };

  return (
    <div className="mt-7 max-w-2xl border-l-2 border-primary pl-4">
      <div className="mb-2 flex items-center gap-4 font-mono text-xs text-muted">
        <span>{copy.label}</span>
        {status !== "static" && (
          <button type="button" onClick={toggle} className="underline decoration-hairline underline-offset-4 hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary">
            {status === "playing" ? copy.pause : status === "paused" ? copy.resume : copy.replay}
          </button>
        )}
      </div>
      <p className="relative font-mono text-sm leading-7 text-primary sm:text-base">
        <span className="sr-only">{copy.prefix}{copy.final}</span>
        <span aria-hidden="true" className="invisible block">{copy.prefix}{copy.final}</span>
        <span aria-hidden="true" ref={target} data-state={status} className="hero-typewriter absolute inset-0">{copy.prefix}{copy.final}</span>
      </p>
    </div>
  );
}
