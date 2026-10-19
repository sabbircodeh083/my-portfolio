import type { ReactNode } from "react";
import Reveal from "./Reveal";

interface SectionHeadingProps {
  eyebrow: string;
  title: ReactNode;
  description?: string;
}

export default function SectionHeading({ eyebrow, title, description }: SectionHeadingProps) {
  return (
    <Reveal className="mx-auto max-w-2xl text-center">
      <p className="text-sm font-semibold tracking-[0.2em] text-accent uppercase">{eyebrow}</p>
      <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">{title}</h2>
      <div
        aria-hidden
        className="mx-auto mt-5 h-1 w-16 rounded-full bg-gradient-to-r from-accent via-accent-2 to-accent-3"
      />
      {description ? <p className="mt-5 text-muted-foreground">{description}</p> : null}
    </Reveal>
  );
}
