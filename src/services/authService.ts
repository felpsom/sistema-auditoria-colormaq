
import { User, RegisterData } from '@/types/auth';
import { hashPassword, verifyPassword } from '@/utils/authUtils';
import { getStorageItem, setStorageItem } from '@/utils/storageUtils';

export class AuthService {
  private static readonly USERS_KEY = '5s_audit_registered_users';
  private static readonly CURRENT_USER_KEY = '5s_audit_user';

  static async login(email: string, password: string): Promise<{ success: boolean; user?: User; error?: string }> {
    console.log('🔐 Attempting login for:', email);
    
    // Validate input
    if (!email || !password) {
      console.log('❌ Email or password is empty');
      return { success: false, error: 'Email e senha são obrigatórios' };
    }

    if (!email.includes('@')) {
      console.log('❌ Invalid email format');
      return { success: false, error: 'Formato de email inválido' };
    }
    
    try {
      const registeredUsers = getStorageItem(this.USERS_KEY, []);
      
      if (!Array.isArray(registeredUsers)) {
        console.log('❌ Invalid registered users data, resetting');
        setStorageItem(this.USERS_KEY, []);
        return { success: false, error: 'Erro interno. Tente novamente.' };
      }
      
      console.log('📋 Checking against', registeredUsers.length, 'registered users');
      
      const foundUser = registeredUsers.find((u: User) => 
        u.email.toLowerCase().trim() === email.toLowerCase().trim()
      );
      
      if (!foundUser) {
        console.log('❌ User not found with email:', email);
        return { success: false, error: 'Usuário não encontrado. Verifique o email ou cadastre-se.' };
      }
      
      console.log('✅ Found user:', { email: foundUser.email, hasPassword: !!foundUser.password });
      
      if (!foundUser.password) {
        console.log('❌ User has no password stored');
        return { success: false, error: 'Erro na conta do usuário. Entre em contato com o suporte.' };
      }
      
      if (!verifyPassword(password, foundUser.password)) {
        console.log('❌ Invalid password for user:', email);
        return { success: false, error: 'Senha incorreta. Tente novamente.' };
      }
      
      console.log('🎉 Login successful for:', email);
      
      // Remove password from user object before storing
      const { password: _, ...userWithoutPassword } = foundUser;
      setStorageItem(this.CURRENT_USER_KEY, userWithoutPassword);
      
      return { success: true, user: userWithoutPassword as User };
    } catch (error) {
      console.error('❌ Login error:', error);
      return { success: false, error: 'Erro interno. Tente novamente mais tarde.' };
    }
  }

  static async register(userData: RegisterData): Promise<{ success: boolean; user?: User; error?: string }> {
    console.log('📝 Registering user:', { ...userData, password: '[HIDDEN]' });
    
    // Validate required fields
    if (!userData.email || !userData.password || !userData.name || !userData.company) {
      console.log('❌ Missing required registration data');
      return { success: false, error: 'Todos os campos são obrigatórios' };
    }

    // Validate email format
    if (!userData.email.includes('@')) {
      console.log('❌ Invalid email format');
      return { success: false, error: 'Formato de email inválido' };
    }
    
    // Validate password strength
    if (userData.password.length < 6) {
      console.log('❌ Password too short');
      return { success: false, error: 'A senha deve ter pelo menos 6 caracteres' };
    }

    // Validate name
    if (userData.name.trim().length < 2) {
      console.log('❌ Name too short');
      return { success: false, error: 'Nome deve ter pelo menos 2 caracteres' };
    }

    // Validate company
    if (userData.company.trim().length < 2) {
      console.log('❌ Company name too short');
      return { success: false, error: 'Nome da empresa deve ter pelo menos 2 caracteres' };
    }
    
    try {
      const existingUsers = getStorageItem(this.USERS_KEY, []);
      
      if (!Array.isArray(existingUsers)) {
        console.log('❌ Invalid existing users data, resetting');
        setStorageItem(this.USERS_KEY, []);
      }
      
      // Check if email already exists
      const emailExists = existingUsers.some((u: User) => 
        u.email.toLowerCase().trim() === userData.email.toLowerCase().trim()
      );
      
      if (emailExists) {
        console.log('❌ Email already exists:', userData.email);
        return { success: false, error: 'Este email já está cadastrado. Faça login ou use outro email.' };
      }
      
      const hashedPassword = hashPassword(userData.password);
      console.log('🔒 Creating user with hashed password');
      
      const newUser: User = {
        id: `user_${Date.now()}_${Math.random().toString(36).substring(2)}`,
        email: userData.email.toLowerCase().trim(),
        name: userData.name.trim(),
        role: userData.role,
        company: userData.company.trim(),
        password: hashedPassword
      };
      
      const updatedUsers = [...existingUsers, newUser];
      const saveSuccess = setStorageItem(this.USERS_KEY, updatedUsers);
      
      if (!saveSuccess) {
        console.log('❌ Failed to save user data');
        return { success: false, error: 'Erro ao salvar dados. Tente novamente.' };
      }
      
      console.log('🎉 User registered successfully:', { email: newUser.email, id: newUser.id });
      
      // Remove password from user object before storing current user
      const { password: _, ...userWithoutPassword } = newUser;
      setStorageItem(this.CURRENT_USER_KEY, userWithoutPassword);
      
      return { success: true, user: userWithoutPassword as User };
    } catch (error) {
      console.error('❌ Registration error:', error);
      return { success: false, error: 'Erro interno. Tente novamente mais tarde.' };
    }
  }

  static getCurrentUser(): User | null {
    try {
      const user = getStorageItem(this.CURRENT_USER_KEY, null);
      console.log('👤 Getting current user:', user ? { email: user.email, id: user.id } : 'none');
      return user;
    } catch (error) {
      console.error('❌ Error getting current user:', error);
      return null;
    }
  }

  static logout(): void {
    console.log('👋 User logging out');
    setStorageItem(this.CURRENT_USER_KEY, null);
  }

  static getAllUsers(): User[] {
    try {
      const users = getStorageItem(this.USERS_KEY, []);
      return Array.isArray(users) ? users.map(({ password, ...user }) => user) : [];
    } catch (error) {
      console.error('❌ Error getting all users:', error);
      return [];
    }
  }

  static resetPassword(email: string, newPassword: string): Promise<{ success: boolean; error?: string }> {
    return new Promise((resolve) => {
      try {
        const users = getStorageItem(this.USERS_KEY, []);
        const userIndex = users.findIndex((u: User) => u.email.toLowerCase() === email.toLowerCase());
        
        if (userIndex === -1) {
          resolve({ success: false, error: 'Usuário não encontrado' });
          return;
        }

        users[userIndex].password = hashPassword(newPassword);
        setStorageItem(this.USERS_KEY, users);
        
        resolve({ success: true });
      } catch (error) {
        console.error('❌ Reset password error:', error);
        resolve({ success: false, error: 'Erro interno' });
      }
    });
  }
}
