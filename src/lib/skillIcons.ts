import type { CSSProperties } from "react";
import type { IconType } from "react-icons";
import { FaAws, FaBell, FaCode, FaJava } from "react-icons/fa6";
import {
  SiBootstrap,
  SiC,
  SiCplusplus,
  SiCss,
  SiDaisyui,
  SiDocker,
  SiDotnet,
  SiExpress,
  SiFigma,
  SiFirebase,
  SiGit,
  SiGithub,
  SiHtml5,
  SiJavascript,
  SiLaravel,
  SiLinux,
  SiMongodb,
  SiMysql,
  SiNetlify,
  SiNextdotjs,
  SiNodedotjs,
  SiPhp,
  SiPostgresql,
  SiPostman,
  SiPython,
  SiPytorch,
  SiReact,
  SiSelenium,
  SiSharp,
  SiSolidity,
  SiSymfony,
  SiTailwindcss,
  SiTypescript,
  SiUbuntu,
  SiVercel,
  SiVuedotjs,
  SiBetterauth,
} from "react-icons/si";
import { VscVscode } from "react-icons/vsc";
import { HardhatIcon, OracleIcon } from "./brandIcons";

/**
 * Maps the exact skill strings used in `data/portfolio.json` to the official
 * brand logo. Simple Icons deliberately omits some trademarks (AWS, Oracle,
 * Hardhat, VS Code), so those come from Font Awesome, the VS Code icon set, or
 * the local traces in `brandIcons.tsx`; brands with no mark at all fall back
 * to a generic glyph.
 */
const iconBySkill: Record<string, IconType> = {
  C: SiC,
  "C++": SiCplusplus,
  "C#": SiSharp,
  Java: FaJava,
  PHP: SiPhp,
  Python: SiPython,
  JavaScript: SiJavascript,
  TypeScript: SiTypescript,
  HTML: SiHtml5,
  CSS: SiCss,

  React: SiReact,
  "Next.js": SiNextdotjs,
  Vue: SiVuedotjs,
  "Tailwind CSS": SiTailwindcss,
  Bootstrap: SiBootstrap,
  DaisyUI: SiDaisyui,
  "React Toastify": FaBell,

  "Node.js": SiNodedotjs,
  "Express.js": SiExpress,
  ".NET": SiDotnet,
  Laravel: SiLaravel,
  Symfony: SiSymfony,
  "Better Auth": SiBetterauth,

  MongoDB: SiMongodb,
  PostgreSQL: SiPostgresql,
  MySQL: SiMysql,
  Oracle: OracleIcon,
  Firebase: SiFirebase,

  AWS: FaAws,
  Docker: SiDocker,
  Vercel: SiVercel,
  Netlify: SiNetlify,
  Linux: SiLinux,
  Ubuntu: SiUbuntu,

  Git: SiGit,
  GitHub: SiGithub,
  "Visual Studio Code": VscVscode,
  Postman: SiPostman,
  Figma: SiFigma,

  Solidity: SiSolidity,
  Hardhat: HardhatIcon,
  Selenium: SiSelenium,
  PyTorch: SiPytorch,
};

/** Accent colour, used by the few entries with no official brand palette. */
const ACCENT = "#2563eb";
const DARK_GLYPH = "#0b1324";
const LIGHT_GLYPH = "#ffffff";

/** Official brand colours, so every tile carries the technology's real look. */
const colorBySkill: Record<string, string> = {
  C: "#A8B9CC",
  "C++": "#00599C",
  "C#": "#239120",
  Java: "#007396",
  PHP: "#777BB4",
  Python: "#3776AB",
  JavaScript: "#F7DF1E",
  TypeScript: "#3178C6",
  HTML: "#E34F26",
  CSS: "#663399",

  React: "#61DAFB",
  "Next.js": "#000000",
  Vue: "#4FC08D",
  "Tailwind CSS": "#06B6D4",
  Bootstrap: "#7952B3",
  DaisyUI: "#1AD1A5",

  "Node.js": "#5FA04E",
  "Express.js": "#000000",
  ".NET": "#512BD4",
  Laravel: "#FF2D20",
  Symfony: "#000000",

  MongoDB: "#47A248",
  PostgreSQL: "#4169E1",
  MySQL: "#4479A1",
  Oracle: "#EA1B22",
  Firebase: "#FFCA28",

  AWS: "#FF9900",
  Docker: "#2496ED",
  Vercel: "#000000",
  Netlify: "#00C7B7",
  Linux: "#FCC624",
  Ubuntu: "#E95420",

  Git: "#F05032",
  GitHub: "#181717",
  "Visual Studio Code": "#007ACC",
  Postman: "#FF6C37",
  Figma: "#F24E1E",

  Solidity: "#363636",
  Hardhat: "#FFF100",
  Selenium: "#43B02A",
  PyTorch: "#EE4C2C",
};

/** WCAG relative luminance of a `#rrggbb` colour. */
function relativeLuminance(hex: string): number {
  const value = hex.replace("#", "");
  const channels = [0, 2, 4].map((offset) => {
    const channel = Number.parseInt(value.slice(offset, offset + 2), 16) / 255;
    return channel <= 0.03928 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4;
  });

  return 0.2126 * channels[0] + 0.7152 * channels[1] + 0.0722 * channels[2];
}

/** Picks a glyph colour that stays readable on top of the brand tile. */
function glyphColor(background: string): string {
  return relativeLuminance(background) > 0.25 ? DARK_GLYPH : LIGHT_GLYPH;
}

function brandStyle(color: string): CSSProperties {
  return { backgroundColor: color, color: glyphColor(color) };
}

export interface SkillBrand {
  Icon: IconType;
  /** Brand background plus a contrasting glyph colour, ready for `style`. */
  style: CSSProperties;
}

const brandBySkill: Record<string, SkillBrand> = Object.fromEntries(
  Object.entries(iconBySkill).map(([skill, Icon]) => [
    skill,
    { Icon, style: brandStyle(colorBySkill[skill] ?? ACCENT) },
  ]),
);

const fallbackBrand: SkillBrand = { Icon: FaCode, style: brandStyle(ACCENT) };

export function getSkillBrand(skill: string): SkillBrand {
  return brandBySkill[skill] ?? fallbackBrand;
}
