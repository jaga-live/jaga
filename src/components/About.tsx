import { motion, useInView } from "framer-motion";
import { useScrollAnimation } from "../hooks/useScrollAnimation";
import { useRef, useState, useEffect } from "react";

const About = () => {
  const { ref, controls } = useScrollAnimation();
  const statsRef = useRef(null);
  const isStatsInView = useInView(statsRef, { once: true, margin: "-100px" });
  const [counters, setCounters] = useState({ years: 0, projects: 0, users: 0 });

  useEffect(() => {
    if (isStatsInView) {
      const duration = 2000;
      const startTime = performance.now();
      let animationFrameId: number;

      const animate = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeOut = 1 - Math.pow(1 - progress, 3); // Cubic ease-out

        setCounters({
          years: Math.floor(5 * easeOut),
          projects: Math.floor(20 * easeOut),
          users: Math.floor(10 * easeOut),
        });

        if (progress < 1) {
          animationFrameId = requestAnimationFrame(animate);
        } else {
          // Ensure final values are set
          setCounters({ years: 5, projects: 20, users: 10 });
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
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
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
      // Shopping Cart / Store
      iconPath: "M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z",
      name: "eCommerce & Sales",
      desc: "High-scale platforms handling millions of transactions.",
      color: "from-green-400 to-emerald-600",
      bg: "bg-emerald-500/10",
      border: "border-emerald-500/20",
    },
    {
      // Map / Navigation
      iconPath:
        "M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7",
      name: "Transportation",
      desc: "Real-time tracking, dispatching, and payment systems.",
      color: "from-blue-400 to-indigo-600",
      bg: "bg-blue-500/10",
      border: "border-blue-500/20",
    },
    {
      // Briefcase / Business
      iconPath:
        "M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
      name: "Business Tools",
      desc: "SaaS solutions for invoicing, scheduling, and management.",
      color: "from-purple-400 to-fuchsia-600",
      bg: "bg-purple-500/10",
      border: "border-purple-500/20",
    },
    {
      // Academic Cap / Education
      iconPath:
        "M12 14l9-5-9-5-9 5 9 5z M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z",
      name: "Education",
      desc: "LMS platforms, student tracking, and virtual classrooms.",
      color: "from-amber-400 to-orange-600",
      bg: "bg-amber-500/10",
      border: "border-amber-500/20",
    },
    {
      // Heart Pulse / Healthcare
      iconPath:
        "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z",
      name: "Healthcare",
      desc: "Secure patient data systems, HL7/FHIR standards.",
      color: "from-rose-400 to-red-600",
      bg: "bg-rose-500/10",
      border: "border-rose-500/20",
    },
    {
      // Shopping Bag / Retail
      iconPath: "M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z",
      name: "Retail Tech",
      desc: "Location intelligence, ad-tech, and inventory systems.",
      color: "from-teal-400 to-cyan-600",
      bg: "bg-teal-500/10",
      border: "border-teal-500/20",
    },
  ];

  return (
    <section
      id="about"
      className="min-h-screen flex items-center py-20 px-6 relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-64 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-64 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl" />
      </div>

      <motion.div
        ref={ref}
        initial="hidden"
        animate={controls}
        variants={containerVariants}
        className="max-w-7xl mx-auto w-full relative z-10"
      >
        <motion.div variants={itemVariants} className="text-center mb-16">
          <h2 className="font-outfit text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
              About Me
            </span>
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto rounded-full" />
        </motion.div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-20">
          {/* Main Bio Card - Spans 8 columns */}
          <motion.div
            variants={itemVariants}
            className="lg:col-span-8 glass rounded-3xl p-8 md:p-10 relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-blue-500/5 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative z-10">
              <h3 className="text-2xl font-bold text-white mb-6 font-outfit">
                Engineering Scalable Solutions
              </h3>
              <p className="text-lg text-gray-300 leading-relaxed mb-6">
                I am a passionate{" "}
                <span className="text-white font-medium">Backend Engineer</span>{" "}
                specializing in building high-performance, distributed systems.
              </p>
              <p className="text-lg text-gray-300 leading-relaxed">
                From designing microservices to optimizing databases, I focus on
                creating robust infrastructure that scales effortlessly. My goal
                is to write clean, efficient code that powers seamless user
                experiences.
              </p>
            </div>
          </motion.div>

          {/* Stats Column - Spans 4 columns */}
          <div className="lg:col-span-4 grid grid-rows-3 gap-6">
            {stats.map((stat) => (
              <motion.div
                key={stat.label}
                ref={statsRef}
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                className="glass rounded-2xl p-6 flex items-center justify-between relative overflow-hidden group"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-r ${stat.gradient} opacity-5 group-hover:opacity-10 transition-opacity duration-300`}
                />
                <div>
                  <div
                    className={`text-3xl font-bold bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent font-outfit`}
                  >
                    {stat.key === "years" && `${counters.years}+`}
                    {stat.key === "projects" && `${counters.projects}+`}
                    {stat.key === "users" && `${counters.users}M+`}
                  </div>
                  <div className="text-sm text-gray-400 font-medium mt-1">
                    {stat.label}
                  </div>
                </div>
                <div
                  className={`w-12 h-12 rounded-full bg-gradient-to-r ${stat.gradient} flex items-center justify-center opacity-20 group-hover:opacity-100 transition-opacity duration-300`}
                >
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                    />
                  </svg>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Industries Section */}
        <motion.div variants={itemVariants} className="space-y-10">
          <div className="flex items-center gap-4 mb-8">
            <h3 className="text-2xl md:text-3xl font-bold text-white font-outfit">
              Industries I've Impacted
            </h3>
            <div className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {industries.map((industry) => (
              <motion.div
                key={industry.name}
                whileHover={{ y: -5 }}
                className={`group relative p-6 rounded-2xl border ${industry.border} ${industry.bg} backdrop-blur-sm overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10`}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="relative z-10 flex items-start gap-4">
                  <div
                    className={`p-3 rounded-xl bg-gradient-to-br ${industry.color} shadow-lg shrink-0`}
                  >
                    <svg
                      className="w-6 h-6 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d={industry.iconPath}
                      />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-white mb-2 group-hover:text-purple-200 transition-colors">
                      {industry.name}
                    </h4>
                    <p className="text-sm text-gray-300 leading-relaxed">
                      {industry.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default About;
