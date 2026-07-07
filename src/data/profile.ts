import type { Profile } from '../types';

/**
 * PLACEHOLDER CONTENT — confirm/replace the marked fields with your real details.
 * Nothing here invents seniority or employers; placeholders are labelled.
 */
export const profile: Profile = {
  name: 'Jaga',
  // TODO(confirm): your real title. Avoid inflating seniority.
  title: 'Backend Engineer',
  // TODO(confirm): location + timezone (used in the hero meta).
  location: 'India',
  timezone: 'UTC+5:30',
  available: true,
  availabilityNote: 'Open to backend / distributed-systems roles',
  oneLiner:
    'I build backend systems that stay boring under load — distributed, observable, and hard to knock over.',
  about:
    'I’m a backend engineer focused on distributed systems — gRPC microservices, event-driven pipelines, and infrastructure that handles real scale without drama. My flagship work, Flantic, runs across hundreds of thousands of Discord servers.',
  githubUsername: 'jaga-live',
  // TODO(add): host a resume PDF in /public and point here, e.g. '/jaga-resume.pdf'.
  resumeUrl: undefined,
  socials: [
    { name: 'GitHub', url: 'https://github.com/jaga-live', icon: 'github' },
    { name: 'LinkedIn', url: 'https://www.linkedin.com/in/jaga-live/', icon: 'linkedin' },
    { name: 'Email', url: 'mailto:jagadheesh6@gmail.com', icon: 'email' },
    { name: 'Discord', url: 'https://discord.com/users/516438995824017420', icon: 'discord' },
  ],
};
