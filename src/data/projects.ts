import type { Project } from '../types';

export const projects: Project[] = [
  {
    id: 'flantic',
    title: 'Flantic',
    tagline: 'Discord platform at scale',
    role: 'Architect & developer',
    // TODO(confirm): real timeframe.
    year: '2022 — present',
    status: 'live',
    // TODO(confirm): defensible numbers you can defend in an interview.
    metrics: [
      { value: 300, suffix: 'K+', label: 'servers' },
      { value: 50, suffix: 'M+', label: 'users reached' },
    ],
    // Exaggerated, category-grouped stack for the case study — TODO(confirm/trim) to reality.
    techStack: [
      { category: 'Language', items: ['TypeScript'] },
      { category: 'Runtime', items: ['Node.js'] },
      { category: 'Framework', items: ['NestJS'] },
      { category: 'RPC & transport', items: ['gRPC', 'WebSocket', 'REST'] },
      { category: 'Gateway libraries', items: ['@discordjs/core', 'discord-hybrid-sharding'] },
      { category: 'REST library', items: ['@discordeno/rest'] },
      { category: 'Auth & routing', items: ['Discord OAuth2', 'JWT', 'http-proxy-middleware'] },
      { category: 'Datastores', items: ['MongoDB', 'PostgreSQL', 'TimescaleDB'] },
      { category: 'Cache & pub/sub', items: ['Redis', 'Redis pub/sub'] },
      { category: 'Audio', items: ['Lavalink'] },
      { category: 'Orchestration', items: ['Kubernetes', 'Kustomize', 'Docker'] },
      { category: 'CI/CD', items: ['Jenkins', 'GitHub Actions'] },
      { category: 'Networking', items: ['Nginx'] },
      { category: 'Hosting', items: ['Hetzner', 'Bare Metal'] },
    ],
    description:
      'Popular Discord bot serving 300K+ servers with millions of active users, providing moderation, utilities, and engagement features.',
    longDescription:
      'Flantic is a widely-used Discord bot deployed across 300,000+ servers, serving millions of users daily. Built with high availability and scalability in mind, featuring advanced moderation tools, custom commands, auto-moderation, and community engagement features.',
    technologies: [
      'NestJS',
      'TypeScript',
      'gRPC',
      'WebSocket',
      '@discordjs/core',
      'MongoDB',
      'Redis',
      'PostgreSQL',
      'TimescaleDB',
      'Lavalink',
      'Docker',
      'Kubernetes',
      'Jenkins',
      'Nginx',
    ],
    image: '/project1.jpg',
    liveUrl: 'https://flantic.gg',
    featured: true,
    problem:
      'A single-process Discord bot can’t survive at hundreds of thousands of servers: one gateway connection becomes a bottleneck, a single deploy disconnects every user, and a crash takes the whole bot down. Flantic needed to scale horizontally and ship updates with zero downtime.',
    why:
      'Flantic serves millions of users daily, so reliability and update velocity are the product. The architecture had to let the gateway stay connected while business logic is restarted and scaled independently.',
    decisions: [
      {
        title: 'Split the gateway from the logic',
        detail:
          'A dedicated flantic-ws service holds the persistent Discord WebSocket (with internal sharding) and streams events over gRPC to stateless flantic-main instances — so the bot can be redeployed without dropping a single connection.',
      },
      {
        title: 'Lightweight gateway library',
        detail:
          'Used @discordjs/core instead of a full Discord.js client in the WebSocket service, cutting memory per shard and letting one service hold thousands of concurrent shards.',
      },
      {
        title: 'Centralize all Discord REST calls',
        detail:
          'A single flantic-rest service owns outbound API calls and global rate-limit coordination, so scaling flantic-main never trips Discord’s rate limits.',
      },
      {
        title: 'Abstract the complexity into a framework',
        detail:
          'Built Nescord so feature code reads like a monolith (Discord.js-style API) while gRPC routing, Redis-backed interaction state, and service discovery are handled underneath.',
      },
    ],
    results: [
      'Zero-downtime deploys — flantic-main restarts without disconnecting users.',
      'Horizontal scaling of business logic independent of gateway stability.',
      'Lower memory footprint per shard via a minimal gateway library.',
      'Rate-limit violations eliminated through centralized REST coordination.',
    ],
    details: {
      currentStats: {
        servers: '300K+',
        guilds: '280K+',
        users: '50M+',
      },
      hosting: {
        provider: 'Hetzner',
        processor: 'AMD 12-Core',
        ram: '128GB DDR4',
        storage: '2TB NVMe SSD',
      },
      architecture: {
        overview:
          'Flantic runs as a NestJS monorepo split into six specialized microservices — gateway (ws), bot logic (main), Discord REST proxy (rest), voice/audio (voice), dashboard API (api), and an auth + routing control plane (edge) — that communicate over gRPC and share a common library. Paid guilds are physically isolated into their own Kubernetes namespace, and flantic-edge routes every dashboard request to the correct tier’s pods.',
        benefits: [
          'Zero Downtime Deployments - flantic-ws holds the persistent gateway connection while stateless services are rolled with real health probes, so updates never disconnect users',
          'Independent Scaling - each concern (gateway, logic, REST, voice, API, routing) scales and deploys on its own, isolating failure and load',
          'Lightweight Gateway - flantic-ws uses @discordjs/core with discord-hybrid-sharding (24 shards per cluster) for a low memory footprint per shard',
          'Centralized Rate Limiting - flantic-rest is the single choke point for all Discord REST calls, holding the rate-limit buckets so scaling the logic tier never trips Discord’s global limits',
          'Tier-Aware Routing - flantic-edge looks up each guild’s subscription tier and reverse-proxies dashboard traffic to the right Free or Prime API pods across namespaces',
          'Isolated Premium Tier - paid guilds run on a physically separate stack (own namespace and bot identity) for noisy-neighbor protection and a premium SLA',
        ],
        components: [
          {
            name: 'flantic-ws',
            description:
              'The gateway connector. Maintains the persistent WebSocket connection to Discord and shards it across processes with `discord-hybrid-sharding` (24 shards per cluster). Forwards all real-time gateway events to flantic-main over gRPC, and voice state/server updates to flantic-voice.',
            features: [
              'Multi-process sharding via discord-hybrid-sharding (24 shards/cluster)',
              'Persistent Discord Gateway WebSocket connection',
              'Streams 26 gateway event types to flantic-main via gRPC',
              'Forwards VoiceState/VoiceServer updates to flantic-voice',
              'Relays Lavalink voice-gateway payloads back via Redis pub/sub',
              'Runs as a singleton — decoupled from the logic tier’s deploy cycle',
            ],
            tech: ['TypeScript', '@discordjs/core', 'discord-hybrid-sharding', 'gRPC', 'WebSocket'],
          },
          {
            name: 'flantic-main',
            description:
              'The core bot brain. Receives gateway events from flantic-ws and Discord interaction webhooks, then executes every feature — moderation, tickets, giveaways, automations, leveling — and fans out to the other services over gRPC. Runs as multiple replicas behind DNS-based round-robin gRPC.',
            features: [
              'Receives 26 gateway event types from flantic-ws via gRPC',
              'Handles Discord interaction (slash command) HTTP webhooks',
              'Calls flantic-rest for every Discord API action',
              'Sends soundboard/music playback commands to flantic-voice',
              'Syncs guild tiers and members to flantic-edge via gRPC',
              'Multiple replicas with client-side round-robin gRPC',
            ],
            tech: ['NestJS', 'TypeScript', 'gRPC', 'MongoDB', 'PostgreSQL', 'Redis'],
          },
          {
            name: 'flantic-rest',
            description:
              'The centralized Discord REST proxy. Every outbound Discord API call from flantic-main and flantic-api funnels through this one service, which owns the rate-limit buckets in memory so scaling the logic tier never trips Discord’s global limits.',
            features: [
              'Single choke point for all outbound Discord REST calls',
              'In-memory global rate-limit bucket coordination',
              'Serves flantic-main and flantic-api over gRPC',
              'Request queuing with automatic retry and backoff',
              'Deployed with a Recreate strategy to preserve the rate-limit bucket',
            ],
            tech: ['NestJS', 'TypeScript', 'gRPC'],
          },
          {
            name: 'flantic-voice',
            description:
              'The voice and audio service. Manages Lavalink for soundboard and music playback — join/leave, play, stop, seek, volume, speed, per-guild player state, and idle auto-disconnect. Receives playback commands from flantic-main and voice-state events from flantic-ws over gRPC.',
            features: [
              'Lavalink-backed audio for the soundboard and music playback',
              'Per-guild player state — seek, speed, volume, idle disconnect',
              'VoiceService gRPC — playback commands from flantic-main',
              'VoiceEventService gRPC — voice state/server updates from flantic-ws',
              'Relays Lavalink voice-gateway payloads to ws via Redis pub/sub',
            ],
            tech: ['NestJS', 'TypeScript', 'Lavalink', 'gRPC', 'Redis'],
          },
          {
            name: 'flantic-edge',
            description:
              'The API gateway and control plane. Handles Discord OAuth2 login and JWT issuance, then acts as a tier-aware reverse proxy — looking up each guild’s subscription tier and routing dashboard traffic to the Free API (prod namespace) or Prime API (prime namespace) pods. Also serves the EdgeEvents gRPC that keeps guild-tier and member data in sync.',
            features: [
              'Tier-based reverse proxy — routes Free vs Prime traffic to the right namespace pods',
              'Discord OAuth2 login with JWT access + refresh tokens',
              'Per-guild subscription-tier lookup drives routing (Postgres-backed)',
              'admin/ and payments/ routes pinned to the Prime backend',
              'EdgeEvents gRPC — guild/member/tier sync from main and api',
              'Single authenticated entrypoint for the whole dashboard',
            ],
            tech: ['NestJS', 'TypeScript', 'http-proxy-middleware', 'JWT', 'PostgreSQL', 'gRPC'],
          },
          {
            name: 'flantic-api',
            description:
              'The dashboard backend, deployed per tier (Free and Prime). Exposes CRUD REST endpoints for every feature’s configuration and handles billing webhooks. It is only ever reached through flantic-edge’s authenticated proxy.',
            features: [
              'CRUD REST API for every bot feature’s configuration',
              'Deployed per tier (Free / Prime) via FLANTIC_ENV',
              'Payment webhooks — Stripe, Razorpay, Whop, Dodo',
              'Reached only behind flantic-edge (authenticated proxy)',
              'Calls flantic-rest for Discord data; syncs tiers to flantic-edge',
            ],
            tech: ['NestJS', 'TypeScript', 'gRPC', 'MongoDB', 'PostgreSQL', 'TimescaleDB'],
          },
          {
            name: 'flantic-config',
            description:
              'The infrastructure-as-code repo. Kubernetes manifests via Kustomize with dev / prod / prime overlays — prod adds the edge control plane and shared Postgres, while prime stands up a fully isolated duplicate stack (its own bot identity) in a separate namespace for paid guilds.',
            features: [
              'Kubernetes manifests with a Kustomize base + overlays',
              'dev / prod / prime environment overlays',
              'prime overlay = physically isolated stack for paid guilds',
              'Zero-downtime rollouts (RollingUpdate) with real /health probes',
              'GitOps deployment workflow',
            ],
            tech: ['Kubernetes', 'Kustomize', 'Docker', 'YAML'],
          },
        ],
      },
      challenges: [
        {
          title: 'Complexity of Microservices Architecture',
          description:
            "Moving to a microservices architecture significantly increased development complexity. Simple operations like `client.message.send()` from traditional Discord.js no longer worked since services were separated. The Discord WebSocket client became a separate entity, and the main bot logic service didn't even have the Discord library. Message collectors for waiting on user replies became extremely complex, requiring Redis storage and manual state tracking instead of using built-in Discord.js collectors. Setting up the infrastructure required extensive configuration files for gRPC communication, Kubernetes deployments, and inter-service coordination.",
          solution:
            'Created Nescord (https://github.com/jaga-live/nescord), an open-source NPM framework that abstracts away the microservices complexity. Nescord provides a developer-friendly API similar to Discord.js while handling all the underlying gRPC communication, Redis-based interaction management, and distributed state management. This allows developers to write Discord bots with the simplicity of a monolith while benefiting from microservices scalability. The framework handles service discovery, rate limiting coordination, and message routing automatically.',
        },
      ],
      architectureDiagram: `graph TB
    subgraph Discord["Discord Platform"]
        DG["Gateway<br/><small>WebSocket events</small>"]
        DI["Interactions<br/><small>HTTP webhook</small>"]
        DAPI["Discord REST API"]
    end

    APP["flantic-app<br/><small>React dashboard</small>"]

    subgraph Prod["Kubernetes · prod namespace (Free tier)"]
        WS["flantic-ws<br/><small>gateway + sharding</small>"]
        MAIN["flantic-main<br/><small>bot logic · 3 replicas</small>"]
        REST["flantic-rest<br/><small>Discord REST proxy</small>"]
        VOICE["flantic-voice<br/><small>voice + audio</small>"]
        LAVA["Lavalink<br/><small>audio server</small>"]
        EDGE["flantic-edge<br/><small>OAuth · JWT · tier router</small>"]
        APIF["flantic-api<br/><small>dashboard API · Free</small>"]
    end

    subgraph Prime["prime namespace (Prime tier)"]
        APIP["flantic-api<br/><small>dashboard API · Prime</small>"]
    end

    subgraph Data["Data layer"]
        MONGO[("MongoDB")]
        PG[("PostgreSQL")]
        TS[("TimescaleDB")]
        REDIS[("Redis")]
    end

    DG -. events .-> WS
    DI -. interactions .-> MAIN
    WS == gRPC events ==> MAIN
    WS == voice events ==> VOICE
    MAIN == gRPC ==> REST
    MAIN == playback ==> VOICE
    MAIN == tier / member sync ==> EDGE
    VOICE == websocket ==> LAVA
    VOICE -. voice:gateway .-> WS
    REST -. REST .-> DAPI
    APP -- HTTPS --> EDGE
    EDGE == Free tier ==> APIF
    EDGE == Prime tier ==> APIP
    APIF == gRPC ==> REST
    APIP == gRPC ==> REST
    MAIN --> MONGO & PG & REDIS
    APIF --> MONGO & PG & TS
    EDGE --> PG`,
    },
  },
  {
    id: 'nescord',
    title: 'Nescord',
    tagline: 'Open-source microservice framework',
    role: 'Creator & maintainer',
    status: 'open-source',
    // TODO(add): npm downloads / GitHub stars if you want to surface them.
    description:
      'Open-source NPM framework for building large-scale Discord bots with microservice architecture, enabling horizontal scaling and efficient rate limiting.',
    longDescription:
      'Nescord is an open-source framework designed for building enterprise-grade Discord bots. Features a microservice architecture with separated WebSocket, REST API, and bot logic services. Enables horizontal scaling, centralized rate limit handling, and optimized performance for high-volume bot applications.',
    technologies: ['TypeScript', '@discordjs/core', '@discordeno/rest'],
    image: '/project2.jpg',
    githubUrl: 'https://github.com/jaga-live/nescord',
    featured: true,
  },
  {
    id: 'distributed-task-scheduler',
    title: 'Distributed Task Scheduler',
    tagline: 'Fault-tolerant job pipeline',
    role: 'Developer',
    // TODO(confirm): is this in production or a personal/learning project? Set accordingly.
    status: 'personal',
    description:
      'Created a fault-tolerant distributed task scheduling system with priority queues and auto-scaling capabilities.',
    longDescription:
      'Built a distributed task scheduler using NestJS and MongoDB. Implemented priority-based task queuing, automatic retries with exponential backoff, and horizontal scaling. Deployed on AWS using ECS and managed with Jenkins CI/CD pipelines.',
    technologies: ['NestJS', 'MongoDB', 'Docker', 'AWS', 'Jenkins', 'TypeScript'],
    image: '/project3.jpg',
    githubUrl: 'https://github.com/jaga-live',
    featured: true,
  },
];
