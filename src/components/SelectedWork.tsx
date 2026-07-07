import { Link } from 'react-router-dom';
import type { ReactNode } from 'react';
import { projects } from '../data/projects';
import { coreStack } from '../data/skills';
import type { Project } from '../types';
import Icon from './Icon';
import TechTag from './TechTag';
import MetricCounter from './MetricCounter';
import ScrollReveal from './ScrollReveal';

// Internal case-study link when the project has a detailed write-up, else an external link.
function CardShell({ project, children }: { project: Project; children: ReactNode }) {
  const className = 'card hover-card group flex h-full flex-col p-5';
  if (project.details) {
    return (
      <Link to={`/projects/${project.id}`} className={className}>
        {children}
      </Link>
    );
  }
  const href = project.githubUrl ?? project.liveUrl;
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
      {children}
    </a>
  );
}

function statusLabel(p: Project) {
  if (p.details) return 'Read the case study';
  if (p.githubUrl) return 'View source';
  return 'Visit';
}

export default function SelectedWork() {
  const flantic = projects.find((p) => p.id === 'flantic');
  const others = projects.filter((p) => p.featured && p.id !== 'flantic');

  return (
    <section id="work" className="mx-auto max-w-content px-6 py-14 md:py-20">
      <ScrollReveal>
        <p className="eyebrow mb-6">Selected work</p>
      </ScrollReveal>

      <div className="grid gap-3 md:grid-cols-3">
        {flantic && (
          <ScrollReveal className="md:col-span-2">
            <CardShell project={flantic}>
              <div className="mb-3 flex items-baseline gap-2">
                <span className="text-xl font-semibold text-ink">{flantic.title}</span>
                <span className="font-mono text-[12px] text-muted">{flantic.tagline}</span>
              </div>

              {flantic.metrics && (
                <div className="mb-3 flex flex-wrap gap-x-7 gap-y-2">
                  {flantic.metrics.map((m) => (
                    <div key={m.label}>
                      <MetricCounter
                        value={m.value}
                        suffix={m.suffix}
                        decimals={m.decimals}
                        className="font-mono text-xl font-medium text-accent"
                      />
                      <p className="mt-0.5 font-mono text-[11px] text-muted">{m.label}</p>
                    </div>
                  ))}
                </div>
              )}

              <p className="mb-4 max-w-[52ch] text-[14px] leading-relaxed text-secondary">
                gRPC microservices on Kubernetes — internal sharding and centralized rate limiting
                for zero-downtime deploys.
              </p>

              <div className="mb-4 flex flex-wrap gap-1.5">
                {flantic.technologies.slice(0, 4).map((t) => (
                  <TechTag key={t} name={t} />
                ))}
              </div>

              <span className="mt-auto inline-flex items-center gap-1 font-mono text-[13px] font-medium text-accent">
                {statusLabel(flantic)}
                <Icon name="arrow-right" size={14} className="nudge" />
              </span>
            </CardShell>
          </ScrollReveal>
        )}

        {others.map((p, i) => (
          <ScrollReveal key={p.id} delay={0.05 * (i + 1)}>
            <CardShell project={p}>
              <div className="mb-1 flex items-center justify-between">
                <span className="text-[17px] font-semibold text-ink">{p.title}</span>
                <Icon name="arrow-up-right" size={16} className="nudge text-muted" />
              </div>
              {p.tagline && <p className="mb-2 font-mono text-[11px] text-muted">{p.tagline}</p>}
              <p className="mb-3 text-[13px] leading-relaxed text-secondary">{p.description}</p>
              <div className="mt-auto flex flex-wrap gap-1.5">
                {p.technologies.slice(0, 2).map((t) => (
                  <TechTag key={t} name={t} />
                ))}
              </div>
            </CardShell>
          </ScrollReveal>
        ))}

        <ScrollReveal delay={0.15} className="md:col-span-2">
          <div className="card flex h-full flex-col p-5">
            <p className="eyebrow mb-3">Core stack</p>
            <div className="flex flex-wrap gap-1.5">
              {coreStack.map((s) => (
                <TechTag key={s} name={s} />
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
