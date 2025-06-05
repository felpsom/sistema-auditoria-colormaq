
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import MetricCard from './MetricCard';
import AuditChart from './AuditChart';
import RecentAudits from './RecentAudits';
import SectorMetrics from './SectorMetrics';
import AreaMetrics from './AreaMetrics';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, ClipboardCheck, TrendingUp, AlertTriangle, Target } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

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
    <div className="min-h-screen bg-gray-50 p-3 md:p-6">
      <div className="max-w-7xl mx-auto space-y-4 md:space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-3 sm:space-y-0">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Dashboard Colormaq</h1>
            <p className="text-gray-600 mt-1 text-sm md:text-base">
              Bem-vindo, {user?.name}
              <span className="hidden sm:inline"> - {user?.company}</span>
            </p>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700 w-full sm:w-auto">
            <Plus className="w-4 h-4 mr-2" />
            <span className="hidden sm:inline">Nova Auditoria</span>
            <span className="sm:hidden">Nova</span>
          </Button>
        </div>

        {/* Metrics Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
          <MetricCard
            title="Total de Auditorias"
            value={metrics.totalAudits}
            change={15}
            changeLabel="este mês"
            icon={<ClipboardCheck className="w-4 h-4 md:w-5 md:h-5" />}
            color="blue"
          />
          <MetricCard
            title="Pontuação Média"
            value={`${metrics.averageScore}/5.0`}
            change={metrics.improvementTrend}
            changeLabel="de melhoria"
            icon={<Target className="w-4 h-4 md:w-5 md:h-5" />}
            color="green"
          />
          <MetricCard
            title="Tendência"
            value="+12.5%"
            change={8.3}
            changeLabel="vs trimestre anterior"
            icon={<TrendingUp className="w-4 h-4 md:w-5 md:h-5" />}
            color="yellow"
          />
          <MetricCard
            title="Questões Críticas"
            value={metrics.criticalIssues}
            change={-25}
            changeLabel="resolvidas este mês"
            icon={<AlertTriangle className="w-4 h-4 md:w-5 md:h-5" />}
            color="red"
          />
        </div>

        {/* Tabs para diferentes visualizações */}
        <Tabs defaultValue="overview" className="space-y-4 md:space-y-6">
          <TabsList className="grid w-full grid-cols-3 h-auto">
            <TabsTrigger value="overview" className="text-xs md:text-sm px-2 py-2">
              <span className="hidden sm:inline">Visão Geral</span>
              <span className="sm:hidden">Geral</span>
            </TabsTrigger>
            <TabsTrigger value="sectors" className="text-xs md:text-sm px-2 py-2">
              <span className="hidden sm:inline">Por Setor</span>
              <span className="sm:hidden">Setores</span>
            </TabsTrigger>
            <TabsTrigger value="areas" className="text-xs md:text-sm px-2 py-2">
              <span className="hidden sm:inline">Por Área</span>
              <span className="sm:hidden">Áreas</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4 md:space-y-6">
            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
              {/* Monthly Performance */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base md:text-lg">Performance Mensal</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={monthlyData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                      <YAxis domain={[0, 5]} tick={{ fontSize: 12 }} />
                      <Tooltip />
                      <Bar dataKey="score" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* 5S Categories Performance */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base md:text-lg">Performance por Categoria 5S</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={categoryData} layout="horizontal">
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" domain={[0, 5]} tick={{ fontSize: 12 }} />
                      <YAxis dataKey="name" type="category" width={80} tick={{ fontSize: 10 }} />
                      <Tooltip />
                      <Bar dataKey="score" fill="#10b981" radius={[0, 4, 4, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* Recent Audits */}
            <RecentAudits />
          </TabsContent>

          <TabsContent value="sectors">
            <SectorMetrics />
          </TabsContent>

          <TabsContent value="areas">
            <AreaMetrics />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;
