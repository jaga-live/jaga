import { motion, AnimatePresence } from 'framer-motion';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { projects } from '../data/projects';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import flanticLogo from '../assets/images/flantic-prime.png';

const Projects = () => {
  const { ref, controls } = useScrollAnimation();
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.2 },
    },
  };

  // Different gradient colors for each project
  const projectColors = [
    {
      gradient: 'from-green-600 to-emerald-400',
      iconBg: 'bg-green-500/10',
      border: 'border-green-500/30',
      glow: 'shadow-green-500/20',
    },
    {
      gradient: 'from-orange-600 to-amber-500',
      iconBg: 'bg-orange-500/10',
      border: 'border-orange-500/30',
      glow: 'shadow-orange-500/20',
    },
    {
      gradient: 'from-purple-600 to-pink-400',
      iconBg: 'bg-purple-500/10',
      border: 'border-purple-500/30',
      glow: 'shadow-purple-500/20',
    },
  ];

  // Logo URLs for tech stack
  const getTechLogo = (techName: string) => {
    const logos: Record<string, string> = {
      NestJS: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nestjs/nestjs-original.svg',
      TypeScript:
        'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg',
      gRPC: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/grpc/grpc-original.svg',
      WebSocket:
        'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/socketio/socketio-original.svg',
      '@discordjs/core': 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/discord.svg',
      '@discordeno/rest': 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/discord.svg',
      MongoDB: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg',
      Redis: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg',
      PostgreSQL:
        'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg',
      'Node.js': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
      Docker: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg',
      Kubernetes:
        'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg',
      Kafka: 'https://cdn.worldvectorlogo.com/logos/kafka.svg',
      AWS: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg',
      Jenkins: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jenkins/jenkins-original.svg',
      Nginx: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nginx/nginx-original.svg',
      Microservices: 'https://img.icons8.com/color/96/api.png',
    };
    return logos[techName] || 'https://via.placeholder.com/48';
  };

  // Categorize technologies
  const categorizeTechnologies = (technologies: string[]) => {
    const categories: Record<string, string[]> = {
      'Backend & Language': [],
      Database: [],
      'DevOps & Infrastructure': [],
      'Libraries & Tools': [],
    };

    technologies.forEach((tech) => {
      if (['NestJS', 'TypeScript', 'Node.js', 'gRPC', 'WebSocket'].includes(tech)) {
        categories['Backend & Language'].push(tech);
      } else if (['MongoDB', 'Redis', 'PostgreSQL'].includes(tech)) {
        categories['Database'].push(tech);
      } else if (['Docker', 'Kubernetes', 'Jenkins', 'Nginx', 'AWS', 'Kafka'].includes(tech)) {
        categories['DevOps & Infrastructure'].push(tech);
      } else {
        categories['Libraries & Tools'].push(tech);
      }
    });

    // Remove empty categories
    return Object.fromEntries(
      Object.entries(categories).filter(([_key, techs]) => techs.length > 0),
    );
  };

  return (
    <section id="projects" className="min-h-screen py-20 px-6">
      <motion.div
        ref={ref}
        initial="hidden"
        animate={controls}
        variants={containerVariants}
        className="max-w-7xl mx-auto"
      >
        <motion.h2
          variants={itemVariants}
          className="text-4xl md:text-5xl font-bold text-center mb-4"
        >
          <span className="bg-gradient-to-r from-orange-400 via-red-400 to-pink-400 bg-clip-text text-transparent">
            Featured Projects
          </span>
        </motion.h2>
        <motion.p
          variants={itemVariants}
          className="text-center text-gray-400 mb-16 max-w-2xl mx-auto"
        >
          Showcase of impactful projects demonstrating expertise in backend architecture and
          scalable systems
        </motion.p>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {projects.map((project, index) => {
            const colors = projectColors[index % projectColors.length];

            return (
              <motion.div
                key={project.id}
                variants={itemVariants}
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                className="bg-white/5 rounded-xl overflow-hidden border border-white/10 hover:border-white/20 group cursor-pointer will-change-transform"
                style={{ contain: 'layout style paint' }}
              >
                {/* Project Header with Number Badge */}
                <div
                  className={`relative h-32 bg-gradient-to-br ${colors.iconBg} border-b ${colors.border} overflow-hidden`}
                >
                  <div className="absolute top-4 left-4">
                    <div
                      className={`w-12 h-12 rounded-lg ${colors.iconBg} border ${colors.border} flex items-center justify-center`}
                    >
                      <span
                        className={`text-lg font-bold bg-gradient-to-r ${colors.gradient} bg-clip-text text-transparent`}
                      >
                        {String(index + 1).padStart(2, '0')}
                      </span>
                    </div>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center opacity-5">
                    <span className="text-8xl font-bold">{String(index + 1).padStart(2, '0')}</span>
                  </div>
                </div>

                {/* Project Content */}
                <div className="p-6 space-y-4">
                  <div className="flex items-center">
                    <h3
                      className={`text-2xl font-bold bg-gradient-to-r ${colors.gradient} bg-clip-text text-transparent`}
                    >
                      {project.title}
                    </h3>
                    {project.id === 'flantic' && (
                      <img
                        src={flanticLogo}
                        alt="Flantic Logo"
                        className="w-9 h-9 object-contain ml-1"
                      />
                    )}
                    {project.id === 'nescord' && (
                      <img
                        src="https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/discord.svg"
                        alt="Discord Logo"
                        className="w-7 h-7 object-contain invert ml-2"
                      />
                    )}
                  </div>

                  <p className="text-gray-300 text-sm leading-relaxed min-h-[60px]">
                    {project.description}
                  </p>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2 pt-2">
                    {project.technologies.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className={`px-2 py-1 text-xs ${colors.iconBg} bg-gradient-to-r ${colors.gradient} bg-clip-text text-transparent border ${colors.border} rounded font-medium`}
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 4 && (
                      <button
                        onClick={() => setSelectedProject(project.id)}
                        className={`px-2 py-1 text-xs ${colors.iconBg} text-gray-300 rounded border ${colors.border} hover:bg-white/10 hover:text-white transition-all cursor-pointer`}
                      >
                        +{project.technologies.length - 4}
                      </button>
                    )}
                  </div>

                  {/* Links */}
                  <div className="flex items-center gap-4 pt-4 border-t border-white/10">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm"
                      >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                        </svg>
                        <span>Code</span>
                      </a>
                    )}

                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm"
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                          />
                        </svg>
                        <span>Live</span>
                      </a>
                    )}

                    {project.details && (
                      <button
                        onClick={() => navigate(`/projects/${project.id}`)}
                        className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm ml-auto"
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        <span>Details</span>
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Modal for showing all technologies */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 backdrop-blur-md bg-black/80 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-gray-900/95 rounded-3xl max-w-4xl w-full max-h-[85vh] flex flex-col relative overflow-hidden shadow-2xl border border-white/10"
            >
              {(() => {
                const project = projects.find((p) => p.id === selectedProject);
                if (!project) return null;

                const colors = projectColors[projects.indexOf(project) % projectColors.length];

                return (
                  <>
                    {/* Header Section with Dynamic Gradient */}
                    <div className="relative z-10 p-8 pb-8 flex-shrink-0 overflow-hidden">
                      {/* Background Gradient Blob */}
                      <div
                        className={`absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br ${colors.gradient} opacity-20 blur-[60px] -translate-y-1/2 translate-x-1/3 pointer-events-none`}
                      />

                      <div className="relative z-10 flex justify-between items-start mb-8">
                        <div>
                          <motion.h3
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="text-4xl font-bold text-white mb-2 font-outfit tracking-tight"
                          >
                            {project.title}
                          </motion.h3>
                          <motion.p
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-gray-400 text-lg"
                          >
                            Technical Deep Dive
                          </motion.p>
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedProject(null);
                          }}
                          className="group p-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition-all hover:rotate-90"
                        >
                          <svg
                            className="w-6 h-6 text-gray-400 group-hover:text-white"
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
                          </svg>
                        </button>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex flex-wrap gap-4 relative z-10">
                        {project.id === 'flantic' ? (
                          <a
                            href="https://jaga.live/projects/flantic"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r ${colors.gradient} text-white font-bold shadow-lg shadow-purple-500/20 hover:shadow-purple-500/40 hover:scale-105 transition-all`}
                          >
                            <svg
                              className="w-5 h-5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                              />
                            </svg>
                            View Architecture
                          </a>
                        ) : (
                          project.githubUrl && (
                            <a
                              href={project.githubUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 text-white font-semibold transition-all hover:scale-105"
                            >
                              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                              </svg>
                              View Code
                            </a>
                          )
                        )}

                        {project.liveUrl && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r ${colors.gradient} text-white font-bold shadow-lg shadow-purple-500/20 hover:shadow-purple-500/40 hover:scale-105 transition-all`}
                          >
                            <svg
                              className="w-5 h-5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                              />
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                              />
                            </svg>
                            Live Demo
                          </a>
                        )}
                      </div>
                    </div>

                    {/* Scrollable Content Section */}
                    <div className="relative z-10 flex-1 overflow-y-auto custom-scrollbar bg-black/40">
                      <div className="p-8 space-y-12">
                        {Object.entries(categorizeTechnologies(project.technologies)).map(
                          ([category, techs], idx) => (
                            <motion.div
                              key={category}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.2 + idx * 0.1 }}
                            >
                              <div className="flex items-center gap-4 mb-6">
                                <h4 className={`text-lg font-bold text-white`}>{category}</h4>
                                <div className="h-px flex-1 bg-white/10" />
                              </div>

                              <div className="flex flex-wrap gap-3">
                                {techs.map((tech) => (
                                  <div
                                    key={tech}
                                    className="group flex items-center gap-3 px-4 py-3 bg-white/5 hover:bg-white/10 rounded-xl border border-white/5 hover:border-white/20 transition-all duration-300 hover:-translate-y-1"
                                  >
                                    <div className="p-2 rounded-lg bg-white/5">
                                      <img
                                        src={getTechLogo(tech)}
                                        alt={tech}
                                        className="w-5 h-5 object-contain"
                                        loading="lazy"
                                      />
                                    </div>
                                    <span className="text-gray-300 group-hover:text-white font-medium">
                                      {tech}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            </motion.div>
                          ),
                        )}
                      </div>
                    </div>
                  </>
                );
              })()}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;
