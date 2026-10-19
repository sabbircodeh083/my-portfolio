import Image from "next/image";
import type { CSSProperties } from "react";
import { FaArrowRight, FaDownload, FaLocationDot } from "react-icons/fa6";
import {
  personalInfo,
  portfolio,
  portfolioPreferences,
  projects,
} from "@/lib/portfolio";
import { getSkillIcon } from "@/lib/skillIcons";
import SocialLinks from "./SocialLinks";

const floatingSkills = [
  "React",
  "Next.js",
  "TypeScript",
  "Node.js",
  "Tailwind CSS",
  "MongoDB",
];

const chipPositions = [
  "left-0 top-6",
  "right-2 top-16",
  "left-2 top-1/2",
  "right-0 top-1/2",
  "left-6 bottom-16",
  "right-6 bottom-6",
];

export default function Hero() {
  const techCount = Object.values(portfolio.skills).reduce(
    (total, group) => total + group.length,
    0,
  );
  const languageCount = portfolio.skills.programmingLanguages?.length ?? 0;

  const stats = [
    { value: `${projects.length}`, label: "Projects" },
    { value: `${techCount}+`, label: "Technologies" },
    { value: `${languageCount}`, label: "Languages" },
  ];

  return (
    <section
      id="top"
      className="relative overflow-hidden pt-28 pb-16 sm:pt-32 md:pb-24"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="bg-grid absolute inset-0" />
      </div>

      <div className="mx-auto grid max-w-6xl items-center gap-14 px-6 md:grid-cols-2">
        <div className="animate-fade-up">
          <p className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3.5 py-1.5 text-sm text-muted-foreground shadow-sm">
            <FaLocationDot aria-hidden className="h-3.5 w-3.5 text-accent" />
            {personalInfo.location}
          </p>

          <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            Hi, I&apos;m{" "}
            <span className="gradient-text">{personalInfo.fullName}</span>
          </h1>

          <p className="mt-5 text-lg font-semibold text-accent">
            {personalInfo.professionalTitles.join(" · ")}
          </p>

          <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground">
            {personalInfo.headline}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="#projects"
              className="group inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground shadow-lg shadow-accent/25 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-accent/30"
            >
              View Projects
              <FaArrowRight
                aria-hidden
                className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1"
              />
            </a>

            {portfolioPreferences.showResumeLink && personalInfo.resumeUrl ? (
              <a
                href={personalInfo.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-6 py-3 text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5 hover:border-accent hover:text-accent hover:shadow-md"
              >
                <FaDownload aria-hidden className="h-3.5 w-3.5" />
                Download Resume
              </a>
            ) : null}
          </div>

          <dl className="mt-10 grid max-w-md grid-cols-3 gap-4">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-border bg-card/70 p-4 text-center backdrop-blur"
              >
                <dt className="order-2 mt-1 text-xs font-medium tracking-wide text-muted-foreground uppercase">
                  {stat.label}
                </dt>
                <dd className="text-2xl font-bold text-foreground">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>

          {portfolioPreferences.showSocialLinks ? (
            <SocialLinks className="mt-8" />
          ) : null}
        </div>

        <div
          className="relative mx-auto w-full max-w-sm animate-fade-up"
          style={{ animationDelay: "150ms" }}
        >
          <div className="relative">
            <Image
              src="/portfolio.png"
              alt={`Portrait of ${personalInfo.fullName}`}
              width={1324}
              height={1188}
              priority
              sizes="(max-width: 768px) 80vw, 420px"
              className="relative z-10 h-auto w-full drop-shadow-[0_25px_35px_rgba(37,99,235,0.2)]"
            />
          </div>

          {floatingSkills.map((skill, index) => {
            const Icon = getSkillIcon(skill);
            return (
              <span
                key={skill}
                title={skill}
                className={`skill-float absolute z-20 hidden h-11 w-11 items-center justify-center rounded-xl border border-border bg-card text-accent shadow-lg sm:flex ${chipPositions[index]}`}
                style={
                  {
                    "--float-duration": `${5 + index * 0.4}s`,
                    "--float-delay": `${index * 0.3}s`,
                  } as CSSProperties
                }
              >
                <Icon aria-hidden className="h-5 w-5" />
                <span className="sr-only">{skill}</span>
              </span>
            );
          })}
        </div>
      </div>
    </section>
  );
}
