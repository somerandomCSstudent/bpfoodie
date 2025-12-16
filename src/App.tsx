import React from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import Home from './pages/Home/Home';
import './styles/global.css'; // Globális stílusok importálása

const App: React.FC = () => {
  return (
    // A ThemeProvider biztosítja a téma állapotát az egész alkalmazás számára
    <ThemeProvider>
      <Home />
    </ThemeProvider>
  );
};

export default App;