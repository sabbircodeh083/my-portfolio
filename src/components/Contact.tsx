import { FaDownload, FaEnvelope } from "react-icons/fa6";
import { contact, personalInfo, portfolioPreferences } from "@/lib/portfolio";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import SocialLinks from "./SocialLinks";

export default function Contact() {
  return (
    <section id="contact" className="bg-muted/40 py-20 md:py-28">
      <div className="mx-auto max-w-3xl px-6">
        <SectionHeading eyebrow="Contact" title="Let's build something" description={contact.message} />

        <Reveal delay={120} className="mt-10">
          <div className="relative overflow-hidden rounded-3xl border border-border bg-card p-8 text-center shadow-sm sm:p-10">
            <div className="relative flex flex-col items-center gap-5">
              <a
                href={`mailto:${contact.email}`}
                className="inline-flex items-center gap-3 rounded-2xl border border-border bg-background px-6 py-4 text-base font-semibold transition-all duration-300 hover:-translate-y-1 hover:border-accent hover:text-accent hover:shadow-lg sm:text-lg"
              >
                <FaEnvelope aria-hidden className="h-5 w-5 text-accent" />
                {contact.email}
              </a>

              {portfolioPreferences.showResumeLink && personalInfo.resumeUrl ? (
                <a
                  href={personalInfo.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-accent-foreground shadow-lg shadow-accent/25 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl"
                >
                  <FaDownload aria-hidden className="h-3.5 w-3.5" />
                  Download Resume
                </a>
              ) : null}

              {portfolioPreferences.showSocialLinks ? (
                <div className="mt-2 flex justify-center">
                  <SocialLinks />
                </div>
              ) : null}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
