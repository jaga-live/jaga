export interface ProjectDetails {
  currentStats?: {
    users?: string;
    servers?: string;
    guilds?: string;
  };
  hosting?: {
    provider: string;
    processor: string;
    ram: string;
    storage?: string;
  };
  architecture?: {
    overview: string;
    benefits?: string[];
    components:
      | Array<{
          name: string;
          description: string;
          features: string[];
          tech: string[];
        }>
      | string[];
  };
  challenges?: Array<{
    title: string;
    description: string;
    solution: string;
  }>;
  detailedExplanation?: string;
  flowDiagram?: string;
  architectureDiagram?: string;
}

/** A headline metric shown on a project card and case study, e.g. { value: '300', suffix: 'K+', label: 'servers' }. */
export interface Metric {
  value: number;
  suffix?: string;
  decimals?: number;
  label: string;
}

export interface Project {
  id: string;
  title: string;
  /** Short one-line tagline used under the title. */
  tagline?: string;
  description: string;
  longDescription?: string;
  /** The problem the project set out to solve. */
  problem?: string;
  /** Why it was built / why it matters. */
  why?: string;
  /** Key engineering decisions and trade-offs. */
  decisions?: Array<{ title: string; detail: string }>;
  /** Outcomes / results. */
  results?: string[];
  /** Headline metrics (attributed to the project, not the person). */
  metrics?: Metric[];
  /** Your role on the project. */
  role?: string;
  year?: string;
  status?: 'live' | 'open-source' | 'personal' | 'archived';
  technologies: string[];
  /** Detailed, category-grouped stack for the case study (more geeky than the flat list). */
  techStack?: Array<{ category: string; items: string[] }>;
  image?: string;
  githubUrl?: string;
  liveUrl?: string;
  featured?: boolean;
  details?: ProjectDetails;
}

export interface Skill {
  name: string;
  category: SkillCategory;
  icon?: string;
  level?: number;
}

export type SkillCategory =
  | 'Backend'
  | 'Languages'
  | 'Databases'
  | 'Message Queue'
  | 'Protocols'
  | 'DevOps'
  | 'Cloud'
  | 'Architecture';

export interface ContactLink {
  name: string;
  url: string;
  icon: string;
}

export interface NavItem {
  label: string;
  href: string;
}

export interface SocialLink {
  name: string;
  url: string;
  /** Tabler-style icon key handled by the Icon component. */
  icon: 'github' | 'linkedin' | 'email' | 'discord' | 'twitter' | 'resume';
}

export interface Profile {
  name: string;
  /** Job title shown in the role line. Keep honest — no invented seniority. */
  title: string;
  location?: string;
  timezone?: string;
  available?: boolean;
  availabilityNote?: string;
  /** One-liner with voice, shown in the hero. */
  oneLiner: string;
  /** Slightly longer about paragraph. */
  about?: string;
  githubUsername?: string;
  resumeUrl?: string;
  socials: SocialLink[];
}

export interface Experience {
  company: string;
  role: string;
  start: string;
  end?: string;
  current?: boolean;
  url?: string;
  summary?: string;
  bullets?: string[];
  tech?: string[];
}
