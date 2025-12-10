
"use client";

import { createContext, useContext, useState, ReactNode } from 'react';

// Define the context type
interface AuthContextType {
  // For now, we'll just use a simple boolean to track auth state
  isAuthenticated: boolean;
  login: (username?: string, password?: string) => Promise<void>;
  register: (details: any, pass: string) => Promise<void>;
  resetPassword: (user: string, email: string, pass: string) => void;
  logout: () => void;
}

// Create the context with a default undefined value
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Create the provider component
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Dummy login function
  const login = async (username?: string, password?: string) => {
    console.log('Attempting login with:', { username });
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    if (username === 'BigDaddy' && password === 'password123') {
        setIsAuthenticated(true);
        console.log('Dummy login successful!');
    } else {
        console.log('Dummy login failed!');
        throw new Error('Authentication failed');
    }
  };

  // Dummy register function
  const register = async (details: any, pass: string) => {
    console.log('Attempting to register:', { details, pass });
    await new Promise(resolve => setTimeout(resolve, 500));
    console.log('Dummy registration successful! Logging user in.');
    // In a real app, you would have more complex logic here.
    // For now, we'll just log them in.
    setIsAuthenticated(true);
  };

  // Dummy reset password function
  const resetPassword = (user: string, email: string, pass: string) => {
    console.log('Attempting to reset password for:', { user, email });
    console.log('Dummy password reset successful!');
  };

  // Dummy logout function
  const logout = () => {
    setIsAuthenticated(false);
    console.log('Dummy logout successful!');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, register, resetPassword, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Create the hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
