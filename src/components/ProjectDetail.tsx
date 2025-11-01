import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { projects } from '../data/projects';
import flanticLogo from '../assets/images/flantic-prime.png';

const ProjectDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const project = projects.find((p) => p.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!project || !project.details) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Project Not Found</h1>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg text-white font-medium hover:shadow-lg transition-all"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

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
      transition: { duration: 0.5 },
    },
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] py-20 px-6">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="max-w-6xl mx-auto"
      >
        {/* Back Button */}
        <motion.button
          variants={itemVariants}
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8 group"
        >
          <svg
            className="w-5 h-5 group-hover:-translate-x-1 transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          <span>Back to Portfolio</span>
        </motion.button>

        {/* Header */}
        <motion.div variants={itemVariants} className="mb-12">
          <div className="flex items-center gap-4 mb-4">
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400 bg-clip-text text-transparent">
              {project.title}
            </h1>
            {project.id === 'flantic' && (
              <img
                src={flanticLogo}
                alt="Flantic Logo"
                className="w-16 h-16 object-contain"
              />
            )}
          </div>
          {project.id === 'flantic' && (
            <div className="mb-4 flex items-center gap-3">
              <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/40 rounded-lg">
                <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span className="text-green-300 font-semibold text-sm">Architect:</span>
                <span className="text-white font-bold text-sm">Jaga</span>
              </div>
            </div>
          )}
          <p className="text-gray-300 text-lg max-w-3xl">{project.longDescription}</p>

          {/* Links */}
          <div className="flex items-center gap-6 mt-6">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 rounded-lg text-white font-medium hover:shadow-lg hover:shadow-green-500/30 transition-all"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
                <span>Visit Live</span>
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 rounded-lg text-gray-300 hover:text-white hover:border-white/30 transition-all"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                <span>View Code</span>
              </a>
            )}
          </div>
        </motion.div>

        {/* Current Stats */}
        {project.details.currentStats && (
          <motion.div variants={itemVariants} className="mb-12">
            <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
              <span className="w-2 h-8 bg-gradient-to-b from-green-400 to-emerald-600 rounded-full"></span>
              Current Statistics
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {project.details.currentStats.servers && (
                <div className="bg-white/5 border border-green-500/30 rounded-xl p-6 hover:bg-white/10 transition-all">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                      <svg
                        className="w-6 h-6 text-green-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Total Servers</p>
                      <p className="text-3xl font-bold text-white">
                        {project.details.currentStats.servers}
                      </p>
                    </div>
                  </div>
                </div>
              )}
              {project.details.currentStats.guilds && (
                <div className="bg-white/5 border border-emerald-500/30 rounded-xl p-6 hover:bg-white/10 transition-all">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-12 h-12 bg-emerald-500/20 rounded-lg flex items-center justify-center">
                      <svg
                        className="w-6 h-6 text-emerald-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Active Guilds</p>
                      <p className="text-3xl font-bold text-white">
                        {project.details.currentStats.guilds}
                      </p>
                    </div>
                  </div>
                </div>
              )}
              {project.details.currentStats.users && (
                <div className="bg-white/5 border border-teal-500/30 rounded-xl p-6 hover:bg-white/10 transition-all">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-12 h-12 bg-teal-500/20 rounded-lg flex items-center justify-center">
                      <svg
                        className="w-6 h-6 text-teal-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Active Users</p>
                      <p className="text-3xl font-bold text-white">
                        {project.details.currentStats.users}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* Hosting Information */}
        {project.details.hosting && (
          <motion.div variants={itemVariants} className="mb-12">
            <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
              <span className="w-2 h-8 bg-gradient-to-b from-blue-400 to-purple-600 rounded-full"></span>
              Hosting & Infrastructure
            </h2>
            <div className="bg-white/5 border border-white/10 rounded-xl p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="space-y-2">
                  <p className="text-gray-400 text-sm uppercase tracking-wider">Provider</p>
                  <p className="text-xl font-semibold text-white">
                    {project.details.hosting.provider}
                  </p>
                </div>
                <div className="space-y-2">
                  <p className="text-gray-400 text-sm uppercase tracking-wider">Processor</p>
                  <p className="text-xl font-semibold text-white">
                    {project.details.hosting.processor}
                  </p>
                </div>
                <div className="space-y-2">
                  <p className="text-gray-400 text-sm uppercase tracking-wider">Memory</p>
                  <p className="text-xl font-semibold text-white">
                    {project.details.hosting.ram}
                  </p>
                </div>
                {project.details.hosting.storage && (
                  <div className="space-y-2">
                    <p className="text-gray-400 text-sm uppercase tracking-wider">Storage</p>
                    <p className="text-xl font-semibold text-white">
                      {project.details.hosting.storage}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}

        {/* Technologies Used */}
        <motion.div variants={itemVariants} className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
            <span className="w-2 h-8 bg-gradient-to-b from-purple-400 to-pink-600 rounded-full"></span>
            Technologies Used
          </h2>
          <div className="flex flex-wrap gap-3">
            {project.technologies.map((tech) => (
              <div
                key={tech}
                className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white hover:bg-white/10 hover:border-white/30 transition-all"
              >
                {tech}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Architecture Overview */}
        {project.details.architecture && (
          <motion.div variants={itemVariants} className="mb-12">
            <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
              <span className="w-2 h-8 bg-gradient-to-b from-orange-400 to-red-600 rounded-full"></span>
              Architecture Overview
            </h2>

            <div className="space-y-8">
              {/* Overview */}
              <div className="bg-white/5 border border-white/10 rounded-xl p-8">
                <p className="text-gray-300 text-lg leading-relaxed">
                  {project.details.architecture.overview}
                </p>
              </div>

              {/* Architecture Benefits */}
              {project.details.architecture.benefits && project.details.architecture.benefits.length > 0 && (
                <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-xl p-8">
                  <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                    <svg className="w-7 h-7 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Key Architecture Benefits
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {project.details.architecture.benefits.map((benefit, index) => {
                      const [title, ...descParts] = benefit.split(' - ');
                      const description = descParts.join(' - ');
                      return (
                        <div
                          key={index}
                          className="flex items-start gap-3 bg-white/5 p-5 rounded-lg border border-green-500/20 hover:border-green-500/40 transition-all"
                        >
                          <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                          <div>
                            <p className="text-green-300 font-semibold mb-1">{title}</p>
                            {description && <p className="text-gray-400 text-sm">{description}</p>}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Microservices Components */}
              {project.details.architecture.components.length > 0 && (
                <div>
                  <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                    <svg className="w-7 h-7 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                    Microservices Architecture
                  </h3>

                  <div className="space-y-6">
                    {typeof project.details.architecture.components[0] === 'string' ? (
                      // Old format - simple string array
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {(project.details.architecture.components as string[]).map((component, index) => (
                          <div
                            key={index}
                            className="flex items-start gap-3 bg-white/5 p-4 rounded-lg border border-white/10"
                          >
                            <div className="w-2 h-2 bg-orange-400 rounded-full mt-2 flex-shrink-0"></div>
                            <p className="text-gray-300">{component}</p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      // New format - detailed component objects
                      (project.details.architecture.components as Array<{name: string; description: string; features: string[]; tech: string[]}>).map((component, index) => (
                        <div
                          key={index}
                          className="bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/8 transition-all"
                        >
                          {/* Component Header */}
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex-1">
                              <h4 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                                <span className="px-3 py-1 bg-gradient-to-r from-orange-500/20 to-red-500/20 border border-orange-500/30 rounded-lg font-mono text-orange-300">
                                  {component.name}
                                </span>
                              </h4>
                              <p className="text-gray-300 leading-relaxed">
                                {component.description.split(/(`[^`]+`)/).map((part, i) =>
                                  part.startsWith('`') && part.endsWith('`') ? (
                                    <code
                                      key={i}
                                      className="px-2 py-0.5 bg-purple-500/20 border border-purple-500/30 rounded text-purple-300 font-mono text-sm"
                                    >
                                      {part.slice(1, -1)}
                                    </code>
                                  ) : (
                                    part
                                  )
                                )}
                              </p>
                            </div>
                          </div>

                          {/* Features */}
                          <div className="mb-4">
                            <p className="text-sm text-gray-400 uppercase tracking-wider mb-3 font-semibold">Features</p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                              {component.features.map((feature, fIndex) => (
                                <div key={fIndex} className="flex items-start gap-2 text-sm">
                                  <span className="text-orange-400 mt-1">▸</span>
                                  <span className="text-gray-400">{feature}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Technologies */}
                          <div>
                            <p className="text-sm text-gray-400 uppercase tracking-wider mb-2 font-semibold">Technologies</p>
                            <div className="flex flex-wrap gap-2">
                              {component.tech.map((tech, tIndex) => (
                                <span
                                  key={tIndex}
                                  className="px-3 py-1 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-lg text-purple-300 text-sm font-medium"
                                >
                                  {tech}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* Challenges and Solutions */}
        {project.details.challenges && project.details.challenges.length > 0 && (
          <motion.div variants={itemVariants} className="mb-12">
            <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
              <span className="w-2 h-8 bg-gradient-to-b from-yellow-400 to-orange-600 rounded-full"></span>
              Challenges & Solutions
            </h2>
            <div className="space-y-6">
              {project.details.challenges.map((challenge, index) => (
                <div
                  key={index}
                  className="bg-white/5 border border-white/10 rounded-xl p-8 hover:bg-white/8 transition-all"
                >
                  <h3 className="text-2xl font-semibold text-white mb-4">
                    {index + 1}. {challenge.title}
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-gray-500 uppercase tracking-wider mb-2">
                        Challenge
                      </p>
                      <p className="text-gray-300 leading-relaxed">{challenge.description}</p>
                    </div>
                    <div>
                      <p className="text-sm text-green-500 uppercase tracking-wider mb-2">
                        Solution
                      </p>
                      <p className="text-gray-300 leading-relaxed">{challenge.solution}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default ProjectDetail;
