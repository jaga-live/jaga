type IconName='arrow-up-right'|'arrow-left'|'arrow-down'|'github'|'mail'|'globe';

interface IconProps {
  name:IconName;
  size?:number;
  className?:string;
}

export default function Icon({ name, size = 18, className }: IconProps) {
  const common = {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.75,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    className,
    'aria-hidden': true,
  };

  if (name === 'arrow-up-right') {
    return <svg {...common}><path d="M7 17 17 7M7 7h10v10" /></svg>;
  }

  if (name === 'arrow-left') {
    return <svg {...common}><path d="m15 18-6-6 6-6" /></svg>;
  }

  if (name === 'arrow-down') {
    return <svg {...common}><path d="M12 5v14m6-6-6 6-6-6" /></svg>;
  }

  if (name === 'mail') {
    return <svg {...common}><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></svg>;
  }

  if (name === 'globe') {
    return (
      <svg {...common}>
        <circle cx="12" cy="12" r="10" />
        <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20M2 12h20" />
      </svg>
    );
  }

  return (
    <svg {...common}>
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5a12.3 12.3 0 0 0-7 0C7 2 6 2 6 2a7.8 7.8 0 0 0 0 3.5A5.4 5.4 0 0 0 5 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}
