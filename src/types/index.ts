export interface ProjectEvidence {
  value: string;
  label: string;
}

export interface Project {
  id: string;
  title: string;
  mark: string;
  logo?: string;
  kicker: string;
  status: string;
  description: string;
  contribution: string;
  evidence: ProjectEvidence[];
  technologies: string[];
  detailPath?: string;
  githubUrl?: string;
  liveUrl?: string;
}

export interface SkillGroup {
  label: string;
  description: string;
  items: Skill[];
}

export interface Skill {
  name: string;
  icon: string;
}

export interface Profile {
  name: string;
  title: string;
  timezone?: string;
  availabilityNote?: string;
  about?: string;
}

export interface Experience {
  company: string;
  role: string;
  start: string;
  end?: string;
  current?: boolean;
  period?: string;
  url?: string;
  summary?: string;
  projects?: Array<{
    name: string;
    description: string;
    url?: string;
  }>;
  bullets?: string[];
  tech?: string[];
}
