import { projects } from "@/data/projects";

export default function Projects() {
  return (
    <section
      id="projects"
      className="relative mx-auto max-w-6xl scroll-mt-24 px-4 pb-20 pt-12 sm:px-6 sm:pt-14 lg:px-8"
      aria-labelledby="projects-heading"
    >
      <h2
        id="projects-heading"
        className="font-mono text-[11px] tracking-[0.14em] text-primary-hover"
      >
        项目
      </h2>
      <p className="mt-2 text-sm text-muted">精选项目与实验</p>

      <ul className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((p) => (
          <li key={p.title}>
            <article className="flex h-full flex-col border-[0.5px] border-hairline bg-canvas p-6 transition-transform duration-200 hover:-translate-y-0.5 hover:border-primary">
              <h3 className="text-lg font-medium text-ink">{p.title}</h3>
              <p className="mt-2 font-mono text-[11px] tracking-wide text-muted">
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
                  className="text-primary transition-colors hover:text-primary-hover"
                >
                  Demo →
                </a>
                <a
                  href={p.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted transition-colors hover:text-primary-hover"
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
