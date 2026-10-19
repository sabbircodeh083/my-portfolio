import { personalInfo, portfolioPreferences } from "@/lib/portfolio";
import SocialLinks from "./SocialLinks";

export default function Footer() {
  return (
    <footer className="border-t border-border py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-6 sm:flex-row">
        <div className="text-center sm:text-left">
          <p className="font-bold">{personalInfo.displayName}</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Built with Next.js &amp; Tailwind CSS.
          </p>
        </div>

        {portfolioPreferences.showSocialLinks ? <SocialLinks /> : null}
      </div>
    </footer>
  );
}
