import { motion, useInView } from "framer-motion";
import { useScrollAnimation } from "../hooks/useScrollAnimation";
import { useRef, useState, useEffect } from "react";

const About = () => {
  const { ref, controls } = useScrollAnimation();
  const statsRef = useRef(null);
  const isStatsInView = useInView(statsRef, { once: true });
  const [counters, setCounters] = useState({ years: 0, projects: 0, users: 0 });

  useEffect(() => {
    if (isStatsInView) {
      const duration = 2000;
      const startTime = performance.now();
      let animationFrameId: number;

      const animate = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        setCounters({
          years: Math.min(Math.floor(5 * progress), 5),
          projects: Math.min(Math.floor(20 * progress), 20),
          users: Math.min(Math.floor(10 * progress), 10),
        });

        if (progress < 1) {
          animationFrameId = requestAnimationFrame(animate);
        }
      };

      animationFrameId = requestAnimationFrame(animate);
      return () => cancelAnimationFrame(animationFrameId);
    }
  }, [isStatsInView]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  const stats = [
    {
      number: "5+",
      label: "Years Experience",
      gradient: "from-cyan-400 to-blue-500",
      key: "years",
    },
    {
      number: "20+",
      label: "Projects Built",
      gradient: "from-emerald-400 to-teal-500",
      key: "projects",
    },
    {
      number: "10M+",
      label: "Users Served",
      gradient: "from-orange-400 to-red-500",
      key: "users",
    },
  ];

  const industries = [
    {
      iconSvg:
        "M17,18C15.89,18 15,18.89 15,20A2,2 0 0,0 17,22A2,2 0 0,0 19,20C19,18.89 18.1,18 17,18M1,2V4H3L6.6,11.59L5.24,14.04C5.09,14.32 5,14.65 5,15A2,2 0 0,0 7,17H19V15H7.42A0.25,0.25 0 0,1 7.17,14.75C7.17,14.7 7.18,14.66 7.2,14.63L8.1,13H15.55C16.3,13 16.96,12.58 17.3,11.97L20.88,5.5C20.95,5.34 21,5.17 21,5A1,1 0 0,0 20,4H5.21L4.27,2M7,18C5.89,18 5,18.89 5,20A2,2 0 0,0 7,22A2,2 0 0,0 9,20C9,18.89 8.1,18 7,18Z",
      name: "eCommerce & Sales",
      desc: "Measurement tools, skincare platforms, sales tracking",
      color: "from-green-400 to-green-600",
    },
    {
      iconSvg:
        "M18.92,6.01C18.72,5.42 18.16,5 17.5,5H15V3H9V5H6.5C5.84,5 5.29,5.42 5.08,6.01L3,12V20A1,1 0 0,0 4,21H5A1,1 0 0,0 6,20V19H18V20A1,1 0 0,0 19,21H20A1,1 0 0,0 21,20V12L18.92,6.01M6.5,16A1.5,1.5 0 0,1 5,14.5A1.5,1.5 0 0,1 6.5,13A1.5,1.5 0 0,1 8,14.5A1.5,1.5 0 0,1 6.5,16M17.5,16A1.5,1.5 0 0,1 16,14.5A1.5,1.5 0 0,1 17.5,13A1.5,1.5 0 0,1 19,14.5A1.5,1.5 0 0,1 17.5,16M5,11L6.5,6.5H17.5L19,11H5Z",
      name: "Transportation",
      desc: "Ride-hailing with payments, wallets & map tracking",
      color: "from-gray-300 to-gray-500",
    },
    {
      iconSvg:
        "M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20M10,19L12,15H9V10L7,14H10V19Z",
      name: "Business Tools",
      desc: "Digital cards, invoicing, meeting scheduling with QR",
      color: "from-blue-400 to-blue-600",
    },
    {
      iconSvg:
        "M12,3L1,9L12,15L21,10.09V17H23V9M5,13.18V17.18L12,21L19,17.18V13.18L12,17L5,13.18Z",
      name: "Education",
      desc: "Student safety tracking, attendance & scheduling",
      color: "from-yellow-400 to-yellow-600",
    },
    {
      iconSvg:
        "M19,3H14.82C14.4,1.84 13.3,1 12,1C10.7,1 9.6,1.84 9.18,3H5A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5A2,2 0 0,0 19,3M12,3A1,1 0 0,1 13,4A1,1 0 0,1 12,5A1,1 0 0,1 11,4A1,1 0 0,1 12,3M7,7H17V5H19V19H5V5H7V7M17,11V9L12,13L7,9V11L12,15L17,11Z",
      name: "Healthcare",
      desc: "HL7 & FHIR standards, blood donor platforms",
      color: "from-red-400 to-red-600",
    },
    {
      iconSvg:
        "M15,19L9,16.89V5L15,7.11M20.5,3C20.44,3 20.39,3 20.34,3L15,5.1L9,3L3.36,4.9C3.15,4.97 3,5.15 3,5.38V20.5A0.5,0.5 0 0,0 3.5,21C3.55,21 3.61,21 3.66,20.97L9,18.9L15,21L20.64,19.1C20.85,19 21,18.85 21,18.62V3.5A0.5,0.5 0 0,0 20.5,3Z",
      name: "Retail Tech",
      desc: "Location-based mall ads & coupon distribution",
      color: "from-emerald-400 to-emerald-600",
    },
  ];

  return (
    <section id="about" className="min-h-screen flex items-center py-20 px-6">
      <motion.div
        ref={ref}
        initial="hidden"
        animate={controls}
        variants={containerVariants}
        className="max-w-6xl mx-auto w-full"
      >
        <motion.h2
          variants={itemVariants}
          className="text-4xl md:text-5xl font-bold text-center mb-16"
        >
          <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-teal-400 bg-clip-text text-transparent">
            About Me
          </span>
        </motion.h2>

        <div className="space-y-12">
          {/* Main intro card */}
          <motion.div
            variants={itemVariants}
            className="glass rounded-3xl p-8 md:p-12 text-center relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-blue-500/10" />
            <p className="text-xl md:text-2xl text-gray-200 leading-relaxed relative z-10 max-w-4xl mx-auto">
              Backend engineer crafting{" "}
              <span className="text-gradient font-semibold">
                robust, scalable systems
              </span>{" "}
              that power modern applications. Specializing in microservices,
              distributed systems, and cloud infrastructure.
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div
            ref={statsRef}
            variants={itemVariants}
            className="grid grid-cols-3 gap-3 md:gap-6 mb-12"
          >
            {stats.map((stat) => (
              <motion.div
                key={stat.label}
                whileHover={{ y: -5 }}
                className="glass rounded-2xl p-3 md:p-6 text-center will-change-transform"
              >
                <div
                  className={`text-2xl md:text-4xl font-bold bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent mb-1 md:mb-2`}
                >
                  {stat.key === "years" && `${counters.years}+`}
                  {stat.key === "projects" && `${counters.projects}+`}
                  {stat.key === "users" && `${counters.users}M+`}
                </div>
                <div className="text-xs md:text-base text-gray-400 leading-tight">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Industries worked in */}
          <motion.div variants={itemVariants} className="space-y-6">
            <h3 className="text-2xl md:text-3xl font-bold text-center bg-gradient-to-r from-cyan-400 via-blue-400 to-teal-400 bg-clip-text text-transparent">
              Industries I've Worked With
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
              {industries.map((industry, index) => (
                <motion.div
                  key={industry.name}
                  whileHover={{ scale: 1.05, y: -5 }}
                  transition={{ duration: 0.3 }}
                  className="relative group cursor-pointer will-change-transform"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/5 rounded-2xl backdrop-blur-xl border border-white/20 group-hover:border-white/30 transition-all duration-300" />
                  <div className="relative z-10 p-6 text-center">
                    <div className="flex justify-center mb-4">
                      <div
                        className={`relative w-20 h-20 rounded-2xl overflow-hidden`}
                      >
                        <div
                          className={`absolute inset-0 bg-gradient-to-br ${industry.color} opacity-20 blur-xl`}
                        />
                        <div className="relative w-full h-full backdrop-blur-sm bg-white/5 border border-white/20 rounded-2xl flex items-center justify-center p-4 group-hover:bg-white/10 transition-all duration-300">
                          <svg
                            className="w-full h-full drop-shadow-lg"
                            viewBox="0 0 24 24"
                          >
                            <defs>
                              <linearGradient
                                id={`gradient-${index}`}
                                x1="0%"
                                y1="0%"
                                x2="100%"
                                y2="100%"
                              >
                                <stop
                                  offset="0%"
                                  style={{
                                    stopColor: industry.color.includes("green")
                                      ? "#4ade80"
                                      : industry.color.includes("gray")
                                      ? "#d1d5db"
                                      : industry.color.includes("blue")
                                      ? "#60a5fa"
                                      : industry.color.includes("yellow")
                                      ? "#facc15"
                                      : industry.color.includes("red")
                                      ? "#f87171"
                                      : "#34d399",
                                    stopOpacity: 1,
                                  }}
                                />
                                <stop
                                  offset="100%"
                                  style={{
                                    stopColor: industry.color.includes("green")
                                      ? "#16a34a"
                                      : industry.color.includes("gray")
                                      ? "#6b7280"
                                      : industry.color.includes("blue")
                                      ? "#2563eb"
                                      : industry.color.includes("yellow")
                                      ? "#ca8a04"
                                      : industry.color.includes("red")
                                      ? "#dc2626"
                                      : "#059669",
                                    stopOpacity: 1,
                                  }}
                                />
                              </linearGradient>
                            </defs>
                            <path
                              d={industry.iconSvg}
                              fill={`url(#gradient-${index})`}
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                    <h4 className="text-base font-semibold text-white mb-2 group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:to-blue-400 group-hover:bg-clip-text group-hover:text-transparent transition-all">
                      {industry.name}
                    </h4>
                    <p className="text-sm text-gray-400">{industry.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default About;
