import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Building, 
  Users, 
  Edit, 
  Trash2, 
  MoreHorizontal,
  Plus,
  ChevronRight
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Department } from '@/types/users';

// Mock data
const mockDepartments: Department[] = [
  {
    id: 'dep1',
    name: 'Produção',
    company: 'COLORMAQ',
    description: 'Responsável pela produção de equipamentos',
    manager: 'João Silva',
  },
  {
    id: 'dep2',
    name: 'Qualidade',
    company: 'COLORMAQ',
    description: 'Controle de qualidade e auditorias',
    manager: 'Maria Santos',
  },
  {
    id: 'dep3',
    name: 'Administração',
    company: 'COLORMAQ',
    parentId: 'dep1',
    description: 'Gestão administrativa e recursos humanos',
    manager: 'Carlos Lima',
  },
  {
    id: 'dep4',
    name: 'Manutenção',
    company: 'COLORMAQ',
    parentId: 'dep1',
    description: 'Manutenção preventiva e corretiva',
    manager: 'Ana Costa',
  },
];

const employeeCount = {
  'dep1': 15,
  'dep2': 8,
  'dep3': 12,
  'dep4': 6,
};

const DepartmentManager: React.FC = () => {
  const [departments] = useState<Department[]>(mockDepartments);

  const getParentDepartments = () => {
    return departments.filter(dept => !dept.parentId);
  };

  const getSubDepartments = (parentId: string) => {
    return departments.filter(dept => dept.parentId === parentId);
  };

  const DepartmentCard: React.FC<{ department: Department; isSubDepartment?: boolean }> = ({ 
    department, 
    isSubDepartment = false 
  }) => (
    <Card className={`transition-all hover:shadow-md ${isSubDepartment ? 'ml-6 border-l-4 border-l-primary/20' : ''}`}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${isSubDepartment ? 'bg-primary/10' : 'bg-primary/20'}`}>
              <Building className={`w-5 h-5 ${isSubDepartment ? 'text-primary/70' : 'text-primary'}`} />
            </div>
            <div>
              <CardTitle className="text-lg">{department.name}</CardTitle>
              {department.manager && (
                <p className="text-sm text-muted-foreground">Gerente: {department.manager}</p>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="flex items-center gap-1">
              <Users className="w-3 h-3" />
              {employeeCount[department.id] || 0} funcionários
            </Badge>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <Edit className="mr-2 h-4 w-4" />
                  Editar
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Plus className="mr-2 h-4 w-4" />
                  Adicionar Subdepartamento
                </DropdownMenuItem>
                <DropdownMenuItem className="text-destructive">
                  <Trash2 className="mr-2 h-4 w-4" />
                  Remover
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardHeader>
      {department.description && (
        <CardContent className="pt-0">
          <p className="text-sm text-muted-foreground">{department.description}</p>
        </CardContent>
      )}
    </Card>
  );

  return (
    <div className="space-y-6">
      {/* Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total de Departamentos</p>
                <p className="text-2xl font-bold">{departments.length}</p>
              </div>
              <Building className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Departamentos Principais</p>
                <p className="text-2xl font-bold">{getParentDepartments().length}</p>
              </div>
              <Building className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Subdepartamentos</p>
                <p className="text-2xl font-bold">
                  {departments.filter(dept => dept.parentId).length}
                </p>
              </div>
              <ChevronRight className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total de Funcionários</p>
                <p className="text-2xl font-bold">
                  {Object.values(employeeCount).reduce((sum, count) => sum + count, 0)}
                </p>
              </div>
              <Users className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Lista de Departamentos */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Estrutura Organizacional</h3>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Novo Departamento
          </Button>
        </div>

        {getParentDepartments().map((department) => (
          <div key={department.id} className="space-y-3">
            <DepartmentCard department={department} />
            {getSubDepartments(department.id).map((subDept) => (
              <DepartmentCard 
                key={subDept.id} 
                department={subDept} 
                isSubDepartment={true} 
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DepartmentManager;