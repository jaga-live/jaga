import { useTranslations } from "next-intl";

export default function Footer() {
  const t = useTranslations("Footer");

  return (
    <footer className="text-comment-grey">
      <div className="flex justify-between mb-8">
        <div className="sm:text-xs">
          <span>
            {"//"} {t("developed")}
          </span>
          <span className="text-function animate-pulse">
            {" " + t("thanks")}();
          </span>
        </div>
        <div
          onClick={() => {
            window.scrollTo(0, 0);
          }}
          className="px-1 text-white rounded-full shadow-lg cursor-pointer bg-accent-orange dark:text-black dark:bg-white hover:opacity-85 w-fit shadow-accent-orange/30 dark:shadow-white/10 min-h-10"
        >
          ^
        </div>
      </div>
      <p className="mb-[-30px] flex items-center gap-2 sm:text-xs">
        <span className="leading-[1px]">&copy;</span> 2025 Yash Vardhan.{" "}
        {t("rights")}.
      </p>
    </footer>
  );
}
