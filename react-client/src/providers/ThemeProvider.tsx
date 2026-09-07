import { useState } from "react";
import { ThemeContext } from "../context/ThemeContext";

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [theme, setTheme] = useState<string>(
    localStorage.getItem("app-theme") ?? "",
  );

  function applyTheme(theme: string) {
    document.querySelector("html")?.classList.toggle("dark", theme === "dark");
  }

  function initTheme(): void {
    if (!theme) {
      const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      const newTheme = isDark ? "dark" : "light";
      setTheme(newTheme);
      localStorage.setItem("app-theme", newTheme);
    }
    applyTheme(theme);
  }

  initTheme();

  function toggleTheme() {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    localStorage.setItem("app-theme", next);
    applyTheme(next);
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
