import Box from "./components/Box";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const item = {
  hidden: { y: 10, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

export default function Projects() {
  const t = useTranslations("Projects");

  // some example projects u gotta add ur own in this format
  const projects = [
    {
      // name: "name of the project dum ahh",
      isOnline: true,
      // link: "add ur gif link like: "https://projectname.com"",
      // img: "add ur img link like: "/images/project1.png"",
      // gif: "add ur gif link like: "/images/project1.gif"",
      description: t("os"),
      skills: ["react", "ts", "figma"],
    },
    {
      // name: "name of the project dum ahh",
      isOnline: true,
      // link: "add ur gif link like: "https://projectname.com"",
      // img: "add ur img link like: "/images/project1.png"",
      // gif: "add ur gif link like: "/images/project1.gif"",
      description: t("os"),
      skills: ["next", "tailwind", "ts"],
    },
    {
      // name: "name of the project dum ahh",
      isOnline: true,
      // link: "add ur gif link like: "https://projectname.com"",
      // img: "add ur img link like: "/images/project1.png"",
      description: t("os"),
      skills: ["react", "ts", "html", "figma"],
    },
  ];

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="scroll-mt-16"
      id="projects"
    >
      <div className="flex flex-col items-center gap-1">
        <h2 className="mb-3 text-4xl sm:text-3xl xs:text-xl xxs:text-xl lg:mb-1 sm:mb-0">
          {t("title")}
        </h2>
        <label className="dark:bg-white/95 px-7 rounded-full text-center w-fit bg-accent-orange text-white dark:text-black/90 h-min flex-grow-0 lg:text-[10px] sm:text-[8px]">
          {t("description")}
        </label>
      </div>
      <motion.ul
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid grid-cols-3 gap-[60px] md:gap-9 lg:gap-2 my-[40px] dots md:grid-cols-1"
      >
        {projects.map((project) => {
          return (
            <motion.li variants={item} key={project.name}>
              <Box {...project} />
            </motion.li>
          );
        })}
      </motion.ul>
    </motion.section>
  );
}
