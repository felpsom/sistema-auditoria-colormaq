
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import MetricCard from './MetricCard';
import AuditChart from './AuditChart';
import RecentAudits from './RecentAudits';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, ClipboardCheck, TrendingUp, AlertTriangle, Target } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const Dashboard: React.FC = () => {
  const { user } = useAuth();

  // Mock data - in real app this would come from API
  const metrics = {
    totalAudits: 156,
    averageScore: 4.2,
    improvementTrend: 12.5,
    criticalIssues: 3
  };

  const categoryData = [
    { name: '1S - Classificar', score: 4.5, color: '#3b82f6' },
    { name: '2S - Organizar', score: 4.2, color: '#10b981' },
    { name: '3S - Limpar', score: 4.0, color: '#f59e0b' },
    { name: '4S - Padronizar', score: 3.8, color: '#ef4444' },
    { name: '5S - Disciplina', score: 4.1, color: '#8b5cf6' }
  ];

  const monthlyData = [
    { month: 'Jan', score: 3.8, audits: 12 },
    { month: 'Fev', score: 4.0, audits: 15 },
    { month: 'Mar', score: 4.1, audits: 18 },
    { month: 'Abr', score: 4.2, audits: 20 },
    { month: 'Mai', score: 4.2, audits: 22 },
    { month: 'Jun', score: 4.4, audits: 25 }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Dashboard 5S</h1>
            <p className="text-gray-600 mt-1">
              Bem-vindo, {user?.name} - {user?.company}
            </p>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="w-4 h-4 mr-2" />
            Nova Auditoria
          </Button>
        </div>

        {/* Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <MetricCard
            title="Total de Auditorias"
            value={metrics.totalAudits}
            change={15}
            changeLabel="este mês"
            icon={<ClipboardCheck className="w-5 h-5" />}
            color="blue"
          />
          <MetricCard
            title="Pontuação Média"
            value={`${metrics.averageScore}/5.0`}
            change={metrics.improvementTrend}
            changeLabel="de melhoria"
            icon={<Target className="w-5 h-5" />}
            color="green"
          />
          <MetricCard
            title="Tendência"
            value="+12.5%"
            change={8.3}
            changeLabel="vs trimestre anterior"
            icon={<TrendingUp className="w-5 h-5" />}
            color="yellow"
          />
          <MetricCard
            title="Questões Críticas"
            value={metrics.criticalIssues}
            change={-25}
            changeLabel="resolvidas este mês"
            icon={<AlertTriangle className="w-5 h-5" />}
            color="red"
          />
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Monthly Performance */}
          <Card>
            <CardHeader>
              <CardTitle>Performance Mensal</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis domain={[0, 5]} />
                  <Tooltip />
                  <Bar dataKey="score" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* 5S Categories Performance */}
          <Card>
            <CardHeader>
              <CardTitle>Performance por Categoria 5S</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={categoryData} layout="horizontal">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" domain={[0, 5]} />
                  <YAxis dataKey="name" type="category" width={120} />
                  <Tooltip />
                  <Bar dataKey="score" fill="#10b981" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Recent Audits */}
        <RecentAudits />
      </div>
    </div>
  );
};

export default Dashboard;
