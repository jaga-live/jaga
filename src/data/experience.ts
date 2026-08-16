import type { Experience } from '../types';

export const experience: Experience[] = [
  {
    company: 'Sorice Solutions',
    role: 'Backend Developer · Technical ownership',
    start: '2023',
    current: true,
    period: '2023 to present',
    summary:
      'Backend engineering for 4medica, a high-volume healthcare platform used across patient, laboratory, and hospital workflows.',
    projects: [
      {
        name: '4medica healthcare platform',
        description: 'Built and designed backend features across the platform while working closely with the architect and the wider product team.',
        url: 'https://www.4medica.com/',
      },
    ],
    bullets: [
      'Took features from planning and backend design through implementation, review, release, and production support.',
      'Partially led the team and coordinated releases to staging, production, and customer-managed environments.',
      'Monitored a high-volume application, investigated production issues, and shipped urgent patches when needed.',
    ],
    tech: ['TypeScript', 'Node.js', 'NestJS', 'gRPC', 'Kafka', 'MongoDB', 'Kubernetes', 'Google Cloud'],
  },
  {
    company: 'AVEON Infotech',
    role: 'Backend Developer · SSENSE',
    start: 'Before Sorice',
    period: 'Before Sorice Solutions',
    summary:
      'Worked on backend systems for SSENSE, the Canadian fashion ecommerce platform.',
    projects: [
      {
        name: 'SSENSE product measurement services',
        description: 'Owned microservices that handled product measurements and contributed changes across related services.',
        url: 'https://www.ssense.com/',
      },
    ],
    bullets: [
      'Built workflows with AWS Lambda, Step Functions, and SQS, and resolved production tickets across the platform.',
    ],
    tech: ['AWS Lambda', 'Step Functions', 'SQS', 'Microservices'],
  },
  {
    company: 'Leora Solutions LLP',
    role: 'Software Developer · UnoMero products',
    start: 'Earlier',
    period: 'Earlier experience',
    summary: 'Built backend features for a UAE client across three connected business products.',
    projects: [
      {
        name: 'UnoEdge',
        description: 'Customer engagement, secure data sharing, QR workflows, analytics, and asset tracking.',
      },
      {
        name: 'UnoVisit',
        description: 'Visitor management with touchless QR check-in, identity controls, and an on-site activity trail.',
      },
      {
        name: 'UnoTracker',
        description: 'A SaaS target-tracking product for managers and teams arranged in a clear reporting hierarchy.',
      },
    ],
    tech: ['Backend APIs', 'QR workflows', 'Analytics', 'SaaS'],
  },
];
