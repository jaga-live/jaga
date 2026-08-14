import { useEffect, useState } from 'react';
import Icon from './Icon';

type Theme = 'light' | 'dark';

// Reads the theme the no-flash inline script already set on <html>, then lets the
// user flip it. Choice is persisted so it survives reloads and beats system default.
export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>('light');

  useEffect(() => {
    const current = document.documentElement.getAttribute('data-theme');
    setTheme(current === 'dark' ? 'dark' : 'light');
  }, []);

  const toggle = () => {
    const next: Theme = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', next === 'dark' ? '#0d0d0d' : '#f7f6f2');
  };

  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className="btn grid h-8 w-8 place-items-center rounded-md border-[0.5px] border-hairline bg-surface text-secondary hover:border-accent hover:text-ink"
    >
      <span className="relative block h-[18px] w-[18px]">
        <span
          className={`absolute inset-0 transition-all duration-300 ${
            isDark ? 'rotate-0 opacity-100' : '-rotate-90 opacity-0'
          }`}
        >
          <Icon name="sun" size={18} />
        </span>
        <span
          className={`absolute inset-0 transition-all duration-300 ${
            isDark ? 'rotate-90 opacity-0' : 'rotate-0 opacity-100'
          }`}
        >
          <Icon name="moon" size={18} />
        </span>
      </span>
    </button>
  );
}
