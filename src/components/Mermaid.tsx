import { useEffect, useId, useState } from 'react';

interface MermaidProps {
  chart: string;
  className?: string;
}

// Lazy-loads mermaid only on the case-study route and renders a neutral, restrained
// diagram. Color `style` directives in the source are stripped so it matches the theme.
export default function Mermaid({ chart, className }: MermaidProps) {
  const [svg, setSvg] = useState('');
  const [failed, setFailed] = useState(false);
  const rawId = useId();
  const id = 'mmd' + rawId.replace(/[^a-zA-Z0-9]/g, '');

  useEffect(() => {
    let active = true;
    const clean = chart
      .split('\n')
      .filter((line) => !/^\s*style\s/.test(line))
      .join('\n');

    import('mermaid').then((mod) => {
      const mermaid = mod.default;
      mermaid.initialize({
        startOnLoad: false,
        theme: 'neutral',
        securityLevel: 'loose',
        fontFamily: 'JetBrains Mono, monospace',
        themeVariables: { fontSize: '20px' },
      });
      mermaid.render(id, clean).then(
        (res) => {
          if (active) setSvg(res.svg);
        },
        () => {
          if (active) setFailed(true);
        },
      );
    });

    return () => {
      active = false;
    };
  }, [chart, id]);

  if (failed) return null;
  if (!svg) return <div className={className} style={{ minHeight: 120 }} aria-hidden="true" />;

  return (
    <div
      className={className}
      role="img"
      aria-label="System architecture diagram"
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}
