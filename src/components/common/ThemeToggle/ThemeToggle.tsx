import React from 'react';
import { useTheme } from '../../../contexts/ThemeContext';
import styles from './ThemeToggle.module.css';

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className={styles.container}>
      <span>{theme === 'light' ? '☀️' : '🌙'}</span>
      <label className={styles.switch}>
        <input 
          type="checkbox" 
          checked={theme === 'dark'} 
          onChange={toggleTheme} 
        />
        <span className={styles.slider} />
      </label>
    </div>
  );
};

export default ThemeToggle;