import type { IconType } from "react-icons";
import { FaCode } from "react-icons/fa6";
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
  SiOpenjdk,
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
} from "react-icons/si";

/**
 * Maps the exact skill strings used in `data/portfolio.json` to a brand logo.
 * Simple Icons does not ship every technology (e.g. AWS, Oracle, Hardhat,
 * VS Code, React Toastify), so `getSkillIcon` falls back to a generic glyph.
 */
const iconBySkill: Record<string, IconType> = {
  C: SiC,
  "C++": SiCplusplus,
  "C#": SiSharp,
  Java: SiOpenjdk,
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

  "Node.js": SiNodedotjs,
  "Express.js": SiExpress,
  ".NET": SiDotnet,
  Laravel: SiLaravel,
  Symfony: SiSymfony,

  MongoDB: SiMongodb,
  PostgreSQL: SiPostgresql,
  MySQL: SiMysql,
  Firebase: SiFirebase,

  Docker: SiDocker,
  Vercel: SiVercel,
  Netlify: SiNetlify,
  Linux: SiLinux,
  Ubuntu: SiUbuntu,

  Git: SiGit,
  GitHub: SiGithub,
  Postman: SiPostman,
  Figma: SiFigma,

  Solidity: SiSolidity,
  Selenium: SiSelenium,
  PyTorch: SiPytorch,
};

export function getSkillIcon(skill: string): IconType {
  return iconBySkill[skill] ?? FaCode;
}
