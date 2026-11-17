"use client";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { useState } from "react";
import type { Dictionary, Locale } from "../dictionaries";
import { LanguageToggle } from "./LanguageToggle";
import MenuOverlay from "./MenuOverlay";
import { ModeToggle } from "./ModeToggle";
import NavLink from "./NavLink";

export type NavLinkItem = {
  title: string;
  path: string;
};

type Props = {
  lang: Locale;
  dict: Dictionary;
};

const Navbar = ({ lang, dict }: Props) => {
  const [navbarOpen, setNavbarOpen] = useState(false);
  const navLinks: NavLinkItem[] = [
    { title: dict.nav.services, path: "#services" },
    { title: dict.nav.process, path: "#process" },
    { title: dict.nav.contact, path: "#contact" },
  ];
  const languageToggle = <LanguageToggle lang={lang} labels={dict.language} />;

  return (
    <nav className="fixed top-0 left-0 right-0 z-10 border-b border-zinc-200 dark:border-white/10 bg-white/80 dark:bg-ink-950/80 backdrop-blur">
      <div className="flex max-w-6xl min-h-16 flex-wrap items-center justify-between mx-auto px-6">
        <Link href={`/${lang}`} aria-label="Fulgor Abstracto">
          {/* biome-ignore lint/performance/noImgElement: static export, images are unoptimized */}
          <img
            src="/logo-horizontal.svg"
            alt=""
            className="h-9 w-auto dark:hidden"
          />
          {/* biome-ignore lint/performance/noImgElement: static export, images are unoptimized */}
          <img
            src="/logo-horizontal-dark.svg"
            alt=""
            className="hidden h-9 w-auto dark:block"
          />
        </Link>
        <div className="mobile-menu block md:hidden">
          <button
            type="button"
            onClick={() => setNavbarOpen(!navbarOpen)}
            aria-label={navbarOpen ? dict.nav.closeMenu : dict.nav.openMenu}
            aria-expanded={navbarOpen}
            aria-controls="mobile-menu"
            className="relative flex h-9 w-11 items-center justify-center border rounded-lg border-zinc-300 dark:border-zinc-700 text-zinc-600 dark:text-zinc-200 hover:text-zinc-900 dark:hover:text-white hover:border-black dark:hover:border-white"
          >
            <AnimatePresence initial={false}>
              <motion.span
                key={navbarOpen ? "close" : "open"}
                initial={{ opacity: 0, scale: 0.8, filter: "blur(2px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 0.8, filter: "blur(2px)" }}
                transition={{ duration: 0.25, ease: "easeInOut" }}
                className="absolute"
              >
                {navbarOpen ? (
                  <XMarkIcon className="h-5 w-5" />
                ) : (
                  <Bars3Icon className="h-5 w-5" />
                )}
              </motion.span>
            </AnimatePresence>
          </button>
        </div>
        <div className="menu hidden md:block md:w-auto" id="navbar">
          <ul className="flex items-center p-4 md:p-0 md:flex-row md:space-x-8 mt-0">
            {navLinks.map((link) => (
              <li key={link.path}>
                <NavLink href={link.path} title={link.title} />
              </li>
            ))}
            <li>{languageToggle}</li>
            <li>
              <ModeToggle label={dict.nav.toggleTheme} />
            </li>
          </ul>
        </div>
      </div>
      <AnimatePresence initial={false}>
        {navbarOpen ? (
          <motion.div
            key="mobile-menu"
            initial={{ height: 0, opacity: 0, filter: "blur(2px)" }}
            animate={{ height: "auto", opacity: 1, filter: "blur(0px)" }}
            exit={{ height: 0, opacity: 0, filter: "blur(2px)" }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden md:hidden"
          >
            <MenuOverlay
              id="mobile-menu"
              links={navLinks}
              languageToggle={languageToggle}
              themeLabel={dict.nav.toggleTheme}
              onNavigate={() => setNavbarOpen(false)}
            />
          </motion.div>
        ) : null}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
