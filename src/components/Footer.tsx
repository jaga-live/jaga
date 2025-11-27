import { motion } from 'framer-motion';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navItems = [
    { label: 'About', href: 'about' },
    { label: 'Skills', href: 'skills' },
    { label: 'Projects', href: 'projects' },
    { label: 'Contact', href: 'contact' },
  ];

  const socialLinks = [
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/jaga-live/',
      icon: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/linkedin.svg',
    },
    {
      name: 'Email',
      url: 'mailto:jagadheesh6@gmail.com',
      icon: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/gmail.svg',
    },
    {
      name: 'Discord',
      url: 'https://discord.com/users/516438995824017420',
      icon: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/discord.svg',
    },
  ];

  return (
    <footer className="relative border-t border-white/10 bg-black/40 backdrop-blur-xl overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 py-20 relative z-10">
        {/* Large CTA Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-20 border-b border-white/10 pb-16">
          <div className="text-center md:text-left">
            <h2 className="text-4xl md:text-5xl font-bold font-outfit mb-4">
              Let's build something <br />
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                extraordinary together.
              </span>
            </h2>
            <p className="text-gray-400 text-lg max-w-xl">
              Have an idea? I'm always open to discussing new projects, creative ideas or
              opportunities to be part of your visions.
            </p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => scrollToSection('contact')}
            className="px-8 py-4 bg-white text-black rounded-full font-bold text-lg shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)] transition-shadow"
          >
            Start a Project
          </motion.button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="space-y-6 md:col-span-2">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="text-3xl font-bold font-outfit bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent cursor-pointer inline-block"
              onClick={scrollToTop}
            >
              Jaga
            </motion.div>
            <p className="text-gray-400 text-sm max-w-md leading-relaxed">
              Backend Engineer specializing in scalable systems, microservices architecture, and
              cloud-native applications. Building the digital infrastructure of tomorrow.
            </p>
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-3 bg-white/5 rounded-full border border-white/10 hover:bg-white/10 hover:border-purple-500/50 transition-all group"
                >
                  <img
                    src={social.icon}
                    alt={social.name}
                    className="w-5 h-5 opacity-70 group-hover:opacity-100 transition-opacity"
                  />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h4 className="text-white font-bold text-sm uppercase tracking-wider">Navigation</h4>
            <div className="flex flex-col space-y-3">
              {navItems.map((item) => (
                <motion.button
                  key={item.href}
                  onClick={() => scrollToSection(item.href)}
                  whileHover={{ x: 5 }}
                  className="text-gray-400 hover:text-purple-400 transition-colors text-left text-sm font-medium"
                >
                  {item.label}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <h4 className="text-white font-bold text-sm uppercase tracking-wider">Contact</h4>
            <div className="space-y-3 text-sm text-gray-400">
              <p>Coimbatore, India</p>
              <a
                href="mailto:jagadheesh6@gmail.com"
                className="block hover:text-white transition-colors"
              >
                jagadheesh6@gmail.com
              </a>
              <p className="text-xs text-gray-500 pt-2">
                Available for freelance & full-time opportunities.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Jaga. All rights reserved.
          </p>

          {/* Back to Top */}
          <motion.button
            onClick={scrollToTop}
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-white/10 hover:bg-white/10 text-gray-400 hover:text-white transition-all text-sm group"
          >
            <span>Back to Top</span>
            <svg
              className="w-4 h-4 group-hover:-translate-y-1 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 10l7-7m0 0l7 7m-7-7v18"
              />
            </svg>
          </motion.button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
