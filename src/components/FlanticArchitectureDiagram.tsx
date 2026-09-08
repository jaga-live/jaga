const serviceNodes = [
  { href: '#service-flantic-ws', x: 240, y: 65, width: 175, height: 72, title: 'flantic-ws', subtitle: 'Gateway & sharding' },
  { href: '#service-flantic-main', x: 470, y: 95, width: 180, height: 80, title: 'flantic-main', subtitle: 'Bot core logic' },
  { href: '#service-flantic-rest', x: 705, y: 95, width: 175, height: 72, title: 'flantic-rest', subtitle: 'Rate-limit proxy' },
  { href: '#service-flantic-voice', x: 470, y: 260, width: 180, height: 72, title: 'flantic-voice', subtitle: 'Voice & audio engine' },
  { href: '#service-flantic-edge', x: 240, y: 450, width: 175, height: 72, title: 'flantic-edge', subtitle: 'OAuth2 & tier router' },
  { href: '#service-flantic-api', x: 470, y: 450, width: 180, height: 72, title: 'flantic-api', subtitle: 'Dashboard API' },
];

function ServiceNode({ href, x, y, width, height, title, subtitle }: (typeof serviceNodes)[number]) {
  const isMain = title.startsWith('flantic-main');

  return (
    <a href={href} className={`diagram-node ${isMain ? 'diagram-node--accent' : ''}`}>
      <rect x={x} y={y} width={width} height={height} rx="12" />
      <text className="diagram-node__title" x={x + 16} y={y + 30}>{title}</text>
      <text className="diagram-node__subtitle" x={x + 16} y={y + 51}>{subtitle}</text>
    </a>
  );
}

