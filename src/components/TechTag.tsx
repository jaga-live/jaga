// Per-technology accent colors — one hue per tag keeps it geeky without going rainbow-chaotic.
const TECH_COLORS: Record<string, string> = {
  typescript: '#3178c6',
  javascript: '#cca300',
  'node.js': '#5fa04e',
  nodejs: '#5fa04e',
  nestjs: '#e0234e',
  'express.js': '#4b5563',
  expressjs: '#4b5563',
  graphql: '#e10098',
  inversifyjs: '#9b59b6',
  grpc: '#1a7f8e',
  rest: '#6b7280',
  websocket: '#7c3aed',
  websockets: '#7c3aed',
  mongodb: '#47a248',
  postgresql: '#4169e1',
  postgres: '#4169e1',
  redis: '#dc382d',
  'redis pub/sub': '#dc382d',
  'redis-pubsub': '#dc382d',
  'ms sql server': '#cc2927',
  dynamodb: '#4053d6',
  neo4j: '#018bff',
  elasticsearch: '#0b5774',
  kafka: '#4d4d4d',
  rabbitmq: '#ff6600',
  nats: '#27aae1',
  docker: '#2496ed',
  kubernetes: '#326ce5',
  k8s: '#326ce5',
  kustomize: '#326ce5',
  linux: '#b8860b',
  jenkins: '#d33833',
  'github actions': '#2088ff',
  nginx: '#009639',
  aws: '#ff9900',
  'google cloud': '#4285f4',
  'bare metal': '#6b7280',
  microservices: '#0e6e54',
  'event-driven': '#0e6e54',
  serverless: '#dd4814',
  yaml: '#cb171e',
  '@discordjs/core': '#5865f2',
  '@discordeno/rest': '#5865f2',
  'discord-hybrid-sharding': '#5865f2',
  'discord oauth2': '#5865f2',
  lavalink: '#ee5f4a',
  timescaledb: '#c9a227',
  jwt: '#d63aa0',
  'http-proxy-middleware': '#6b7280',
  hetzner: '#d50c2d',
  python: '#3776ab',
};

export function techColor(name: string): string | null {
  return TECH_COLORS[name.toLowerCase().trim()] ?? null;
}

interface TechTagProps {
  name: string;
  className?: string;
}

export default function TechTag({ name, className = '' }: TechTagProps) {
  const color = techColor(name);
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-md border bg-chip px-2 py-0.5 font-mono text-[12px] text-secondary ${className}`}
      style={{ borderColor: color ?? 'var(--hairline)' }}
    >
      <span
        className="h-[5px] w-[5px] shrink-0 rounded-full"
        style={{ background: color ?? 'var(--muted)' }}
        aria-hidden="true"
      />
      {name}
    </span>
  );
}
