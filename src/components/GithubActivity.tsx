import Image from "next/image";
import { FaGithub } from "react-icons/fa6";
import { portfolio, portfolioPreferences, socialLinks } from "@/lib/portfolio";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

export default function GithubActivity() {
  const widgets = portfolio.githubProfileWidgets;

  if (!portfolioPreferences.showGitHubStatistics || !widgets.statistics) return null;

  const profileUrl = socialLinks.find((link) => link.key === "github")?.url;

  const cards = [
    { src: widgets.statistics, alt: "GitHub contribution statistics", className: "sm:col-span-2" },
    { src: widgets.topLanguages, alt: "Most used languages on GitHub" },
    { src: widgets.contributionStreak, alt: "GitHub contribution streak" },
  ].filter((card): card is { src: string; alt: string; className?: string } => Boolean(card.src));

  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="GitHub"
          title="Activity snapshot"
          description="A live look at my open-source activity and the languages I work in most."
        />

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {cards.map((card, index) => (
            <Reveal
              key={card.alt}
              delay={index * 100}
              className={card.className ?? undefined}
            >
              <div className="flex h-full items-center justify-center overflow-hidden rounded-2xl border border-border bg-card p-4 transition-all duration-300 hover:-translate-y-1 hover:border-accent/60 hover:shadow-lg">
                <Image
                  src={card.src}
                  alt={card.alt}
                  width={495}
                  height={195}
                  unoptimized
                  className="h-auto w-full"
                />
              </div>
            </Reveal>
          ))}
        </div>

        {profileUrl ? (
          <Reveal delay={200} className="mt-10 text-center">
            <a
              href={profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-5 py-2.5 text-sm font-semibold transition-colors duration-300 hover:border-accent hover:text-accent"
            >
              <FaGithub aria-hidden className="h-4 w-4" />
              Visit my GitHub
            </a>
          </Reveal>
        ) : null}
      </div>
    </section>
  );
}
