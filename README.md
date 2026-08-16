# Jaga

Personal portfolio for Jaga, a backend engineer working with TypeScript, Node.js, distributed systems, real-time infrastructure, and production platforms.

## Pages

- Portfolio overview with selected projects, technology stack, experience, and contact information
- Flantic architecture case study with an interactive system diagram

## Technology

- React 19
- TypeScript
- React Router
- Vite
- Plain responsive CSS
- Simple Icons for technology marks

## Local development

Requirements: Node.js 20.19 or newer and npm 10 or newer.

```bash
npm install
npm run dev
```

Create a production build with:

```bash
npm run build
```

Preview the production output with:

```bash
npm run preview
```

## Content

- Personal profile: `src/data/profile.ts`
- Projects: `src/data/projects.ts`
- Work experience: `src/data/experience.ts`
- Technology stack: `src/data/skills.ts`
- Main portfolio page: `src/pages/Home.tsx`
- Flantic case study: `src/pages/FlanticProject.tsx`

## Search metadata

The document metadata and structured person data are defined in `index.html`. Route-specific titles, descriptions, and canonical URLs are managed by `src/components/Seo.tsx`.

Static crawler and install metadata live in:

- `public/robots.txt`
- `public/sitemap.xml`
- `public/site.webmanifest`

The deployed domain is `https://jaga.live`.
