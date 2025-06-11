
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useAudit } from '@/contexts/AuditContext';
import MetricCard from './MetricCard';
import RecentAudits from './RecentAudits';
import SectorMetrics from './SectorMetrics';
import AreaMetrics from './AreaMetrics';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, ClipboardCheck, TrendingUp, AlertTriangle, Target } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Link } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const { audits, getUserAudits } = useAudit();

  // Get user's audits
  const userAudits = getUserAudits();
  
  // Calculate real metrics from user's audits
  const totalAudits = userAudits.length;
  const completedAudits = userAudits.filter(audit => audit.status === 'completed');
  const averageScore = completedAudits.length > 0 
    ? (completedAudits.reduce((sum, audit) => sum + audit.percentageScore, 0) / completedAudits.length / 20) // Convert to 5.0 scale
    : 0;
  
  // Calculate critical issues (audits with score below 60%)
  const criticalIssues = completedAudits.filter(audit => audit.percentageScore < 60).length;
  
  // Calculate improvement trend (compare last month vs previous month)
  const now = new Date();
  const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1);
  const previousMonth = new Date(now.getFullYear(), now.getMonth() - 2);
  
  const lastMonthAudits = completedAudits.filter(audit => {
    const auditDate = new Date(audit.date);
    return auditDate >= lastMonth && auditDate <= now;
  });
  
  const previousMonthAudits = completedAudits.filter(audit => {
    const auditDate = new Date(audit.date);
    return auditDate >= previousMonth && auditDate < lastMonth;
  });
  
  const lastMonthAvg = lastMonthAudits.length > 0 
    ? lastMonthAudits.reduce((sum, audit) => sum + audit.percentageScore, 0) / lastMonthAudits.length
    : 0;
  
  const previousMonthAvg = previousMonthAudits.length > 0 
    ? previousMonthAudits.reduce((sum, audit) => sum + audit.percentageScore, 0) / previousMonthAudits.length
    : 0;
  
  const improvementTrend = previousMonthAvg > 0 
    ? ((lastMonthAvg - previousMonthAvg) / previousMonthAvg) * 100
    : 0;

  const categoryData = [
    { name: '1S - Classificar', score: 4.5, color: '#3b82f6' },
    { name: '2S - Organizar', score: 4.2, color: '#10b981' },
    { name: '3S - Limpar', score: 4.0, color: '#f59e0b' },
    { name: '4S - Padronizar', score: 3.8, color: '#ef4444' },
    { name: '5S - Disciplina', score: 4.1, color: '#8b5cf6' }
  ];

  const monthlyData = [
    { month: 'Jan', score: 3.8, audits: lastMonthAudits.length },
    { month: 'Fev', score: 4.0, audits: 15 },
    { month: 'Mar', score: 4.1, audits: 18 },
    { month: 'Abr', score: 4.2, audits: 20 },
    { month: 'Mai', score: 4.2, audits: 22 },
    { month: 'Jun', score: averageScore, audits: totalAudits }
  ];

  // Generate company name using first name
  const firstName = user?.name.split(' ')[0] || 'Usuário';
  const companyName = user?.company || `${firstName} Industrial`;

  return (
    <div className="w-full max-w-7xl mx-auto space-y-4 md:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-3 sm:space-y-0">
        <div className="min-w-0 flex-1">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 truncate">Dashboard {companyName}</h1>
          <p className="text-gray-600 mt-1 text-sm md:text-base truncate">
            Bem-vindo, {user?.name}
            <span className="hidden sm:inline"> - {companyName}</span>
          </p>
        </div>
        <Link to="/audit/new">
          <Button className="bg-blue-600 hover:bg-blue-700 w-full sm:w-auto flex-shrink-0">
            <Plus className="w-4 h-4 mr-2" />
            <span className="hidden sm:inline">Nova Auditoria</span>
            <span className="sm:hidden">Nova</span>
          </Button>
        </Link>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
        <MetricCard
          title="Total de Auditorias"
          value={totalAudits}
          change={lastMonthAudits.length}
          changeLabel="este mês"
          icon={<ClipboardCheck className="w-4 h-4 md:w-5 md:h-5" />}
          color="blue"
        />
        <MetricCard
          title="Pontuação Média"
          value={`${averageScore.toFixed(1)}/5.0`}
          change={improvementTrend}
          changeLabel="de melhoria"
          icon={<Target className="w-4 h-4 md:w-5 md:h-5" />}
          color="green"
        />
        <MetricCard
          title="Tendência"
          value={`${improvementTrend >= 0 ? '+' : ''}${improvementTrend.toFixed(1)}%`}
          change={improvementTrend}
          changeLabel="vs mês anterior"
          icon={<TrendingUp className="w-4 h-4 md:w-5 md:h-5" />}
          color="yellow"
        />
        <MetricCard
          title="Questões Críticas"
          value={criticalIssues}
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
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 md:gap-6">
            {/* Monthly Performance */}
            <Card className="w-full">
              <CardHeader className="pb-3">
                <CardTitle className="text-base md:text-lg">Performance Mensal</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="w-full h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={monthlyData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                      <YAxis domain={[0, 5]} tick={{ fontSize: 12 }} />
                      <Tooltip />
                      <Bar dataKey="score" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* 5S Categories Performance */}
            <Card className="w-full">
              <CardHeader className="pb-3">
                <CardTitle className="text-base md:text-lg">Performance por Categoria 5S</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="w-full h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={categoryData} layout="horizontal">
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" domain={[0, 5]} tick={{ fontSize: 12 }} />
                      <YAxis dataKey="name" type="category" width={80} tick={{ fontSize: 10 }} />
                      <Tooltip />
                      <Bar dataKey="score" fill="#10b981" radius={[0, 4, 4, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
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
  );
};

export default Dashboard;
