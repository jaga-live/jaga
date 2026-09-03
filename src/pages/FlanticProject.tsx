import { Link } from 'react-router-dom';
import BrandLogo from '../components/BrandLogo';
import FlanticArchitectureDiagram from '../components/FlanticArchitectureDiagram';
import Icon from '../components/Icon';
import Seo from '../components/Seo';
import { projects } from '../data/projects';

const monolithBottlenecks = [
  {
    title: 'Gateway Fragility & Reconnect Storms',
    summary: 'A single-process monolith cannot deploy without dropping all user connections.',
    detail:
      'In a monolithic bot, every bug fix or feature update tears down the persistent Discord Gateway WebSocket. Across 300,000+ servers, reconnecting hundreds of shards simultaneously triggers Discord’s strict IDENTIFY rate limits (max 1,000/day), locking the bot out and causing hours-long downtime.',
  },
  {
    title: 'Uncoordinated REST Rate Limit Collisions',
    summary: 'Multiple workers hitting Discord directly trigger 429 bans.',
    detail:
      'When horizontal replicas call the Discord REST API independently, each replica maintains its own isolated rate-limit counters. Under traffic spikes, outbound requests collide on Discord’s global 50 req/s bucket and per-route limits, risking Cloudflare IP edge bans.',
  },
  {
    title: 'Severe Memory Footprint & Sharding Bloat',
    summary: 'Monolithic clients cache all guild state in process RAM.',
    detail:
      'Traditional Discord.js clients eagerly cache entire server structures, member lists, and channel objects in memory. Spanning 200+ shards across processes quickly consumed over 4+ GB of RAM, multiplying memory cost whenever application logic needed to scale.',
  },
  {
    title: 'Voice Audio & Event Loop Starvation',
    summary: 'CPU-intensive audio encoding starves critical command processing.',
    detail:
      'Processing real-time audio streams, soundboard playback, and voice connections in the same Node.js runtime blocks the event loop. Heavy voice traffic caused noticeable command delays and choppy audio for active Discord voice channels.',
  },
];

const services = [
  {
    name: 'flantic-ws',
    role: 'Gateway & Sharding',
    description:
      'Maintains persistent WebSocket connections to Discord Gateway. Uses discord-hybrid-sharding (64 shards/worker) and lean @discordjs/ws modules. Preserves session sequence IDs in Redis so pods can instantly RESUME after restarts without cold IDENTIFYs.',
  },
  {
    name: 'flantic-main',
    role: 'Bot Core Application',
    description:
      'Stateless bot business logic deployed with horizontal scaling. Receives 26 typed gateway events from flantic-ws over gRPC (:5000) and slash command interaction webhooks directly from Nginx (:3001). Syncs guild lifecycle events (create, update, delete) and member data in real time to flantic-edge over gRPC (:5002), and routes outbound Discord operations to flantic-rest (:5001).',
  },
  {
    name: 'flantic-rest',
    role: 'Global Rate-Limit Proxy',
    description:
      'Central choke point for all outbound Discord REST calls. Built with @discordeno/rest to implement global proactive bucket queueing, header-aware pacing, and reactive retries—preventing 429 rate limit violations across all services.',
  },
  {
    name: 'flantic-voice',
    role: 'Voice & Audio Engine',
    description:
      'Isolates audio streaming from bot logic. Controls Lavalink over WebSocket (:2333), tracks per-guild player state, and relays voice gateway payloads back to flantic-ws through Redis pub/sub (voice:gateway channel).',
  },
  {
    name: 'flantic-edge',
    role: 'API Gateway & Tier Router',
    description:
      'Control plane for the web dashboard and Discord Activity. Hosts the EdgeEvents gRPC service (:5002) to receive real-time guild create, update, delete, and member sync events from flantic-main. Handles Discord OAuth2 login, issues JWT tokens, and dynamically proxies dashboard traffic to Free vs. Prime API pods based on live guild subscription tier.',
  },
  {
    name: 'flantic-api',
    role: 'Multi-Tenant Dashboard API',
    description:
      'Provides CRUD REST endpoints for dashboard server configuration, analytics retrieval, and Whop payment processing. Deployed separately in prod (Free tier) and prime (isolated Prime tier) Kubernetes namespaces.',
  },
  {
    name: 'flantic-config',
    role: 'GitOps Infrastructure',
    description:
      'Declarative Kubernetes infrastructure managed via Kustomize with dev, prod, and prime overlays. Configures automated daily database backups to Cloudflare R2, local-path storage PVCs, and rolling deployment strategies.',
  },
];

