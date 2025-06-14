import React, { createContext, useContext, useEffect, useState } from "react";
import { getToken, removeToken, saveToken } from "../utils/auth";

// Create context
const AuthContext = createContext();

// Provider component
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = getToken();
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const login = (callback, token) => {
    saveToken(token);              // Save token to localStorage
    setIsAuthenticated(true);      // Mark user as authenticated
    if (callback) callback();      // Run redirect or follow-up
  };

  const logout = (callback) => {
    removeToken();                 // Remove token
    setIsAuthenticated(false);    // Update auth state
    if (callback) callback();
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook to use auth context
export const useAuthContext = () => useContext(AuthContext);
