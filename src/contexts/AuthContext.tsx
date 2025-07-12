
import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, RegisterData, AuthContextType } from '@/types/auth';
import { AuthService } from '@/services/authService';
import { useToast } from '@/hooks/use-toast';

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
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Check if user is logged in on app start
    try {
      const savedUser = AuthService.getCurrentUser();
      if (savedUser) {
        console.log('🔄 Restoring user session:', savedUser.email);
        setUser(savedUser);
        setIsAuthenticated(true);
      } else {
        console.log('🔄 No saved user session found');
      }
    } catch (error) {
      console.error('❌ Error restoring user session:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      console.log('🔐 Starting login process...');
      const result = await AuthService.login(email, password);
      
      if (result.success && result.user) {
        console.log('✅ Login successful, updating context');
        setUser(result.user);
        setIsAuthenticated(true);
        
        toast({
          title: "Login realizado com sucesso!",
          description: `Bem-vindo, ${result.user.name}`,
        });
        
        return true;
      } else {
        console.log('❌ Login failed:', result.error);
        
        toast({
          title: "Erro no login",
          description: result.error || "Credenciais inválidas",
          variant: "destructive",
        });
        
        return false;
      }
    } catch (error) {
      console.error('❌ Login error:', error);
      
      toast({
        title: "Erro no login",
        description: "Erro interno. Tente novamente.",
        variant: "destructive",
      });
      
      return false;
    }
  };

  const register = async (userData: RegisterData): Promise<boolean> => {
    try {
      console.log('📝 Starting registration process...');
      const result = await AuthService.register(userData);
      
      if (result.success && result.user) {
        console.log('✅ Registration successful, updating context');
        setUser(result.user);
        setIsAuthenticated(true);
        
        toast({
          title: "Conta criada com sucesso!",
          description: `Bem-vindo ao sistema, ${result.user.name}`,
        });
        
        return true;
      } else {
        console.log('❌ Registration failed:', result.error);
        
        toast({
          title: "Erro no cadastro",
          description: result.error || "Erro ao criar conta",
          variant: "destructive",
        });
        
        return false;
      }
    } catch (error) {
      console.error('❌ Registration error:', error);
      
      toast({
        title: "Erro no cadastro",
        description: "Erro interno. Tente novamente.",
        variant: "destructive",
      });
      
      return false;
    }
  };

  const logout = () => {
    try {
      console.log('👋 Starting logout process...');
      AuthService.logout();
      setUser(null);
      setIsAuthenticated(false);
      
      toast({
        title: "Logout realizado",
        description: "Você foi desconectado com sucesso",
      });
      
      console.log('✅ Logout successful');
    } catch (error) {
      console.error('❌ Logout error:', error);
    }
  };

  const value: AuthContextType = {
    user,
    login,
    register,
    logout,
    isAuthenticated,
    isLoading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
