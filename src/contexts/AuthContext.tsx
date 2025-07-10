
import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, RegisterData, AuthContextType } from '@/types/auth';
import { AuthService } from '@/services/authService';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if user is logged in on app start
    const savedUser = AuthService.getCurrentUser();
    if (savedUser) {
      setUser(savedUser);
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    const result = await AuthService.login(email, password);
    
    if (result.success && result.user) {
      setUser(result.user);
      setIsAuthenticated(true);
      return true;
    }
    
    return false;
  };

  const register = async (userData: RegisterData): Promise<boolean> => {
    const result = await AuthService.register(userData);
    
    if (result.success && result.user) {
      setUser(result.user);
      setIsAuthenticated(true);
      return true;
    }
    
    return false;
  };

  const logout = () => {
    AuthService.logout();
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      register,
      logout,
      isAuthenticated
    }}>
      {children}
    </AuthContext.Provider>
  );
};
