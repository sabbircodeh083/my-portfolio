"use client";

import { useState } from "react";
import {
  FaArrowLeft,
  FaArrowRight,
  FaArrowUpRightFromSquare,
  FaCheck,
  FaGithub,
} from "react-icons/fa6";
import { portfolioPreferences, projects } from "@/lib/portfolio";
import { useSwipe } from "@/lib/useSwipe";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

const MAX_FEATURES = 4;

const arrowClass =
  "flex h-11 w-11 items-center justify-center rounded-full bg-accent text-accent-foreground shadow-lg shadow-accent/30 transition-all duration-300 hover:-translate-y-1";

export default function Projects() {
  const [activeIndex, setActiveIndex] = useState(0);
  const total = projects.length;

  /** Moves one project, stopping at both ends instead of wrapping. */
  function step(offset: -1 | 1) {
    setActiveIndex((current) => Math.min(Math.max(current + offset, 0), total - 1));
  }

  const swipe = useSwipe({
    onSwipe: (direction) => step(direction),
    // Leave drags that start on a link or button to the browser.
    shouldIgnore: (target) =>
      target instanceof Element && target.closest("a, button") !== null,
  });

  if (total === 0) return null;

  const hasPrevious = activeIndex > 0;
  const hasNext = activeIndex < total - 1;

  return (
    <section id="projects" {...swipe} className="py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="Projects"
          title="Selected work"
          description="Applications I have designed and built, from market-price tools to workout planners."
        />

        {/* The side padding reserves room for the arrows that sit outside the card. */}
        <Reveal className="mt-12">
          <div className="sm:px-12">
            <div className="relative">
              {/*
                Mobile: a row above the card, aligned to its left/right corners.
                `sm` and up: the row becomes an invisible overlay the size of the
                card, so the arrows can sit 3px outside its left and right edges.
              */}
              <div className="relative z-10 mb-3 flex items-center justify-between sm:pointer-events-none sm:absolute sm:inset-0 sm:mb-0">
                <button
                  type="button"
                  onClick={() => step(-1)}
                  aria-label="Show previous project"
                  className={`${arrowClass} sm:pointer-events-auto sm:absolute sm:top-[calc(50%_-_22px)] sm:right-full sm:mr-[3px] ${
                    hasPrevious ? "" : "invisible"
                  }`}
                >
                  <FaArrowLeft aria-hidden className="h-4 w-4" />
                </button>

                <button
                  type="button"
                  onClick={() => step(1)}
                  aria-label="Show next project"
                  className={`${arrowClass} sm:pointer-events-auto sm:absolute sm:top-[calc(50%_-_22px)] sm:left-full sm:ml-[3px] ${
                    hasNext ? "" : "invisible"
                  }`}
                >
                  <FaArrowRight aria-hidden className="h-4 w-4" />
                </button>
              </div>

              <div className="overflow-hidden rounded-2xl">
                <div
                  className="flex transition-transform duration-500 ease-out motion-reduce:transition-none"
                  style={{ transform: `translateX(-${activeIndex * 100}%)` }}
                >
                  {projects.map((project, index) => {
                    const isActive = index === activeIndex;
                    const features = project.features.slice(0, MAX_FEATURES);
                    const title = project.shortName ?? project.name;
                    const repositoryUrl = project.githubLink ?? project.repositoryUrl;

                    return (
                      <div
                        key={project.id}
                        inert={!isActive}
                        aria-hidden={!isActive}
                        className="w-full shrink-0"
                      >
                        <article className="group/card relative h-full overflow-hidden rounded-2xl border border-border bg-card p-6 transition-colors duration-300 hover:border-accent/60 md:p-8">
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

                          <div className="grid gap-8 md:grid-cols-2">
                            <div className="flex flex-col">
                              {project.category ? (
                                <p className="text-xs font-semibold tracking-[0.15em] text-accent uppercase">
                                  {project.category}
                                </p>
                              ) : null}

                              <h3 className="mt-2 text-xl font-bold md:text-2xl">{title}</h3>

                              {project.name !== title ? (
                                <p className="mt-1 text-sm text-muted-foreground">
                                  {project.name}
                                </p>
                              ) : null}

                              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                                {project.description ??
                                  "Full details for this project are coming soon."}
                              </p>

                              {((portfolioPreferences.showProjectLiveLinks && project.liveUrl) ||
                                repositoryUrl) && (
                                <div className="mt-6 flex flex-wrap gap-3 md:mt-auto md:pt-6">
                                  {portfolioPreferences.showProjectLiveLinks && project.liveUrl ? (
                                    <a
                                      href={project.liveUrl}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="inline-flex items-center gap-2 rounded-full bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground transition-transform duration-300 hover:-translate-y-0.5"
                                    >
                                      <FaArrowUpRightFromSquare
                                        aria-hidden
                                        className="h-3.5 w-3.5"
                                      />
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
                            </div>

                            <div>
                              {features.length > 0 ? (
                                <ul className="space-y-2 text-sm text-muted-foreground">
                                  {features.map((feature) => (
                                    <li key={feature} className="flex gap-2">
                                      <FaCheck
                                        aria-hidden
                                        className="mt-1 h-3 w-3 shrink-0 text-accent"
                                      />
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
                            </div>
                          </div>
                        </article>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="mt-5 flex flex-col items-center gap-1.5">
              <p aria-live="polite" className="text-sm font-medium text-muted-foreground">
                {String(activeIndex + 1).padStart(2, "0")}
                <span className="text-muted-foreground/60">
                  {" / "}
                  {String(total).padStart(2, "0")}
                </span>
              </p>
              <p className="text-xs text-muted-foreground sm:hidden">
                Swipe the card to browse projects.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
