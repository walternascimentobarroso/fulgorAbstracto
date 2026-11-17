"use client";
import { MapPinIcon } from "@heroicons/react/24/outline";
import { CheckCircleIcon } from "@heroicons/react/24/solid";
import { motion } from "motion/react";
import { useState } from "react";
import type { Dictionary } from "../dictionaries";

// Web3Forms access keys are public by design: they only allow sending to the owner's inbox.
const WEB3FORMS_ACCESS_KEY = "c00ebeb4-4265-4e46-9d61-b94b8ced78ea";

type Props = {
  dict: Dictionary["contact"];
};

const inputClass =
  "bg-white dark:bg-ink-950/60 border border-zinc-300 dark:border-white/10 placeholder-zinc-400 text-zinc-900 dark:text-zinc-100 text-sm rounded-xl block w-full p-3 transition-colors duration-150 hover:border-zinc-400 dark:hover:border-white/20 focus:border-primary-500 dark:focus:border-primary-400";
const labelClass =
  "text-zinc-900 dark:text-white block mb-2 text-sm font-medium";

const reveal = (index: number) => ({
  initial: { opacity: 0, y: 12, filter: "blur(3px)" },
  whileInView: { opacity: 1, y: 0, filter: "blur(0px)" },
  viewport: { once: true, amount: 0.3 },
  transition: { duration: 0.5, delay: index * 0.04, ease: [0.22, 1, 0.36, 1] as const },
});

const ContactSection = ({ dict }: Props) => {
  const [submitted, setSubmitted] = useState(false);
  const [sendFailed, setSendFailed] = useState(false);
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSendFailed(false);
    setSending(true);
    const formData = new FormData(e.currentTarget);
    formData.append("access_key", WEB3FORMS_ACCESS_KEY);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });
      const { success } = await response.json();
      if (success) setSubmitted(true);
      else setSendFailed(true);
    } catch {
      setSendFailed(true);
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contact" className="py-20 scroll-mt-28">
      <div className="grid md:grid-cols-2 gap-12 rounded-3xl border border-zinc-200 dark:border-white/10 bg-gradient-to-br from-primary-50 to-white dark:from-primary-950/60 dark:to-ink-900 p-8 md:p-12">
        <div>
          <p className="text-xs font-semibold tracking-[0.3em] uppercase text-primary-600 dark:text-primary-400 mb-3">
            {dict.eyebrow}
          </p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-zinc-900 dark:text-white mb-4">
            {dict.title}
          </h2>
          <p className="text-zinc-600 dark:text-zinc-300 mb-8 max-w-md leading-relaxed">
            {dict.text}
          </p>
          <p className="flex items-center gap-3 text-zinc-900 dark:text-white">
            <MapPinIcon
              className="h-6 w-6 text-primary-600 dark:text-primary-400"
              aria-hidden="true"
            />
            <span>
              <span className="block text-xs text-zinc-500 dark:text-zinc-400">
                {dict.locationLabel}
              </span>
              {dict.location}
            </span>
          </p>
        </div>
        <div aria-live="polite">
          {submitted ? (
            <motion.p
              initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.5, ease: [0.34, 1.36, 0.64, 1] }}
              className="flex items-center gap-3 text-primary-700 dark:text-primary-300 font-medium"
            >
              <CheckCircleIcon
                className="h-8 w-8 shrink-0"
                aria-hidden="true"
              />
              {dict.success}
            </motion.p>
          ) : (
            <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
              <motion.div {...reveal(0)}>
                <label htmlFor="name" className={labelClass}>
                  {dict.nameLabel}
                </label>
                <input
                  name="name"
                  type="text"
                  id="name"
                  required
                  autoComplete="name"
                  className={inputClass}
                  placeholder={dict.namePlaceholder}
                />
              </motion.div>
              <motion.div {...reveal(1)}>
                <label htmlFor="email" className={labelClass}>
                  {dict.emailLabel}
                </label>
                <input
                  name="email"
                  type="email"
                  id="email"
                  required
                  autoComplete="email"
                  spellCheck={false}
                  className={inputClass}
                  placeholder={dict.emailPlaceholder}
                />
              </motion.div>
              <motion.div {...reveal(2)}>
                <label htmlFor="subject" className={labelClass}>
                  {dict.subjectLabel}
                </label>
                <input
                  name="subject"
                  type="text"
                  id="subject"
                  required
                  className={inputClass}
                  placeholder={dict.subjectPlaceholder}
                />
              </motion.div>
              <motion.div {...reveal(3)}>
                <label htmlFor="message" className={labelClass}>
                  {dict.messageLabel}
                </label>
                <textarea
                  name="message"
                  id="message"
                  required
                  rows={4}
                  className={inputClass}
                  placeholder={dict.messagePlaceholder}
                />
              </motion.div>
              <motion.button
                {...reveal(4)}
                type="submit"
                disabled={sending}
                className="bg-primary-600 hover:bg-primary-700 text-white active:scale-[0.98] transition font-semibold py-3 px-5 rounded-full w-full disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {sending ? dict.sending : dict.send}
              </motion.button>
              {sendFailed && (
                <motion.p
                  role="alert"
                  initial={{ x: 0 }}
                  animate={{ x: [0, -8, 8, -6, 6, 0] }}
                  transition={{ duration: 0.4 }}
                  className="text-red-600 dark:text-red-400 text-sm"
                >
                  {dict.failure}
                </motion.p>
              )}
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
