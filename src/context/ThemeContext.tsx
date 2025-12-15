import React, { createContext, useContext, useMemo } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

/**
 * @enum Theme
 * Defines the possible themes for the application.
 */
export enum Theme {
  Light = 'light',
  Dark = 'dark',
}

/**
 * @interface ThemeContextType
 * Defines the shape of the Theme Context value.
 */
interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

/**
 * @function ThemeProvider
 * Provides the theme state and a function to toggle it to the application.
 * Uses useLocalStorage to persist the theme preference.
 * * @param {React.PropsWithChildren<{}>} props Component props.
 * @returns {JSX.Element} The ThemeProvider component.
 */
export const ThemeProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  // Use let for the initial value if we were to calculate it dynamically here, 
  // but useLocalStorage handles the initial load.
  const [theme, setTheme] = useLocalStorage<Theme>('app-theme', Theme.Light);

  /**
   * @function toggleTheme
   * Toggles the current theme between 'light' and 'dark'.
   */
  const toggleTheme = () => {
    // Use let to declare the new theme value
    let newTheme: Theme = theme === Theme.Light ? Theme.Dark : Theme.Light;
    setTheme(newTheme);
  };

  // Use useEffect to apply the theme class to the body element
  React.useEffect(() => {
    // let body is not allowed, use document.body directly
    document.body.className = `${theme}-mode`;
  }, [theme]);

  // Memoize the context value for performance
  const contextValue = useMemo(() => ({ theme, toggleTheme }), [theme]);

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};

/**
 * @function useTheme
 * A custom hook to easily consume the Theme Context.
 * @returns {ThemeContextType} The theme context value.
 * @throws {Error} if used outside of a ThemeProvider.
 */
export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};