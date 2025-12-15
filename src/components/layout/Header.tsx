import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../common/Button';

/**
 * @interface HeaderProps
 * Props for the main application header.
 */
interface HeaderProps {
    children: React.ReactNode; // For the ThemeSwitcher
}

/**
 * @function Header
 * The application's main navigation bar.
 * @param {HeaderProps} props Component props.
 * @returns {JSX.Element} The Header component.
 */
const Header: React.FC<HeaderProps> = ({ children }) => {
  const { isAuthenticated, logout, user } = useAuth();
  
  // Use let for the dynamic welcome message
  let welcomeMessage = isAuthenticated ? `Welcome, ${user?.username}` : 'Guest';

  return (
    <header className="app-header">
      <div className="logo">
        <Link to="/">🍽️ Restaurant Finder</Link>
      </div>
      
      <nav className="main-nav">
        <span className="welcome-message">{welcomeMessage}</span>
        
        <Link to="/">Search</Link>
        
        {/* Conditional navigation links based on authentication */}
        {isAuthenticated ? (
          <>
            <Link to="/register">Register Restaurant</Link>
            <Link to="/account">My Reviews</Link>
            {/* Eseményvezérelt: onClick handler */}
            <Button variant="secondary" onClick={logout}>Logout</Button>
          </>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </nav>
      
      <div className="header-controls">
        {/* This slot is used for the ThemeSwitcher component */}
        {children} 
      </div>
    </header>
  );
};

export default Header;