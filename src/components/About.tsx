import { FaCompass } from "react-icons/fa6";
import { about } from "@/lib/portfolio";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

export default function About() {
  return (
    <section id="about" className="py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading eyebrow="About" title="Who I am" />

        <div className="mt-12 grid gap-8 md:grid-cols-5">
          <Reveal className="md:col-span-3">
            <p className="text-lg leading-relaxed text-muted-foreground">
              {about.summary}
            </p>
          </Reveal>

          <div className="grid gap-6 md:col-span-2">
            <Reveal delay={100} className="h-full">
              <div className="h-full rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent/60 hover:shadow-lg">
                <h3 className="flex items-center gap-2 font-semibold">
                  <FaCompass aria-hidden className="h-4 w-4 text-accent" />
                  Interests
                </h3>
                <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                  {about.interests.map((interest) => (
                    <li key={interest} className="flex items-start gap-2">
                      <span
                        aria-hidden
                        className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                      />
                      {interest}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
            {/* add it later     */}
            {/* <Reveal delay={200} className="h-full">
              <div className="h-full rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent/60 hover:shadow-lg">
                <h3 className="flex items-center gap-2 font-semibold">
                  <FaGraduationCap aria-hidden className="h-4 w-4 text-accent" />
                  Currently Learning
                </h3>
                <ul className="mt-4 flex flex-wrap gap-2 text-sm">
                  {about.currentlyLearningOrImproving.map((item) => (
                    <li
                      key={item}
                      className="rounded-full border border-border bg-background px-3 py-1.5 text-muted-foreground transition-colors duration-300 hover:border-accent hover:text-accent"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal> */}
          </div>
        </div>
      </div>
    </section>
  );
}
