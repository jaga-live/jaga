import { profile } from '../data/profile';

const links = [
  { label: 'Work', href: '#work' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
];

export default function Nav() {
  return (
    <header className="sticky top-0 z-40 border-b border-hairline bg-paper/80 backdrop-blur-md">
      <nav className="mx-auto flex h-14 max-w-content items-center justify-between px-6">
        <a href="#top" className="font-mono text-sm font-medium text-ink" aria-label="Back to top">
          {profile.name.toLowerCase()}
          <span className="text-accent">.</span>
        </a>
        <div className="flex items-center gap-5">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="hidden font-mono text-[13px] text-secondary transition-colors hover:text-ink sm:inline"
            >
              {l.label}
            </a>
          ))}
          {profile.resumeUrl && (
            <a
              href={profile.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md border-[0.5px] border-hairline bg-surface px-3 py-1.5 font-mono text-[13px] text-ink transition-colors hover:border-accent"
            >
              Resume
            </a>
          )}
        </div>
      </nav>
    </header>
  );
}
