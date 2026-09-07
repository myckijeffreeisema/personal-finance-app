import { createContext } from "react";

type ThemeContextType = {
  theme: string;
  toggleTheme: VoidFunction;
};

export const ThemeContext = createContext<ThemeContextType | undefined>(
undefined,
);