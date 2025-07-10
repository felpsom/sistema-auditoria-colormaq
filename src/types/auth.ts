
export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'auditor' | 'viewer';
  company: string;
  password?: string;
}

export interface RegisterData {
  email: string;
  name: string;
  role: 'admin' | 'auditor' | 'viewer';
  company: string;
  password: string;
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (userData: RegisterData) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}
