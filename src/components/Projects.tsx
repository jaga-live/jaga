import { motion } from 'framer-motion';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { projects } from '../data/projects';

const Projects = () => {
  const { ref, controls } = useScrollAnimation();

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
    { gradient: 'from-blue-600 to-cyan-400', iconBg: 'bg-blue-500/10', border: 'border-blue-500/30', glow: 'shadow-blue-500/20' },
    { gradient: 'from-orange-600 to-amber-500', iconBg: 'bg-orange-500/10', border: 'border-orange-500/30', glow: 'shadow-orange-500/20' },
    { gradient: 'from-purple-600 to-pink-400', iconBg: 'bg-purple-500/10', border: 'border-purple-500/30', glow: 'shadow-purple-500/20' },
  ];

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
          Showcase of impactful projects demonstrating expertise in backend architecture and scalable systems
        </motion.p>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {projects.map((project, index) => {
            const colors = projectColors[index % projectColors.length];

            return (
              <motion.div
                key={project.id}
                variants={itemVariants}
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                className="bg-white/5 rounded-xl overflow-hidden border border-white/10 hover:border-white/20 group cursor-pointer"
                style={{ contain: 'layout style paint' }}
              >
                {/* Project Header with Number Badge */}
                <div className={`relative h-32 bg-gradient-to-br ${colors.iconBg} border-b ${colors.border} overflow-hidden`}>
                  <div className="absolute top-4 left-4">
                    <div className={`w-12 h-12 rounded-lg ${colors.iconBg} border ${colors.border} flex items-center justify-center`}>
                      <span className={`text-lg font-bold bg-gradient-to-r ${colors.gradient} bg-clip-text text-transparent`}>
                        {String(index + 1).padStart(2, '0')}
                      </span>
                    </div>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center opacity-5">
                    <span className="text-8xl font-bold">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </div>
                </div>

                {/* Project Content */}
                <div className="p-6 space-y-4">
                  <h3 className={`text-xl font-bold bg-gradient-to-r ${colors.gradient} bg-clip-text text-transparent`}>
                    {project.title}
                  </h3>

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
                      <span className={`px-2 py-1 text-xs ${colors.iconBg} text-gray-300 rounded border ${colors.border}`}>
                        +{project.technologies.length - 4}
                      </span>
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
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
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
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                        <span>Live</span>
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

      </motion.div>
    </section>
  );
};

export default Projects;
