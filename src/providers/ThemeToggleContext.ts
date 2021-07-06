import { createContext } from 'react';

interface ThemeToggleContextType {
  toggleTheme: () => void;
}

const ThemeToggleContext = createContext<ThemeToggleContextType>(
  {} as ThemeToggleContextType,
);

export default ThemeToggleContext;
