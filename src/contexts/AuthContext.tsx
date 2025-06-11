
import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'auditor' | 'viewer';
  company: string;
  password: string; // Added to store encrypted password
}

interface RegisterData {
  email: string;
  name: string;
  role: 'admin' | 'auditor' | 'viewer';
  company: string;
  password: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (userData: RegisterData) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Simple password hashing for demo (in production, use proper hashing)
const hashPassword = (password: string): string => {
  return btoa(password + 'salt'); // Basic encoding for demo
};

const verifyPassword = (password: string, hashedPassword: string): boolean => {
  return hashPassword(password) === hashedPassword;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if user is logged in on app start
    const savedUser = localStorage.getItem('5s_audit_user');
    if (savedUser) {
      const userData = JSON.parse(savedUser);
      setUser(userData);
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    console.log('Attempting login for:', email);
    
    // Get all registered users
    const registeredUsers = JSON.parse(localStorage.getItem('5s_audit_registered_users') || '[]');
    console.log('Registered users:', registeredUsers);
    
    // Find user by email
    const foundUser = registeredUsers.find((u: User) => u.email === email);
    
    if (!foundUser) {
      console.log('User not found');
      return false;
    }
    
    // Verify password
    if (!verifyPassword(password, foundUser.password)) {
      console.log('Invalid password');
      return false;
    }
    
    console.log('Login successful');
    
    // Remove password from user object before storing in state
    const { password: _, ...userWithoutPassword } = foundUser;
    setUser(userWithoutPassword as User);
    setIsAuthenticated(true);
    localStorage.setItem('5s_audit_user', JSON.stringify(userWithoutPassword));
    return true;
  };

  const register = async (userData: RegisterData): Promise<boolean> => {
    console.log('Registering user:', userData);
    
    // Get existing users
    const existingUsers = JSON.parse(localStorage.getItem('5s_audit_registered_users') || '[]');
    
    // Check if email already exists
    if (existingUsers.some((u: User) => u.email === userData.email)) {
      console.log('Email already exists');
      return false;
    }
    
    // Create new user with hashed password
    const newUser: User = {
      id: Date.now().toString(),
      email: userData.email,
      name: userData.name,
      role: userData.role,
      company: userData.company,
      password: hashPassword(userData.password)
    };
    
    // Save to registered users list
    const updatedUsers = [...existingUsers, newUser];
    localStorage.setItem('5s_audit_registered_users', JSON.stringify(updatedUsers));
    
    // Auto login after registration
    const { password: _, ...userWithoutPassword } = newUser;
    setUser(userWithoutPassword as User);
    setIsAuthenticated(true);
    localStorage.setItem('5s_audit_user', JSON.stringify(userWithoutPassword));
    
    console.log('Registration successful');
    return true;
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('5s_audit_user');
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
