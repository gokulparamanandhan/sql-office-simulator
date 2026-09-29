"use client";

import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const saved = localStorage.getItem("sql_office_theme") as "light" | "dark" | null;
    const initialTheme = saved || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    setTheme(initialTheme);
    document.documentElement.setAttribute("data-theme", initialTheme);
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "light" ? "dark" : "light";
    setTheme(nextTheme);
    localStorage.setItem("sql_office_theme", nextTheme);
    document.documentElement.setAttribute("data-theme", nextTheme);
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg border-2 border-[var(--ink)] bg-[var(--white)] hover:bg-[var(--mist)] text-[var(--ink)] shadow-[2px_2px_0px_var(--ink)] transition-all active:translate-x-[1px] active:translate-y-[1px] flex items-center justify-center gap-1.5 text-xs font-bold"
      title={`Switch to ${theme === "light" ? "Dark Mode" : "Light Mode"}`}
      type="button"
    >
      {theme === "light" ? (
        <>
          <Moon className="w-4 h-4 text-[var(--ink)]" />
          <span className="hidden sm:inline">Dark Mode</span>
        </>
      ) : (
        <>
          <Sun className="w-4 h-4 text-[var(--sun)]" />
          <span className="hidden sm:inline">Light Mode</span>
        </>
      )}
    </button>
  );
}
