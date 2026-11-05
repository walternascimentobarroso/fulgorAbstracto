"use client";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRightIcon, CheckCircleIcon } from "@heroicons/react/24/solid";
import type { Dictionary } from "../dictionaries";

type Props = {
  dict: Dictionary["hero"];
};

const enter = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
};

const HeroSection = ({ dict }: Props) => {
  return (
    <section className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center py-16 lg:py-28">
      <motion.div
        {...enter}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="md:col-span-7"
      >
        <p className="text-xs font-semibold tracking-[0.3em] uppercase text-primary-600 dark:text-primary-400 mb-5">
          {dict.eyebrow}
        </p>
        <h1 className="text-zinc-900 dark:text-white text-5xl lg:text-7xl font-bold tracking-tight leading-[1.05] mb-6">
          {dict.titleStart}{" "}
          <span className="text-primary-600 dark:text-primary-400">{dict.titleHighlight}</span>
        </h1>
        <p className="text-zinc-600 dark:text-zinc-300 text-base lg:text-lg leading-relaxed max-w-[52ch] mb-8">
          {dict.intro}
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            href="#contact"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-semibold bg-primary-600 hover:bg-primary-700 text-white active:scale-[0.98] transition"
          >
            {dict.primaryCta}
            <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
          </Link>
          <Link
            href="#services"
            className="inline-flex items-center justify-center px-6 py-3 rounded-full font-semibold border border-zinc-300 dark:border-white/20 text-zinc-900 dark:text-white hover:bg-zinc-100 dark:hover:bg-white/10 active:scale-[0.98] transition"
          >
            {dict.secondaryCta}
          </Link>
        </div>
      </motion.div>
      <motion.div
        {...enter}
        transition={{ duration: 0.5, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        className="md:col-span-5 relative"
        aria-hidden="true"
      >
        <div className="absolute -inset-8 rounded-full bg-primary-500/30 blur-3xl" />
        <div className="relative rounded-3xl border border-zinc-200 dark:border-white/10 bg-white/70 dark:bg-white/5 backdrop-blur-xl p-6 shadow-2xl shadow-primary-900/20">
          <div className="flex gap-1.5 mb-6">
            <span className="h-3 w-3 rounded-full bg-zinc-300 dark:bg-white/20" />
            <span className="h-3 w-3 rounded-full bg-zinc-300 dark:bg-white/20" />
            <span className="h-3 w-3 rounded-full bg-zinc-300 dark:bg-white/20" />
          </div>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-2">{dict.statusLabel}</p>
          <p className="flex items-center gap-2 font-semibold text-zinc-900 dark:text-white mb-6">
            <CheckCircleIcon className="h-5 w-5 text-emerald-500" />
            {dict.statusOk}
          </p>
          <div className="flex items-end gap-1.5 h-24">
            {[40, 65, 50, 80, 60, 90, 75, 95, 70, 85].map((height, index) => (
              <span
                key={index}
                className="flex-1 rounded-t bg-gradient-to-t from-primary-700 to-primary-400"
                style={{ height: `${height}%` }}
              />
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
