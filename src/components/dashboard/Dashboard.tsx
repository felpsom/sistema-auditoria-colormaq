
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import SidebarMetrics from './SidebarMetrics';
import MainDashboardContent from './MainDashboardContent';
import DashboardFilters from './DashboardFilters';
import { Button } from '@/components/ui/button';
import { Plus, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useFilteredMetrics } from '@/hooks/useFilteredMetrics';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const { metrics, filters } = useFilteredMetrics();

  return (
    <div className="w-full min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-6 text-white shadow-lg">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row lg:justify-between lg:items-center space-y-4 lg:space-y-0">
          <div className="flex-1">
            <h1 className="text-2xl lg:text-3xl font-bold mb-2">
              DASHBOARD AÇÕES | {user?.company || 'COLORMAQ'}
            </h1>
            <div className="flex items-center space-x-4 text-blue-100">
              <div className="flex items-center space-x-2">
                <User className="w-4 h-4" />
                <span className="font-medium">{user?.name}</span>
              </div>
              <div className="hidden sm:block w-px h-4 bg-blue-300"></div>
              <span className="text-sm font-medium">
                {user?.role === 'admin' ? 'Administrador' : 'Auditor'}
              </span>
            </div>
          </div>
          <Link to="/audit/new">
            <Button size="sm" className="bg-white text-blue-600 hover:bg-blue-50 shadow-md font-semibold">
              <Plus className="w-4 h-4 mr-2" />
              Nova Auditoria
            </Button>
          </Link>
        </div>
      </div>

      {/* Filtros */}
      <div className="max-w-7xl mx-auto p-4">
        <DashboardFilters
          selectedSetor={filters.selectedSetor}
          selectedArea={filters.selectedArea}
          selectedSenso={filters.selectedSenso}
          onSetorChange={filters.setSelectedSetor}
          onAreaChange={filters.setSelectedArea}
          onSensoChange={filters.setSelectedSenso}
        />
      </div>

      {/* Main Layout - Sidebar + Content */}
      <div className="max-w-7xl mx-auto p-4">
        <div className="flex gap-4 h-full">
          {/* Left Sidebar with Metrics */}
          <SidebarMetrics />
          
          {/* Main Content Area */}
          <MainDashboardContent />
        </div>
      </div>

      {/* Informações dos Filtros Aplicados */}
      {(filters.selectedSetor !== 'Todos' || filters.selectedArea !== 'Todas' || filters.selectedSenso !== 'Todos os Sensos') && (
        <div className="max-w-7xl mx-auto p-4">
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
        </div>
      )}
    </div>
  );
};

export default Dashboard;
