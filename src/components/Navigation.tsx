"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "./ThemeToggle";

interface NavigationProps {
  lang: string;
  dict: any;
}

export function Navigation({ lang, dict }: NavigationProps) {
  const pathname = usePathname();
  
  // Helper function to generate link for current language
  const getLink = (path: string) => {
    return lang === "vi" ? `/vi${path}` : path;
  };
  
  // Helper function to get other language link
  const getOtherLangLink = () => {
    if (lang === "en") {
      // Switch to Vietnamese: add /vi prefix
      return `/vi${pathname}`;
    } else {
      // Switch to English: remove /vi prefix
      return pathname.replace(/^\/vi/, "") || "/";
    }
  };

  return (
    <nav className="w-full py-6 px-4 sm:px-8 flex justify-between items-center relative z-50">
      <div className="flex items-center gap-2 sm:gap-4">
        {/* Brand / Home Link */}
        <Link href={getLink("/")} className="group relative px-4 py-2">
            <span className="absolute inset-0 bg-white/10 dark:bg-white/5 opacity-0 group-hover:opacity-100 rounded-lg transition-opacity duration-300"></span>
            <h1 className="relative z-10 text-xl font-bold tracking-widest uppercase transition-all duration-300 group-hover:brightness-150 group-hover:text-glow">
              {dict.nav.home}
            </h1>
        </Link>
        <NavItem 
          href={getLink("/clicky-addicty")} 
          label={dict.nav.clicky} 
          active={pathname === getLink("/clicky-addicty")} 
        />
        {/* Highlighted CV Link */}
        <Link
          href={getLink("/cv")}
          className={`
            relative px-4 py-2 rounded-lg font-bold transition-all duration-300 group
            ${pathname === getLink("/cv")
              ? "text-[var(--color-lunar-gold)] bg-[var(--color-lunar-gold)]/10" 
              : "text-[var(--color-lunar-primary)]"
            }
          `}
        >
          {/* Animated Glow Border */}
          <span className="absolute -inset-0.5 bg-gradient-to-r from-[var(--color-lunar-primary)] via-[var(--color-lunar-gold)] to-[var(--color-lunar-secondary)] rounded-lg opacity-0 group-hover:opacity-75 blur transition-opacity duration-300 animate-pulse"></span>
          {/* Solid Background */}
          <span className="absolute inset-0 bg-[var(--color-lunar-bg)] rounded-lg"></span>
          {/* Badge */}
          <span className="relative z-10 flex items-center gap-2 group-hover:text-[var(--color-lunar-gold)] group-hover:brightness-125 transition-all">
            <span className="text-lg">📄</span>
            {dict.nav.cv}
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-[var(--color-lunar-primary)] rounded-full animate-ping"></span>
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-[var(--color-lunar-primary)] rounded-full"></span>
          </span>
        </Link>
      </div>

      <div className="flex items-center gap-2 sm:gap-6">
        {/* Navigation Links */}
        <NavItem 
          href={getLink("/converter")} 
          label={dict.nav.converter} 
          active={pathname === getLink("/converter")} 
        />

        {/* Separator */}
        <div className="h-6 w-px bg-[var(--color-lunar-muted)]/30 mx-2"></div>

        {/* Language Switcher */}
        <Link 
            href={getOtherLangLink()}
            className="group relative px-3 py-2 rounded-lg text-sm font-medium transition-all"
        >
             <span className="absolute inset-0 bg-white/10 dark:bg-white/5 opacity-0 group-hover:opacity-100 rounded-lg transition-opacity duration-300"></span>
             <span className="relative z-10 text-[var(--color-lunar-muted)] group-hover:text-[var(--color-lunar-text)] group-hover:brightness-125">
                {dict.home.switch_lang}
             </span>
        </Link>

        {/* Theme Toggle */}
        <ThemeToggle />
      </div>
    </nav>
  );
}

function NavItem({ href, label, active }: { href: string; label: string; active: boolean }) {
  return (
    <Link
      href={href}
      className={`
        relative px-4 py-2 rounded-lg transition-all duration-300 font-medium group
        ${active 
            ? "text-[var(--color-lunar-gold)]" 
            : "text-[var(--color-lunar-muted)]"
        }
      `}
    >
      {/* Transparent box cover effect */}
      <span className="absolute inset-0 bg-white/10 dark:bg-white/5 opacity-0 group-hover:opacity-100 rounded-lg transition-opacity duration-300"></span>
      {/* Text Brighter on Hover */}
      <span className="relative z-10 group-hover:text-[var(--color-lunar-gold)] group-hover:brightness-125 transition-all">
        {label}
      </span>
    </Link>
  );
}
