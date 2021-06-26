import { createContext } from 'react';

interface ThemeToggleContextType {
  toggleTheme: () => void;
}

const ThemeToggleContext = createContext<ThemeToggleContextType>({
  toggleTheme: () => {},
});

export default ThemeToggleContext;
