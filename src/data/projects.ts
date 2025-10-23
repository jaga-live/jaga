import type { Project } from '../types';

export const projects: Project[] = [
  {
    id: '1',
    title: 'Flantic',
    description: 'Popular Discord bot serving 300K+ servers with millions of active users, providing moderation, utilities, and engagement features.',
    longDescription: 'Flantic is a widely-used Discord bot deployed across 300,000+ servers, serving millions of users daily. Built with high availability and scalability in mind, featuring advanced moderation tools, custom commands, auto-moderation, and community engagement features.',
    technologies: ['NestJS', 'TypeScript', 'gRPC', 'WebSocket', '@discordjs/core', 'MongoDB', 'Redis', 'PostgreSQL', 'Docker', 'Kubernetes', 'Jenkins', 'Nginx'],
    image: '/project1.jpg',
    liveUrl: 'https://flantic.gg',
    featured: true,
  },
  {
    id: '2',
    title: 'Nescord',
    description: 'Open-source NPM framework for building large-scale Discord bots with microservice architecture, enabling horizontal scaling and efficient rate limiting.',
    longDescription: 'Nescord is an open-source framework designed for building enterprise-grade Discord bots. Features a microservice architecture with separated WebSocket, REST API, and bot logic services. Enables horizontal scaling, centralized rate limit handling, and optimized performance for high-volume bot applications.',
    technologies: ['TypeScript', '@discordjs/core', '@discordeno/rest'],
    image: '/project2.jpg',
    githubUrl: 'https://github.com/jaga-live/nescord',
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
