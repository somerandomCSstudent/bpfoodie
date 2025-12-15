import React, { createContext, useContext, useState, useMemo, useEffect, useCallback } from 'react';
import { UserDto, LoginDto } from '../dto/Auth';
import { login as loginApi } from '../api/auth';
import { useLocalStorage } from '../hooks/useLocalStorage';

/**
 * @interface AuthContextType
 * Defines the shape of the Auth Context value.
 */
interface AuthContextType {
  user: UserDto | null;
  isAuthenticated: boolean;
  login: (credentials: LoginDto) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

/**
 * @function AuthProvider
 * Provides authentication state and functions to the application.
 * @param {React.PropsWithChildren<{}>} props Component props.
 * @returns {JSX.Element} The AuthProvider component.
 */
export const AuthProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  // Use let for the storage key
  let userStorageKey = 'auth-user';
  
  // Use custom hook useLocalStorage to persist user data
  const [storedUser, setStoredUser] = useLocalStorage<UserDto | null>(userStorageKey, null);
  
  // State for the current user and loading status
  let [user, setUser] = useState<UserDto | null>(storedUser);
  let [loading, setLoading] = useState(false);

  // Sync state when localStorage changes (handled by useLocalStorage, but good practice)
  useEffect(() => {
    setUser(storedUser);
  }, [storedUser]);

  /**
   * @function login
   * Handles user login process.
   * @param {LoginDto} credentials The user credentials.
   * @returns {Promise<void>}
   */
  const login = useCallback(async (credentials: LoginDto) => {
    setLoading(true);
    try {
      // Use let for the fetched user data
      let userData: UserDto = await loginApi(credentials);
      setUser(userData);
      setStoredUser(userData); // Persist to storage
    } catch (error) {
      console.error("Login failed:", error);
      throw error; // Propagate error for UI handling
    } finally {
      setLoading(false);
    }
  }, [setStoredUser]);

  /**
   * @function logout
   * Clears user session data.
   */
  const logout = useCallback(() => {
    setUser(null);
    setStoredUser(null); // Remove from storage
  }, [setStoredUser]);

  // Memoize the context value using useMemo for performance
  const contextValue = useMemo(() => ({
    user,
    isAuthenticated: !!user,
    login,
    logout,
    loading
  }), [user, login, logout, loading]);

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

/**
 * @function useAuth
 * A custom hook to easily consume the Auth Context.
 * @returns {AuthContextType} The auth context value.
 * @throws {Error} if used outside of an AuthProvider.
 */
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};