import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  // Adding a default user for testing
  const [user, setUser] = useState({
    username: "Test User",
    email: "test@example.com"
  });
  const [isLoginEnabled, setIsLoginEnabled] = useState(true);
  const [isLogoutEnabled, setIsLogoutEnabled] = useState(true);

  const login = (userData) => {
    if (!isLoginEnabled) {
      console.warn('Login is currently disabled');
      return false;
    }
    setUser(userData);
    return true;
  };

  const logout = () => {
    if (!isLogoutEnabled) {
      console.warn('Logout is currently disabled');
      return false;
    }
    setUser(null);
    return true;
  };

  const toggleLoginAbility = () => {
    setIsLoginEnabled(prev => !prev);
  };

  const toggleLogoutAbility = () => {
    setIsLogoutEnabled(prev => !prev);
  };

  const setLoginAbility = (enabled) => {
    setIsLoginEnabled(enabled);
  };

  const setLogoutAbility = (enabled) => {
    setIsLogoutEnabled(enabled);
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      logout,
      isLoginEnabled,
      isLogoutEnabled,
      toggleLoginAbility,
      toggleLogoutAbility,
      setLoginAbility,
      setLogoutAbility
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};