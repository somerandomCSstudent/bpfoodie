import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { Theme, IThemeContext } from '../types/theme';

const defaultContextValue: IThemeContext = {
  theme: 'light',
  toggleTheme: () => {},
  backgroundColor: '#aee284',
};

export const ThemeContext = createContext<IThemeContext>(defaultContextValue);

/**
 * A téma logikát és állapotot biztosító komponens.
 */
export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>('light');

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  // A háttérszín a témához igazodik
  const backgroundColor = theme === 'light' ? '#aee284' : '#87ceeb';

  // A body osztályának frissítése
  useEffect(() => {
    document.body.className = `theme-${theme}`;
  }, [theme]);

  const value: IThemeContext = { theme, toggleTheme, backgroundColor };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

// Hook a téma kontextus egyszerű használatához
export const useTheme = () => useContext(ThemeContext);