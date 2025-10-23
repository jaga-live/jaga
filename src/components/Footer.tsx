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
    { name: 'LinkedIn', url: 'https://www.linkedin.com/in/jaga-live/', icon: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/linkedin.svg' },
    { name: 'Email', url: 'mailto:jagadheesh6@gmail.com', icon: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/gmail.svg' },
    { name: 'Discord', url: 'https://discord.com/users/516438995824017420', icon: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/discord.svg' },
  ];

  return (
    <footer className="relative border-t border-white/10 bg-white/5">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="space-y-4 md:col-span-2">
            <motion.h3
              whileHover={{ scale: 1.05 }}
              className="text-3xl font-semibold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent cursor-pointer will-change-transform"
              onClick={scrollToTop}
              style={{ fontFamily: "'Caveat', cursive" }}
            >
              Jaga
            </motion.h3>
            <p className="text-gray-400 text-sm max-w-md">
              Backend Engineer specializing in scalable systems, microservices architecture, and cloud-native applications.
            </p>
            <div className="flex items-center gap-4 pt-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 bg-white/5 rounded-lg border border-white/10 hover:border-cyan-500/50 transition-all will-change-transform"
                >
                  <img src={social.icon} alt={social.name} className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider">Navigation</h4>
            <div className="flex flex-col space-y-3">
              {navItems.map((item) => (
                <motion.button
                  key={item.href}
                  onClick={() => scrollToSection(item.href)}
                  whileHover={{ x: 3 }}
                  className="text-gray-400 hover:text-cyan-400 transition-colors text-left text-sm will-change-transform"
                >
                  {item.label}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider">Get in Touch</h4>
            <div className="space-y-3">
              <button
                onClick={() => scrollToSection('contact')}
                className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 rounded-lg text-cyan-300 text-sm font-medium hover:bg-cyan-500/20 transition-all"
              >
                Contact Me
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Jaga. Crafted with precision.
          </p>

          {/* Back to Top */}
          <motion.button
            onClick={scrollToTop}
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-lg border border-white/10 hover:border-cyan-500/50 text-gray-400 hover:text-cyan-400 transition-all text-sm group will-change-transform"
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
