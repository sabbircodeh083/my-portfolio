import type { IconType } from "react-icons";
import { FaDev, FaDiscord, FaFacebook, FaGithub, FaLinkedin } from "react-icons/fa6";
import { socialLinks } from "@/lib/portfolio";

const iconByKey: Record<string, IconType> = {
  github: FaGithub,
  linkedin: FaLinkedin,
  devCommunity: FaDev,
  facebook: FaFacebook,
  discord: FaDiscord,
};

export default function SocialLinks({ className = "" }: { className?: string }) {
  return (
    <ul className={`flex flex-wrap items-center gap-3 ${className}`.trim()}>
      {socialLinks.map((link) => {
        const Icon = iconByKey[link.key] ?? FaGithub;
        return (
          <li key={link.key}>
            <a
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.label}
              title={link.label}
              className="group flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-muted-foreground transition-all duration-300 hover:-translate-y-1 hover:border-accent hover:text-accent hover:shadow-md"
            >
              <Icon
                aria-hidden
                className="h-5 w-5 transition-transform duration-300 group-hover:scale-110"
              />
            </a>
          </li>
        );
      })}
    </ul>
  );
}