const decisions = [
  {
    title: 'Decouple connection lifetime from deployment lifetime',
    body: 'The gateway service (flantic-ws) holds persistent WebSocket sessions as a dedicated singleton. Application workers (flantic-main) can be updated or restarted hundreds of times a day with zero gateway disconnects or user impact.',
  },
  {
    title: 'Lean gateway runtime with sequence checkpointing',
    body: 'Replaced monolithic Discord.js client in the gateway with lightweight @discordjs/ws and 64 shards per worker, cutting memory from 1.3 GB down to ~350 MB. Redis sequence persistence enables instant RESUME handoffs.',
  },
  {
    title: 'Single outbound choke point for Discord REST',
    body: 'All outbound Discord calls pass through flantic-rest via gRPC. Global rate-limit buckets are tracked in a single memory store, eliminating race conditions and 429 rate-limit bans across distributed workers.',
  },
  {
    title: 'Dual-namespace isolation for paying communities',
    body: 'Free and Prime tiers run in separate Kubernetes namespaces (prod vs prime). Flantic-edge inspects subscription records in PostgreSQL and transparently proxies dashboard and socket traffic to the appropriate isolated pod.',
  },
  {
    title: 'Extracted the pattern into the Nescord open-source framework',
    body: 'Packaged the gRPC contracts, gateway sharding model, and REST proxy abstractions into Nescord, an open-source framework so other developers can build scalable Discord bots with monolith simplicity.',
  },
];

const stackGroups = [
  {
    category: 'Language & Runtime',
    items: [
      { name: 'TypeScript', icon: 'typescript' },
      { name: 'Node.js', icon: 'nodejs' },
    ],
  },
  {
    category: 'Backend Frameworks & Libs',
    items: [
      { name: 'NestJS', icon: 'nestjs' },
      { name: 'TypeORM', icon: 'typeorm' },
      { name: 'Mongoose', icon: 'mongoose' },
      { name: 'Passport.js', icon: 'passport' },
      { name: '@discordjs/ws', icon: 'discord' },
      { name: '@discordeno/rest', icon: 'discordeno' },
      { name: 'discord-hybrid-sharding', icon: 'discord' },
    ],
  },
  {
    category: 'Protocols & Transports',
    items: [
      { name: 'gRPC (Protobuf)', icon: 'grpc' },
      { name: 'WebSockets', icon: 'websocket' },
      { name: 'REST APIs', icon: 'openapi' },
      { name: 'Redis Pub/Sub', icon: 'redis' },
    ],
  },
  {
    category: 'Frontend & UI',
    items: [
      { name: 'React', icon: 'react' },
      { name: 'shadcn/ui', icon: 'shadcn' },
      { name: 'Radix UI', icon: 'radix' },
      { name: 'Tailwind CSS', icon: 'tailwindcss' },
      { name: 'TanStack Query', icon: 'tanstack' },
      { name: 'Vite', icon: 'vite' },
    ],
  },
  {
    category: 'Databases & Storage',
    items: [
      { name: 'PostgreSQL', icon: 'postgresql' },
      { name: 'TimescaleDB', icon: 'timescaledb' },
      { name: 'MongoDB', icon: 'mongodb' },
      { name: 'Redis', icon: 'redis' },
      { name: 'Cloudflare R2', icon: 'cloudflare' },
    ],
  },
  {
    category: 'Infrastructure & DevOps',
    items: [
      { name: 'Kubernetes', icon: 'kubernetes' },
      { name: 'Kustomize', icon: 'kustomize' },
      { name: 'Docker', icon: 'docker' },
      { name: 'Jenkins CI/CD', icon: 'jenkins' },
      { name: 'Nginx', icon: 'nginx' },
      { name: 'Hetzner VPS', icon: 'hetzner' },
    ],
  },
  {
    category: 'Audio, Billing & Tooling',
    items: [
      { name: 'Lavalink', icon: 'lavalink' },
      { name: 'SoundCloud API', icon: 'soundcloud' },
      { name: 'Whop Payments', icon: 'whop' },
      { name: 'Stripe', icon: 'stripe' },
      { name: 'Razorpay', icon: 'razorpay' },
    ],
  },
];

