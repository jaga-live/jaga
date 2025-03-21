import { useTranslations } from "next-intl";
import StackBox from "./StackBox";

const ExperienceCard = ({
  title,
  company,
  date,
  obligations,
  achievements,
  skills,
}) => {
  const t = useTranslations("Experience");
  return (
    <div className="outline outline-1 outline-black dark:outline-white p-[6px] rounded-[30px] bg-black/5 dark:bg-[#ffffff07]">
      <div className="flex items-start justify-between px-4 pt-1 pb-3 text-white rounded-t-3xl rounded-b-xl bg-black/80 dark:bg-white/90 dark:text-black">
        <span className="flex flex-col">
          <span className="text-xl leading-5 lg:text-sm">
            {title}{" "}
            <span className="invisible md:visible text-[10px]">({date})</span>
          </span>
          <span className="text-xs text-comment-grey">{company}</span>
        </span>
        <span className="md:hidden">{date}</span>
      </div>
      <div className="text-sm lg:text-xs xxs:text-[10px] ">
        <span className="flex ml-[1px ] my-2 items-center gap-1 text-nowrap xs:flex-col xs:items-start xs:gap-2">
          {/* Working with: */}
          <div className="flex pl-[1.3px] items-center gap-2 flex-wrap">
            {skills.map((skill, index) => (
              <StackBox key={index} img={skill.img} skill={skill.name} />
            ))}
          </div>
        </span>
        <span>🌱 {t("Responsibilities.title")}</span>
        <ul className="pl-5 my-2 space-y-2 list-disc">
          {obligations.map((obligation, index) => (
            <li key={index} className="flex items-start">
              <span className="mr-2">◉</span>
              <span>{obligation}</span>
            </li>
          ))}
        </ul>
        {achievements && (
          <>
            <span>✨ {t("Achievements.title")}</span>
            <ul className="pl-5 my-2 space-y-2 list-disc ">
              {achievements.map((achievement, index) => (
                <li key={index} className="flex items-start">
                  <span className="mr-2">◉</span>
                  <span>{achievement}</span>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
};

export default ExperienceCard;
