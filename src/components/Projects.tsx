import { FaArrowUpRightFromSquare, FaCheck, FaGithub } from "react-icons/fa6";
import { portfolioPreferences, projects } from "@/lib/portfolio";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

const MAX_FEATURES = 4;

export default function Projects() {
  return (
    <section id="projects" className="py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="Projects"
          title="Selected work"
          description="Applications I have designed and built, from market-price tools to workout planners."
        />

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {projects.map((project, index) => {
            const features = project.features.slice(0, MAX_FEATURES);
            const title = project.shortName ?? project.name;
            const repositoryUrl = project.githubLink ?? project.repositoryUrl;

            return (
              <Reveal key={project.id} delay={index * 80} className="h-full">
                <article className="group/card relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent/60 hover:shadow-xl">
                  <span
                    aria-hidden
                    className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-accent via-accent-2 to-accent-3 opacity-0 transition-opacity duration-300 group-hover/card:opacity-100"
                  />
                  <span
                    aria-hidden
                    className="absolute top-5 right-6 text-sm font-bold text-muted-foreground/30"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  {project.category ? (
                    <p className="text-xs font-semibold tracking-[0.15em] text-accent uppercase">
                      {project.category}
                    </p>
                  ) : null}

                  <h3 className="mt-2 text-xl font-bold">{title}</h3>

                  {project.name !== title ? (
                    <p className="mt-1 text-sm text-muted-foreground">{project.name}</p>
                  ) : null}

                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {project.description ?? "Full details for this project are coming soon."}
                  </p>

                  {features.length > 0 ? (
                    <ul className="mt-5 space-y-2 text-sm text-muted-foreground">
                      {features.map((feature) => (
                        <li key={feature} className="flex gap-2">
                          <FaCheck aria-hidden className="mt-1 h-3 w-3 shrink-0 text-accent" />
                          <span>{feature}</span>
                        </li>
                      ))}
                      {project.features.length > MAX_FEATURES ? (
                        <li className="text-xs text-muted-foreground/80">
                          +{project.features.length - MAX_FEATURES} more features
                        </li>
                      ) : null}
                    </ul>
                  ) : null}

                  <ul className="mt-5 flex flex-wrap gap-2">
                    {project.technologies.map((technology) => (
                      <li
                        key={technology}
                        className="rounded-full bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground"
                      >
                        {technology}
                      </li>
                    ))}
                  </ul>

                  {((portfolioPreferences.showProjectLiveLinks && project.liveUrl) ||
                    repositoryUrl) && (
                    <div className="mt-auto flex flex-wrap gap-3 pt-6">
                      {portfolioPreferences.showProjectLiveLinks && project.liveUrl ? (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 rounded-full bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground transition-transform duration-300 hover:-translate-y-0.5"
                        >
                          <FaArrowUpRightFromSquare aria-hidden className="h-3.5 w-3.5" />
                          Live demo
                        </a>
                      ) : null}

                      {repositoryUrl ? (
                        <a
                          href={repositoryUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-semibold transition-colors duration-300 hover:border-accent hover:text-accent"
                        >
                          <FaGithub aria-hidden className="h-4 w-4" />
                          Code
                        </a>
                      ) : null}
                    </div>
                  )}
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
