"use client";

import Image from "next/image";
import { useState } from "react";
import { Contact } from "./components/Contact";
import style from "./Cta.module.css";
import { useTranslations } from "next-intl";

export default function Cta() {
  const contact = [
    "mailto:jagadheesh6@gmail.com",
    "tel:+91 99949 59031",
    "https://github.com/jaga-live",
    "https://www.linkedin.com/in/jaga-live/",
  ];
  const [copiedLink, setCopiedLink] = useState();
  const [timeout, setTimeoutState] = useState();
  const t = useTranslations("Cta");
  const copylink = (link, event) => {
    event.stopPropagation();
    navigator.clipboard.writeText(
      link.replace("mailto:", "").replace("tel:", "")
    );
    setCopiedLink(link);
    if (timeout) clearTimeout(timeout);
    const newTimeout = setTimeout(() => {
      setCopiedLink(null);
    }, 3000);
    setTimeoutState(() => newTimeout);
  };
  return (
    <section id="contact">
      <div className="grid mt-24 xl:grid-cols-1 xl:grid-rows-1 justify-stretch grid-cols-7 grid-rows-2 gap-8  rounded-[64px]">
        <div className="col-span-3 row-span-2 xl:row-span-1 xl:col-span-1">
          <Contact />
        </div>
        <div className="dark:bg-[#12121285] bg-slate-100 xl:col-span-1 col-span-4 rounded-[40px] flex flex-col justify-between py-5 px-5 outline-1 outline outline-offset-4 outline-black/20 dark:outline-white/20 ">
          <span className="text-3xl leading-snug sm:text-2xl xs:text-xl xl:mb-8">
            {t("place1")} <br />
            {t("place2")} 🤙🏾
          </span>
          <div className="flex gap-4">
            <a
              href="mailto:jagadheesh6@gmail.com"
              target="_blank"
              className="size-9 group w-20 rounded-full  duration-500 p-1 bg-[#54daff]  hover:betterhover:opacity-70"
            >
              <div
                style={{
                  maskImage: `url("images/mail.svg")`,
                  maskSize: "auto",
                }}
                className="block bg-white size-full svgMask"
              ></div>
            </a>
            <a
              href="tel:+91 99949 59031"
              className="size-9 w-20 group rounded-full  duration-500 p-1 bg-[#a64ca6]  hover:betterhover:opacity-70"
            >
              <div
                style={{
                  maskImage: `url("images/phone.svg")`,
                  maskSize: "auto",
                }}
                className="block bg-white size-full svgMask"
              ></div>
            </a>
            {/* <a href="https://discord.com/users/368858792139423747" target="_blank" className="duration-500 bg-[#7289da] group size-9 w-20 rounded-full p-1  hover:betterhover:opacity-70">
                    <div style={{maskImage: `url("images/discord.svg")`, maskSize: 'auto'}} className="block bg-white size-full svgMask"></div>
                </a> */}
          </div>
        </div>
        <div className="dark:bg-[#12121285] bg-slate-100 text-2xl p-5 size-full col-span-3 xl:col-span-1 rounded-[40px] outline-1 outline outline-offset-4 outline-black/20 dark:outline-white/20 ">
          <span className="sm:text-2xl xs:text-xl">{t("find")}:</span>
          <div className="flex gap-6 py-4 size-full">
            <a
              href="https://www.linkedin.com/in/jaga-live/"
              target="_blank"
              className="size-[90%]  duration-300  bg-[rgb(10,102,194)] transition-all hover:betterhover:opacity-70  outline rounded-[30px] p-4"
            >
              <div
                style={{
                  maskImage: `url("images/linkedin_cta.svg")`,
                  maskSize: "auto",
                }}
                className="block bg-white size-full svgMask"
              ></div>
            </a>
            <a
              href="https://github.com/jaga-live"
              target="_blank"
              className="size-[90%]  bg-[rgb(1,4,9)]  duration-300 hover:betterhover:opacity-70 transition-all outline rounded-[30px] p-4"
            >
              <div
                style={{
                  maskImage: `url("images/github_cta.svg")`,
                  maskSize: "auto",
                }}
                className="block bg-white size-full svgMask"
              ></div>
            </a>
          </div>
        </div>
        <div
          style={{ backgroundImage: `url("images/AdobeStock_528222303.jpeg")` }}
          className={`${style.neon_effect} xl:hidden`}
        ></div>
      </div>
    </section>
  );
}
