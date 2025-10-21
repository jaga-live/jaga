import type { Skill } from '../types';

export const skills: Skill[] = [
  // Backend
  { name: 'NestJS', category: 'Backend' },
  { name: 'Node.js', category: 'Backend' },
  { name: 'Express.js', category: 'Backend' },
  { name: 'GraphQL', category: 'Backend' },
  { name: 'InversifyJS', category: 'Backend' },

  // Languages
  { name: 'TypeScript', category: 'Languages' },
  { name: 'JavaScript', category: 'Languages' },

  // Databases
  { name: 'MongoDB', category: 'Databases' },
  { name: 'PostgreSQL', category: 'Databases' },
  { name: 'Redis', category: 'Databases' },
  { name: 'MS SQL Server', category: 'Databases' },
  { name: 'DynamoDB', category: 'Databases' },
  { name: 'Neo4j', category: 'Databases' },
  { name: 'Elasticsearch', category: 'Databases' },

  // Message Queue
  { name: 'Kafka', category: 'Message Queue' },
  { name: 'RabbitMQ', category: 'Message Queue' },
  { name: 'NATS', category: 'Message Queue' },

  // Protocols
  { name: 'gRPC', category: 'Protocols' },
  { name: 'REST', category: 'Protocols' },
  { name: 'WebSockets', category: 'Protocols' },

  // DevOps
  { name: 'Docker', category: 'DevOps' },
  { name: 'Kubernetes', category: 'DevOps' },
  { name: 'Linux', category: 'DevOps' },
  { name: 'Jenkins', category: 'DevOps' },
  { name: 'GitHub Actions', category: 'DevOps' },
  { name: 'Nginx', category: 'DevOps' },

  // Cloud
  { name: 'AWS', category: 'Cloud' },
  { name: 'Google Cloud', category: 'Cloud' },
  { name: 'Bare Metal', category: 'Cloud' },

  // Architecture
  { name: 'Microservices', category: 'Architecture' },
  { name: 'Event-Driven', category: 'Architecture' },
  { name: 'Serverless', category: 'Architecture' },
];

export const skillCategories = [
  'Backend',
  'Languages',
  'Databases',
  'Message Queue',
  'Protocols',
  'DevOps',
  'Cloud',
  'Architecture',
] as const;
