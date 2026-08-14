import { profile } from '../data/profile';
import Icon from './Icon';
import ScrollReveal from './ScrollReveal';

export default function Contact() {
  const email = profile.socials.find((s) => s.icon === 'email');
  const year = new Date().getFullYear();

  return (
    <footer id="contact" className="mt-6 border-t border-hairline">
      <div className="mx-auto max-w-content px-6 py-16 md:py-24">
        <ScrollReveal>
          <p className="eyebrow mb-4">Get in touch</p>
          <h2 className="max-w-[20ch] text-3xl font-semibold tracking-[-0.02em] text-ink md:text-4xl">
            Building something that needs to scale?
          </h2>
          <p className="mt-4 max-w-[48ch] text-[15px] leading-relaxed text-secondary">
            I’m {profile.availabilityNote ? profile.availabilityNote.toLowerCase() : 'open to interesting backend work'}.
            The fastest way to reach me is email.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            {email && (
              <a
                href={email.url}
                className="btn inline-flex items-center gap-2 rounded-md bg-ink px-4 py-2.5 font-mono text-[13px] text-paper hover:opacity-90"
              >
                <Icon name="email" size={16} />
                {email.url.replace('mailto:', '')}
              </a>
            )}
            {profile.resumeUrl && (
              <a
                href={profile.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn inline-flex items-center gap-2 rounded-md border-[0.5px] border-hairline bg-surface px-4 py-2.5 font-mono text-[13px] text-ink hover:border-accent"
              >
                <Icon name="resume" size={16} />
                Resume
              </a>
            )}
          </div>
        </ScrollReveal>
      </div>

      <div className="border-t border-hairline">
        <div className="mx-auto flex max-w-content flex-col items-center justify-between gap-3 px-6 py-6 sm:flex-row">
          <span className="font-mono text-[11px] text-muted">
            © {year} {profile.name}
          </span>
          <div className="flex items-center gap-4">
            {profile.socials.map((s) => (
              <a
                key={s.name}
                href={s.url}
                target={s.url.startsWith('http') ? '_blank' : undefined}
                rel="noopener noreferrer"
                aria-label={s.name}
                className="text-muted transition-[color,transform] duration-200 hover:-translate-y-0.5 hover:text-ink"
              >
                <Icon name={s.icon} size={18} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
