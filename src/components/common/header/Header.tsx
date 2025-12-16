import React from 'react';
import styles from './Header.module.css';
import ThemeToggle from '../ThemeToggle/ThemeToggle';

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <div className={styles.leftControls}>
        {/* Bal felső sarok: Téma kapcsoló */}
        <ThemeToggle />
      </div>
      
      <h1 className={styles.logo}>BPFoodie</h1> 

      <div className={styles.rightControls}>
        {/* Jobb felső sarok: Login és Register gombok */}
        <button className="button-primary">Login</button>
        <button className="button-primary">Register</button>
      </div>
    </header>
  );
};

export default Header;