export default function FlanticArchitectureDiagram() {
  return (
    <div className="architecture-diagram-frame">
      <svg
        className="architecture-diagram"
        viewBox="0 0 1180 580"
        role="img"
        aria-labelledby="flantic-diagram-title flantic-diagram-description"
      >
        <title id="flantic-diagram-title">Flantic production architecture topology</title>
        <desc id="flantic-diagram-description">
          Clean microservices architecture diagram showing WebSocket gateway, interactions webhook, core bot logic, centralized REST proxy, voice streaming, edge authentication, dashboard API, and persistent datastores.
        </desc>
        <defs>
          <marker id="arrow-orange" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M 0 0 L 10 5 L 0 10 z" className="diagram-arrow diagram-arrow--orange" />
          </marker>
          <marker id="arrow-cyan" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M 0 0 L 10 5 L 0 10 z" className="diagram-arrow diagram-arrow--cyan" />
          </marker>
          <marker id="arrow-emerald" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M 0 0 L 10 5 L 0 10 z" className="diagram-arrow diagram-arrow--emerald" />
          </marker>
        </defs>

        {/* --- LANE 1: BOT EVENT PATH --- */}
        <text className="diagram-lane-label" x="25" y="32">1. BOT EVENT &amp; EXECUTION PATH</text>
        <line className="diagram-lane-rule" x1="25" y1="44" x2="1155" y2="44" />

        {/* Discord Gateway Inbound */}
        <g className="diagram-node diagram-node--external">
          <rect x="25" y="65" width="170" height="72" rx="12" />
          <text className="diagram-node__title" x="41" y="95">Discord Gateway</text>
          <text className="diagram-node__subtitle" x="41" y="116">WebSocket · Inbound</text>
        </g>

        {/* Discord Interactions Webhook */}
        <g className="diagram-node diagram-node--external">
          <rect x="25" y="150" width="170" height="72" rx="12" />
          <text className="diagram-node__title" x="41" y="180">Interactions Webhook</text>
          <text className="diagram-node__subtitle" x="41" y="201">HTTPS · Slash commands</text>
        </g>

        {/* Top 3 Core Services */}
        {serviceNodes.slice(0, 3).map((node) => <ServiceNode key={node.title} {...node} />)}

        {/* Discord REST API Outbound */}
        <g className="diagram-node diagram-node--external">
          <rect x="940" y="95" width="200" height="72" rx="12" />
          <text className="diagram-node__title" x="956" y="125">Discord REST API</text>
          <text className="diagram-node__subtitle" x="956" y="146">HTTPS · Outbound</text>
        </g>

        {/* Lane 1 Connections */}
        <path className="diagram-line diagram-line--cyan" markerEnd="url(#arrow-cyan)" d="M195 101 H240" />
        <text className="diagram-edge-label" x="217" y="91" textAnchor="middle">WebSocket</text>

        <path className="diagram-line diagram-line--cyan" markerEnd="url(#arrow-cyan)" d="M195 186 H440 V155 H470" />
        <text className="diagram-edge-label" x="315" y="176">HTTP Webhook</text>

        <path className="diagram-line diagram-line--orange" markerEnd="url(#arrow-orange)" d="M415 101 H440 V125 H470" />
        <text className="diagram-edge-label" x="442" y="91" textAnchor="middle">gRPC events</text>

        <path className="diagram-line diagram-line--orange" markerEnd="url(#arrow-orange)" d="M650 131 H705" />
        <text className="diagram-edge-label" x="677" y="120" textAnchor="middle">gRPC calls</text>

        <path className="diagram-line diagram-line--cyan" markerEnd="url(#arrow-cyan)" d="M880 131 H940" />
        <text className="diagram-edge-label" x="910" y="120" textAnchor="middle">HTTPS</text>

        {/* --- LANE 2: VOICE & AUDIO --- */}
        <text className="diagram-lane-label" x="25" y="235">2. VOICE &amp; AUDIO RELAY</text>
        <line className="diagram-lane-rule" x1="25" y1="247" x2="1155" y2="247" />

        {serviceNodes.slice(3, 4).map((node) => <ServiceNode key={node.title} {...node} />)}

        <g className="diagram-node diagram-node--external">
          <rect x="705" y="260" width="175" height="72" rx="12" />
          <text className="diagram-node__title" x="721" y="290">Lavalink</text>
          <text className="diagram-node__subtitle" x="721" y="311">Audio player</text>
        </g>

        <g className="diagram-node diagram-node--data">
          <rect x="940" y="260" width="200" height="72" rx="12" />
          <text className="diagram-node__title" x="956" y="290">Redis</text>
          <text className="diagram-node__subtitle" x="956" y="311">Voice relay · Pub/Sub</text>
        </g>

        {/* Lane 2 Connections */}
        <path className="diagram-line diagram-line--orange" markerEnd="url(#arrow-orange)" d="M305 137 V230 Q305 296 470 296" />
        <text className="diagram-edge-label" x="316" y="215">Voice events</text>

        <path className="diagram-line diagram-line--orange" markerEnd="url(#arrow-orange)" d="M560 175 V260" />
        <text className="diagram-edge-label" x="572" y="225">Playback</text>

        <path className="diagram-line diagram-line--cyan diagram-line--two-way" markerStart="url(#arrow-cyan)" markerEnd="url(#arrow-cyan)" d="M650 296 H705" />
        <text className="diagram-edge-label" x="677" y="285" textAnchor="middle">WebSocket</text>

        <path className="diagram-line diagram-line--orange" markerEnd="url(#arrow-orange)" d="M880 296 H940" />
        <text className="diagram-edge-label" x="910" y="285" textAnchor="middle">pub/sub</text>

        {/* Non-overlapping Voice relay return */}
        <path className="diagram-line diagram-line--cyan diagram-line--return" markerEnd="url(#arrow-cyan)" d="M1040 260 V225 H365 V137" />
        <text className="diagram-edge-label" x="870" y="218">Voice gateway payload relay</text>

        {/* --- LANE 3: DASHBOARD & DATA --- */}
        <text className="diagram-lane-label" x="25" y="420">3. DASHBOARD CONTROL PLANE &amp; DATA PLATFORM</text>
        <line className="diagram-lane-rule" x1="25" y1="432" x2="1155" y2="432" />

        {/* Dashboard Client */}
        <g className="diagram-node diagram-node--external">
          <rect x="25" y="450" width="170" height="72" rx="12" />
          <text className="diagram-node__title" x="41" y="480">Dashboard</text>
          <text className="diagram-node__subtitle" x="41" y="501">Browser &amp; Activity</text>
        </g>

        {/* Edge & API */}
        {serviceNodes.slice(4).map((node) => <ServiceNode key={node.title} {...node} />)}

        {/* Data Stores */}
        <g className="diagram-node diagram-node--data">
          <rect x="705" y="450" width="175" height="72" rx="12" />
          <text className="diagram-node__title" x="721" y="480">Data Stores</text>
          <text className="diagram-node__subtitle" x="721" y="501">Postgres · Timescale · Mongo</text>
        </g>

        {/* Whop & Cloudflare R2 */}
        <g className="diagram-node diagram-node--external">
          <rect x="940" y="450" width="200" height="72" rx="12" />
          <text className="diagram-node__title" x="956" y="480">Whop &amp; Cloudflare R2</text>
          <text className="diagram-node__subtitle" x="956" y="501">Payments &amp; Media storage</text>
        </g>

        {/* Lane 3 Connections */}
        <path className="diagram-line diagram-line--cyan" markerEnd="url(#arrow-cyan)" d="M195 486 H240" />
        <text className="diagram-edge-label" x="217" y="475" textAnchor="middle">OAuth2</text>

        <path className="diagram-line diagram-line--orange" markerEnd="url(#arrow-orange)" d="M415 486 H470" />
        <text className="diagram-edge-label" x="442" y="475" textAnchor="middle">HTTP proxy</text>

        {/* Cross-lane contracts */}
        <path className="diagram-line diagram-line--orange diagram-line--dashed" markerEnd="url(#arrow-orange)" d="M470 155 H375 V450" />
        <text className="diagram-edge-label" x="382" y="380">Guild sync (gRPC :5002)</text>

        <path className="diagram-line diagram-line--emerald diagram-line--two-way" markerStart="url(#arrow-emerald)" markerEnd="url(#arrow-emerald)" d="M650 155 H672 V465 H705" />
        <text className="diagram-edge-label" x="660" y="380" textAnchor="end">State &amp; events</text>

        <path className="diagram-line diagram-line--orange diagram-line--dashed" markerEnd="url(#arrow-orange)" d="M650 505 H688 V150 H705" />
        <text className="diagram-edge-label" x="700" y="380" textAnchor="start">Discord calls (gRPC)</text>

        <path className="diagram-line diagram-line--emerald diagram-line--two-way" markerStart="url(#arrow-emerald)" markerEnd="url(#arrow-emerald)" d="M650 486 H705" />
        <text className="diagram-edge-label" x="677" y="475" textAnchor="middle">Read / Write</text>

        <path className="diagram-line diagram-line--cyan" markerEnd="url(#arrow-cyan)" d="M880 486 H940" />
        <text className="diagram-edge-label" x="910" y="475" textAnchor="middle">HTTPS</text>

        <text className="diagram-hint" x="25" y="555">Orange: Internal gRPC/RPC contracts · Cyan: Inbound &amp; outbound traffic · Emerald: Persistent datastores · Click any service to jump to its breakdown.</text>
      </svg>
    </div>
  );
}
