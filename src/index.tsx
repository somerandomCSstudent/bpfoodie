import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './styles/index.css'; 
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';

// 1. Megkeressük a DOM elemét, amelybe a React alkalmazást be akarjuk fűzni.
// Standard React projektekben ez általában a <div id="root"></div> a public/index.html-ben.
const container = document.getElementById('root');

if (!container) {
    throw new Error('Failed to find the root element in the document (id="root")');
}

let root = createRoot(container);

// 3. Rendereljük a fő App komponenst, beburkolva a szükséges Context Provider-ekkel.
// A BrowserRouter itt van a legkülső ponton, hogy az összes útvonal (Routes) működjön.
root.render(
  <React.StrictMode>
    <ThemeProvider>
      {/* AuthProvider: Szolgáltatja a bejelentkezési (user) állapotot */}
      <AuthProvider>
        {/* App: A tényleges útvonalakat és a tartalom elrendezését kezeli */}
        <App />
      </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>
);
