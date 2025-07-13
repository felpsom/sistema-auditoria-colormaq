export interface Department {
  id: string;
  name: string;
  company: string;
  parentId?: string;
  description?: string;
  manager?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Position {
  id: string;
  title: string;
  level: number;
  departmentId: string;
  description?: string;
  responsibilities?: string[];
  requirements?: string[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Employee {
  id: string;
  name: string;
  email: string;
  phone?: string;
  departmentId: string;
  positionId: string;
  managerId?: string;
  role: 'admin' | 'auditor' | 'viewer' | 'manager';
  company: string;
  status: 'active' | 'inactive' | 'pending';
  hireDate?: Date;
  avatar?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface OrganizationChart {
  departments: Department[];
  positions: Position[];
  employees: Employee[];
}

export interface UserReport {
  totalEmployees: number;
  activeEmployees: number;
  departmentCount: number;
  positionCount: number;
  employeesByDepartment: { [departmentId: string]: number };
  employeesByPosition: { [positionId: string]: number };
  employeesByRole: { [role: string]: number };
  employeesByStatus: { [status: string]: number };
}