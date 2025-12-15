import React from 'react';
import Header from './Header';
import { ThemeSwitcher } from '../common/ThemeSwitcher';

/**
 * @interface MainLayoutProps
 * Props for the main structural layout component.
 */
interface MainLayoutProps {
  children: React.ReactNode;
}

/**
 * @function MainLayout
 * Provides the main structural container for the application, 
 * including the header and footer (if any).
 * NOTE: In this specific implementation, the App.tsx handles the full header/theme setup.
 * This component is used here primarily to demonstrate a clean separation of layout concerns 
 * for future scalability.
 * @param {MainLayoutProps} props Component props (the page content).
 * @returns {JSX.Element} The structural layout component.
 */
const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  // 1. let VÁLTOZÓK DEKLARÁLÁSA A RETURN ELŐTT
  
  // let currentYear a dátumhoz
  let currentYear = new Date().getFullYear();
  
  // let copyrightString a fő hatókörben deklarálva
  let copyrightString = `© ${currentYear} Restaurant Finder. All rights reserved.`;

  return (
    <div className="app-container">
      
      {/* HEADER SECTION */}
      <Header>
        <ThemeSwitcher />
      </Header>

      {/* MAIN CONTENT AREA */}
      <main className="content">
        {children}
      </main>

      {/* SIMPLE FOOTER */}
      <footer className="app-footer">
        {/* ITT MÁR CSAK HIVATKOZUNK RÁ, NEM DEKLARÁLJUK */}
        <p>{copyrightString}</p> 
      </footer>
    </div>
  );
};

export default MainLayout;