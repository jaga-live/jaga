# Jaga's Portfolio

A modern, dark-themed portfolio website showcasing backend engineering skills and projects. Built with React, TypeScript, and Tailwind CSS with smooth animations and interactive elements.

## Features

- Modern dark theme with gradient accents inspired by Apple and Stripe
- Smooth scroll animations and interactive hover effects
- Fully responsive design for all devices
- Single-page application with smooth section navigation
- Scalable project showcase (currently 3 projects, supports N)
- Categorized skills section
- Contact section with social links

## Tech Stack

### Frontend
- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **React Intersection Observer** - Scroll-based animations

### Design
- Dark theme with purple/blue gradients
- Glassmorphism effects
- Smooth parallax scrolling
- Micro-interactions and hover animations

## Project Structure

```
jaga-portfolio/
├── src/
│   ├── components/          # React components
│   │   ├── Navbar.tsx       # Navigation with scroll detection
│   │   ├── Hero.tsx         # Landing section
│   │   ├── About.tsx        # About me section
│   │   ├── Skills.tsx       # Categorized skills
│   │   ├── Projects.tsx     # Project showcase
│   │   ├── Contact.tsx      # Contact links
│   │   └── Footer.tsx       # Footer with links
│   ├── data/                # Data files
│   │   ├── skills.ts        # Skills list
│   │   ├── projects.ts      # Projects data
│   │   └── contact.ts       # Contact information
│   ├── hooks/               # Custom React hooks
│   │   └── useScrollAnimation.ts
│   ├── types/               # TypeScript types
│   │   └── index.ts
│   ├── App.tsx             # Main app component
│   ├── main.tsx            # Entry point
│   └── index.css           # Global styles
├── public/                  # Static assets
├── tailwind.config.js      # Tailwind configuration
├── tsconfig.json           # TypeScript configuration
└── vite.config.ts          # Vite configuration
```

## Getting Started

### Prerequisites

- Node.js 20.19+ or 22.12+
- npm 10+

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd jaga-portfolio
```

2. Install dependencies
```bash
npm install
```

3. Start development server
```bash
npm run dev
```

The application will be available at `http://localhost:5173/`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally

## Customization

### Update Personal Information

1. **Contact Links** - Edit `src/data/contact.ts`
   - Update LinkedIn, Email, and Discord URLs

2. **Skills** - Edit `src/data/skills.ts`
   - Add or remove skills
   - Organize by categories

3. **Projects** - Edit `src/data/projects.ts`
   - Add new projects or update existing ones
   - Each project supports:
     - Title, description, long description
     - Technologies used
     - GitHub and live URLs
     - Featured flag

4. **About Section** - Edit `src/components/About.tsx`
   - Update bio text
   - Modify "What I Do" cards

5. **Hero Section** - Edit `src/components/Hero.tsx`
   - Change tagline and description

### Styling

- **Colors** - Modify gradient colors in `tailwind.config.js`
- **Animations** - Adjust animation timings in `tailwind.config.js`
- **Custom Utilities** - Add new utilities in `src/index.css`

## Building for Production

1. Create production build
```bash
npm run build
```

2. The build output will be in the `dist/` directory

3. Test production build locally
```bash
npm run preview
```

## Deployment

### Bare Metal Server

1. Build the application
```bash
npm run build
```

2. Copy the contents of the `dist/` folder to your web server

3. Configure your web server (nginx example):

```nginx
server {
    listen 80;
    server_name your-domain.com;
    root /path/to/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # Enable gzip compression
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
}
```

### Using Docker (Optional)

Create a `Dockerfile`:

```dockerfile
FROM nginx:alpine
COPY dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

Build and run:
```bash
docker build -t jaga-portfolio .
docker run -p 80:80 jaga-portfolio
```

## Future Enhancements

- [ ] Add blog section
- [ ] Implement multi-page routing
- [ ] Add contact form with backend
- [ ] Dark/Light theme toggle
- [ ] Add project filtering
- [ ] Integrate with CMS for easy content updates
- [ ] Add analytics
- [ ] Add sitemap and SEO optimizations

## License

MIT

## Contact

- LinkedIn: [Update in src/data/contact.ts]
- Email: [Update in src/data/contact.ts]
- Discord: [Update in src/data/contact.ts]
