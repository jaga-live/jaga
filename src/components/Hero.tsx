import { profile } from '../data/profile';
import Icon from './Icon';
import ActivityHeatmap from './ActivityHeatmap';
import ScrollReveal from './ScrollReveal';

export default function Hero() {
  const discordUrl = profile.socials.find((s) => s.icon === 'discord')?.url;

  return (
    <section id="top" className="mx-auto max-w-content px-6 pt-14 md:pt-20">
      <div className="grid items-end gap-10 border-b border-hairline pb-10 md:grid-cols-[1.35fr_1fr] md:gap-14">
        <ScrollReveal>
          {profile.available && (
            <span className="mb-5 inline-flex items-center gap-2 rounded-full bg-accent-tint px-3 py-1 font-mono text-[11px] text-accent-strong">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
              </span>
              {profile.availabilityNote ?? 'Open to opportunities'}
            </span>
          )}

          <h1 className="text-[2.75rem] font-semibold leading-[1.05] tracking-[-0.02em] text-ink md:text-6xl">
            {profile.name}
          </h1>
          <p className="mt-2 font-mono text-[15px] text-accent">{profile.title}</p>

          <p className="mt-5 max-w-[46ch] text-[17px] leading-relaxed text-secondary md:text-[18px]">
            {profile.oneLiner}
          </p>

          <div className="mt-7 flex items-center gap-4">
            {profile.socials.map((s) => (
              <a
                key={s.name}
                href={s.url}
                target={s.url.startsWith('http') ? '_blank' : undefined}
                rel="noopener noreferrer"
                aria-label={s.name}
                className="text-muted transition-colors hover:text-ink"
              >
                <Icon name={s.icon} size={20} />
              </a>
            ))}
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1} className="card hover-card p-4">
          <div className="mb-3 flex items-center justify-between">
            <span className="eyebrow">github activity</span>
            <span className="font-mono text-[11px] text-muted">18 weeks</span>
          </div>
          <a
            href={discordUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open Discord profile"
            className="block"
          >
            <ActivityHeatmap weeks={18} username={profile.githubUsername} />
          </a>
          {discordUrl && (
            <a
              href={discordUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center gap-1.5 font-mono text-[12px] text-muted transition-colors hover:text-ink"
            >
              <Icon name="discord" size={14} />@{profile.githubUsername}
              <Icon name="arrow-up-right" size={12} className="nudge" />
            </a>
          )}
        </ScrollReveal>
      </div>
    </section>
  );
}
