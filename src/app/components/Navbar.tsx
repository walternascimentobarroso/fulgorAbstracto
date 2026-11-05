"use client";
import { useState } from "react";
import Link from "next/link";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import NavLink from "./NavLink";
import MenuOverlay from "./MenuOverlay";
import { ModeToggle } from "./ModeToggle";
import { LanguageToggle } from "./LanguageToggle";
import type { Dictionary, Locale } from "../dictionaries";

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
        <Link
          href={`/${lang}`}
          aria-label="Fulgor Abstracto"
        >
          <img src="/logo-horizontal.svg" alt="" className="h-9 w-auto dark:hidden" />
          <img src="/logo-horizontal-dark.svg" alt="" className="hidden h-9 w-auto dark:block" />
        </Link>
        <div className="mobile-menu block md:hidden">
          {!navbarOpen ? (
            <button
              onClick={() => setNavbarOpen(true)}
              aria-label={dict.nav.openMenu}
              aria-expanded="false"
              aria-controls="mobile-menu"
              className="flex items-center px-3 py-2 border rounded-lg border-zinc-300 dark:border-zinc-700 text-zinc-600 dark:text-zinc-200 hover:text-zinc-900 dark:hover:text-white hover:border-black dark:hover:border-white"
            >
              <Bars3Icon className="h-5 w-5" />
            </button>
          ) : (
            <button
              onClick={() => setNavbarOpen(false)}
              aria-label={dict.nav.closeMenu}
              aria-expanded="true"
              aria-controls="mobile-menu"
              className="flex items-center px-3 py-2 border rounded-lg border-zinc-300 dark:border-zinc-700 text-zinc-600 dark:text-zinc-200 hover:text-zinc-900 dark:hover:text-white hover:border-black dark:hover:border-white"
            >
              <XMarkIcon className="h-5 w-5" />
            </button>
          )}
        </div>
        <div className="menu hidden md:block md:w-auto" id="navbar">
          <ul className="flex items-center p-4 md:p-0 md:flex-row md:space-x-8 mt-0">
            {navLinks.map((link) => (
              <li key={link.path}>
                <NavLink href={link.path} title={link.title} />
              </li>
            ))}
            <li>{languageToggle}</li>
            <li><ModeToggle label={dict.nav.toggleTheme} /></li>
          </ul>
        </div>
      </div>
      {navbarOpen ? <MenuOverlay
          id="mobile-menu"
          links={navLinks}
          languageToggle={languageToggle}
          themeLabel={dict.nav.toggleTheme}
          onNavigate={() => setNavbarOpen(false)}
        /> : null}
    </nav>
  );
};

export default Navbar;
