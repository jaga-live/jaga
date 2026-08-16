import { Link } from 'react-router-dom';
import FlanticArchitectureDiagram from '../components/FlanticArchitectureDiagram';
import Icon from '../components/Icon';
import Seo from '../components/Seo';
import { projects } from '../data/projects';

const services = [
  {
    name: 'flantic-ws',
    role: 'Gateway',
    description: 'Keeps Discord WebSocket sessions alive, manages sharding, and forwards typed events to the rest of the platform over gRPC.',
  },
  {
    name: 'flantic-main',
    role: 'Application',
    description: 'Runs the bot business logic as stateless replicas that can scale and deploy independently.',
  },
  {
    name: 'flantic-rest',
    role: 'API control',
    description: 'Centralizes outbound Discord API calls so every replica shares the same rate-limit buckets.',
  },
  {
    name: 'flantic-voice',
    role: 'Audio',
    description: 'Owns voice state and Lavalink-backed playback without coupling audio work to the main service.',
  },
  {
    name: 'flantic-edge',
    role: 'Gateway',
    description: 'Handles OAuth, JWTs, and tier-aware routing for the dashboard APIs.',
  },
  {
    name: 'flantic-api',
    role: 'Dashboard',
    description: 'Exposes configuration and billing APIs behind the authenticated edge service.',
  },
];

const decisions = [
  {
    title: 'Separate connection lifetime from deployment lifetime',
    body: 'The gateway service owns Discord’s persistent WebSocket connection. Application replicas can restart or roll out without taking that connection with them.',
  },
  {
    title: 'Make business logic stateless',
    body: 'Gateway events arrive over typed gRPC contracts, letting the main service scale horizontally while shared state lives in purpose-built data services.',
  },
  {
    title: 'Coordinate rate limits once',
    body: 'Every outbound Discord request passes through one REST service, keeping token-level rate-limit buckets consistent across application replicas.',
  },
  {
    title: 'Turn repeated complexity into a framework',
    body: 'Nescord packages the gateway, REST, and typed event contracts so feature code stays approachable even when the runtime is distributed.',
  },
];

const stack = [
  { label: 'Language & runtime', items: ['TypeScript', 'Node.js'] },
  { label: 'Application', items: ['NestJS', 'React'] },
  { label: 'Communication', items: ['gRPC', 'WebSockets', 'REST APIs'] },
  { label: 'Data', items: ['MongoDB', 'PostgreSQL', 'TimescaleDB', 'Redis'] },
  { label: 'Infrastructure', items: ['Docker', 'Kubernetes', 'Kustomize', 'Jenkins', 'Nginx'] },
  { label: 'Platform', items: ['@discordjs/core', 'Lavalink', 'Hetzner'] },
];

export default function FlanticProject() {
  const project = projects.find((item) => item.id === 'flantic');

  if (!project) return null;

  return (
    <article className="case-study">
      <Seo
        title="Flantic architecture | Jaga"
        description="A case study of the distributed architecture behind Flantic, a production Discord platform built and operated by Jaga."
        path="/projects/flantic"
      />
      <header className="case-hero section-shell">
        <div className="case-hero__topline">
          <Link className="back-link" to="/">
            <Icon name="arrow-left" size={17} /> Back to portfolio
          </Link>
          <span>Architecture case study</span>
        </div>
        <div className="case-hero__grid">
          <div>
            <p className="case-hero__label">Flantic architecture case study</p>
            <div className="case-hero__title">
              <img src={project.logo} width="64" height="64" alt="Flantic logo" />
              <h1>{project.title}</h1>
            </div>
            <p>{project.description}</p>
          </div>
          <dl className="case-meta">
            <div><dt>Role</dt><dd>Owner, architect, and developer</dd></div>
            <div><dt>Status</dt><dd><span className="case-production-label">Production</span></dd></div>
            <div><dt>Scope</dt><dd>Product, backend, infrastructure, and operations</dd></div>
          </dl>
        </div>
        <dl className="case-metrics">
          {project.evidence.map((item) => (
            <div key={item.label}><dd>{item.value}</dd><dt>{item.label}</dt></div>
          ))}
        </dl>
      </header>

      <section className="case-section section-shell case-brief" aria-labelledby="brief-title">
        <div>
          <p className="eyebrow">The brief</p>
          <h2 id="brief-title">I built the product and the platform behind it.</h2>
        </div>
        <div>
          <p>
            I started Flantic as a product and designed its architecture around the problems that came
            with real growth. I built the gateway, application, REST, voice, dashboard, data, and
            deployment layers, then took responsibility for running them in production.
          </p>
          <p>
            The services are split by operational responsibility. Persistent connections stay stable,
            application workers scale independently, outbound Discord requests share one rate-limit
            controller, and each workload can be released without taking the whole product down.
          </p>
        </div>
      </section>

      <section className="case-section case-architecture" id="architecture" aria-labelledby="architecture-title">
        <div className="section-shell">
          <div className="case-section__heading case-section__heading--diagram">
            <p className="eyebrow">System model</p>
            <h2 id="architecture-title">How the services connect.</h2>
            <p>The orange routes are internal service calls. Cyan routes show traffic entering or leaving the platform. Every Flantic service is linked to its explanation below.</p>
          </div>
          <p className="architecture-mobile-note">Swipe sideways to follow the complete system.</p>
          <FlanticArchitectureDiagram />
        </div>
      </section>

      <section className="case-section section-shell" aria-labelledby="services-title">
        <div className="case-section__heading">
          <p className="eyebrow">Service boundaries</p>
          <h2 id="services-title">One operational responsibility each.</h2>
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

      <section className="case-section section-shell" aria-labelledby="decisions-title">
        <div className="case-section__heading">
          <p className="eyebrow">Key decisions</p>
          <h2 id="decisions-title">Trade-offs made explicit.</h2>
        </div>
        <ol className="decision-list">
          {decisions.map((decision, index) => (
            <li key={decision.title}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <div><h3>{decision.title}</h3><p>{decision.body}</p></div>
            </li>
          ))}
        </ol>
      </section>

      <section className="case-section section-shell" aria-labelledby="stack-title">
        <div className="case-section__heading">
          <p className="eyebrow">Technology</p>
          <h2 id="stack-title">Grouped by responsibility.</h2>
        </div>
        <div className="case-stack">
          {stack.map((group) => (
            <div key={group.label}>
              <h3>{group.label}</h3>
              <ul>{group.items.map((item) => <li key={item}>{item}</li>)}</ul>
            </div>
          ))}
        </div>
      </section>

      <section className="case-next section-shell">
        <p className="eyebrow">Continue</p>
        <div>
          <h2>See the framework extracted from this architecture.</h2>
          <a href="https://github.com/jaga-live/nescord" target="_blank" rel="noreferrer">
            Explore Nescord on GitHub <Icon name="arrow-up-right" size={18} />
          </a>
        </div>
      </section>
    </article>
  );
}
