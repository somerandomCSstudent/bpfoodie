import React from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext'; // Új
import Home from './pages/Home/Home';
import './styles/global.css';

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <AuthProvider> {/* Wrap the application with AuthProvider */}
        <Home />
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;