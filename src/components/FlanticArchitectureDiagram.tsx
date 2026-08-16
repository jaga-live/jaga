const serviceNodes = [
  { href: '#service-flantic-ws', x: 245, y: 92, title: 'flantic-ws', subtitle: 'Gateway sessions' },
  { href: '#service-flantic-main', x: 475, y: 92, title: 'flantic-main', subtitle: 'Bot application' },
  { href: '#service-flantic-rest', x: 705, y: 92, title: 'flantic-rest', subtitle: 'Rate-limit control' },
  { href: '#service-flantic-voice', x: 475, y: 255, title: 'flantic-voice', subtitle: 'Voice and playback' },
  { href: '#service-flantic-edge', x: 245, y: 500, title: 'flantic-edge', subtitle: 'Auth and routing' },
  { href: '#service-flantic-api', x: 475, y: 500, title: 'flantic-api', subtitle: 'Dashboard API' },
];

function ServiceNode({ href, x, y, title, subtitle }: (typeof serviceNodes)[number]) {
  return (
    <a href={href} className={`diagram-node ${title === 'flantic-main' ? 'diagram-node--accent' : ''}`}>
      <rect x={x} y={y} width="180" height="82" rx="14" />
      <text className="diagram-node__title" x={x + 18} y={y + 34}>{title}</text>
      <text className="diagram-node__subtitle" x={x + 18} y={y + 57}>{subtitle}</text>
    </a>
  );
}

