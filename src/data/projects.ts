import type { Project } from '../types';

export const projects: Project[] = [
  {
    id: 'flantic',
    title: 'Flantic',
    mark: 'F',
    logo: '/Flantic-logo-prime.png',
    kicker: 'Discord platform · Owner, architect, and engineer',
    status: 'Production',
    description:
      'A production Discord platform used across more than 300,000 servers. I built it from the gateway and bot services to the dashboard, infrastructure, releases, and daily operation.',
    contribution:
      'I own the product and its technical direction. I designed the architecture, built every core service, run deployments, monitor production, and keep evolving the platform.',
    evidence: [
      { value: '300K+', label: 'servers' },
      { value: '20M+', label: 'users' },
      { value: '~15M', label: 'requests / day' },
    ],
    technologies: ['TypeScript', 'NestJS', 'gRPC', 'Redis', 'MongoDB', 'PostgreSQL', 'Kubernetes'],
    detailPath: '/projects/flantic',
    liveUrl: 'https://flantic.app',
  },
  {
    id: 'nescord',
    title: 'Nescord',
    mark: 'N/',
    kicker: 'Open source · Creator and maintainer',
    status: 'Open source',
    description:
      'A TypeScript library for building large Discord bots that need to scale across processes and handle heavy gateway and REST traffic.',
    contribution:
      'I designed the library around separate gateway, REST, and bot workers, with typed gRPC communication so each part can scale for the load it handles.',
    evidence: [
      { value: '3', label: 'process model' },
      { value: 'Typed', label: 'gateway events' },
      { value: 'gRPC', label: 'service transport' },
    ],
    technologies: ['TypeScript', 'Node.js', 'gRPC', '@discordjs/core', '@discordjs/rest'],
    githubUrl: 'https://github.com/jaga-live/nescord',
  },
  {
    id: 'celestine',
    title: 'Celestine',
    mark: 'C',
    logo: '/celestine-icon.png',
    kicker: 'Tablet-first workspace · Local-first build',
    status: 'Early build',
    description:
      'A local-first drawing and visual workspace made for pen displays and drawing tablets such as XP-Pen, with pressure-sensitive ink, text, images, and diagrams on one canvas.',
    contribution:
      'I built the stylus and tablet input, pressure-sensitive vector ink, local autosave, rich-text cards, Markdown export, and on-device handwriting recognition for macOS.',
    evidence: [
      { value: 'Local', label: 'workspace storage' },
      { value: 'Native', label: 'desktop shell' },
      { value: 'On-device', label: 'recognition' },
    ],
    technologies: ['Rust', 'Tauri', 'React', 'TypeScript', 'TipTap', 'Apple Vision'],
    githubUrl: 'https://github.com/jaga-live/celestine',
  },
];
