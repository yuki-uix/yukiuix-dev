import { projects } from "@/data/projects";

export default function Projects() {
  return (
    <section
      id="projects"
      className="relative border-t border-structure mx-auto max-w-6xl scroll-mt-24 px-4 pb-16 pt-10 sm:px-6 sm:pt-12 lg:px-8"
      aria-labelledby="projects-heading"
    >
      <h2
        id="projects-heading"
        className="border-l-[3px] border-primary pl-2.5 font-mono text-[11px] tracking-[0.14em] text-primary"
      >
        项目
      </h2>
      <p className="mt-2 text-sm font-medium text-ink">精选项目与实验</p>

      <ul className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((p) => (
          <li key={p.title}>
            <article className="group flex h-full flex-col border border-hairline bg-white p-6 shadow-sm transition-transform duration-200 hover:-translate-y-0.5 hover:border-primary hover:shadow-md">
              <h3 className="text-lg font-semibold text-ink transition-colors group-hover:text-primary">{p.title}</h3>
              <p className="mt-2 font-mono text-[11px] tracking-wide text-muted transition-colors group-hover:text-primary">
                {p.tag}
              </p>
              <p className="mt-4 flex-1 text-sm leading-relaxed text-muted">
                {p.description}
              </p>
              <div className="mt-6 flex flex-wrap gap-4 font-mono text-xs">
                <a
                  href={p.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary transition-colors group-hover:text-ink"
                >
                  Demo →
                </a>
                <a
                  href={p.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted transition-colors group-hover:text-primary"
                >
                  GitHub
                </a>
              </div>
            </article>
          </li>
        ))}
      </ul>
    </section>
  );
}
