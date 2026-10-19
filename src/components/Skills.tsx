import { portfolio, skillGroups } from "@/lib/portfolio";
import { getSkillIcon } from "@/lib/skillIcons";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

export default function Skills() {
  const groups = skillGroups.filter((group) => (portfolio.skills[group.key]?.length ?? 0) > 0);

  return (
    <section id="skills" className="bg-muted/40 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="Skills"
          title="Tools I build with"
          description="A practical toolkit spanning frontend, backend, databases, and the workflow around them."
        />

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {groups.map((group, index) => {
            const skills = portfolio.skills[group.key];
            return (
              <Reveal key={group.key} delay={index * 60} className="h-full">
                <div className="group/card h-full rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent/60 hover:shadow-xl">
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="text-sm font-semibold tracking-[0.15em] text-accent uppercase">
                      {group.label}
                    </h3>
                    <span className="rounded-full bg-muted px-2 py-0.5 text-xs font-semibold text-muted-foreground">
                      {skills.length}
                    </span>
                  </div>

                  <ul className="mt-5 space-y-2">
                    {skills.map((skill) => {
                      const Icon = getSkillIcon(skill);
                      return (
                        <li
                          key={skill}
                          className="group/skill flex items-center gap-3 rounded-xl border border-transparent bg-background px-2.5 py-2 transition-all duration-300 hover:translate-x-1 hover:border-accent/40"
                        >
                          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-accent-soft text-accent transition-transform duration-300 group-hover/skill:scale-110">
                            <Icon aria-hidden className="h-5 w-5" />
                          </span>
                          <span className="text-sm font-medium">{skill}</span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
