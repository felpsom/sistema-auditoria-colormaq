
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import MetricCard from './MetricCard';
import RecentAudits from './RecentAudits';
import SectorMetrics from './SectorMetrics';
import AreaMetrics from './AreaMetrics';
import RankingSetorial from './RankingSetorial';
import EvolutionChart from './EvolutionChart';
import AreaDestaque from './AreaDestaque';
import RadarChart5S from './RadarChart5S';
import ComponentMetrics from './ComponentMetrics';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, ClipboardCheck, TrendingUp, AlertTriangle, Target, Trophy, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useDashboardMetrics } from '@/hooks/useDashboardMetrics';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const metrics = useDashboardMetrics();

  return (
    <div className="w-full max-w-7xl mx-auto space-y-6">
      {/* Enhanced Header Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg p-6 text-white shadow-lg">
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center space-y-4 lg:space-y-0">
          <div className="flex-1">
            <h1 className="text-3xl lg:text-4xl font-bold mb-2">
              SISTEMA DE AUDITORIA 5S | {user?.company || 'COLORMAQ'}
            </h1>
            <div className="flex items-center space-x-4 text-blue-100">
              <div className="flex items-center space-x-2">
                <User className="w-4 h-4" />
                <span className="font-medium">{user?.name}</span>
              </div>
              <div className="hidden sm:block w-px h-4 bg-blue-300"></div>
              <span className="text-sm">{user?.role === 'admin' ? 'Administrador' : 'Auditor'}</span>
              <div className="hidden sm:block w-px h-4 bg-blue-300"></div>
              <span className="text-sm">Semana {new Date().getWeek()}/{new Date().getFullYear()}</span>
            </div>
          </div>
          <Link to="/audit/new">
            <Button className="bg-white text-blue-600 hover:bg-blue-50 shadow-md">
              <Plus className="w-4 h-4 mr-2" />
              Nova Auditoria
            </Button>
          </Link>
        </div>
      </div>

      {/* Main Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <MetricCard
          title="Total de Auditorias"
          value={metrics.totalAudits}
          change={metrics.lastMonthAudits}
          changeLabel="este mês"
          icon={<ClipboardCheck className="w-5 h-5" />}
          color="blue"
        />
        <MetricCard
          title="Pontuação Média"
          value={`${metrics.averageScore.toFixed(1)}/5.0`}
          change={metrics.improvementTrend}
          changeLabel="de melhoria"
          icon={<Target className="w-5 h-5" />}
          color="green"
        />
        <MetricCard
          title="Tendência"
          value={`${metrics.improvementTrend >= 0 ? '+' : ''}${metrics.improvementTrend.toFixed(1)}%`}
          change={metrics.improvementTrend}
          changeLabel="vs mês anterior"
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
        <MetricCard
          title="Ranking Geral"
          value="#1"
          change={0}
          changeLabel="posição mantida"
          icon={<Trophy className="w-5 h-5" />}
          color="yellow"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Left Column - Ranking and Evolution */}
        <div className="xl:col-span-1 space-y-6">
          <RankingSetorial />
        </div>

        {/* Middle Column - Evolution Chart */}
        <div className="xl:col-span-1">
          <EvolutionChart />
        </div>

        {/* Right Column - Area Destaque */}
        <div className="xl:col-span-1">
          <AreaDestaque />
        </div>
      </div>

      {/* Second Row - Component Metrics and 5S Analysis */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <ComponentMetrics />
        <RadarChart5S />
      </div>

      {/* Detailed Analysis Tabs */}
      <Card className="shadow-lg">
        <CardHeader className="pb-4">
          <CardTitle className="text-xl font-semibold text-gray-800">
            Análise Detalhada
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4 bg-gray-100 p-1 rounded-lg">
              <TabsTrigger 
                value="overview" 
                className="data-[state=active]:bg-white data-[state=active]:shadow-sm font-medium"
              >
                Visão Geral
              </TabsTrigger>
              <TabsTrigger 
                value="sectors" 
                className="data-[state=active]:bg-white data-[state=active]:shadow-sm font-medium"
              >
                Por Setor
              </TabsTrigger>
              <TabsTrigger 
                value="areas" 
                className="data-[state=active]:bg-white data-[state=active]:shadow-sm font-medium"
              >
                Por Área
              </TabsTrigger>
              <TabsTrigger 
                value="recent" 
                className="data-[state=active]:bg-white data-[state=active]:shadow-sm font-medium"
              >
                Recentes
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
              <div className="bg-blue-50 rounded-lg p-6 text-center">
                <h3 className="text-lg font-semibold text-blue-800 mb-2">
                  Resumo Executivo
                </h3>
                <p className="text-blue-600">
                  Dados consolidados apresentados nos gráficos acima. 
                  Use as abas para análises específicas por setor, área ou histórico.
                </p>
              </div>
            </TabsContent>

            <TabsContent value="sectors">
              <SectorMetrics />
            </TabsContent>

            <TabsContent value="areas">
              <AreaMetrics />
            </TabsContent>

            <TabsContent value="recent">
              <RecentAudits />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

// Helper to add week number to Date prototype
declare global {
  interface Date {
    getWeek(): number;
  }
}

Date.prototype.getWeek = function() {
  const date = new Date(this.getTime());
  date.setHours(0, 0, 0, 0);
  date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
  const week1 = new Date(date.getFullYear(), 0, 4);
  return 1 + Math.round(((date.getTime() - week1.getTime()) / 86400000 - 3 + (week1.getDay() + 6) % 7) / 7);
};

export default Dashboard;
