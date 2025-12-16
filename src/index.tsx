import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
// Entry point of the React application
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
// Render the main App component within React Strict Mode
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);