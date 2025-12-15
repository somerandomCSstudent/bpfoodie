import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import AccountHistoryPage from './pages/AccountHistoryPage';

interface ProtectedRouteProps {
    children: React.ReactNode;
}

/**
 * @function ProtectedRoute
 * A wrapper component that redirects unauthenticated users to the login page.
 * @param {ProtectedRouteProps} props Component props (children).
 * @returns {JSX.Element} The children if authenticated, or a redirect.
 */
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  // Use let to store the children element
  let protectedContent = children as React.ReactElement;
  return protectedContent;
};

// 3. FŐ APP KOMPONENS (MINDEN HASZNÁLT KOMPONENS DEFINÍCIÓJA UTÁN)
/**
 * @function App
 * Main application component managing routing and global layout.
 * @returns {JSX.Element} The App component.
 */
const App: React.FC = () => {
  return (
    <Router>
      {/* ... (MainLayout) */}
      <Routes>
        {/* ... (public routes) */}

        {/* Itt hivatkozol a ProtectedRoute-ra */}
        <Route 
          path="/account" 
          element={
            <ProtectedRoute> 
              <AccountHistoryPage />
            </ProtectedRoute>
          } 
        />
        {/* ... (többi védett útvonal) */}
      </Routes>
      {/* ... */}
    </Router>
  );
};

export default App;