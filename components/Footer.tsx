const social = [
  { label: "GitHub", href: "https://github.com/yuki-uix" },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/kunyu-xu/",
  },
  {
    label: "掘金",
    href: "https://juejin.cn/user/3582625834347100",
  },
  { label: "yuki.uix@gmail.com", href: "mailto:yuki.uix@gmail.com" },
];

export default function Footer() {
  return (
    <footer className="relative border-t-2 border-structure bg-canvas">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <p className="font-mono text-sm font-medium text-muted">yukiuix.com · 2026</p>
        <ul className="flex flex-wrap gap-x-6 gap-y-2">
          {social.map((s) => (
            <li key={s.label}>
              <a
                href={s.href}
                target={s.href.startsWith("mailto:") ? undefined : "_blank"}
                rel={
                  s.href.startsWith("mailto:")
                    ? undefined
                    : "noopener noreferrer"
                }
                className="text-sm font-medium text-muted transition-colors hover:text-primary-hover"
              >
                {s.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
