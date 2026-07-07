import { experience } from '../data/experience';
import type { Experience } from '../types';
import TechTag from './TechTag';
import ScrollReveal from './ScrollReveal';

function range(e: Experience) {
  const end = e.current ? 'Present' : e.end ?? '';
  return end ? `${e.start} — ${end}` : e.start;
}

export default function ExperienceStrip() {
  return (
    <section id="experience" className="mx-auto max-w-content px-6 py-14 md:py-20">
      <ScrollReveal>
        <p className="eyebrow mb-6">Experience</p>
      </ScrollReveal>

      <div className="flex flex-col">
        {experience.map((e, i) => (
          <ScrollReveal
            as="article"
            key={`${e.company}-${i}`}
            delay={0.04 * i}
            className="border-t border-hairline py-6 first:border-t-0 first:pt-0"
          >
            <div className="flex items-baseline justify-between gap-4">
              <h3 className="text-base font-semibold text-ink">
                {e.role}
                {e.company && <span className="font-normal text-secondary"> · {e.company}</span>}
              </h3>
              <span className="shrink-0 font-mono text-[12px] text-muted">{range(e)}</span>
            </div>

            {e.summary && <p className="mt-2 text-[14px] leading-relaxed text-secondary">{e.summary}</p>}

            {e.bullets && e.bullets.length > 0 && (
              <ul className="mt-3 flex flex-col gap-1.5">
                {e.bullets.map((b, bi) => (
                  <li key={bi} className="flex gap-2.5 text-[14px] leading-relaxed text-secondary">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                    {b}
                  </li>
                ))}
              </ul>
            )}

            {e.tech && e.tech.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-1.5">
                {e.tech.map((t) => (
                  <TechTag key={t} name={t} />
                ))}
              </div>
            )}
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
