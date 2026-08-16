import type { SkillGroup } from '../types';

export const skillGroups: SkillGroup[] = [
  {
    label: 'Languages',
    description: 'The code I write',
    items: [
      { name: 'TypeScript', icon: 'typescript' },
      { name: 'JavaScript', icon: 'javascript' },
    ],
  },
  {
    label: 'Backend',
    description: 'Services and application layers',
    items: [
      { name: 'Node.js', icon: 'nodejs' },
      { name: 'NestJS', icon: 'nestjs' },
      { name: 'InversifyJS', icon: 'inversify' },
      { name: 'Express.js', icon: 'express' },
      { name: 'GraphQL', icon: 'graphql' },
    ],
  },
  {
    label: 'Protocols',
    description: 'How systems communicate',
    items: [
      { name: 'gRPC', icon: 'grpc' },
      { name: 'REST APIs', icon: 'openapi' },
      { name: 'WebSockets', icon: 'websocket' },
    ],
  },
  {
    label: 'Databases',
    description: 'Primary and analytical storage',
    items: [
      { name: 'MongoDB', icon: 'mongodb' },
      { name: 'PostgreSQL', icon: 'postgresql' },
      { name: 'TimescaleDB', icon: 'timescale' },
      { name: 'Neo4j', icon: 'neo4j' },
    ],
  },
  {
    label: 'Data & messaging',
    description: 'Cache, search, queues, and event streams',
    items: [
      { name: 'Redis', icon: 'redis' },
      { name: 'Elasticsearch', icon: 'elasticsearch' },
      { name: 'Kafka', icon: 'kafka' },
      { name: 'RabbitMQ', icon: 'rabbitmq' },
      { name: 'NATS', icon: 'nats' },
    ],
  },
  {
    label: 'Infrastructure',
    description: 'How services ship and run',
    items: [
      { name: 'Docker', icon: 'docker' },
      { name: 'Kubernetes', icon: 'kubernetes' },
      { name: 'Linux', icon: 'linux' },
      { name: 'Jenkins', icon: 'jenkins' },
      { name: 'GitHub Actions', icon: 'githubactions' },
      { name: 'Nginx', icon: 'nginx' },
      { name: 'AWS', icon: 'aws' },
      { name: 'Google Cloud', icon: 'googlecloud' },
    ],
  },
  {
    label: 'Observability',
    description: 'Monitoring and production visibility',
    items: [
      { name: 'Grafana', icon: 'grafana' },
      { name: 'Prometheus', icon: 'prometheus' },
    ],
  },
];
