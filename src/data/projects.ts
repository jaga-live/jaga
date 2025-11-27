import type { Project } from "../types";

export const projects: Project[] = [
  {
    id: "flantic",
    title: "Flantic",
    description:
      "Popular Discord bot serving 300K+ servers with millions of active users, providing moderation, utilities, and engagement features.",
    longDescription:
      "Flantic is a widely-used Discord bot deployed across 300,000+ servers, serving millions of users daily. Built with high availability and scalability in mind, featuring advanced moderation tools, custom commands, auto-moderation, and community engagement features.",
    technologies: [
      "NestJS",
      "TypeScript",
      "gRPC",
      "WebSocket",
      "@discordjs/core",
      "MongoDB",
      "Redis",
      "PostgreSQL",
      "Docker",
      "Kubernetes",
      "Jenkins",
      "Nginx",
    ],
    image: "/project1.jpg",
    liveUrl: "https://flantic.gg",
    featured: true,
    details: {
      currentStats: {
        servers: "300K+",
        guilds: "280K+",
        users: "50M+",
      },
      hosting: {
        provider: "Hetzner",
        processor: "AMD 12-Core",
        ram: "128GB DDR4",
        storage: "2TB NVMe SSD",
      },
      architecture: {
        overview:
          "Flantic leverages a cutting-edge microservices architecture designed for extreme scalability and zero-downtime deployments. The system is separated into specialized services that communicate via gRPC, enabling independent scaling and updates without affecting the entire system.",
        benefits: [
          "Zero Downtime Deployments - flantic-ws maintains persistent WebSocket connections while flantic-main can be restarted frequently for updates without disconnecting users",
          "Horizontal Scalability - flantic-main instances can scale independently based on load, handling millions of events without affecting gateway stability",
          "Serves Millions of Discord Servers - Architecture designed to efficiently handle millions of concurrent Discord servers with optimized resource utilization",
          "Lightweight & Memory Efficient - Uses @discordjs/core for gateway connections, a minimal library that results in significantly lower memory consumption in flantic-ws compared to traditional Discord libraries",
          "Centralized Rate Limiting - flantic-rest handles all Discord API calls with intelligent rate limit management across all service instances",
          "Custom Bot Hosting Support - flantic-config enables white-label deployments for custom bot instances across different environments",
        ],
        components: [
          {
            name: "flantic-ws",
            description:
              "WebSocket microservice that manages Discord Gateway connections. Uses internal sharding via `discord-hybrid-sharding` to efficiently distribute events across multiple processes. Receives WebSocket events from Discord and forwards them to flantic-main via gRPC. Built with `@discordjs/core` for lightweight gateway handling.",
            features: [
              "Internal sharding using discord-hybrid-sharding",
              "Persistent WebSocket connection management",
              "Event streaming to flantic-main via gRPC",
              "Not load balanced - runs as singleton service",
              "Handles thousands of concurrent shards",
              "Automatic reconnection with exponential backoff",
            ],
            tech: [
              "TypeScript",
              "discord-hybrid-sharding",
              "gRPC",
              "WebSocket",
            ],
          },
          {
            name: "flantic-main",
            description:
              "Core business logic service that processes all bot operations. Receives events from flantic-ws via gRPC and HTTP events from Discord interactions. Handles command processing, auto-moderation, custom features, and scheduled cron jobs.",
            features: [
              "Receives events from flantic-ws via gRPC",
              "Handles Discord interaction HTTP events",
              "Processes all bot commands and features",
              "Manages cron jobs and scheduled tasks",
              "Horizontally scaled with load balancing",
              "Can be restarted frequently without user impact",
              "Independent scaling based on event load",
            ],
            tech: [
              "NestJS",
              "TypeScript",
              "gRPC",
              "MongoDB",
              "Redis",
              "PostgreSQL",
            ],
          },
          {
            name: "flantic-rest",
            description:
              "Dedicated REST API service that handles all outbound Discord API calls. Receives requests from flantic-main via gRPC and uses `@discordeno/rest` for intelligent rate limit management and request queuing.",
            features: [
              "Centralized Discord API communication",
              "Receives requests from flantic-main via gRPC",
              "Uses @discordeno/rest for rate limit handling",
              "Global rate limit coordination across instances",
              "Request prioritization and queuing",
              "Automatic retry with exponential backoff",
              "Prevents rate limit violations across all services",
            ],
            tech: ["TypeScript", "@discordeno/rest", "gRPC"],
          },
          {
            name: "flantic-config",
            description:
              "Infrastructure-as-code repository containing Kubernetes configurations using Kustomize. Manages deployment configurations for multiple environments (dev, beta, prod) and supports custom bot hosting with environment-specific overlays.",
            features: [
              "Kubernetes manifests using Kustomize",
              "Environment-specific configs (dev, beta, prod)",
              "Custom bot hosting support",
              "GitOps deployment workflow",
              "Configuration templating and overlays",
              "Secrets management integration",
            ],
            tech: ["Kubernetes", "Kustomize", "Docker", "YAML"],
          },
        ],
      },
      challenges: [
        {
          title: "Complexity of Microservices Architecture",
          description:
            "Moving to a microservices architecture significantly increased development complexity. Simple operations like `client.message.send()` from traditional Discord.js no longer worked since services were separated. The Discord WebSocket client became a separate entity, and the main bot logic service didn't even have the Discord library. Message collectors for waiting on user replies became extremely complex, requiring Redis storage and manual state tracking instead of using built-in Discord.js collectors. Setting up the infrastructure required extensive configuration files for gRPC communication, Kubernetes deployments, and inter-service coordination.",
          solution:
            "Created Nescord (https://github.com/jaga-live/nescord), an open-source NPM framework that abstracts away the microservices complexity. Nescord provides a developer-friendly API similar to Discord.js while handling all the underlying gRPC communication, Redis-based interaction management, and distributed state management. This allows developers to write Discord bots with the simplicity of a monolith while benefiting from microservices scalability. The framework handles service discovery, rate limiting coordination, and message routing automatically.",
        },
      ],
      architectureDiagram: `graph TB
    subgraph Discord["🌐 Discord Platform"]
        DG["Discord Gateway<br/><small>WebSocket Events</small>"]
        DI["Discord Interactions<br/><small>HTTP Webhook</small>"]
        DAPI["Discord REST API<br/><small>REST Endpoints</small>"]
    end

    subgraph K8s["☸️ Kubernetes Cluster"]
        subgraph WS["flantic-ws<br/><small>Not Load Balanced</small>"]
            FWS["WebSocket Service<br/><small>@discordjs/core</small><br/><small>discord-hybrid-sharding</small>"]
        end

        subgraph Main["flantic-main<br/><small>Horizontally Scaled</small>"]
            FM1["Instance 1<br/><small>NestJS</small>"]
            FM2["Instance 2<br/><small>NestJS</small>"]
            FM3["Instance N<br/><small>NestJS</small>"]
            LB["⚖️ Load Balancer"]
        end

        subgraph Rest["flantic-rest"]
            FR["REST Service<br/><small>@discordeno/rest</small><br/><small>Rate Limit Manager</small>"]
        end

        subgraph Config["flantic-config"]
            FC["Kustomize Configs<br/><small>dev/beta/prod</small>"]
        end
    end

    subgraph Data["💾 Data Layer"]
        MongoDB[("MongoDB<br/><small>Bot Data</small>")]
        Redis[("Redis<br/><small>Cache & State</small>")]
        Postgres[("PostgreSQL<br/><small>Analytics</small>")]
    end

    DG -.WebSocket.-> FWS
    DI -.HTTP.-> LB

    FWS ==gRPC Events==> LB
    LB --> FM1 & FM2 & FM3

    FM1 & FM2 & FM3 ==gRPC Requests==> FR
    FR -.REST API.-> DAPI

    FM1 & FM2 & FM3 --> MongoDB
    FM1 & FM2 & FM3 --> Redis
    FM1 & FM2 & FM3 --> Postgres

    FC -.Manages.-> K8s

    style Discord fill:#1e3a5f,stroke:#3b82f6,stroke-width:2px,color:#e2e8f0
    style K8s fill:#1e293b,stroke:#64748b,stroke-width:2px,color:#e2e8f0
    style Data fill:#1e4d3b,stroke:#10b981,stroke-width:2px,color:#e2e8f0
    style WS fill:#2d1b4e,stroke:#8b5cf6,stroke-width:2px,color:#e2e8f0
    style Main fill:#4c1d4d,stroke:#ec4899,stroke-width:2px,color:#e2e8f0
    style Rest fill:#4d3410,stroke:#f59e0b,stroke-width:2px,color:#e2e8f0
    style Config fill:#0e4a4a,stroke:#06b6d4,stroke-width:2px,color:#e2e8f0

    style FWS fill:#2d1b4e,stroke:#8b5cf6,stroke-width:2px,color:#e2e8f0
    style FM1 fill:#4c1d4d,stroke:#ec4899,stroke-width:2px,color:#e2e8f0
    style FM2 fill:#4c1d4d,stroke:#ec4899,stroke-width:2px,color:#e2e8f0
    style FM3 fill:#4c1d4d,stroke:#ec4899,stroke-width:2px,color:#e2e8f0
    style LB fill:#4c1d4d,stroke:#ec4899,stroke-width:2px,color:#e2e8f0
    style FR fill:#4d3410,stroke:#f59e0b,stroke-width:2px,color:#e2e8f0
    style FC fill:#0e4a4a,stroke:#06b6d4,stroke-width:2px,color:#e2e8f0`,
    },
  },
  {
    id: "nescord",
    title: "Nescord",
    description:
      "Open-source NPM framework for building large-scale Discord bots with microservice architecture, enabling horizontal scaling and efficient rate limiting.",
    longDescription:
      "Nescord is an open-source framework designed for building enterprise-grade Discord bots. Features a microservice architecture with separated WebSocket, REST API, and bot logic services. Enables horizontal scaling, centralized rate limit handling, and optimized performance for high-volume bot applications.",
    technologies: ["TypeScript", "@discordjs/core", "@discordeno/rest"],
    image: "/project2.jpg",
    githubUrl: "https://github.com/jaga-live/nescord",
    featured: true,
  },
  {
    id: "distributed-task-scheduler",
    title: "Distributed Task Scheduler",
    description:
      "Created a fault-tolerant distributed task scheduling system with priority queues and auto-scaling capabilities.",
    longDescription:
      "Built a distributed task scheduler using NestJS and MongoDB. Implemented priority-based task queuing, automatic retries with exponential backoff, and horizontal scaling. Deployed on AWS using ECS and managed with Jenkins CI/CD pipelines.",
    technologies: [
      "NestJS",
      "MongoDB",
      "Docker",
      "AWS",
      "Jenkins",
      "TypeScript",
    ],
    image: "/project3.jpg",
    githubUrl: "https://github.com/jaga-live",
    featured: true,
  },
];
