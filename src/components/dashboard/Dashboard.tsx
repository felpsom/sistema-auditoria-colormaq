
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
import { Plus, ClipboardCheck, TrendingUp, AlertTriangle, Target, Trophy } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useDashboardMetrics } from '@/hooks/useDashboardMetrics';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const metrics = useDashboardMetrics();

  // Generate company name using first name
  const firstName = user?.name.split(' ')[0] || 'Usuário';
  const companyName = user?.company || `${firstName} Industrial`;

  return (
    <div className="w-full max-w-7xl mx-auto space-y-4 md:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-3 sm:space-y-0">
        <div className="min-w-0 flex-1">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 truncate">
            AUDITORIA 5S | WK{new Date().getWeek()}
          </h1>
          <p className="text-gray-600 mt-1 text-sm md:text-base truncate">
            {companyName} - Semana {new Date().getWeek()}/{new Date().getFullYear()}
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

      {/* Main Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 md:gap-6">
        <MetricCard
          title="Total de Auditorias"
          value={metrics.totalAudits}
          change={metrics.lastMonthAudits}
          changeLabel="este mês"
          icon={<ClipboardCheck className="w-4 h-4 md:w-5 md:h-5" />}
          color="blue"
        />
        <MetricCard
          title="Pontuação Média"
          value={`${metrics.averageScore.toFixed(1)}/5.0`}
          change={metrics.improvementTrend}
          changeLabel="de melhoria"
          icon={<Target className="w-4 h-4 md:w-5 md:h-5" />}
          color="green"
        />
        <MetricCard
          title="Tendência"
          value={`${metrics.improvementTrend >= 0 ? '+' : ''}${metrics.improvementTrend.toFixed(1)}%`}
          change={metrics.improvementTrend}
          changeLabel="vs mês anterior"
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
        <MetricCard
          title="Ranking Geral"
          value="#1"
          change={0}
          changeLabel="posição mantida"
          icon={<Trophy className="w-4 h-4 md:w-5 md:h-5" />}
          color="yellow"
        />
      </div>

      {/* First Row - Ranking, Evolution, Area Destaque */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
        <RankingSetorial />
        <EvolutionChart />
        <AreaDestaque />
      </div>

      {/* Second Row - Component Metrics and 5S Radars */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 md:gap-6">
        <ComponentMetrics />
        <RadarChart5S />
      </div>

      {/* Tabs para diferentes visualizações */}
      <Tabs defaultValue="overview" className="space-y-4 md:space-y-6">
        <TabsList className="grid w-full grid-cols-4 h-auto">
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
          <TabsTrigger value="recent" className="text-xs md:text-sm px-2 py-2">
            <span className="hidden sm:inline">Recentes</span>
            <span className="sm:hidden">Recentes</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          {/* Overview content is already shown above */}
          <div className="text-center text-gray-500 py-8">
            <p>Visão geral exibida acima - selecione outras abas para mais detalhes</p>
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
