
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import MetricCard from './MetricCard';
import DashboardFilters from './DashboardFilters';
import { Button } from '@/components/ui/button';
import { Plus, ClipboardCheck, Target, TrendingUp, AlertTriangle, CheckCircle, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useFilteredMetrics } from '@/hooks/useFilteredMetrics';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const { metrics, filters } = useFilteredMetrics();

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

      {/* Filtros */}
      <DashboardFilters
        selectedSetor={filters.selectedSetor}
        selectedArea={filters.selectedArea}
        selectedSenso={filters.selectedSenso}
        onSetorChange={filters.setSelectedSetor}
        onAreaChange={filters.setSelectedArea}
        onSensoChange={filters.setSelectedSenso}
      />

      {/* Indicadores Principais */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <MetricCard
          title="Total de Auditorias"
          value={metrics.filteredAudits}
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
          icon={<TrendingUp className="w-6 h-6" />}
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

      {/* Indicadores por Senso */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <MetricCard
          title="1º Senso - Seiri"
          value={`${metrics.sensoMetrics.seiri.toFixed(1)}%`}
          change={2.5}
          changeLabel="vs anterior"
          icon={<div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold">1</div>}
          color="red"
          description="Organização"
        />
        
        <MetricCard
          title="2º Senso - Seiton"
          value={`${metrics.sensoMetrics.seiton.toFixed(1)}%`}
          change={1.8}
          changeLabel="vs anterior"
          icon={<div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center text-white text-xs font-bold">2</div>}
          color="yellow"
          description="Ordem"
        />
        
        <MetricCard
          title="3º Senso - Seiso"
          value={`${metrics.sensoMetrics.seiso.toFixed(1)}%`}
          change={3.2}
          changeLabel="vs anterior"
          icon={<div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold">3</div>}
          color="blue"
          description="Limpeza"
        />
        
        <MetricCard
          title="4º Senso - Seiketsu"
          value={`${metrics.sensoMetrics.seiketsu.toFixed(1)}%`}
          change={1.5}
          changeLabel="vs anterior"
          icon={<div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-xs font-bold">4</div>}
          color="green"
          description="Padronização"
        />
        
        <MetricCard
          title="5º Senso - Shitsuke"
          value={`${metrics.sensoMetrics.shitsuke.toFixed(1)}%`}
          change={2.1}
          changeLabel="vs anterior"
          icon={<div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center text-white text-xs font-bold">5</div>}
          color="purple"
          description="Disciplina"
        />
      </div>

      {/* Informações dos Filtros Aplicados */}
      {(filters.selectedSetor !== 'Todos' || filters.selectedArea !== 'Todas' || filters.selectedSenso !== 'Todos os Sensos') && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="font-medium text-blue-800 mb-2">Filtros Aplicados:</h3>
          <div className="flex flex-wrap gap-2 text-sm text-blue-700">
            {filters.selectedSetor !== 'Todos' && (
              <span className="bg-blue-100 px-2 py-1 rounded">Setor: {filters.selectedSetor}</span>
            )}
            {filters.selectedArea !== 'Todas' && (
              <span className="bg-blue-100 px-2 py-1 rounded">Área: {filters.selectedArea}</span>
            )}
            {filters.selectedSenso !== 'Todos os Sensos' && (
              <span className="bg-blue-100 px-2 py-1 rounded">Senso: {filters.selectedSenso}</span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
