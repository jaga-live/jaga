import { motion } from 'framer-motion';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { contactLinks } from '../data/contact';

const Contact = () => {
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

  // Brand colors for each contact method
  const contactColors = [
    { gradient: 'from-[#0077B5] to-[#00A0DC]', iconBg: 'bg-[#0077B5]/20', border: 'border-[#0077B5]/40' }, // LinkedIn
    { gradient: 'from-[#EA4335] to-[#FBBC05]', iconBg: 'bg-[#EA4335]/20', border: 'border-[#EA4335]/40' }, // Gmail
    { gradient: 'from-[#5865F2] to-[#5865F2]', iconBg: 'bg-[#5865F2]/20', border: 'border-[#5865F2]/40' }, // Discord
  ];

  const getIconColor = (iconName: string) => {
    const colors: Record<string, string> = {
      'linkedin': '#0077B5',
      'email': '#EA4335',
      'discord': '#5865F2',
    };
    return colors[iconName] || '#FFFFFF';
  };

  return (
    <section id="contact" className="min-h-screen py-20 px-6">
      <motion.div
        ref={ref}
        initial="hidden"
        animate={controls}
        variants={containerVariants}
        className="max-w-5xl mx-auto"
      >
        <motion.h2
          variants={itemVariants}
          className="text-4xl md:text-5xl font-bold text-center mb-4"
        >
          <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
            Get In Touch
          </span>
        </motion.h2>

        <motion.p
          variants={itemVariants}
          className="text-center text-gray-400 mb-16 max-w-2xl mx-auto"
        >
          Let's collaborate on building scalable backend solutions and innovative tech projects
        </motion.p>

        {/* Contact Links */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {contactLinks.map((contact, index) => {
            const colors = contactColors[index % contactColors.length];

            return (
              <motion.a
                key={contact.name}
                href={contact.url}
                target="_blank"
                rel="noopener noreferrer"
                variants={itemVariants}
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                className="bg-white/5 rounded-xl p-8 flex flex-col items-center justify-center space-y-4 border border-white/10 hover:border-white/20 group cursor-pointer"
                style={{ contain: 'layout style paint' }}
              >
                <div className={`p-4 rounded-xl ${colors.iconBg} border ${colors.border} group-hover:scale-110 transition-transform`}>
                  <svg className="w-10 h-10" fill={getIconColor(contact.icon)} viewBox="0 0 24 24">
                    {contact.icon === 'linkedin' && (
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    )}
                    {contact.icon === 'email' && (
                      <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z"/>
                    )}
                    {contact.icon === 'discord' && (
                      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
                    )}
                  </svg>
                </div>
                <h3 className={`text-lg font-bold bg-gradient-to-r ${colors.gradient} bg-clip-text text-transparent`}>
                  {contact.name}
                </h3>
                <p className="text-gray-400 text-sm">
                  {contact.name === 'LinkedIn' && 'Connect professionally'}
                  {contact.name === 'Email' && 'Send a message'}
                  {contact.name === 'Discord' && 'Chat in real-time'}
                </p>
              </motion.a>
            );
          })}
        </div>

      </motion.div>
    </section>
  );
};

export default Contact;
