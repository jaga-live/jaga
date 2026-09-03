import type { SimpleIcon } from 'simple-icons';
import {
  siApachekafka,
  siCloudflare,
  siDeno,
  siDiscord,
  siDiscorddotjs,
  siDocker,
  siElasticsearch,
  siExpress,
  siGithubactions,
  siGooglecloud,
  siGrafana,
  siGraphql,
  siHelm,
  siHetzner,
  siJavascript,
  siJenkins,
  siKubernetes,
  siLinkerd,
  siLinux,
  siMongodb,
  siMongoose,
  siNatsdotio,
  siNeo4j,
  siNestjs,
  siNginx,
  siNodedotjs,
  siNpm,
  siOpenapiinitiative,
  siPassport,
  siPostgresql,
  siPrometheus,
  siPython,
  siRabbitmq,
  siRadixui,
  siRazorpay,
  siReact,
  siRedis,
  siShadcnui,
  siSocketdotio,
  siSoundcloud,
  siStripe,
  siTailwindcss,
  siTanstack,
  siTimescale,
  siTypeorm,
  siTypescript,
  siVite,
  siYaml,
} from 'simple-icons';

const logos: Record<string, SimpleIcon> = {
  typescript: siTypescript,
  javascript: siJavascript,
  nodejs: siNodedotjs,
  python: siPython,
  npm: siNpm,
  nestjs: siNestjs,
  express: siExpress,
  react: siReact,
  vite: siVite,
  tailwindcss: siTailwindcss,
  shadcn: siShadcnui,
  shadcnui: siShadcnui,
  radix: siRadixui,
  radixui: siRadixui,
  tanstack: siTanstack,
  tanstackquery: siTanstack,
  reactquery: siTanstack,
  graphql: siGraphql,
  openapi: siOpenapiinitiative,
  websocket: siSocketdotio,
  mongodb: siMongodb,
  mongoose: siMongoose,
  postgresql: siPostgresql,
  typeorm: siTypeorm,
  redis: siRedis,
  timescale: siTimescale,
  timescaledb: siTimescale,
  neo4j: siNeo4j,
  elasticsearch: siElasticsearch,
  kafka: siApachekafka,
  rabbitmq: siRabbitmq,
  nats: siNatsdotio,
  docker: siDocker,
  kubernetes: siKubernetes,
  kustomize: siKubernetes,
  helm: siHelm,
  linkerd: siLinkerd,
  linux: siLinux,
  jenkins: siJenkins,
  githubactions: siGithubactions,
  nginx: siNginx,
  googlecloud: siGooglecloud,
  grafana: siGrafana,
  prometheus: siPrometheus,
  discord: siDiscord,
  discordjs: siDiscorddotjs,
  discordcore: siDiscord,
  discordeno: siDeno,
  cloudflare: siCloudflare,
  hetzner: siHetzner,
  stripe: siStripe,
  razorpay: siRazorpay,
  passport: siPassport,
  soundcloud: siSoundcloud,
  yaml: siYaml,
};

const imageLogos: Record<string, string> = {
  grpc: '/grpc.svg',
  aws: '/aws.svg',
};

const customSvgs: Record<string, { path: string; color: string }> = {
  lavalink: {
    path: 'M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z',
    color: '#E056FD',
  },
  whop: {
    path: 'M4 6.5A2.5 2.5 0 0 1 6.5 4h11A2.5 2.5 0 0 1 20 6.5v11a2.5 2.5 0 0 1-2.5 2.5h-11A2.5 2.5 0 0 1 4 17.5v-11zm3.8 2.2a.8.8 0 0 0-.8.8v5a.8.8 0 0 0 .8.8h1.4a.8.8 0 0 0 .8-.8V11h.4l1.2 3.1c.1.3.4.5.7.5h.2c.3 0 .6-.2.7-.5l1.2-3.1h.4v3.5a.8.8 0 0 0 .8.8h1.4a.8.8 0 0 0 .8-.8v-5a.8.8 0 0 0-.8-.8h-1.8a.8.8 0 0 0-.7.5L12 12.2 10.3 9.2a.8.8 0 0 0-.7-.5H7.8z',
    color: '#FF6243',
  },
};

function hasDarkBrandColor(hex: string) {
  const channels = [hex.slice(0, 2), hex.slice(2, 4), hex.slice(4, 6)].map((value) => parseInt(value, 16) / 255);
  const luminance = channels.reduce((total, channel, index) => {
    const linear = channel <= 0.03928 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4;
    return total + linear * [0.2126, 0.7152, 0.0722][index];
  }, 0);

  return luminance < 0.11;
}

interface BrandLogoProps {
  name: string;
  icon: string;
}

export default function BrandLogo({ name, icon }: BrandLogoProps) {
  const key = icon.toLowerCase().replace(/[^a-z0-9]/g, '');
  const logo = logos[key] || logos[icon];
  const imageLogo = imageLogos[key] || imageLogos[icon];
  const customSvg = customSvgs[key] || customSvgs[icon];

  if (imageLogo) {
    return <img className="brand-logo__image" src={imageLogo} alt="" loading="lazy" />;
  }

  if (customSvg) {
    return (
      <svg className="brand-logo__svg" viewBox="0 0 24 24" aria-hidden="true" style={{ color: customSvg.color }}>
        <path d={customSvg.path} fill="currentColor" />
      </svg>
    );
  }

  if (!logo) {
    return <span className="brand-logo__fallback" aria-hidden="true">{name.slice(0, 2)}</span>;
  }

  return (
    <svg
      className="brand-logo__svg"
      viewBox="0 0 24 24"
      aria-hidden="true"
      style={{ color: hasDarkBrandColor(logo.hex) ? 'var(--ink)' : `#${logo.hex}` }}
    >
      <path d={logo.path} fill="currentColor" />
    </svg>
  );
}
