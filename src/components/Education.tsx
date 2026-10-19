import { FaGraduationCap, FaLocationDot } from "react-icons/fa6";
import { education, educationScore, educationTitle, educationYears } from "@/lib/portfolio";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

export default function Education() {
  return (
    <section id="education" className="bg-muted/40 py-20 md:py-28">
      <div className="mx-auto max-w-4xl px-6">
        <SectionHeading eyebrow="Education" title="Academic background" />

        <ol className="relative mt-12 space-y-6 border-l border-border pl-6 sm:pl-8">
          {education.map((entry, index) => {
            const score = educationScore(entry);
            return (
              <li key={`${entry.institution}-${entry.startYear}`} className="relative">
                <span
                  aria-hidden
                  className="absolute top-6 -left-[34px] flex h-5 w-5 items-center justify-center rounded-full border border-border bg-card sm:-left-[42px]"
                >
                  <FaGraduationCap className="h-2.5 w-2.5 text-accent" />
                </span>

                <Reveal delay={index * 100}>
                  <div className="rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent/60 hover:shadow-lg">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <p className="text-sm font-semibold text-accent">{educationYears(entry)}</p>
                      {score ? (
                        <span className="rounded-full bg-accent-soft px-3 py-1 text-xs font-semibold text-accent">
                          {score}
                        </span>
                      ) : null}
                    </div>

                    <h3 className="mt-3 text-lg font-bold">{educationTitle(entry)}</h3>

                    <p className="mt-1 font-medium text-foreground">{entry.institution}</p>

                    {entry.location ? (
                      <p className="mt-2 flex items-center gap-1.5 text-sm text-muted-foreground">
                        <FaLocationDot aria-hidden className="h-3 w-3" />
                        {entry.location}
                      </p>
                    ) : null}
                  </div>
                </Reveal>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
