
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
import { Plus, ClipboardCheck, Target, TrendingUp, AlertTriangle, CheckCircle, BarChart3, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useDashboardMetrics } from '@/hooks/useDashboardMetrics';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const metrics = useDashboardMetrics();

  return (
    <div className="w-full max-w-7xl mx-auto space-y-6 p-4">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl p-6 text-white shadow-lg">
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center space-y-4 lg:space-y-0">
          <div className="flex-1">
            <h1 className="text-3xl lg:text-4xl font-bold mb-3">
              SISTEMA DE AUDITORIA 5S | {user?.company || 'COLORMAQ'}
            </h1>
            <div className="flex items-center space-x-4 text-blue-100">
              <div className="flex items-center space-x-2">
                <User className="w-5 h-5" />
                <span className="font-medium text-lg">{user?.name}</span>
              </div>
              <div className="hidden sm:block w-px h-6 bg-blue-300"></div>
              <span className="text-base font-medium">
                {user?.role === 'admin' ? 'Administrador' : 'Auditor'}
              </span>
            </div>
          </div>
          <Link to="/audit/new">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50 shadow-md font-semibold">
              <Plus className="w-5 h-5 mr-2" />
              Nova Auditoria
            </Button>
          </Link>
        </div>
      </div>

      {/* Key Performance Indicators */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <MetricCard
          title="Total de Auditorias"
          value={metrics.totalAudits}
          change={metrics.lastMonthAudits > 0 ? 12.5 : 0}
          changeLabel="este mês"
          icon={<ClipboardCheck className="w-6 h-6" />}
          color="blue"
          description="Auditorias realizadas"
        />
        
        <MetricCard
          title="Pontuação Média"
          value={`${metrics.averageScore.toFixed(1)}%`}
          change={metrics.improvementTrend}
          changeLabel="vs mês anterior"
          icon={<Target className="w-6 h-6" />}
          color="green"
          description="Performance geral"
        />
        
        <MetricCard
          title="Taxa de Conformidade"
          value={`${metrics.complianceRate.toFixed(1)}%`}
          change={5.2}
          changeLabel="de melhoria"
          icon={<CheckCircle className="w-6 h-6" />}
          color="purple"
          description="≥70% de pontuação"
        />
        
        <MetricCard
          title="Auditorias Excelentes"
          value={metrics.excellentAudits}
          change={15.8}
          changeLabel="este mês"
          icon={<BarChart3 className="w-6 h-6" />}
          color="yellow"
          description="≥80% de pontuação"
        />
        
        <MetricCard
          title="Questões Críticas"
          value={metrics.criticalIssues}
          change={-25}
          changeLabel="resolvidas"
          icon={<AlertTriangle className="w-6 h-6" />}
          color="red"
          description="<60% de pontuação"
        />
        
        <MetricCard
          title="Tendência Geral"
          value={`${metrics.improvementTrend >= 0 ? '+' : ''}${metrics.improvementTrend.toFixed(1)}%`}
          change={metrics.improvementTrend}
          changeLabel="evolução"
          icon={<TrendingUp className="w-6 h-6" />}
          color="blue"
          description="Melhoria contínua"
        />
      </div>

      {/* Charts and Analysis Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-1">
          <RankingSetorial />
        </div>
        <div className="xl:col-span-1">
          <EvolutionChart />
        </div>
        <div className="xl:col-span-1">
          <AreaDestaque />
        </div>
      </div>

      {/* Secondary Analysis */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <ComponentMetrics />
        <RadarChart5S />
      </div>

      {/* Detailed Analysis Tabs */}
      <Card className="shadow-lg border-2">
        <CardHeader className="bg-gray-50 rounded-t-lg">
          <CardTitle className="text-xl font-bold text-gray-800 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-blue-600" />
            Análise Detalhada por Categoria
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4 bg-gray-100 p-1 rounded-lg h-12">
              <TabsTrigger 
                value="overview" 
                className="data-[state=active]:bg-white data-[state=active]:shadow-sm font-medium py-2"
              >
                Resumo Executivo
              </TabsTrigger>
              <TabsTrigger 
                value="sectors" 
                className="data-[state=active]:bg-white data-[state=active]:shadow-sm font-medium py-2"
              >
                Análise por Setor
              </TabsTrigger>
              <TabsTrigger 
                value="areas" 
                className="data-[state=active]:bg-white data-[state=active]:shadow-sm font-medium py-2"
              >
                Performance por Área
              </TabsTrigger>
              <TabsTrigger 
                value="recent" 
                className="data-[state=active]:bg-white data-[state=active]:shadow-sm font-medium py-2"
              >
                Auditorias Recentes
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 border border-blue-200">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                  <div>
                    <h3 className="text-2xl font-bold text-blue-800 mb-1">
                      {metrics.averageScore.toFixed(1)}%
                    </h3>
                    <p className="text-blue-600 font-medium">Pontuação Média Geral</p>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-green-800 mb-1">
                      {metrics.complianceRate.toFixed(1)}%
                    </h3>
                    <p className="text-green-600 font-medium">Taxa de Conformidade</p>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-purple-800 mb-1">
                      {metrics.excellentAudits}
                    </h3>
                    <p className="text-purple-600 font-medium">Auditorias Excelentes</p>
                  </div>
                </div>
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
