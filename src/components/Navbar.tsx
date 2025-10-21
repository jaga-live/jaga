import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'skills', 'projects', 'contact'];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const navbarHeight = 100;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - navbarHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setMobileMenuOpen(false);
    }
  };

  const navItems = [
    { label: 'Home', href: 'home' },
    { label: 'About', href: 'about' },
    { label: 'Skills', href: 'skills' },
    { label: 'Projects', href: 'projects' },
    { label: 'Contact', href: 'contact' },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed top-6 z-50 w-full flex justify-center"
      >
        <div
          className="rounded-full px-8 py-4 transition-all duration-500 w-[80%] relative overflow-hidden group/nav"
          style={{
            background: scrolled
              ? 'rgba(15, 15, 30, 0.7)'
              : 'rgba(20, 20, 40, 0.6)',
            backdropFilter: 'blur(24px) saturate(200%)',
            WebkitBackdropFilter: 'blur(24px) saturate(200%)',
            border: scrolled
              ? '1px solid rgba(139, 92, 246, 0.3)'
              : '1px solid rgba(255, 255, 255, 0.1)',
            boxShadow: scrolled
              ? '0 8px 32px 0 rgba(139, 92, 246, 0.2), 0 0 0 1px rgba(139, 92, 246, 0.1) inset'
              : '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
          }}
        >
          {/* Animated gradient overlay */}
          <div
            className="absolute inset-0 opacity-0 group-hover/nav:opacity-100 transition-opacity duration-700 pointer-events-none"
            style={{
              background: 'radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(139, 92, 246, 0.15), transparent 50%)',
            }}
          />
          <div className="flex items-center justify-between">
            {/* Logo with casual font */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="cursor-pointer relative group/logo z-10"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              <span
                className="text-3xl font-semibold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent relative"
                style={{ fontFamily: "'Caveat', cursive" }}
              >
                Jaga
              </span>
              {/* Glow effect on hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 blur-xl opacity-0 group-hover/logo:opacity-30 transition-opacity duration-500" />
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-2 relative z-10">
              {navItems.map((item, index) => {
                const isActive = activeSection === item.href;
                return (
                  <motion.button
                    key={item.href}
                    onClick={() => scrollToSection(item.href)}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="relative px-5 py-2.5 text-gray-300 hover:text-white transition-all duration-300 group overflow-hidden rounded-full"
                  >
                    <span className={`relative z-10 font-medium transition-all duration-300 ${isActive ? 'text-white' : ''}`}>
                      {item.label}
                    </span>

                    {/* Hover gradient background */}
                    <motion.div
                      className="absolute inset-0 rounded-full"
                      initial={{ scale: 0, opacity: 0 }}
                      whileHover={{ scale: 1, opacity: 1 }}
                      animate={{ scale: isActive ? 1 : 0, opacity: isActive ? 0.3 : 0 }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                      style={{
                        background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.2), rgba(236, 72, 153, 0.2), rgba(59, 130, 246, 0.2))',
                      }}
                    />

                    {/* Glow effect */}
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 blur-md opacity-0 group-hover:opacity-40 transition-opacity duration-500" />

                    {/* Bottom indicator */}
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 rounded-full"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: isActive ? 1 : 0 }}
                      whileHover={{ scaleX: 1 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                    />

                    {/* Active dot indicator */}
                    {isActive && (
                      <motion.div
                        layoutId="activeIndicator"
                        className="absolute -top-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </motion.button>
                );
              })}

              {/* CTA Button */}
              <motion.button
                whileHover={{ scale: 1.08, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollToSection('contact')}
                className="ml-4 px-6 py-2.5 rounded-full bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 text-white font-semibold shadow-lg hover:shadow-purple-500/60 transition-all duration-300 relative group/cta overflow-hidden"
              >
                <span className="relative z-10">Let's Talk</span>
                {/* Animated gradient overlay */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 opacity-0 group-hover/cta:opacity-100"
                  transition={{ duration: 0.3 }}
                />
                {/* Glow pulse */}
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 blur-xl opacity-50 group-hover/cta:opacity-75 group-hover/cta:animate-pulse" />
              </motion.button>
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="md:hidden text-white relative z-50 p-2 rounded-full hover:bg-white/10 transition-colors duration-300"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <AnimatePresence mode="wait">
                {mobileMenuOpen ? (
                  <motion.svg
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </motion.svg>
                ) : (
                  <motion.svg
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </motion.svg>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 right-0 z-40 w-full sm:w-80 bg-black/95 backdrop-blur-xl border-l border-purple-500/20 md:hidden"
          >
            <div className="flex flex-col items-start justify-center h-full px-8 space-y-6">
              {navItems.map((item, index) => {
                const isActive = activeSection === item.href;
                return (
                  <motion.button
                    key={item.href}
                    onClick={() => scrollToSection(item.href)}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ x: 10 }}
                    className="text-2xl font-semibold text-gray-300 hover:text-white transition-all duration-300 w-full text-left group relative"
                  >
                    <span className="flex items-center relative z-10">
                      <span className={`mr-3 transition-all duration-300 ${isActive ? 'text-cyan-400 scale-110' : 'text-purple-500'}`}>
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <span className={isActive ? 'text-white' : ''}>{item.label}</span>
                    </span>
                    <motion.div
                      className="h-0.5 bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 mt-2"
                      initial={{ width: 0 }}
                      animate={{ width: isActive ? '100%' : 0 }}
                      whileHover={{ width: '100%' }}
                      transition={{ duration: 0.3 }}
                    />
                    {/* Glow effect */}
                    {isActive && (
                      <motion.div
                        layoutId="mobileActiveGlow"
                        className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-transparent rounded-lg -z-10"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </motion.button>
                );
              })}

              <motion.button
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: navItems.length * 0.1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollToSection('contact')}
                className="mt-8 w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-500 rounded-xl text-white font-medium shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 transition-all duration-300 relative group/mobile-cta overflow-hidden"
              >
                <span className="relative z-10">Let's Talk</span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 opacity-0 group-hover/mobile-cta:opacity-100"
                  transition={{ duration: 0.3 }}
                />
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
