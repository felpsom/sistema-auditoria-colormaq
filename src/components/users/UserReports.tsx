import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { 
  FileText, 
  Download, 
  Users, 
  Building, 
  TrendingUp,
  UserCheck,
  UserX,
  Clock
} from 'lucide-react';

// Mock data para relatórios
const departmentData = [
  { name: 'Produção', employees: 15, managers: 2, active: 14, inactive: 1 },
  { name: 'Qualidade', employees: 8, managers: 1, active: 8, inactive: 0 },
  { name: 'Administração', employees: 12, managers: 1, active: 11, inactive: 1 },
  { name: 'Manutenção', employees: 6, managers: 1, active: 6, inactive: 0 },
];

const roleData = [
  { name: 'Administrador', value: 2, color: '#ef4444' },
  { name: 'Gerente', value: 5, color: '#3b82f6' },
  { name: 'Auditor', value: 18, color: '#8b5cf6' },
  { name: 'Visualizador', value: 16, color: '#6b7280' },
];

const statusData = [
  { name: 'Ativo', value: 39, color: '#10b981' },
  { name: 'Inativo', value: 2, color: '#ef4444' },
  { name: 'Pendente', value: 0, color: '#f59e0b' },
];

const monthlyHiringData = [
  { month: 'Jan', hired: 3, terminated: 0 },
  { month: 'Fev', hired: 2, terminated: 1 },
  { month: 'Mar', hired: 5, terminated: 0 },
  { month: 'Abr', hired: 1, terminated: 2 },
  { month: 'Mai', hired: 4, terminated: 0 },
  { month: 'Jun', hired: 2, terminated: 1 },
];

const UserReports: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('current');
  const [selectedDepartment, setSelectedDepartment] = useState('all');

  const exportReport = (type: string) => {
    console.log(`Exportando relatório: ${type}`);
    // Aqui implementaria a lógica de exportação
  };

  return (
    <div className="space-y-6">
      {/* Controles de Filtro */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Relatórios de Recursos Humanos
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Período" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="current">Atual</SelectItem>
                <SelectItem value="last_month">Último Mês</SelectItem>
                <SelectItem value="last_quarter">Último Trimestre</SelectItem>
                <SelectItem value="last_year">Último Ano</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Departamento" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os Departamentos</SelectItem>
                <SelectItem value="dep1">Produção</SelectItem>
                <SelectItem value="dep2">Qualidade</SelectItem>
                <SelectItem value="dep3">Administração</SelectItem>
                <SelectItem value="dep4">Manutenção</SelectItem>
              </SelectContent>
            </Select>
            
            <Button variant="outline" onClick={() => exportReport('general')}>
              <Download className="w-4 h-4 mr-2" />
              Exportar PDF
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* KPIs Principais */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total de Funcionários</p>
                <p className="text-2xl font-bold">41</p>
                <p className="text-xs text-muted-foreground mt-1">+5% vs mês anterior</p>
              </div>
              <Users className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Taxa de Retenção</p>
                <p className="text-2xl font-bold">95.1%</p>
                <p className="text-xs text-green-600 mt-1">+2.1% vs mês anterior</p>
              </div>
              <UserCheck className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Funcionários Inativos</p>
                <p className="text-2xl font-bold">2</p>
                <p className="text-xs text-red-600 mt-1">-1 vs mês anterior</p>
              </div>
              <UserX className="w-8 h-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Tempo Médio na Empresa</p>
                <p className="text-2xl font-bold">2.3</p>
                <p className="text-xs text-muted-foreground mt-1">anos</p>
              </div>
              <Clock className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Relatórios em Abas */}
      <Tabs defaultValue="departments" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="departments">Por Departamento</TabsTrigger>
          <TabsTrigger value="roles">Por Função</TabsTrigger>
          <TabsTrigger value="status">Por Status</TabsTrigger>
          <TabsTrigger value="trends">Tendências</TabsTrigger>
        </TabsList>

        <TabsContent value="departments" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Funcionários por Departamento</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={departmentData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="employees" fill="#3b82f6" name="Total" />
                  <Bar dataKey="active" fill="#10b981" name="Ativos" />
                  <Bar dataKey="managers" fill="#8b5cf6" name="Gerentes" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="roles" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Distribuição por Função</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={roleData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {roleData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="status" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Status dos Funcionários</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={statusData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {statusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trends" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Tendências de Contratação/Desligamento</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={monthlyHiringData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="hired" fill="#10b981" name="Contratações" />
                  <Bar dataKey="terminated" fill="#ef4444" name="Desligamentos" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UserReports;