import React, { createContext, useState, useContext, ReactNode } from 'react';
import { IUser, IAuthContext } from '../types/auth';

// Mock user database (username: password)
const mockUsers: Record<string, string> = {
  "bp_food_lover": "password123",
  "reviewer_joe": "secret"
};

const defaultContextValue: IAuthContext = {
  currentUser: null,
  login: async () => false,
  register: async () => false,
  logout: () => {},
  isLoading: false,
};

export const AuthContext = createContext<IAuthContext>(defaultContextValue);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<IUser | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Simulated login process
  const login = async (username: string, password: string): Promise<boolean | string> => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API delay

    if (mockUsers[username] && mockUsers[username] === password) {
      setCurrentUser({ username });
      setIsLoading(false);
      return true; // Success
    }
    
    setIsLoading(false);
    return "Invalid username or password."; // Error message
  };

  // Simulated registration process
  const register = async (username: string, password: string): Promise<boolean | string> => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API delay

    if (mockUsers[username]) {
      setIsLoading(false);
      return "Account with this username already exists."; // Exception handling
    }

    // Add new user to mock database
    mockUsers[username] = password;
    setCurrentUser({ username });
    setIsLoading(false);
    return true; // Success
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const value: IAuthContext = { currentUser, login, register, logout, isLoading };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);