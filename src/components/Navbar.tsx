import { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isHidden, setIsHidden] = useState(false);
  const { scrollY } = useScroll();
  const lastScrollY = useRef(0);

  useMotionValueEvent(scrollY, 'change', (latest) => {
    const previous = lastScrollY.current;
    if (latest > previous && latest > 150) {
      setIsHidden(true);
    } else {
      setIsHidden(false);
    }
    lastScrollY.current = latest;

    // Update active section logic
    const sections = ['home', 'about', 'skills', 'projects', 'contact'];
    const scrollPosition = latest + 200;

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
  });

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const navbarHeight = 0;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - navbarHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
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
        variants={{
          visible: { y: 0, opacity: 1 },
          hidden: { y: -100, opacity: 0 },
        }}
        animate={isHidden ? 'hidden' : 'visible'}
        transition={{ duration: 0.35, ease: 'easeInOut' }}
        className="fixed top-6 z-50 w-full flex justify-center px-4 pointer-events-none"
      >
        <div className="pointer-events-auto relative flex items-center justify-between gap-4 glass rounded-full p-2 pl-6 pr-2 shadow-lg shadow-purple-500/10 ring-1 ring-white/5">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="cursor-pointer font-outfit font-bold text-xl tracking-tight bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent mr-4"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            Jaga
          </motion.div>

          {/* Desktop Nav */}
          <ul className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = activeSection === item.href;
              return (
                <li key={item.href}>
                  <button
                    onClick={() => scrollToSection(item.href)}
                    className={`relative px-4 py-2 text-sm font-medium transition-colors duration-300 ${
                      isActive ? 'text-white' : 'text-white/60 hover:text-white'
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute inset-0 bg-white/10 rounded-full"
                        transition={{
                          type: 'spring',
                          bounce: 0.2,
                          duration: 0.6,
                        }}
                      />
                    )}
                    <span className="relative z-10">{item.label}</span>
                  </button>
                </li>
              );
            })}
          </ul>

          {/* CTA Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => scrollToSection('contact')}
            className="hidden md:block ml-2 px-6 py-2 bg-white text-black text-sm font-bold rounded-full hover:bg-gray-100 transition-all shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_25px_rgba(255,255,255,0.5)]"
          >
            Let's Talk
          </motion.button>

          {/* Mobile Menu Toggle */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-full bg-white/5 text-white hover:bg-white/10 transition-colors"
          >
            <div className="w-5 h-5 flex flex-col justify-center items-center gap-1">
              <motion.span
                animate={{
                  rotate: mobileMenuOpen ? 45 : 0,
                  y: mobileMenuOpen ? 5 : 0,
                }}
                className="w-full h-0.5 bg-white block origin-center rounded-full"
              />
              <motion.span
                animate={{ opacity: mobileMenuOpen ? 0 : 1 }}
                className="w-full h-0.5 bg-white block rounded-full"
              />
              <motion.span
                animate={{
                  rotate: mobileMenuOpen ? -45 : 0,
                  y: mobileMenuOpen ? -5 : 0,
                }}
                className="w-full h-0.5 bg-white block origin-center rounded-full"
              />
            </div>
          </motion.button>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            animate={{ opacity: 1, backdropFilter: 'blur(12px)' }}
            exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            className="fixed inset-0 z-40 bg-black/60 md:hidden flex items-start justify-center pt-24 px-4"
            onClick={() => setMobileMenuOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: -20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: -20 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-sm glass-card rounded-3xl p-4 overflow-hidden"
            >
              <div className="flex flex-col gap-2">
                {navItems.map((item, i) => (
                  <motion.button
                    key={item.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    onClick={() => scrollToSection(item.href)}
                    className={`w-full p-4 rounded-2xl text-left text-lg font-medium transition-all ${
                      activeSection === item.href
                        ? 'bg-white/10 text-white border border-white/5'
                        : 'text-white/50 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {item.label}
                  </motion.button>
                ))}
                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  onClick={() => scrollToSection('contact')}
                  className="mt-2 w-full py-4 bg-white text-black font-bold rounded-2xl hover:bg-gray-200 transition-colors shadow-lg shadow-white/10"
                >
                  Let's Talk
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