export default function FlanticProject() {
  const project = projects.find((item) => item.id === 'flantic');

  if (!project) {
    return null;
  }

  return (
    <article className="case-study">
      <Seo
        title="Flantic Architecture Case Study | Jaga"
        description="How I designed and operated the distributed microservices architecture behind Flantic, serving 300,000+ Discord servers and processing ~15M daily requests."
        path="/projects/flantic"
      />

      {/* Hero Header */}
      <header className="case-hero section-shell">
        <div className="case-hero__topline">
          <Link className="back-link" to="/">
            <Icon name="arrow-left" size={17} /> Back to portfolio
          </Link>
          <span className="case-hero__category">ARCHITECTURE CASE STUDY</span>
        </div>

        <div className="case-hero__header">
          <div className="case-hero__branding">
            <img
              src={project.logo}
              width="72"
              height="72"
              alt="Flantic logo"
              className="case-hero__logo"
            />
            <div>
              <h1 className="case-hero__heading">{project.title}</h1>
            </div>
          </div>

          <p className="case-hero__synopsis">
            A production Discord platform powering security, moderation, voice, and server
            management for more than <strong>300,000 servers</strong> and{' '}
            <strong>20M+ users</strong>. I architected the 6-microservice gRPC system, engineered
            each service, and operated the infrastructure on Hetzner VPS with Kubernetes.
          </p>

          <div className="case-meta-bar">
            <div className="case-meta-bar__item">
              <span className="case-meta-bar__label">Role</span>
              <strong className="case-meta-bar__value">Owner, Architect &amp; Developer</strong>
            </div>
            <div className="case-meta-bar__item">
              <span className="case-meta-bar__label">Scale</span>
              <strong className="case-meta-bar__value">300,000+ Guilds · ~15M Req/Day</strong>
            </div>
            <div className="case-meta-bar__item">
              <span className="case-meta-bar__label">Hosting</span>
              <strong className="case-meta-bar__value">Frankfurt · 16GB RAM · 8 vCPU</strong>
            </div>
            <div className="case-meta-bar__item">
              <span className="case-meta-bar__label">Framework</span>
              <strong className="case-meta-bar__value">Nescord (Open Source)</strong>
            </div>
          </div>
        </div>

        {/* Highlight Metrics Cards */}
        <div className="case-metrics-grid">
          <div className="case-metric-card">
            <div className="case-metric-card__value">300K+</div>
            <div className="case-metric-card__label">Active Servers</div>
            <div className="case-metric-card__sub">Across global Discord communities</div>
          </div>
          <div className="case-metric-card">
            <div className="case-metric-card__value">20M+</div>
            <div className="case-metric-card__label">Users Reached</div>
            <div className="case-metric-card__sub">Protected &amp; managed daily</div>
          </div>
          <div className="case-metric-card">
            <div className="case-metric-card__value">~15M</div>
            <div className="case-metric-card__label">Daily Requests</div>
            <div className="case-metric-card__sub">Events, commands &amp; API calls</div>
          </div>
          <div className="case-metric-card">
            <div className="case-metric-card__value">80+</div>
            <div className="case-metric-card__label">Commands &amp; Tools</div>
            <div className="case-metric-card__sub">Security, moderation &amp; voice</div>
          </div>
        </div>
      </header>

      {/* The Case Study: Monolith Bottlenecks */}
      <section className="case-section section-shell" aria-labelledby="problem-title">
        <div className="case-section__heading">
          <p className="eyebrow">The Challenge</p>
          <h2 id="problem-title">Why monolithic Discord bots fail at scale.</h2>
          <p className="case-section__intro">
            Traditional Discord bots are built as single-process applications using monolithic
            libraries like Discord.js. While straightforward for small bots, this model completely
            breaks down when scaling past tens of thousands of guilds.
          </p>
        </div>

        <div className="bottlenecks-grid">
          {monolithBottlenecks.map((item, idx) => (
            <div key={item.title} className="bottleneck-card">
              <div className="bottleneck-card__num">0{idx + 1}</div>
              <h3 className="bottleneck-card__title">{item.title}</h3>
              <p className="bottleneck-card__summary">{item.summary}</p>
              <p className="bottleneck-card__detail">{item.detail}</p>
            </div>
          ))}
        </div>
      </section>

      {/* System Architecture Diagram */}
      <section
        className="case-section case-architecture"
        id="architecture"
        aria-labelledby="architecture-title"
      >
        <div className="section-shell">
          <div className="case-section__heading case-section__heading--diagram">
            <p className="eyebrow">System Topology</p>
            <h2 id="architecture-title">The 6-microservice architecture.</h2>
            <p>
              Every workload is split into an independent service with its own deployment lifecycle.
              Gateway sessions remain rock solid, stateless bot workers scale horizontally, outbound
              REST requests share one rate-limit controller, and dashboard APIs run in isolated
              namespaces.
            </p>
          </div>
          <p className="architecture-mobile-note">
            Swipe horizontally to inspect the complete system.
          </p>
          <FlanticArchitectureDiagram />
        </div>
      </section>

      {/* Service Boundaries */}
      <section className="case-section section-shell" aria-labelledby="services-title">
        <div className="case-section__heading">
          <p className="eyebrow">Service Breakdown</p>
          <h2 id="services-title">Decoupled operational responsibilities.</h2>
          <p className="case-section__intro">
            Each microservice is purpose-built to solve a single failure domain, communicating over
            high-speed typed gRPC contracts and low-latency message brokers.
          </p>
        </div>
        <div className="service-list">
          {services.map((service) => (
            <article id={`service-${service.name}`} key={service.name}>
              <span>{service.role}</span>
              <h3>{service.name}</h3>
              <p>{service.description}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Key Decisions */}
      <section className="case-section section-shell" aria-labelledby="decisions-title">
        <div className="case-section__heading">
          <p className="eyebrow">Engineering Decisions</p>
          <h2 id="decisions-title">Architectural trade-offs in production.</h2>
        </div>
        <ol className="decision-list">
          {decisions.map((decision, index) => (
            <li key={decision.title}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <div>
                <h3>{decision.title}</h3>
                <p>{decision.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* Technology Stack with Brand Icons */}
      <section className="case-section section-shell" aria-labelledby="stack-title">
        <div className="case-section__heading">
          <p className="eyebrow">Technology Stack</p>
          <h2 id="stack-title">Technologies across the platform.</h2>
          <p className="case-section__intro">
            Built from scratch with modern TypeScript, distributed protocols, time-series storage,
            and cloud-native container orchestration.
          </p>
        </div>
        <div className="case-tech-grid">
          {stackGroups.map((group) => (
            <div key={group.category} className="case-tech-card">
              <h3>{group.category}</h3>
              <ul>
                {group.items.map((item) => (
                  <li key={item.name} className="case-tech-badge">
                    <BrandLogo name={item.name} icon={item.icon} />
                    <span>{item.name}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Next Project / Open Source CTA */}
      <section className="case-next section-shell">
        <p className="eyebrow">Framework Extraction</p>
        <div>
          <h2>Explore Nescord on GitHub</h2>
          <p className="case-next__sub">
            The microservices patterns, gRPC event contracts, and rate-limiting queues developed for
            Flantic were extracted into an open-source framework for the Discord developer
            ecosystem.
          </p>
          <a
            href="https://github.com/jaga-live/nescord"
            target="_blank"
            rel="noreferrer"
            className="button button--primary"
          >
            View Nescord on GitHub <Icon name="arrow-up-right" size={18} />
          </a>
        </div>
      </section>
    </article>
  );
}

