import data from "../../data/portfolio.json";

export interface PersonalInfo {
  fullName: string;
  displayName: string;
  location: string;
  email: string;
  professionalTitles: string[];
  headline: string;
  profileImage: string | null;
  bannerImage: string | null;
  resumeUrl: string | null;
}

export interface About {
  summary: string;
  interests: string[];
  currentlyLearningOrImproving: string[];
}

export interface Contact {
  email: string;
  message: string;
}

export interface SocialLink {
  label: string;
  username?: string;
  url: string;
}

export interface EducationEntry {
  institution: string;
  degree?: string;
  qualification?: string;
  location?: string;
  startYear: number;
  endYear: number;
  cgpa?: number;
  gpa?: number;
}

export interface Project {
  id: string;
  name: string;
  shortName?: string;
  category?: string;
  description?: string | null;
  tagline?: string;
  liveUrl?: string | null;
  githubLink?: string | null;
  repositoryUrl?: string | null;
  technologies: string[];
  features: string[];
  notes?: string | string[];
}

export interface GithubWidgets {
  contributionSnake?: string;
  statistics?: string;
  topLanguages?: string;
  contributionStreak?: string;
  randomDeveloperQuote?: string;
  profileViews?: string;
}

export interface ContentLinks {
  devPosts?: string;
  resume?: string;
}

export interface PortfolioPreferences {
  primaryLanguage: string;
  additionalLanguage: string;
  showResumeLink: boolean;
  showSocialLinks: boolean;
  showProjectLiveLinks: boolean;
  showGitHubStatistics: boolean;
}

export interface Portfolio {
  personalInfo: PersonalInfo;
  about: About;
  contact: Contact;
  socialLinks: Record<string, SocialLink>;
  education: EducationEntry[];
  skills: Record<string, string[]>;
  projects: Project[];
  contentLinks: ContentLinks;
  githubProfileWidgets: GithubWidgets;
  portfolioPreferences: PortfolioPreferences;
}

export const portfolio = data as unknown as Portfolio;

export const { personalInfo, about, contact, education, projects, portfolioPreferences } =
  portfolio;

export const socialLinks = Object.entries(portfolio.socialLinks).map(([key, value]) => ({
  key,
  ...value,
}));

/** Order and human-readable labels for the `skills` object keys. */
export const skillGroups: { key: string; label: string }[] = [
  { key: "programmingLanguages", label: "Programming Languages" },
  { key: "frontendFrameworksAndLibraries", label: "Frontend" },
  { key: "backendFrameworksAndRuntime", label: "Backend & Runtime" },
  { key: "databasesAndBackendServices", label: "Databases" },
  { key: "cloudDeploymentAndDevOps", label: "Cloud & DevOps" },
  { key: "toolsAndDesign", label: "Tools & Design" },
  { key: "additionalTechnologies", label: "Also Working With" },
];

export const navItems = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#education", label: "Education" },
  { href: "#contact", label: "Contact" },
];

export function educationTitle(entry: EducationEntry): string {
  return entry.degree ?? entry.qualification ?? "Education";
}

export function educationScore(entry: EducationEntry): string | null {
  if (typeof entry.cgpa === "number") return `CGPA ${entry.cgpa.toFixed(2)}`;
  if (typeof entry.gpa === "number") return `GPA ${entry.gpa.toFixed(2)}`;
  return null;
}

export function educationYears(entry: EducationEntry): string {
  return `${entry.startYear} – ${entry.endYear}`;
}
