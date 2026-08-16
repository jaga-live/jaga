import { useEffect } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { profile } from '../data/profile';
import Icon from './Icon';

function ScrollManager() {
  const { hash, pathname } = useLocation();

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      if (hash) {
        document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: 'auto' });
        return;
      }

      window.scrollTo({ top: 0, behavior: 'auto' });
    });

    return () => window.cancelAnimationFrame(frame);
  }, [hash, pathname]);

  return null;
}

export default function Layout() {
  return (
    <div className="site-shell">
      <ScrollManager />
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>

      <header className="site-header">
        <div className="site-header__inner">
          <Link className="identity" to="/" aria-label="Jaga, home">
            <img
              className="identity__avatar"
              src="/jaga-avatar.png"
              alt=""
              width="40"
              height="40"
            />
            <span>
              <strong>{profile.name}</strong>
              <small>{profile.title}</small>
            </span>
          </Link>

          <nav className="primary-nav" aria-label="Primary navigation">
            <a href="/#work">Projects</a>
            <a href="/#stack">Stack</a>
            <a href="/#experience">Experience</a>
            <a href="/#about">About</a>
          </nav>

          <div className="header-links" aria-label="Contact links">
            <a href="https://github.com/jaga-live" target="_blank" rel="noreferrer" aria-label="GitHub profile">
              <Icon name="github" />
            </a>
            <a className="header-links__email" href="mailto:jagadheesh6@gmail.com">
              Email me
            </a>
          </div>
        </div>
      </header>

      <main id="main-content">
        <Outlet />
      </main>

      <footer className="site-footer">
        <div className="site-footer__inner">
          <span>Jaga</span>
          <span>Backend engineering · India · UTC+5:30</span>
        </div>
      </footer>
    </div>
  );
}
