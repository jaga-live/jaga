import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const Hero = () => {
  const [gradientIndex, setGradientIndex] = useState(0);

  const gradients = [
    "from-emerald-400 via-cyan-400 to-blue-500",
    "from-rose-400 via-fuchsia-500 to-indigo-500",
    "from-purple-500 via-pink-500 to-orange-500",
    "from-yellow-400 via-red-500 to-pink-500",
    "from-green-400 via-teal-500 to-blue-600",
    "from-indigo-500 via-purple-500 to-pink-600",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setGradientIndex((prev) => (prev + 1) % gradients.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [gradients.length]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 z-0"
    >
      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="mb-8 inline-block"
          >
            <div className="relative group cursor-default">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full opacity-75 group-hover:opacity-100 blur transition duration-1000 group-hover:duration-200 animate-tilt"></div>
              <span className="relative flex items-center gap-2 py-2 px-4 rounded-full bg-black/50 backdrop-blur-md border border-white/10 text-sm text-purple-200 font-medium tracking-wide">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                Backend Engineer
              </span>
            </div>
          </motion.div>

          <motion.h1
            className="font-outfit text-5xl md:text-7xl lg:text-8xl font-bold mb-8 tracking-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <span className="text-white block mb-2 drop-shadow-2xl">
              Building digital
            </span>
            <span className="relative inline-block cursor-pointer">
              {gradients.map((gradient, index) => (
                <span
                  key={index}
                  className={`bg-gradient-to-r ${gradient} bg-clip-text text-transparent transition-opacity duration-1000 ease-in-out absolute inset-0 ${
                    index === gradientIndex ? "opacity-100" : "opacity-0"
                  } blur-[1px] hover:blur-0 transition-all`}
                >
                  experiences
                </span>
              ))}
              <span className="opacity-0">experiences</span>
            </span>
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            I craft{" "}
            <span className="text-white font-medium">
              scalable backend systems
            </span>{" "}
            and{" "}
            <span className="text-white font-medium">
              high-performance microservices
            </span>{" "}
            with a focus on reliability.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            <motion.button
              onClick={() => scrollToSection("projects")}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group relative px-8 py-4 bg-white text-black rounded-full font-bold text-lg shadow-[0_0_20px_rgba(255,255,255,0.3)] overflow-hidden"
            >
              <span className="relative z-10">View Work</span>
              <div className="absolute inset-0 bg-gradient-to-r from-gray-100 to-white opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute -inset-3 bg-gradient-to-r from-purple-400 to-pink-600 opacity-20 blur-lg group-hover:opacity-40 transition-opacity duration-500" />
            </motion.button>

            <motion.button
              onClick={() => scrollToSection("contact")}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 glass text-white font-semibold text-lg rounded-full hover:bg-white/10 transition-all shadow-lg shadow-purple-900/20 border border-white/10"
            >
              Contact Me
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
