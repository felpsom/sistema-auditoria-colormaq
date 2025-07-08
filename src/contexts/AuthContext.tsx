
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

// Improved password hashing for demo (in production, use proper hashing)
const hashPassword = (password: string): string => {
  // Simple but more secure hash for demo purposes
  const salt = 'audit_system_salt_2024';
  return btoa(password + salt);
};

const verifyPassword = (password: string, hashedPassword: string): boolean => {
  const hashedInput = hashPassword(password);
  console.log('Comparing passwords:', { hashedInput, hashedPassword, match: hashedInput === hashedPassword });
  return hashedInput === hashedPassword;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if user is logged in on app start
    const savedUser = localStorage.getItem('5s_audit_user');
    if (savedUser) {
      try {
        const userData = JSON.parse(savedUser);
        setUser(userData);
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Error parsing saved user data:', error);
        localStorage.removeItem('5s_audit_user');
      }
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    console.log('Attempting login for:', email);
    
    if (!email || !password) {
      console.log('Email or password is empty');
      return false;
    }
    
    // Get all registered users
    const registeredUsersData = localStorage.getItem('5s_audit_registered_users');
    if (!registeredUsersData) {
      console.log('No registered users found');
      return false;
    }
    
    let registeredUsers;
    try {
      registeredUsers = JSON.parse(registeredUsersData);
    } catch (error) {
      console.error('Error parsing registered users:', error);
      return false;
    }
    
    console.log('Registered users:', registeredUsers);
    
    // Find user by email
    const foundUser = registeredUsers.find((u: User) => u.email.toLowerCase() === email.toLowerCase());
    
    if (!foundUser) {
      console.log('User not found with email:', email);
      return false;
    }
    
    console.log('Found user:', { email: foundUser.email, hasPassword: !!foundUser.password });
    
    // Verify password
    if (!foundUser.password) {
      console.log('User has no password stored');
      return false;
    }
    
    if (!verifyPassword(password, foundUser.password)) {
      console.log('Invalid password for user:', email);
      return false;
    }
    
    console.log('Login successful for:', email);
    
    // Remove password from user object before storing in state
    const { password: _, ...userWithoutPassword } = foundUser;
    setUser(userWithoutPassword as User);
    setIsAuthenticated(true);
    localStorage.setItem('5s_audit_user', JSON.stringify(userWithoutPassword));
    return true;
  };

  const register = async (userData: RegisterData): Promise<boolean> => {
    console.log('Registering user:', { ...userData, password: '[HIDDEN]' });
    
    if (!userData.email || !userData.password || !userData.name || !userData.company) {
      console.log('Missing required registration data');
      return false;
    }
    
    if (userData.password.length < 6) {
      console.log('Password too short');
      return false;
    }
    
    // Get existing users
    const existingUsersData = localStorage.getItem('5s_audit_registered_users');
    let existingUsers = [];
    
    if (existingUsersData) {
      try {
        existingUsers = JSON.parse(existingUsersData);
      } catch (error) {
        console.error('Error parsing existing users:', error);
        existingUsers = [];
      }
    }
    
    // Check if email already exists
    const emailExists = existingUsers.some((u: User) => u.email.toLowerCase() === userData.email.toLowerCase());
    if (emailExists) {
      console.log('Email already exists:', userData.email);
      return false;
    }
    
    // Create new user with hashed password
    const hashedPassword = hashPassword(userData.password);
    console.log('Creating user with hashed password:', hashedPassword);
    
    const newUser: User = {
      id: Date.now().toString(),
      email: userData.email.toLowerCase(),
      name: userData.name,
      role: userData.role,
      company: userData.company,
      password: hashedPassword
    };
    
    // Save to registered users list
    const updatedUsers = [...existingUsers, newUser];
    localStorage.setItem('5s_audit_registered_users', JSON.stringify(updatedUsers));
    
    console.log('User registered successfully:', { email: newUser.email, id: newUser.id });
    
    // Auto login after registration
    const { password: _, ...userWithoutPassword } = newUser;
    setUser(userWithoutPassword as User);
    setIsAuthenticated(true);
    localStorage.setItem('5s_audit_user', JSON.stringify(userWithoutPassword));
    
    return true;
  };

  const logout = () => {
    console.log('User logging out');
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
