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
