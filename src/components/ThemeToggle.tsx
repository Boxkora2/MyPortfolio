"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { FiMoon, FiSun } from "react-icons/fi";

export const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Return a placeholder with the same dimensions to prevent layout shift
    return <div className="w-10 h-10" />; 
  }

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="p-2 rounded-full border border-[var(--color-lunar-muted)] hover:border-[var(--color-lunar-gold)] text-[var(--color-lunar-muted)] hover:text-[var(--color-lunar-gold)] transition-all duration-300 ml-4 flex items-center justify-center relative overflow-hidden"
      aria-label="Toggle Theme"
      title={theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
    >
        {/* Animated Icon Container */}
        <div className={`transition-transform duration-500 ease-in-out transform ${theme === 'dark' ? 'rotate-0' : 'rotate-180'}`}>
            {theme === "dark" ? (
                <FiSun size={20} /> /* In Dark mode, show Sun (to switch to light) */
            ) : (
                <FiMoon size={20} /> /* In Light mode, show Moon (to switch to dark) */
            )}
        </div>
    </button>
  );
};
