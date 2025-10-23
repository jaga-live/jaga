import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollY = window.scrollY;

          // Update scroll state
          setIsScrolled(scrollY > 50);

          // Update active section
          const sections = ['home', 'about', 'skills', 'projects', 'contact'];
          const scrollPosition = scrollY + 200;

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

          ticking = false;
        });

        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial call
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
          className={`glass rounded-full px-8 py-4 transition-all duration-500 w-[80%] relative overflow-hidden group/nav ${
            isScrolled ? 'bg-black/60 backdrop-blur-xl shadow-xl shadow-black/50' : ''
          }`}
        >
          {/* Animated gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-blue-500/10 rounded-full pointer-events-none" />
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
            <div className="hidden md:flex items-center space-x-1 relative z-10">
              {navItems.map((item, index) => {
                const isActive = activeSection === item.href;
                return (
                  <motion.button
                    key={item.href}
                    onClick={() => scrollToSection(item.href)}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.08, y: -2 }}
                    whileTap={{ scale: 0.92 }}
                    className="relative px-5 py-2.5 transition-all duration-300 group overflow-hidden rounded-xl will-change-transform"
                  >
                    {/* Hover background */}
                    <motion.div
                      className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-500/20 via-pink-500/20 to-blue-500/20"
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileHover={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3 }}
                    />

                    {/* Active background with gradient */}
                    <motion.div
                      className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-600/30 via-pink-600/30 to-blue-600/30 backdrop-blur-sm border border-purple-400/20"
                      initial={{ opacity: 0, scale: 0.85 }}
                      animate={{
                        opacity: isActive ? 1 : 0,
                        scale: isActive ? 1 : 0.85
                      }}
                      transition={{
                        duration: 0.4,
                        ease: [0.34, 1.56, 0.64, 1]
                      }}
                    />

                    {/* Animated glow on hover */}
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 blur-lg opacity-0 group-hover:opacity-50 transition-opacity duration-500" />

                    {/* Text with gradient for active state */}
                    <span className={`relative z-10 font-semibold transition-all duration-300 ${
                      isActive
                        ? 'bg-gradient-to-r from-cyan-300 via-purple-300 to-pink-300 bg-clip-text text-transparent'
                        : 'text-gray-300 group-hover:text-white'
                    }`}>
                      {item.label}
                    </span>

                    {/* Underline animation on hover */}
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-400 to-transparent"
                      initial={{ scaleX: 0, opacity: 0 }}
                      whileHover={{ scaleX: 1, opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    />
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
            <div className="flex flex-col items-start justify-center h-full px-8 space-y-4">
              {navItems.map((item, index) => {
                const isActive = activeSection === item.href;
                return (
                  <motion.button
                    key={item.href}
                    onClick={() => scrollToSection(item.href)}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ x: 10, scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="w-full text-left group relative will-change-transform p-4 rounded-xl overflow-hidden"
                  >
                    {/* Hover glow */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-transparent rounded-2xl"
                      initial={{ opacity: 0, x: -20 }}
                      whileHover={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3 }}
                    />

                    {/* Active background with border */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-purple-600/30 via-pink-600/30 to-blue-600/30 border border-purple-400/20 rounded-2xl backdrop-blur-sm"
                      initial={{ opacity: 0, scale: 0.85 }}
                      animate={{
                        opacity: isActive ? 1 : 0,
                        scale: isActive ? 1 : 0.85
                      }}
                      transition={{
                        duration: 0.4,
                        ease: [0.34, 1.56, 0.64, 1]
                      }}
                    />

                    <span className="flex items-center relative z-10">
                      {/* Number indicator with gradient */}
                      <span className={`mr-4 font-bold text-lg transition-all duration-300 ${
                        isActive
                          ? 'bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent scale-110'
                          : 'text-purple-500/60 group-hover:text-purple-400'
                      }`}>
                        {String(index + 1).padStart(2, '0')}
                      </span>

                      {/* Label text */}
                      <span className={`text-2xl font-bold transition-all duration-300 ${
                        isActive
                          ? 'bg-gradient-to-r from-cyan-300 via-purple-300 to-pink-300 bg-clip-text text-transparent'
                          : 'text-gray-300 group-hover:text-white'
                      }`}>
                        {item.label}
                      </span>

                      {/* Animated arrow for active */}
                      {isActive && (
                        <motion.span
                          className="ml-auto text-cyan-400"
                          initial={{ x: -10, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{
                            type: "spring",
                            stiffness: 200,
                            damping: 10
                          }}
                        >
                          →
                        </motion.span>
                      )}
                    </span>

                    {/* Gradient underline */}
                    <motion.div
                      className="h-0.5 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 mt-3 rounded-full relative z-10"
                      initial={{ width: 0, opacity: 0 }}
                      animate={{
                        width: isActive ? '100%' : 0,
                        opacity: isActive ? 1 : 0
                      }}
                      whileHover={{ width: '100%', opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    />
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
