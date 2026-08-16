import type { SimpleIcon } from 'simple-icons';
import {
  siApachekafka,
  siDocker,
  siElasticsearch,
  siExpress,
  siGithubactions,
  siGooglecloud,
  siGraphql,
  siJavascript,
  siJenkins,
  siKubernetes,
  siLinux,
  siMongodb,
  siNatsdotio,
  siNeo4j,
  siNestjs,
  siNginx,
  siNodedotjs,
  siNpm,
  siOpenapiinitiative,
  siPostgresql,
  siRabbitmq,
  siRedis,
  siSocketdotio,
  siTimescale,
  siTypescript,
  siGrafana,
  siPrometheus,
} from 'simple-icons';

const logos: Record<string, SimpleIcon> = {
  typescript: siTypescript,
  javascript: siJavascript,
  nodejs: siNodedotjs,
  npm: siNpm,
  nestjs: siNestjs,
  express: siExpress,
  graphql: siGraphql,
  openapi: siOpenapiinitiative,
  websocket: siSocketdotio,
  mongodb: siMongodb,
  postgresql: siPostgresql,
  redis: siRedis,
  timescale: siTimescale,
  neo4j: siNeo4j,
  elasticsearch: siElasticsearch,
  kafka: siApachekafka,
  rabbitmq: siRabbitmq,
  nats: siNatsdotio,
  docker: siDocker,
  kubernetes: siKubernetes,
  linux: siLinux,
  jenkins: siJenkins,
  githubactions: siGithubactions,
  nginx: siNginx,
  googlecloud: siGooglecloud,
  grafana: siGrafana,
  prometheus: siPrometheus,
};

const imageLogos: Record<string, string> = {
  grpc: '/grpc.svg',
  aws: '/aws.svg',
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
  const logo = logos[icon];
  const imageLogo = imageLogos[icon];

  if (imageLogo) {
    return <img className="brand-logo__image" src={imageLogo} alt="" loading="lazy" />;
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
