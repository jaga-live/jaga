import { motion } from 'framer-motion';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { skills, skillCategories } from '../data/skills';
import type { SkillCategory } from '../types';

const Skills = () => {
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

  const getSkillsByCategory = (category: SkillCategory) => {
    return skills.filter((skill) => skill.category === category);
  };

  // Multiple colors for different categories
  const categoryColors: Record<string, { gradient: string; border: string; iconBg: string }> = {
    Backend: { gradient: 'from-blue-600 to-cyan-400', border: 'border-blue-500/30', iconBg: 'bg-blue-500/10' },
    Languages: { gradient: 'from-green-500 to-emerald-300', border: 'border-green-400/30', iconBg: 'bg-green-400/10' },
    Databases: { gradient: 'from-orange-600 to-amber-500', border: 'border-orange-500/30', iconBg: 'bg-orange-500/10' },
    'Message Queue': { gradient: 'from-purple-600 to-pink-400', border: 'border-purple-500/30', iconBg: 'bg-purple-500/10' },
    Protocols: { gradient: 'from-teal-500 to-cyan-300', border: 'border-teal-400/30', iconBg: 'bg-teal-400/10' },
    DevOps: { gradient: 'from-red-600 to-rose-500', border: 'border-red-500/30', iconBg: 'bg-red-500/10' },
    Cloud: { gradient: 'from-indigo-600 to-blue-400', border: 'border-indigo-500/30', iconBg: 'bg-indigo-500/10' },
    Architecture: { gradient: 'from-violet-500 to-purple-300', border: 'border-violet-400/30', iconBg: 'bg-violet-400/10' },
  };

  // Logo URLs for tech stack
  const getSkillLogo = (skillName: string) => {
    const logos: Record<string, string> = {
      'NestJS': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nestjs/nestjs-original.svg',
      'Node.js': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
      'Express.js': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original-wordmark.svg',
      'GraphQL': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg',
      'InversifyJS': 'https://avatars.githubusercontent.com/u/16796657?s=200&v=4',
      'TypeScript': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg',
      'JavaScript': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
      'MongoDB': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg',
      'PostgreSQL': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg',
      'Redis': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg',
      'MS SQL Server': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/microsoftsqlserver/microsoftsqlserver-plain.svg',
      'DynamoDB': 'https://upload.wikimedia.org/wikipedia/commons/f/fd/DynamoDB.png',
      'Neo4j': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/neo4j/neo4j-original.svg',
      'Elasticsearch': 'https://static-www.elastic.co/v3/assets/bltefdd0b53724fa2ce/blt36f2da8d650732a0/5d0823c3d8ff351753cbc99f/logo-elasticsearch-32-color.svg',
      'Kafka': 'https://cdn.worldvectorlogo.com/logos/kafka.svg',
      'RabbitMQ': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/rabbitmq/rabbitmq-original.svg',
      'NATS': 'https://avatars.githubusercontent.com/u/6395913?s=200&v=4',
      'gRPC': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/grpc/grpc-original.svg',
      'REST': 'https://img.icons8.com/color/96/api-settings.png',
      'WebSockets': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/socketio/socketio-original.svg',
      'Docker': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg',
      'Kubernetes': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg',
      'Jenkins': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jenkins/jenkins-original.svg',
      'GitHub Actions': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/githubactions/githubactions-original.svg',
      'Nginx': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nginx/nginx-original.svg',
      'Linux': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg',
      'AWS': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg',
      'Google Cloud': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg',
      'Bare Metal': 'https://img.icons8.com/color/96/server.png',
      'Microservices': 'https://img.icons8.com/color/96/api.png',
      'Event-Driven': 'https://img.icons8.com/color/96/event-accepted.png',
      'Serverless': 'https://img.icons8.com/color/96/cloud-function.png',
    };
    return logos[skillName] || 'https://via.placeholder.com/48';
  };

  return (
    <section id="skills" className="min-h-screen py-20 px-6">
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
          <span className="bg-gradient-to-r from-blue-400 via-green-400 to-purple-400 bg-clip-text text-transparent">
            Skills & Technologies
          </span>
        </motion.h2>
        <motion.p
          variants={itemVariants}
          className="text-center text-gray-400 mb-16 max-w-2xl mx-auto"
        >
          My technical expertise across backend development, cloud infrastructure, and system architecture
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {skillCategories.map((category, categoryIndex) => {
            const categorySkills = getSkillsByCategory(category);
            if (categorySkills.length === 0) return null;

            const colors = categoryColors[category];

            return (
              <motion.div
                key={category}
                variants={itemVariants}
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                className="bg-white/5 rounded-xl p-6 hover:bg-white/8 transition-colors border border-white/10 hover:border-purple-500/30 group cursor-pointer will-change-transform"
                style={{ contain: 'layout style paint' }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-10 h-10 rounded-lg ${colors.iconBg} flex items-center justify-center flex-shrink-0`}>
                    <span className={`text-sm font-bold bg-gradient-to-r ${colors.gradient} bg-clip-text text-transparent`}>
                      {categoryIndex + 1}
                    </span>
                  </div>
                  <h3
                    className={`text-lg font-bold bg-gradient-to-r ${colors.gradient} bg-clip-text text-transparent`}
                  >
                    {category}
                  </h3>
                </div>

                <div className="flex flex-wrap gap-2">
                  {categorySkills.map((skill) => (
                    <div
                      key={skill.name}
                      className="flex items-center gap-2 px-3 py-2 bg-white/8 rounded-lg text-sm border border-white/10 hover:border-white/20 hover:bg-white/12 transition-colors duration-150 cursor-pointer group/skill"
                      style={{ contain: 'layout style' }}
                    >
                      <div className={`p-1 rounded ${colors.iconBg} flex-shrink-0`}>
                        <img
                          src={getSkillLogo(skill.name)}
                          alt={skill.name}
                          className="w-4 h-4 object-contain"
                          loading="lazy"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = 'https://via.placeholder.com/24';
                          }}
                        />
                      </div>
                      <span className="text-gray-200 group-hover/skill:text-white transition-colors font-medium text-xs">
                        {skill.name}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

      </motion.div>
    </section>
  );
};

export default Skills;
