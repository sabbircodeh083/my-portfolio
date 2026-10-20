"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { portfolio, skillGroups } from "@/lib/portfolio";
import { getSkillBrand } from "@/lib/skillIcons";
import { useSwipe } from "@/lib/useSwipe";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

/** How far the strip moves per arrow click, in pixels. */
const STRIP_STEP = 220;

function prefersReducedMotion(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export default function Skills() {
  const groups = skillGroups
    .map((group) => ({ ...group, skills: portfolio.skills[group.key] ?? [] }))
    .filter((group) => group.skills.length > 0);

  // Programming languages lead the list, so index 0 is the initial selection.
  const [activeIndex, setActiveIndex] = useState(0);
  // Only stagger-animate after a tap or swipe, so the first paint relies on <Reveal>.
  const [animateList, setAnimateList] = useState(false);
  // Which way the panel slides in: 1 = forwards, -1 = backwards.
  const [slideDirection, setSlideDirection] = useState<1 | -1>(1);
  const active = groups[activeIndex] ?? groups[0];

  const stripRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const swipe = useSwipe({
    onSwipe: (direction) => goTo(direction),
    // The pill strip scrolls natively on touch, so leave it alone.
    shouldIgnore: (target) =>
      target instanceof Node && stripRef.current?.contains(target) === true,
  });

  function select(index: number) {
    if (index === activeIndex) return;

    // Wrapping around from the last category to the first still counts as forwards.
    setSlideDirection(index === (activeIndex + 1) % groups.length ? 1 : -1);
    setActiveIndex(index);
    setAnimateList(true);
    // `preventScroll` keeps focus changes from dragging the page down.
    tabRefs.current[index]?.focus({ preventScroll: true });
    scrollTabIntoView(index);
  }

  /**
   * Scrolls only the pill strip (never the page) so the selected tab is centred.
   * Called from user interaction only, so mounting the page never moves it.
   */
  function scrollTabIntoView(index: number) {
    const strip = stripRef.current;
    const tab = tabRefs.current[index];
    if (!strip || !tab) return;

    const stripRect = strip.getBoundingClientRect();
    const tabRect = tab.getBoundingClientRect();

    strip.scrollBy({
      left: tabRect.left - stripRect.left - (stripRect.width - tabRect.width) / 2,
      behavior: prefersReducedMotion() ? "auto" : "smooth",
    });
  }

  /** Moves `offset` categories, wrapping at both ends. */
  function goTo(offset: number) {
    const count = groups.length;
    if (count === 0) return;
    select((activeIndex + offset + count) % count);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === "ArrowRight") goTo(1);
    else if (event.key === "ArrowLeft") goTo(-1);
    else if (event.key === "Home") select(0);
    else if (event.key === "End") select(groups.length - 1);
    else return;

    event.preventDefault();
  }

  function nudgeStrip(direction: -1 | 1) {
    stripRef.current?.scrollBy({
      left: direction * STRIP_STEP,
      behavior: prefersReducedMotion() ? "auto" : "smooth",
    });
  }

  if (!active) return null;

  const panelAnimation = animateList
    ? slideDirection === 1
      ? "animate-slide-in-right"
      : "animate-slide-in-left"
    : "";

  return (
    <section
      id="skills"
      {...swipe}
      className="bg-muted/40 py-20 md:py-28"
    >
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="Skills"
          title="Tools I build with"
          description="Pick a category to see the stack — from languages and frameworks to databases, cloud, and everyday tooling."
        />

        <Reveal className="mt-12">
          <div className="relative">
            <button
              type="button"
              onClick={() => nudgeStrip(-1)}
              aria-label="Scroll categories left"
              className="absolute top-1/2 left-0 z-10 hidden h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-card text-muted-foreground shadow-sm transition-colors hover:border-accent hover:text-accent lg:flex"
            >
              <FaChevronLeft aria-hidden className="h-3.5 w-3.5" />
            </button>

            <div
              ref={stripRef}
              role="tablist"
              aria-label="Skill categories"
              onKeyDown={handleKeyDown}
              className="no-scrollbar flex gap-2 overflow-x-auto scroll-smooth px-0.5 py-1.5 lg:px-12"
            >
              {groups.map((group, index) => {
                const isActive = index === activeIndex;
                return (
                  <button
                    key={group.key}
                    ref={(node) => {
                      tabRefs.current[index] = node;
                    }}
                    type="button"
                    role="tab"
                    id={`skills-tab-${group.key}`}
                    aria-selected={isActive}
                    aria-controls="skills-panel"
                    tabIndex={isActive ? 0 : -1}
                    onClick={() => select(index)}
                    className={`shrink-0 rounded-full border px-4 py-2 text-sm font-medium whitespace-nowrap transition-all duration-300 ${
                      isActive
                        ? "border-accent bg-accent text-accent-foreground shadow-md shadow-accent/20"
                        : "border-border bg-card text-muted-foreground hover:-translate-y-0.5 hover:border-accent/60 hover:text-accent"
                    }`}
                  >
                    {group.label}
                    <span
                      className={`ml-2 text-xs font-semibold ${
                        isActive ? "text-accent-foreground/70" : "text-muted-foreground/70"
                      }`}
                    >
                      {group.skills.length}
                    </span>
                  </button>
                );
              })}
            </div>

            <button
              type="button"
              onClick={() => nudgeStrip(1)}
              aria-label="Scroll categories right"
              className="absolute top-1/2 right-0 z-10 hidden h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-card text-muted-foreground shadow-sm transition-colors hover:border-accent hover:text-accent lg:flex"
            >
              <FaChevronRight aria-hidden className="h-3.5 w-3.5" />
            </button>
          </div>

          <p className="mt-3 text-center text-xs text-muted-foreground lg:hidden">
            Swipe the cards left or right to switch categories.
          </p>

          <div
            key={active.key}
            id="skills-panel"
            role="tabpanel"
            tabIndex={0}
            aria-labelledby={`skills-tab-${active.key}`}
            className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4"
          >
            {active.skills.map((skill, index) => {
              const { Icon, style } = getSkillBrand(skill);
              return (
                <div
                  key={skill}
                  style={animateList ? { animationDelay: `${index * 40}ms` } : undefined}
                  className={`group/skill flex items-center gap-3 rounded-2xl border border-border bg-card px-4 py-3.5 transition-all duration-300 hover:-translate-y-1 hover:border-accent/60 hover:shadow-lg ${panelAnimation}`}
                >
                  <span
                    style={style}
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl shadow-sm transition-transform duration-300 group-hover/skill:scale-110"
                  >
                    <Icon aria-hidden className="h-5 w-5" />
                  </span>
                  <span className="truncate text-sm font-medium" title={skill}>
                    {skill}
                  </span>
                </div>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
