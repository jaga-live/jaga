import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { projects } from '../data/projects';
import Icon from './Icon';
import TechTag from './TechTag';
import MetricCounter from './MetricCounter';
import ScrollReveal from './ScrollReveal';
import Mermaid from './Mermaid';
import type { ReactNode } from 'react';

const statusText: Record<string, string> = {
  live: 'Live in production',
  'open-source': 'Open source',
  personal: 'Personal project',
  archived: 'Archived',
};

// Renders text with `inline code` spans.
function withCode(text: string): ReactNode[] {
  return text.split(/(`[^`]+`)/).map((part, i) =>
    part.startsWith('`') && part.endsWith('`') ? (
      <code
        key={i}
        className="rounded bg-chip px-1.5 py-0.5 font-mono text-[0.85em] text-accent-strong"
      >
        {part.slice(1, -1)}
      </code>
    ) : (
      <span key={i}>{part}</span>
    ),
  );
}

function SectionHeading({ children }: { children: ReactNode }) {
  return <h2 className="mb-6 text-[28px] font-semibold tracking-[-0.01em] text-ink">{children}</h2>;
}

export default function ProjectDetail() {
  const { id } = useParams<{ id: string }>();
  const project = projects.find((p) => p.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!project) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
        <p className="eyebrow mb-3">404</p>
        <h1 className="mb-6 text-3xl font-semibold text-ink">Project not found</h1>
        <Link
          to="/"
          className="rounded-md bg-ink px-4 py-2.5 font-mono text-[13px] text-paper hover:opacity-90"
        >
          Back to home
        </Link>
      </div>
    );
  }

  const d = project.details;
  const components = d?.architecture?.components ?? [];
  const detailedComponents =
    components.length > 0 && typeof components[0] !== 'string'
      ? (components as Array<{ name: string; description: string; features: string[]; tech: string[] }>)
      : [];

  return (
    <div className="min-h-screen bg-paper">
      <div className="mx-auto max-w-content px-6 py-10 md:py-14">
        <Link
          to="/"
          className="group inline-flex items-center gap-2 font-mono text-[13px] text-muted transition-colors hover:text-ink"
        >
          <Icon name="arrow-right" size={15} className="rotate-180" />
          Back to home
        </Link>

        {/* Header */}
        <header className="mt-8 border-b border-hairline pb-10">
          <div className="mb-3 flex flex-wrap items-center gap-2">
            {project.role && (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-accent-tint px-2.5 py-1 font-mono text-[12px] text-accent-strong">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                {project.role}
              </span>
            )}
            {project.status && (
              <span className="chip">{statusText[project.status] ?? project.status}</span>
            )}
            {project.year && <span className="chip">{project.year}</span>}
          </div>

          <h1 className="text-4xl font-semibold tracking-[-0.02em] text-ink md:text-5xl">
            {project.title}
          </h1>
          {project.tagline && <p className="mt-2 font-mono text-[15px] text-accent">{project.tagline}</p>}

          {project.longDescription && (
            <p className="mt-5 max-w-[60ch] text-[17px] leading-relaxed text-secondary">
              {project.longDescription}
            </p>
          )}

          {(project.liveUrl || project.githubUrl) && (
            <div className="mt-6 flex flex-wrap gap-3">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn inline-flex items-center gap-2 rounded-md bg-ink px-4 py-2.5 font-mono text-[13px] text-paper hover:opacity-90"
                >
                  <Icon name="external" size={15} />
                  Live site
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn inline-flex items-center gap-2 rounded-md border-[0.5px] border-hairline bg-surface px-4 py-2.5 font-mono text-[13px] text-ink hover:border-accent"
                >
                  <Icon name="github" size={15} />
                  Source
                </a>
              )}
            </div>
          )}
        </header>

        {/* Metrics */}
        {project.metrics && project.metrics.length > 0 && (
          <ScrollReveal as="section" className="grid grid-cols-2 gap-3 py-12 sm:grid-cols-3">
            {project.metrics.map((m) => (
              <div key={m.label} className="card p-5">
                <MetricCounter
                  value={m.value}
                  suffix={m.suffix}
                  decimals={m.decimals}
                  className="font-mono text-3xl font-medium text-accent"
                />
                <p className="mt-1 font-mono text-[12px] text-muted">{m.label}</p>
              </div>
            ))}
          </ScrollReveal>
        )}

        {/* Problem & why */}
        {(project.problem || project.why) && (
          <ScrollReveal as="section" className="border-t border-hairline py-12">
            <SectionHeading>The problem</SectionHeading>
            {project.problem && (
              <p className="max-w-[68ch] text-[16px] leading-relaxed text-secondary">
                {project.problem}
              </p>
            )}
            {project.why && (
              <p className="mt-4 max-w-[68ch] text-[16px] leading-relaxed text-secondary">
                {project.why}
              </p>
            )}
          </ScrollReveal>
        )}

        {/* Architecture */}
        {d?.architecture && (
          <ScrollReveal as="section" className="border-t border-hairline py-12">
            <SectionHeading>Architecture</SectionHeading>
            <p className="max-w-[68ch] text-[16px] leading-relaxed text-secondary">
              {d.architecture.overview}
            </p>

            {d.architectureDiagram && (
              <div className="ml-[calc(50%-50vw)] mt-8 w-screen px-6">
                <div className="mx-auto max-w-[1320px]">
                  <div
                    className="card overflow-x-auto p-4 md:p-8 [&_svg]:mx-auto [&_svg]:h-auto [&_svg]:max-w-full"
                    style={{ background: '#f4f2ea' }}
                  >
                    <Mermaid chart={d.architectureDiagram} />
                  </div>
                </div>
              </div>
            )}

            {detailedComponents.length > 0 && (
              <div className="mt-8 grid gap-3">
                {detailedComponents.map((c) => (
                  <div key={c.name} className="card p-6">
                    <div className="mb-3 flex items-center gap-3">
                      <h3 className="font-mono text-[16px] font-medium text-ink">{c.name}</h3>
                      <span className="h-px flex-1 bg-hairline" />
                    </div>
                    <p className="mb-4 max-w-[68ch] text-[15px] leading-relaxed text-secondary">
                      {withCode(c.description)}
                    </p>
                    <div className="grid gap-4 md:grid-cols-[1fr_auto] md:items-start">
                      <ul className="flex flex-col gap-1.5">
                        {c.features.map((f, fi) => (
                          <li
                            key={fi}
                            className="flex gap-2.5 text-[14px] leading-relaxed text-secondary"
                          >
                            <span
                              className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent"
                              aria-hidden="true"
                            />
                            {f}
                          </li>
                        ))}
                      </ul>
                      <div className="flex flex-wrap gap-1.5 md:max-w-[200px] md:justify-end">
                        {c.tech.map((t) => (
                          <TechTag key={t} name={t} />
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </ScrollReveal>
        )}

        {/* Key decisions */}
        {project.decisions && project.decisions.length > 0 && (
          <ScrollReveal as="section" className="border-t border-hairline py-12">
            <SectionHeading>Key decisions</SectionHeading>
            <div className="grid gap-3 md:grid-cols-2">
              {project.decisions.map((dec, i) => (
                <div key={i} className="card p-5">
                  <div className="mb-2 flex items-center gap-2">
                    <span className="font-mono text-[12px] text-muted">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <h3 className="text-[16px] font-semibold text-ink">{dec.title}</h3>
                  </div>
                  <p className="text-[14px] leading-relaxed text-secondary">{dec.detail}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>
        )}

        {/* Infrastructure */}
        {d?.hosting && (
          <ScrollReveal as="section" className="border-t border-hairline py-12">
            <SectionHeading>Infrastructure</SectionHeading>
            <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
              {[
                ['Provider', d.hosting.provider],
                ['Compute', d.hosting.processor],
                ['Memory', d.hosting.ram],
                ...(d.hosting.storage ? [['Storage', d.hosting.storage]] : []),
              ].map(([label, value]) => (
                <div key={label} className="card p-5">
                  <p className="eyebrow mb-2">{label}</p>
                  <p className="text-[16px] font-medium text-ink">{value}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>
        )}

        {/* Challenges */}
        {d?.challenges && d.challenges.length > 0 && (
          <ScrollReveal as="section" className="border-t border-hairline py-12">
            <SectionHeading>Challenges</SectionHeading>
            <div className="grid gap-3">
              {d.challenges.map((c, i) => (
                <div key={i} className="card p-6">
                  <h3 className="mb-5 text-[18px] font-semibold text-ink">{c.title}</h3>
                  <div className="grid gap-5 md:grid-cols-2">
                    <div>
                      <p className="eyebrow mb-2 text-muted">The challenge</p>
                      <p className="text-[14px] leading-relaxed text-secondary">{c.description}</p>
                    </div>
                    <div className="md:border-l md:border-hairline md:pl-5">
                      <p className="mb-2 font-mono text-[12px] uppercase tracking-[0.06em] text-accent">
                        The solution
                      </p>
                      <p className="text-[14px] leading-relaxed text-secondary">{c.solution}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollReveal>
        )}

        {/* Results */}
        {project.results && project.results.length > 0 && (
          <ScrollReveal as="section" className="border-t border-hairline py-12">
            <SectionHeading>Results</SectionHeading>
            <ul className="grid gap-2.5 md:grid-cols-2">
              {project.results.map((r, i) => (
                <li key={i} className="flex items-start gap-3 text-[15px] leading-relaxed text-secondary">
                  <span className="mt-0.5 text-accent">
                    <Icon name="arrow-right" size={16} />
                  </span>
                  {r}
                </li>
              ))}
            </ul>
          </ScrollReveal>
        )}

        {/* Tech stack — category-grouped */}
        <ScrollReveal as="section" className="border-t border-hairline py-12">
          <SectionHeading>Tech stack</SectionHeading>
          {project.techStack ? (
            <div className="grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
              {project.techStack.map((group) => (
                <div key={group.category}>
                  <p className="eyebrow mb-3">{group.category}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {group.items.map((t) => (
                      <TechTag key={t} name={t} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-wrap gap-1.5">
              {project.technologies.map((t) => (
                <TechTag key={t} name={t} />
              ))}
            </div>
          )}
        </ScrollReveal>

        <div className="border-t border-hairline pt-10">
          <Link
            to="/"
            className="group inline-flex items-center gap-2 font-mono text-[13px] text-muted transition-colors hover:text-ink"
          >
            <Icon name="arrow-right" size={15} className="rotate-180" />
            Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}
