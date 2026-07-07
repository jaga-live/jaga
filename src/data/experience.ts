import type { Experience } from '../types';

/**
 * PLACEHOLDER CONTENT — replace with your real work history.
 * Format: most recent first. Keep bullets impact-first (what you owned + outcome).
 * The site renders these honestly; empty/placeholder text is obvious until you fill it in.
 */
export const experience: Experience[] = [
  {
    company: 'Company name',
    role: 'Backend Engineer',
    start: '2023',
    current: true,
    summary: 'TODO: one line on what you own here.',
    bullets: [
      'TODO: an impact bullet — what you built and the outcome.',
      'TODO: a scale/ownership bullet — systems, traffic, reliability.',
    ],
    tech: ['NestJS', 'gRPC', 'Kafka'],
  },
  {
    company: 'Previous company',
    role: 'Backend Engineer',
    start: '2021',
    end: '2023',
    summary: 'TODO: one line on your scope here.',
    bullets: ['TODO: an impact bullet from this role.'],
    tech: ['Node.js', 'PostgreSQL'],
  },
];
