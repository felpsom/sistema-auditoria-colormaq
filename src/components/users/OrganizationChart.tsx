import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Building, 
  Users, 
  User, 
  Crown,
  ChevronDown,
  ChevronRight,
  Expand
} from 'lucide-react';
import { Employee, Department, Position } from '@/types/users';

// Mock data expandido
const mockEmployees: Employee[] = [
  {
    id: '1',
    name: 'João Silva',
    email: 'joao.silva@company.com',
    departmentId: 'dep1',
    positionId: 'pos1',
    role: 'admin',
    company: 'COLORMAQ',
    status: 'active',
  },
  {
    id: '2',
    name: 'Maria Santos',
    email: 'maria.santos@company.com',
    departmentId: 'dep2',
    positionId: 'pos2',
    managerId: '1',
    role: 'manager',
    company: 'COLORMAQ',
    status: 'active',
  },
  {
    id: '3',
    name: 'Pedro Costa',
    email: 'pedro.costa@company.com',
    departmentId: 'dep1',
    positionId: 'pos3',
    managerId: '1',
    role: 'auditor',
    company: 'COLORMAQ',
    status: 'active',
  },
  {
    id: '4',
    name: 'Ana Lima',
    email: 'ana.lima@company.com',
    departmentId: 'dep2',
    positionId: 'pos4',
    managerId: '2',
    role: 'auditor',
    company: 'COLORMAQ',
    status: 'active',
  },
  {
    id: '5',
    name: 'Carlos Oliveira',
    email: 'carlos.oliveira@company.com',
    departmentId: 'dep3',
    positionId: 'pos5',
    managerId: '1',
    role: 'viewer',
    company: 'COLORMAQ',
    status: 'active',
  },
];

const mockDepartments: Department[] = [
  { id: 'dep1', name: 'Produção', company: 'COLORMAQ' },
  { id: 'dep2', name: 'Qualidade', company: 'COLORMAQ' },
  { id: 'dep3', name: 'Administração', company: 'COLORMAQ' },
];

const mockPositions: Position[] = [
  { id: 'pos1', title: 'Diretor', level: 1, departmentId: 'dep1' },
  { id: 'pos2', title: 'Gerente de Qualidade', level: 2, departmentId: 'dep2' },
  { id: 'pos3', title: 'Supervisor de Produção', level: 3, departmentId: 'dep1' },
  { id: 'pos4', title: 'Analista de Qualidade', level: 4, departmentId: 'dep2' },
  { id: 'pos5', title: 'Assistente Administrativo', level: 4, departmentId: 'dep3' },
];

