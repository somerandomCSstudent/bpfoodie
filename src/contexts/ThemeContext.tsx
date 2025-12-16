import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { Theme, IThemeContext } from '../types/theme';
// Default context values
const defaultContextValue: IThemeContext = {
  theme: 'light',
  toggleTheme: () => {},
  backgroundColor: '#aee284',
};

export const ThemeContext = createContext<IThemeContext>(defaultContextValue);

// ThemeProvider component
export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>('light');

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  // background color based on the current theme
  const backgroundColor = theme === 'light' ? '#aee284' : '#87ceeb';

  // body class update on theme change
  useEffect(() => {
    document.body.className = `theme-${theme}`;
  }, [theme]);

  const value: IThemeContext = { theme, toggleTheme, backgroundColor };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};
// hook to use the ThemeContext
export const useTheme = () => useContext(ThemeContext);