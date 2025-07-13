import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Plus, Users, Building, FileText } from 'lucide-react';
import EmployeeList from '@/components/users/EmployeeList';
import DepartmentManager from '@/components/users/DepartmentManager';
import OrganizationChart from '@/components/users/OrganizationChart';
import UserReports from '@/components/users/UserReports';
import AddEmployeeDialog from '@/components/users/AddEmployeeDialog';
import AddDepartmentDialog from '@/components/users/AddDepartmentDialog';

const UsersPage: React.FC = () => {
  const [isAddEmployeeOpen, setIsAddEmployeeOpen] = useState(false);
  const [isAddDepartmentOpen, setIsAddDepartmentOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('employees');

  return (
    <div className="w-full max-w-7xl mx-auto space-y-6 p-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Gestão de Pessoas</h1>
          <p className="text-muted-foreground">Gerencie funcionários, departamentos e visualize relatórios organizacionais</p>
        </div>
        <div className="flex gap-2">
          <Button 
            onClick={() => setIsAddDepartmentOpen(true)}
            variant="outline"
            className="flex items-center gap-2"
          >
            <Building className="w-4 h-4" />
            Novo Departamento
          </Button>
          <Button 
            onClick={() => setIsAddEmployeeOpen(true)}
            className="flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Novo Funcionário
          </Button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="employees" className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            Funcionários
          </TabsTrigger>
          <TabsTrigger value="departments" className="flex items-center gap-2">
            <Building className="w-4 h-4" />
            Departamentos
          </TabsTrigger>
          <TabsTrigger value="chart" className="flex items-center gap-2">
            <FileText className="w-4 h-4" />
            Organograma
          </TabsTrigger>
          <TabsTrigger value="reports" className="flex items-center gap-2">
            <FileText className="w-4 h-4" />
            Relatórios
          </TabsTrigger>
        </TabsList>

        <TabsContent value="employees" className="space-y-6">
          <EmployeeList />
        </TabsContent>

        <TabsContent value="departments" className="space-y-6">
          <DepartmentManager />
        </TabsContent>

        <TabsContent value="chart" className="space-y-6">
          <OrganizationChart />
        </TabsContent>

        <TabsContent value="reports" className="space-y-6">
          <UserReports />
        </TabsContent>
      </Tabs>

      {/* Dialogs */}
      <AddEmployeeDialog 
        open={isAddEmployeeOpen} 
        onOpenChange={setIsAddEmployeeOpen} 
      />
      <AddDepartmentDialog 
        open={isAddDepartmentOpen} 
        onOpenChange={setIsAddDepartmentOpen} 
      />
    </div>
  );
};

export default UsersPage;