const OrganizationChart: React.FC = () => {
  const [employees] = useState<Employee[]>(mockEmployees);
  const [departments] = useState<Department[]>(mockDepartments);
  const [positions] = useState<Position[]>(mockPositions);
  const [selectedDepartment, setSelectedDepartment] = useState<string>('all');
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set(['1']));

  const getDepartmentName = (departmentId: string) => {
    return departments.find(d => d.id === departmentId)?.name || 'N/A';
  };

  const getPositionTitle = (positionId: string) => {
    return positions.find(p => p.id === positionId)?.title || 'N/A';
  };

  const getSubordinates = (managerId: string) => {
    return employees.filter(emp => emp.managerId === managerId);
  };

  const getTopLevelEmployees = () => {
    return employees.filter(emp => !emp.managerId);
  };

  const filteredEmployees = selectedDepartment === 'all' 
    ? employees 
    : employees.filter(emp => emp.departmentId === selectedDepartment);

  const toggleNode = (employeeId: string) => {
    const newExpanded = new Set(expandedNodes);
    if (newExpanded.has(employeeId)) {
      newExpanded.delete(employeeId);
    } else {
      newExpanded.add(employeeId);
    }
    setExpandedNodes(newExpanded);
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'admin':
        return 'bg-red-100 text-red-800';
      case 'manager':
        return 'bg-blue-100 text-blue-800';
      case 'auditor':
        return 'bg-purple-100 text-purple-800';
      case 'viewer':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const EmployeeNode: React.FC<{ 
    employee: Employee; 
    level: number; 
    isLast?: boolean 
  }> = ({ employee, level, isLast = false }) => {
    const subordinates = getSubordinates(employee.id).filter(emp => 
      selectedDepartment === 'all' || emp.departmentId === selectedDepartment
    );
    const hasSubordinates = subordinates.length > 0;
    const isExpanded = expandedNodes.has(employee.id);

    return (
      <div className="relative">
        {/* Connecting lines */}
        {level > 0 && (
          <div className="absolute left-6 top-0 w-px h-6 bg-border"></div>
        )}
        {level > 0 && (
          <div className="absolute left-6 top-6 w-6 h-px bg-border"></div>
        )}

        <div className={`flex items-center gap-3 p-3 rounded-lg border bg-card hover:shadow-md transition-all ${level > 0 ? 'ml-12' : ''}`}>
          {/* Expand/Collapse button */}
          {hasSubordinates && (
            <Button
              variant="ghost"
              size="sm"
              className="h-6 w-6 p-0"
              onClick={() => toggleNode(employee.id)}
            >
              {isExpanded ? (
                <ChevronDown className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )}
            </Button>
          )}
          {!hasSubordinates && <div className="w-6" />}

          {/* Employee info */}
          <Avatar className="h-10 w-10">
            <AvatarImage src={employee.avatar} />
            <AvatarFallback>
              {employee.name.split(' ').map(n => n[0]).join('').toUpperCase()}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h4 className="font-medium">{employee.name}</h4>
              {employee.role === 'admin' && <Crown className="w-4 h-4 text-yellow-500" />}
            </div>
            <p className="text-sm text-muted-foreground">{getPositionTitle(employee.positionId)}</p>
            <p className="text-xs text-muted-foreground">{getDepartmentName(employee.departmentId)}</p>
          </div>

          <div className="flex flex-col items-end gap-1">
            <Badge className={getRoleBadgeColor(employee.role)}>
              {employee.role}
            </Badge>
            {hasSubordinates && (
              <Badge variant="outline" className="text-xs">
                <Users className="w-3 h-3 mr-1" />
                {subordinates.length}
              </Badge>
            )}
          </div>
        </div>

        {/* Subordinates */}
        {hasSubordinates && isExpanded && (
          <div className="mt-2 space-y-2">
            {subordinates.map((subordinate, index) => (
              <EmployeeNode
                key={subordinate.id}
                employee={subordinate}
                level={level + 1}
                isLast={index === subordinates.length - 1}
              />
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Controles */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building className="w-5 h-5" />
            Organograma da Empresa
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="flex items-center gap-4">
              <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Filtrar por departamento" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os Departamentos</SelectItem>
                  {departments.map((dept) => (
                    <SelectItem key={dept.id} value={dept.id}>
                      {dept.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setExpandedNodes(new Set(employees.map(emp => emp.id)))}
              >
                <Expand className="w-4 h-4 mr-2" />
                Expandir Tudo
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setExpandedNodes(new Set())}
              >
                Recolher Tudo
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Estatísticas Rápidas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total de Funcionários</p>
                <p className="text-2xl font-bold">{filteredEmployees.length}</p>
              </div>
              <Users className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Gerentes</p>
                <p className="text-2xl font-bold">
                  {filteredEmployees.filter(emp => emp.role === 'manager' || emp.role === 'admin').length}
                </p>
              </div>
              <Crown className="w-8 h-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Níveis Hierárquicos</p>
                <p className="text-2xl font-bold">4</p>
              </div>
              <Building className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Organograma */}
      <Card>
        <CardHeader>
          <CardTitle>Estrutura Hierárquica</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {getTopLevelEmployees()
              .filter(emp => selectedDepartment === 'all' || emp.departmentId === selectedDepartment)
              .map((employee) => (
                <EmployeeNode
                  key={employee.id}
                  employee={employee}
                  level={0}
                />
              ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OrganizationChart;