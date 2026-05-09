"use client";

import Link from "next/link";
import { useState } from "react";

const links = [
  { href: "#projects", label: "项目" },
  { href: "#writing", label: "文章" },
  { href: "#about", label: "关于" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b-2 border-structure bg-canvas">
      <nav className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-4 py-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="font-mono text-[15px] font-medium tracking-tight text-ink"
          onClick={() => setOpen(false)}
        >
          yuki<span className="text-primary">.uix</span>
        </Link>

        <div className="hidden md:flex md:items-center md:gap-8">
          {links.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              className="text-sm font-medium text-muted transition-colors hover:text-primary-hover"
            >
              {label}
            </a>
          ))}
        </div>

        <button
          type="button"
          className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 border-[0.5px] border-hairline md:hidden"
          aria-expanded={open}
          aria-label={open ? "关闭菜单" : "打开菜单"}
          onClick={() => setOpen((v) => !v)}
        >
          <span
            className={`block h-[0.5px] w-5 bg-ink transition-transform ${open ? "translate-y-[3.5px] rotate-45" : ""}`}
          />
          <span
            className={`block h-[0.5px] w-5 bg-ink transition-opacity ${open ? "opacity-0" : ""}`}
          />
          <span
            className={`block h-[0.5px] w-5 bg-ink transition-transform ${open ? "-translate-y-[3.5px] -rotate-45" : ""}`}
          />
        </button>
      </nav>

      {open ? (
        <div className="border-b-2 border-structure bg-canvas px-4 py-4 md:hidden">
          <ul className="flex flex-col gap-4">
            {links.map(({ href, label }) => (
              <li key={href}>
                <a
                  href={href}
                  className="block text-sm text-muted transition-colors hover:text-primary-hover"
                  onClick={() => setOpen(false)}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </header>
  );
}
