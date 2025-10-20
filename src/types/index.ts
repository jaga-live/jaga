export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  technologies: string[];
  image: string;
  githubUrl?: string;
  liveUrl?: string;
  featured?: boolean;
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
