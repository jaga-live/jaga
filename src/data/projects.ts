import type { Project } from '../types';

export const projects: Project[] = [
  {
    id: '1',
    title: 'Scalable Microservices Platform',
    description: 'Built a robust microservices architecture handling millions of requests daily with distributed tracing and monitoring.',
    longDescription: 'Designed and implemented a scalable microservices platform using NestJS, Docker, and Kubernetes. Integrated Kafka for event streaming and gRPC for inter-service communication. Implemented distributed tracing with OpenTelemetry and monitoring with Prometheus and Grafana.',
    technologies: ['NestJS', 'TypeScript', 'Docker', 'Kubernetes', 'Kafka', 'gRPC', 'PostgreSQL', 'Redis'],
    image: '/project1.jpg',
    githubUrl: 'https://github.com/jaga',
    featured: true,
  },
  {
    id: '2',
    title: 'Real-time Analytics Engine',
    description: 'Developed a high-performance real-time analytics system processing streaming data with sub-second latency.',
    longDescription: 'Created a real-time analytics engine capable of processing millions of events per second. Used Kafka for event ingestion, Redis for caching, and PostgreSQL for persistent storage. Implemented custom aggregation pipelines and dashboards for real-time insights.',
    technologies: ['Node.js', 'Kafka', 'Redis', 'PostgreSQL', 'AWS', 'TypeScript'],
    image: '/project2.jpg',
    githubUrl: 'https://github.com/jaga',
    featured: true,
  },
  {
    id: '3',
    title: 'Distributed Task Scheduler',
    description: 'Created a fault-tolerant distributed task scheduling system with priority queues and auto-scaling capabilities.',
    longDescription: 'Built a distributed task scheduler using NestJS and MongoDB. Implemented priority-based task queuing, automatic retries with exponential backoff, and horizontal scaling. Deployed on AWS using ECS and managed with Jenkins CI/CD pipelines.',
    technologies: ['NestJS', 'MongoDB', 'Docker', 'AWS', 'Jenkins', 'TypeScript'],
    image: '/project3.jpg',
    githubUrl: 'https://github.com/jaga',
    featured: true,
  },
];