export default function FlanticArchitectureDiagram() {
  return (
    <div className="architecture-diagram-frame">
      <svg
        className="architecture-diagram"
        viewBox="0 0 1160 670"
        role="img"
        aria-labelledby="flantic-diagram-title flantic-diagram-description"
      >
        <title id="flantic-diagram-title">Flantic production architecture</title>
        <desc id="flantic-diagram-description">
          Discord events enter through the WebSocket gateway, move through the main service, and leave through the REST service. Voice traffic branches to Lavalink and Redis. Dashboard traffic enters through the edge service and API before reaching data stores and Discord REST.
        </desc>
        <defs>
          <marker id="arrow-orange" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M 0 0 L 10 5 L 0 10 z" className="diagram-arrow diagram-arrow--orange" />
          </marker>
          <marker id="arrow-cyan" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M 0 0 L 10 5 L 0 10 z" className="diagram-arrow diagram-arrow--cyan" />
          </marker>
        </defs>

        <text className="diagram-lane-label" x="20" y="35">BOT EVENT PATH</text>
        <line className="diagram-lane-rule" x1="20" y1="52" x2="1140" y2="52" />

        <g className="diagram-node diagram-node--external">
          <rect x="20" y="92" width="175" height="82" rx="14" />
          <text className="diagram-node__title" x="38" y="126">Discord</text>
          <text className="diagram-node__subtitle" x="38" y="149">Gateway · inbound</text>
        </g>
        {serviceNodes.slice(0, 3).map((node) => <ServiceNode key={node.title} {...node} />)}
        <g className="diagram-node diagram-node--external">
          <rect x="935" y="92" width="205" height="82" rx="14" />
          <text className="diagram-node__title" x="953" y="126">Discord REST API</text>
          <text className="diagram-node__subtitle" x="953" y="149">HTTPS · outbound</text>
        </g>

        <path className="diagram-line diagram-line--cyan" markerEnd="url(#arrow-cyan)" d="M195 133 H245" />
        <text className="diagram-edge-label" x="220" y="119" textAnchor="middle">WebSocket</text>
        <path className="diagram-line diagram-line--orange" markerEnd="url(#arrow-orange)" d="M425 133 H475" />
        <text className="diagram-edge-label" x="450" y="119" textAnchor="middle">gRPC events</text>
        <path className="diagram-line diagram-line--orange" markerEnd="url(#arrow-orange)" d="M655 133 H705" />
        <text className="diagram-edge-label" x="680" y="119" textAnchor="middle">gRPC calls</text>
        <path className="diagram-line diagram-line--cyan" markerEnd="url(#arrow-cyan)" d="M885 133 H935" />
        <text className="diagram-edge-label" x="910" y="119" textAnchor="middle">HTTPS</text>

        {serviceNodes.slice(3, 4).map((node) => <ServiceNode key={node.title} {...node} />)}
        <g className="diagram-node diagram-node--external">
          <rect x="705" y="255" width="180" height="82" rx="14" />
          <text className="diagram-node__title" x="723" y="289">Lavalink</text>
          <text className="diagram-node__subtitle" x="723" y="312">Audio playback</text>
        </g>
        <g className="diagram-node diagram-node--data">
          <rect x="935" y="255" width="205" height="82" rx="14" />
          <text className="diagram-node__title" x="953" y="289">Redis</text>
          <text className="diagram-node__subtitle" x="953" y="312">Voice relay · pub/sub</text>
        </g>

        <path className="diagram-line diagram-line--orange" markerEnd="url(#arrow-orange)" d="M565 174 V255" />
        <text className="diagram-edge-label" x="578" y="219">playback</text>
        <path className="diagram-line diagram-line--orange" markerEnd="url(#arrow-orange)" d="M335 174 V205 Q335 296 475 296" />
        <text className="diagram-edge-label" x="352" y="236">voice events</text>
        <path className="diagram-line diagram-line--cyan diagram-line--two-way" markerStart="url(#arrow-cyan)" markerEnd="url(#arrow-cyan)" d="M655 296 H705" />
        <text className="diagram-edge-label" x="680" y="282" textAnchor="middle">WebSocket</text>
        <path className="diagram-line diagram-line--orange" markerEnd="url(#arrow-orange)" d="M885 296 H935" />
        <text className="diagram-edge-label" x="910" y="282" textAnchor="middle">pub/sub</text>
        <path className="diagram-line diagram-line--cyan diagram-line--return" markerEnd="url(#arrow-cyan)" d="M1038 255 V215 H335 V174" />
        <text className="diagram-edge-label" x="810" y="204">outbound voice relay</text>

        <text className="diagram-lane-label" x="20" y="440">DASHBOARD CONTROL PATH</text>
        <line className="diagram-lane-rule" x1="20" y1="457" x2="1140" y2="457" />

        <g className="diagram-node diagram-node--external">
          <rect x="20" y="500" width="175" height="82" rx="14" />
          <text className="diagram-node__title" x="38" y="534">Dashboard</text>
          <text className="diagram-node__subtitle" x="38" y="557">Browser and app</text>
        </g>
        {serviceNodes.slice(4).map((node) => <ServiceNode key={node.title} {...node} />)}
        <g className="diagram-node diagram-node--data">
          <rect x="705" y="500" width="180" height="82" rx="14" />
          <text className="diagram-node__title" x="723" y="534">Data stores</text>
          <text className="diagram-node__subtitle" x="723" y="557">SQL · MongoDB · cache</text>
        </g>

        <path className="diagram-line diagram-line--cyan" markerEnd="url(#arrow-cyan)" d="M195 541 H245" />
        <text className="diagram-edge-label" x="220" y="527" textAnchor="middle">OAuth</text>
        <path className="diagram-line diagram-line--orange" markerEnd="url(#arrow-orange)" d="M425 541 H475" />
        <text className="diagram-edge-label" x="450" y="527" textAnchor="middle">HTTP proxy</text>
        <path className="diagram-line diagram-line--orange diagram-line--two-way" markerStart="url(#arrow-orange)" markerEnd="url(#arrow-orange)" d="M655 541 H705" />
        <text className="diagram-edge-label" x="680" y="527" textAnchor="middle">read / write</text>
        <path className="diagram-line diagram-line--orange diagram-line--dashed" markerEnd="url(#arrow-orange)" d="M565 500 V410 H795 V174" />
        <text className="diagram-edge-label" x="680" y="397">Discord requests via gRPC</text>

        <text className="diagram-hint" x="20" y="642">Select a Flantic service to jump to its responsibility.</text>
      </svg>
    </div>
  );
}
