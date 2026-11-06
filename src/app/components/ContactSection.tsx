"use client";
import { MapPinIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import type { Dictionary } from "../dictionaries";

// Web3Forms access keys are public by design: they only allow sending to the owner's inbox.
const WEB3FORMS_ACCESS_KEY = "c00ebeb4-4265-4e46-9d61-b94b8ced78ea";

type Props = {
  dict: Dictionary["contact"];
};

const inputClass =
  "bg-white dark:bg-ink-950/60 border border-zinc-300 dark:border-white/10 placeholder-zinc-400 text-zinc-900 dark:text-zinc-100 text-sm rounded-xl block w-full p-3";
const labelClass =
  "text-zinc-900 dark:text-white block mb-2 text-sm font-medium";

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
            <p className="text-primary-700 dark:text-primary-300 font-medium">
              {dict.success}
            </p>
          ) : (
            <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
              <div>
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
              </div>
              <div>
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
              </div>
              <div>
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
              </div>
              <div>
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
              </div>
              <button
                type="submit"
                disabled={sending}
                className="bg-primary-600 hover:bg-primary-700 text-white active:scale-[0.98] transition font-semibold py-3 px-5 rounded-full w-full disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {sending ? dict.sending : dict.send}
              </button>
              {sendFailed && (
                <p
                  role="alert"
                  className="text-red-600 dark:text-red-400 text-sm"
                >
                  {dict.failure}
                </p>
              )}
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
