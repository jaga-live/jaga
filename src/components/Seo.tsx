import { useEffect } from 'react';

const siteUrl = 'https://jaga.live';
const homeDescription = 'Jaga is a backend engineer with 6 years of experience building distributed systems, real-time infrastructure, and scalable TypeScript services.';

interface SeoProps {
  title: string;
  description: string;
  path: string;
}

function updateMeta(selector: string, content: string) {
  document.querySelector<HTMLMetaElement>(selector)?.setAttribute('content', content);
}

function applySeo(title: string, description: string, path: string) {
  const url = `${siteUrl}${path}`;

  document.title = title;
  document.querySelector<HTMLLinkElement>('link[rel="canonical"]')?.setAttribute('href', url);
  updateMeta('meta[name="description"]', description);
  updateMeta('meta[property="og:title"]', title);
  updateMeta('meta[property="og:description"]', description);
  updateMeta('meta[property="og:url"]', url);
  updateMeta('meta[name="twitter:title"]', title);
  updateMeta('meta[name="twitter:description"]', description);
}

export default function Seo({ title, description, path }: SeoProps) {
  useEffect(() => {
    applySeo(title, description, path);

    return () => applySeo('Jaga', homeDescription, '/');
  }, [description, path, title]);

  return null;
}
