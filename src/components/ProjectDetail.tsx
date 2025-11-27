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
    <div className="min-h-screen bg-[#0a0a0f] py-20 px-6 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-purple-900/20 to-transparent pointer-events-none" />

      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="max-w-6xl mx-auto relative z-10"
      >
        {/* Back Button */}
        <motion.button
          variants={itemVariants}
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-12 group px-4 py-2 rounded-full hover:bg-white/5 w-fit"
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
          <span className="font-medium">Back to Portfolio</span>
        </motion.button>

        {/* Header */}
        <motion.div variants={itemVariants} className="mb-16">
          <div className="flex flex-col md:flex-row md:items-center gap-6 mb-8">
            <div className="flex-1">
              <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent mb-4 font-outfit tracking-tight">
                {project.title}
              </h1>
              {project.id === 'flantic' && (
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-green-500/10 border border-green-500/20 rounded-full">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    <span className="text-green-400 text-sm font-medium">Lead Architect</span>
                  </div>
                  <div className="h-1 w-1 bg-gray-700 rounded-full" />
                  <span className="text-gray-400 text-sm">Active Development</span>
                </div>
              )}
            </div>
            {project.id === 'flantic' && (
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 blur-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-500" />
                <img
                  src={flanticLogo}
                  alt="Flantic Logo"
                  className="relative w-24 h-24 md:w-32 md:h-32 object-contain drop-shadow-2xl transform group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            )}
          </div>

          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 mb-8">
            <p className="text-gray-300 text-lg md:text-xl leading-relaxed max-w-4xl">
              {project.longDescription}
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-wrap gap-4">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl text-white font-bold hover:shadow-lg hover:shadow-purple-500/25 hover:-translate-y-1 transition-all duration-300"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
                Visit Live Site
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-8 py-4 bg-white/5 border border-white/10 rounded-xl text-white font-semibold hover:bg-white/10 hover:border-white/20 hover:-translate-y-1 transition-all duration-300"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                View Source
              </a>
            )}
          </div>
        </motion.div>

        {/* Current Stats */}
        {project.details.currentStats && (
          <motion.div variants={itemVariants} className="mb-20">
            <div className="flex items-center gap-4 mb-8">
              <div className="p-3 rounded-xl bg-green-500/10 border border-green-500/20">
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
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-white font-outfit">Live Statistics</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {project.details.currentStats.servers && (
                <div className="group relative bg-gray-900/50 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:border-green-500/30 transition-all duration-300 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="relative z-10">
                    <p className="text-gray-400 text-sm font-medium uppercase tracking-wider mb-2">
                      Total Servers
                    </p>
                    <p className="text-4xl font-bold text-white mb-2">
                      {project.details.currentStats.servers}
                    </p>
                    <div className="w-full bg-gray-800 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-green-500 h-full w-3/4 rounded-full" />
                    </div>
                  </div>
                </div>
              )}
              {project.details.currentStats.guilds && (
                <div className="group relative bg-gray-900/50 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:border-emerald-500/30 transition-all duration-300 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="relative z-10">
                    <p className="text-gray-400 text-sm font-medium uppercase tracking-wider mb-2">
                      Active Guilds
                    </p>
                    <p className="text-4xl font-bold text-white mb-2">
                      {project.details.currentStats.guilds}
                    </p>
                    <div className="w-full bg-gray-800 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-emerald-500 h-full w-2/3 rounded-full" />
                    </div>
                  </div>
                </div>
              )}
              {project.details.currentStats.users && (
                <div className="group relative bg-gray-900/50 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:border-teal-500/30 transition-all duration-300 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-teal-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="relative z-10">
                    <p className="text-gray-400 text-sm font-medium uppercase tracking-wider mb-2">
                      Active Users
                    </p>
                    <p className="text-4xl font-bold text-white mb-2">
                      {project.details.currentStats.users}
                    </p>
                    <div className="w-full bg-gray-800 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-teal-500 h-full w-4/5 rounded-full" />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* Hosting Information */}
        {project.details.hosting && (
          <motion.div variants={itemVariants} className="mb-20">
            <div className="flex items-center gap-4 mb-8">
              <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/20">
                <svg
                  className="w-6 h-6 text-blue-400"
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
              <h2 className="text-3xl font-bold text-white font-outfit">Infrastructure</h2>
            </div>

            <div className="bg-gray-900/50 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <div className="space-y-2">
                  <p className="text-gray-500 text-xs font-bold uppercase tracking-widest">
                    Provider
                  </p>
                  <p className="text-xl font-bold text-white flex items-center gap-2">
                    {project.details.hosting.provider}
                  </p>
                </div>
                <div className="space-y-2">
                  <p className="text-gray-500 text-xs font-bold uppercase tracking-widest">
                    Compute
                  </p>
                  <p className="text-xl font-bold text-white">
                    {project.details.hosting.processor}
                  </p>
                </div>
                <div className="space-y-2">
                  <p className="text-gray-500 text-xs font-bold uppercase tracking-widest">
                    Memory
                  </p>
                  <p className="text-xl font-bold text-white">{project.details.hosting.ram}</p>
                </div>
                {project.details.hosting.storage && (
                  <div className="space-y-2">
                    <p className="text-gray-500 text-xs font-bold uppercase tracking-widest">
                      Storage
                    </p>
                    <p className="text-xl font-bold text-white">
                      {project.details.hosting.storage}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}

        {/* Technologies Used */}
        <motion.div variants={itemVariants} className="mb-20">
          <div className="flex items-center gap-4 mb-8">
            <div className="p-3 rounded-xl bg-purple-500/10 border border-purple-500/20">
              <svg
                className="w-6 h-6 text-purple-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-white font-outfit">Tech Stack</h2>
          </div>

          <div className="flex flex-wrap gap-3">
            {project.technologies.map((tech) => (
              <div
                key={tech}
                className="px-5 py-2.5 bg-white/5 border border-white/10 rounded-xl text-gray-200 font-medium hover:bg-white/10 hover:border-purple-500/30 hover:text-white hover:-translate-y-1 transition-all duration-300 cursor-default"
              >
                {tech}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Architecture Overview */}
        {project.details.architecture && (
          <motion.div variants={itemVariants} className="mb-20">
            <div className="flex items-center gap-4 mb-8">
              <div className="p-3 rounded-xl bg-orange-500/10 border border-orange-500/20">
                <svg
                  className="w-6 h-6 text-orange-400"
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
              </div>
              <h2 className="text-3xl font-bold text-white font-outfit">System Architecture</h2>
            </div>

            <div className="space-y-8">
              {/* Overview */}
              <div className="bg-gray-900/50 backdrop-blur-sm border border-white/10 rounded-2xl p-8 md:p-10">
                <p className="text-gray-300 text-lg leading-relaxed">
                  {project.details.architecture.overview}
                </p>
              </div>

              {/* Architecture Benefits */}
              {project.details.architecture.benefits &&
                project.details.architecture.benefits.length > 0 && (
                  <div className="bg-gradient-to-br from-green-900/20 to-emerald-900/20 border border-green-500/20 rounded-2xl p-8 md:p-10">
                    <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                      <span className="w-1.5 h-8 bg-green-500 rounded-full" />
                      Key Benefits
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {project.details.architecture.benefits.map((benefit, index) => {
                        const [title, ...descParts] = benefit.split(' - ');
                        const description = descParts.join(' - ');
                        return (
                          <div
                            key={index}
                            className="flex items-start gap-4 bg-black/20 p-6 rounded-xl border border-white/5 hover:border-green-500/30 transition-all duration-300"
                          >
                            <div className="w-8 h-8 rounded-lg bg-green-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                              <svg
                                className="w-4 h-4 text-green-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M5 13l4 4L19 7"
                                />
                              </svg>
                            </div>
                            <div>
                              <p className="text-green-300 font-bold text-lg mb-2">{title}</p>
                              {description && (
                                <p className="text-gray-400 text-sm leading-relaxed">
                                  {description}
                                </p>
                              )}
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
                  <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                    <span className="w-1.5 h-8 bg-orange-500 rounded-full" />
                    Core Components
                  </h3>

                  <div className="grid gap-6">
                    {typeof project.details.architecture.components[0] === 'string' ? (
                      // Old format - simple string array
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {(project.details.architecture.components as string[]).map(
                          (component, index) => (
                            <div
                              key={index}
                              className="flex items-start gap-3 bg-white/5 p-4 rounded-lg border border-white/10"
                            >
                              <div className="w-2 h-2 bg-orange-400 rounded-full mt-2 flex-shrink-0"></div>
                              <p className="text-gray-300">{component}</p>
                            </div>
                          ),
                        )}
                      </div>
                    ) : (
                      // New format - detailed component objects
                      (
                        project.details.architecture.components as Array<{
                          name: string;
                          description: string;
                          features: string[];
                          tech: string[];
                        }>
                      ).map((component, index) => (
                        <div
                          key={index}
                          className="bg-gray-900/50 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:border-orange-500/30 transition-all duration-300"
                        >
                          <div className="flex flex-col lg:flex-row gap-8">
                            <div className="flex-1">
                              <div className="flex items-center gap-4 mb-4">
                                <h4 className="text-2xl font-bold text-white font-outfit">
                                  {component.name}
                                </h4>
                                <div className="h-px flex-1 bg-white/10" />
                              </div>

                              <p className="text-gray-300 leading-relaxed mb-6">
                                {component.description.split(/(`[^`]+`)/).map((part, i) =>
                                  part.startsWith('`') && part.endsWith('`') ? (
                                    <code
                                      key={i}
                                      className="px-1.5 py-0.5 bg-white/10 rounded text-orange-300 font-mono text-sm mx-1"
                                    >
                                      {part.slice(1, -1)}
                                    </code>
                                  ) : (
                                    part
                                  ),
                                )}
                              </p>

                              <div className="flex flex-wrap gap-2">
                                {component.tech.map((tech, tIndex) => (
                                  <span
                                    key={tIndex}
                                    className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-gray-400 text-xs font-medium uppercase tracking-wider"
                                  >
                                    {tech}
                                  </span>
                                ))}
                              </div>
                            </div>

                            <div className="lg:w-1/3 bg-black/20 rounded-xl p-6 border border-white/5">
                              <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">
                                Key Features
                              </p>
                              <div className="space-y-3">
                                {component.features.map((feature, fIndex) => (
                                  <div key={fIndex} className="flex items-start gap-3">
                                    <div className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-2 flex-shrink-0" />
                                    <span className="text-gray-300 text-sm">{feature}</span>
                                  </div>
                                ))}
                              </div>
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
          <motion.div variants={itemVariants} className="mb-20">
            <div className="flex items-center gap-4 mb-8">
              <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20">
                <svg
                  className="w-6 h-6 text-red-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-white font-outfit">Technical Challenges</h2>
            </div>

            <div className="grid gap-6">
              {project.details.challenges.map((challenge, index) => (
                <div
                  key={index}
                  className="bg-gray-900/50 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/5 transition-all duration-300"
                >
                  <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-white/10 text-sm">
                      {index + 1}
                    </span>
                    {challenge.title}
                  </h3>

                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="bg-red-500/5 border border-red-500/10 rounded-xl p-6">
                      <p className="text-xs font-bold text-red-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                        <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                        The Challenge
                      </p>
                      <p className="text-gray-300 leading-relaxed">{challenge.description}</p>
                    </div>

                    <div className="bg-green-500/5 border border-green-500/10 rounded-xl p-6">
                      <p className="text-xs font-bold text-green-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                        <span className="w-2 h-2 bg-green-500 rounded-full" />
                        Our Solution
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
