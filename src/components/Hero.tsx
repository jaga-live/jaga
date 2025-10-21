import { motion } from 'framer-motion';
import { useState } from 'react';

const Hero = () => {
  const [gradientIndex, setGradientIndex] = useState(0);

  const gradients = [
    'from-emerald-400 via-cyan-400 to-blue-500',
    'from-rose-400 via-fuchsia-500 to-indigo-500',
    'from-purple-500 via-pink-500 to-orange-500',
    'from-yellow-400 via-red-500 to-pink-500',
    'from-green-400 via-teal-500 to-blue-600',
    'from-indigo-500 via-purple-500 to-pink-600',
  ];

  const handleMouseEnter = () => {
    setGradientIndex((prev) => (prev + 1) % gradients.length);
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 z-0">
      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <motion.h1
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <span className="text-white">Hey, I'm </span>
            <span
              className="relative inline-block cursor-pointer pb-1"
              onMouseEnter={handleMouseEnter}
            >
              {gradients.map((gradient, index) => (
                <span
                  key={index}
                  className={`bg-gradient-to-r ${gradient} bg-clip-text text-transparent transition-opacity duration-1000 ease-in-out ${
                    index === gradientIndex ? 'opacity-100' : 'opacity-0 absolute inset-0'
                  }`}
                >
                  Jaga
                </span>
              ))}
            </span>
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl lg:text-3xl text-gray-300 mb-4 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            I build scalable backend systems & microservices
          </motion.p>

          <motion.p
            className="text-lg md:text-xl text-gray-400 mb-12 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            Specializing in distributed architectures, event-driven systems, and cloud-native applications
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
          >
            <motion.button
              onClick={() => scrollToSection('projects')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 rounded-lg text-white font-semibold text-lg shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 transition-all"
            >
              View Projects
            </motion.button>

            <motion.button
              onClick={() => scrollToSection('contact')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-white/5 rounded-lg text-white font-semibold text-lg border border-white/10 hover:border-cyan-500/50 hover:bg-white/10 transition-all"
            >
              Get in Touch
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
