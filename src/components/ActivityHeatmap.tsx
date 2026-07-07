import { useEffect, useMemo, useState } from 'react';

interface ActivityHeatmapProps {
  weeks?: number;
  /** GitHub username to pull real contribution data for. */
  username?: string;
}

// Deterministic pseudo-random fallback so something sensible shows before/without the API.
function seeded(i: number) {
  const x = Math.sin(i * 12.9898) * 43758.5453;
  return x - Math.floor(x);
}
function fallbackLevel(i: number) {
  const r = seeded(i);
  if (r < 0.45) return 0;
  if (r < 0.7) return 1;
  if (r < 0.88) return 2;
  return 3;
}

function opacityFor(level: number) {
  if (level <= 0) return 0;
  return Math.min(0.25 + level * 0.2, 1);
}

export default function ActivityHeatmap({ weeks = 18, username }: ActivityHeatmapProps) {
  const count = weeks * 7;
  const fallback = useMemo(() => Array.from({ length: count }, (_, i) => fallbackLevel(i)), [count]);
  const [levels, setLevels] = useState<number[]>(fallback);

  useEffect(() => {
    if (!username) return;
    let active = true;
    const url = `https://github-contributions-api.jogruber.de/v4/${username}?y=last`;
    fetch(url)
      .then((r) => r.json())
      .then(
        (data: { contributions?: Array<{ level: number }> }) => {
          if (!active || !data?.contributions?.length) return;
          const recent = data.contributions.slice(-count).map((c) => c.level ?? 0);
          if (recent.length) setLevels(recent);
        },
        () => {
          /* keep the fallback pattern on network/parse failure */
        },
      );
    return () => {
      active = false;
    };
  }, [username, count]);

  return (
    <div
      role="img"
      aria-label={`Recent contribution activity${username ? ` for ${username}` : ''}`}
      style={{
        display: 'grid',
        gridTemplateRows: 'repeat(7, 1fr)',
        gridAutoFlow: 'column',
        gridAutoColumns: '1fr',
        gap: 3,
      }}
    >
      {levels.map((level, i) => (
        <span
          key={i}
          style={{
            aspectRatio: '1',
            borderRadius: 2,
            background: level <= 0 ? 'var(--heatmap-empty)' : 'var(--accent)',
            opacity: level <= 0 ? 1 : opacityFor(level),
          }}
        />
      ))}
    </div>
  );
}
