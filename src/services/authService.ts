
import { User, RegisterData } from '@/types/auth';
import { hashPassword, verifyPassword } from '@/utils/authUtils';
import { getStorageItem, setStorageItem } from '@/utils/storageUtils';

export class AuthService {
  private static readonly USERS_KEY = '5s_audit_registered_users';
  private static readonly CURRENT_USER_KEY = '5s_audit_user';

  static async login(email: string, password: string): Promise<{ success: boolean; user?: User }> {
    console.log('Attempting login for:', email);
    
    if (!email || !password) {
      console.log('Email or password is empty');
      return { success: false };
    }
    
    const registeredUsers = getStorageItem(this.USERS_KEY, []);
    
    if (!Array.isArray(registeredUsers)) {
      console.log('Invalid registered users data');
      return { success: false };
    }
    
    console.log('Registered users:', registeredUsers);
    
    const foundUser = registeredUsers.find((u: User) => u.email.toLowerCase() === email.toLowerCase());
    
    if (!foundUser) {
      console.log('User not found with email:', email);
      return { success: false };
    }
    
    console.log('Found user:', { email: foundUser.email, hasPassword: !!foundUser.password });
    
    if (!foundUser.password) {
      console.log('User has no password stored');
      return { success: false };
    }
    
    if (!verifyPassword(password, foundUser.password)) {
      console.log('Invalid password for user:', email);
      return { success: false };
    }
    
    console.log('Login successful for:', email);
    
    // Remove password from user object before returning
    const { password: _, ...userWithoutPassword } = foundUser;
    setStorageItem(this.CURRENT_USER_KEY, userWithoutPassword);
    
    return { success: true, user: userWithoutPassword as User };
  }

  static async register(userData: RegisterData): Promise<{ success: boolean; user?: User }> {
    console.log('Registering user:', { ...userData, password: '[HIDDEN]' });
    
    if (!userData.email || !userData.password || !userData.name || !userData.company) {
      console.log('Missing required registration data');
      return { success: false };
    }
    
    if (userData.password.length < 6) {
      console.log('Password too short');
      return { success: false };
    }
    
    const existingUsers = getStorageItem(this.USERS_KEY, []);
    
    if (!Array.isArray(existingUsers)) {
      console.log('Invalid existing users data, resetting');
      setStorageItem(this.USERS_KEY, []);
    }
    
    const emailExists = existingUsers.some((u: User) => u.email.toLowerCase() === userData.email.toLowerCase());
    if (emailExists) {
      console.log('Email already exists:', userData.email);
      return { success: false };
    }
    
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
    
    const updatedUsers = [...existingUsers, newUser];
    setStorageItem(this.USERS_KEY, updatedUsers);
    
    console.log('User registered successfully:', { email: newUser.email, id: newUser.id });
    
    // Remove password from user object before returning
    const { password: _, ...userWithoutPassword } = newUser;
    setStorageItem(this.CURRENT_USER_KEY, userWithoutPassword);
    
    return { success: true, user: userWithoutPassword as User };
  }

  static getCurrentUser(): User | null {
    return getStorageItem(this.CURRENT_USER_KEY, null);
  }

  static logout(): void {
    console.log('User logging out');
    setStorageItem(this.CURRENT_USER_KEY, null);
  }
}
