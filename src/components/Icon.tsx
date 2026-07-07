type IconName =
  | 'github'
  | 'linkedin'
  | 'email'
  | 'discord'
  | 'twitter'
  | 'resume'
  | 'arrow-right'
  | 'arrow-up-right'
  | 'map-pin'
  | 'external';

interface IconProps {
  name: IconName;
  className?: string;
  size?: number;
}

// Brand glyphs use fill; UI glyphs use stroke. currentColor inherits from the parent.
const brandPaths: Partial<Record<IconName, string>> = {
  github:
    'M12 .5C5.7.5.5 5.7.5 12c0 5.1 3.3 9.4 7.9 10.9.6.1.8-.3.8-.6v-2c-3.2.7-3.9-1.5-3.9-1.5-.5-1.3-1.3-1.7-1.3-1.7-1.1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.7-1.6-2.6-.3-5.3-1.3-5.3-5.7 0-1.3.5-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0C17 5 18 5.3 18 5.3c.6 1.6.2 2.8.1 3.1.8.8 1.2 1.8 1.2 3.1 0 4.4-2.7 5.4-5.3 5.7.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6 4.6-1.5 7.9-5.8 7.9-10.9C23.5 5.7 18.3.5 12 .5Z',
  linkedin:
    'M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.8 0 0 .77 0 1.73v20.54C0 23.22.8 24 1.77 24h20.45c.98 0 1.78-.78 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z',
  discord:
    'M20.32 4.37A19.8 19.8 0 0 0 15.4 2.8a13.7 13.7 0 0 0-.63 1.28 18.3 18.3 0 0 0-5.5 0A12.6 12.6 0 0 0 8.64 2.8 19.7 19.7 0 0 0 3.7 4.37C.57 9.06-.28 13.64.14 18.15a19.9 19.9 0 0 0 6.07 3.07c.49-.67.93-1.38 1.3-2.13-.71-.27-1.4-.6-2.04-.99.17-.13.34-.26.5-.4a14.2 14.2 0 0 0 12.06 0c.17.14.33.27.5.4-.65.39-1.34.72-2.05.99.38.75.81 1.46 1.3 2.13a19.8 19.8 0 0 0 6.08-3.07c.5-5.23-.85-9.77-3.59-13.78ZM8.02 15.39c-1.18 0-2.16-1.09-2.16-2.42 0-1.34.95-2.43 2.16-2.43 1.2 0 2.18 1.1 2.16 2.43 0 1.33-.96 2.42-2.16 2.42Zm7.96 0c-1.18 0-2.16-1.09-2.16-2.42 0-1.34.96-2.43 2.16-2.43 1.21 0 2.18 1.1 2.16 2.43 0 1.33-.95 2.42-2.16 2.42Z',
  twitter:
    'M18.9 1.15h3.68l-8.04 9.19L24 22.85h-7.41l-5.8-7.58-6.64 7.58H.46l8.6-9.83L0 1.15h7.59l5.24 6.93 6.07-6.93Zm-1.29 19.5h2.04L6.48 3.24H4.3L17.6 20.65Z',
};

const strokePaths: Partial<Record<IconName, string>> = {
  email: 'M3 7l9 6 9-6M4 5h16a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Z',
  resume: 'M14 3v4a1 1 0 0 0 1 1h4M9 13h6M9 17h6M9 9h1M7 3h7l5 5v11a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z',
  'arrow-right': 'M5 12h14M13 6l6 6-6 6',
  'arrow-up-right': 'M7 17 17 7M8 7h9v9',
  'map-pin': 'M12 21s7-5.2 7-11a7 7 0 1 0-14 0c0 5.8 7 11 7 11ZM12 12a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z',
  external: 'M14 4h6m0 0v6m0-6L10 14M19 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h5',
};

export default function Icon({ name, className, size = 20 }: IconProps) {
  const isBrand = name in brandPaths;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={isBrand ? 'currentColor' : 'none'}
      stroke={isBrand ? 'none' : 'currentColor'}
      strokeWidth={isBrand ? 0 : 1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d={isBrand ? brandPaths[name] : strokePaths[name]} />
    </svg>
  );
}
