import React from 'react';
import { useTheme, Theme } from '../../context/ThemeContext';
import { FaSun, FaMoon } from 'react-icons/fa';

 // Component to toggle between light and dark themes.
export const ThemeSwitcher: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button 
      className="theme-switcher-button"
      onClick={toggleTheme} 
      aria-label={`Switch to ${theme === Theme.Light ? 'dark' : 'light'} mode`}
    >
      {/* Icon changes based on current theme */}
      {theme === Theme.Light ? (
        <FaMoon size={20} title="Dark Mode" />
      ) : (
        <FaSun size={20} title="Light Mode" />
      )}
    </button>
  );
};