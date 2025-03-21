"use client";

import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import Image from "next/image";
import { toast } from "sonner";
import { validate } from "react-email-validator";
import { useTranslations } from "next-intl";

export const Contact = () => {
  const form = useRef();
  const [email, setEmail] = useState("");
  const t = useTranslations("Cta");

  const sendEmail = (e) => {
    e.preventDefault();

    const messageField = form.current.message.value; // Accessing the value of the message field
    if (!validate(email)) {
      toast.error(t("email_field"), {
        position: "bottom-center",
        duration: 4000,
      });
      return;
    }
    if (messageField.trim() === "") {
      toast.error(t("message_field"), {
        position: "bottom-center",
        duration: 4000,
      });
      return;
    }

    emailjs
      .sendForm("service_dlgsppw", "template_7o9zlq5", form.current, {
        // publicKey: "find ur public key in emailjs.com",
      })
      .then(
        () => {},
        (error) => {}
      );
    form.current.reset();
    setEmail("");
    toast.success(t("sent"), { position: "bottom-center", duration: 10000 });
  };

  return (
    <form
      ref={form}
      onSubmit={sendEmail}
      className="flex flex-col gap-7  dark:bg-[#12121285] bg-slate-100 rounded-[37px] p-3 outline-1 outline-offset-4 outline  outline-black/20 dark:outline-white/20"
    >
      <div className="flex flex-col gap-4 py-4">
        <h2 className="text-4xl whitespace-pre-line sm:text-2xl xs:text-xl">
          {t("title")}
        </h2>
        <h6 className="text-xs sm:text-[10px] xs:text-[9px] whitespace-pre-line font-light text-comment-grey dark:text-[#c0c0c0] subpixel-antialiased">
          {t("subtitle")}
        </h6>
      </div>
      <fieldset className="flex  gap-2 flex-col sm:text-xs  xs:text-[10px">
        <label className="text-nowrap" htmlFor="email">
          <span className="text-pink-500">const</span> email ={" "}
        </label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          id="email"
          name="user_email"
          className="w-full border-none rounded outline-none dark:bg-white/5 bg-black/10"
        />
      </fieldset>
      <fieldset className="flex gap-2 flex-col sm:text-xs xs:text-[10px]">
        <span className="text-nowrap" htmlFor="message">
          <span className="text-pink-500">const</span> {t("message")} =
        </span>
        <textarea
          name="message"
          id="message"
          className="w-full border-none rounded outline-none resize-none dark:bg-white/5 bg-black/10 textarea"
          rows={5}
        ></textarea>
      </fieldset>
      {/* bg-[#cccccc24] */}
      {/* <a onClick={(e) => sendEmail(e)} className="w-[50%] ml-auto pr-2 py-2 cursor-pointer group items-center flex relative text-center dark:bg-black  rounded-full hover:opacity-80 h-full align-middle"> */}
      <a
        onClick={(e) => sendEmail(e)}
        className="w-[50%] bg-[#cccccc24] dark:bg-[#00000024] shadow-md shadow-[#ffffff33] outline outline-1 2xl:w-[66%] xl:w-[98%] xl:mx-auto ml-auto pr-2 py-2 cursor-pointer group items-center flex relative text-center  rounded-full hover:opacity-80 h-full align-middle"
      >
        <span className="mx-auto ml-8">{t("send")}</span>
        <div className="flex items-center justify-end h-6 px-2 bg-black rounded-full dark:bg-white w-14">
          <div
            className="svgMask betterhover:group-hover:translate-x-1 transition-all group-active:!translate-x-2 cursor-pointer size-6 rotate-180  dark:bg-black bg-white"
            style={{ maskImage: `url("images/arrow.svg"` }}
          ></div>
        </div>
      </a>
      {/* <button
        type="submit"
        className="bg-[#0B0B0B] text-white flex relative self-end p-1 pr-8 xs:pr-5 xs:p-[2px] group rounded mt-[-20px]"
      >
        <span className="uppercase italic font-light sm:text-xs xs:text-[8px]">{t('send')}</span>
      </button> */}
    </form>
  );
};
