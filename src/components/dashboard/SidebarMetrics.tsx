import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { useFilteredMetrics } from '@/hooks/useFilteredMetrics';

const SidebarMetrics: React.FC = () => {
  const { metrics } = useFilteredMetrics();

  const sidebarCards = [
    {
      value: metrics.filteredAudits,
      label: 'Não Iniciada',
      color: 'bg-gradient-to-br from-orange-400 to-orange-600',
      textColor: 'text-white'
    },
    {
      value: metrics.excellentAudits,
      label: 'Em Andamento',
      color: 'bg-gradient-to-br from-blue-500 to-blue-700',
      textColor: 'text-white'
    },
    {
      value: Math.round((metrics.complianceRate / 100) * metrics.filteredAudits),
      label: 'Feita',
      color: 'bg-gradient-to-br from-green-500 to-green-700',
      textColor: 'text-white'
    },
    {
      value: metrics.criticalIssues,
      label: 'Concluída',
      color: 'bg-gradient-to-br from-gray-600 to-gray-800',
      textColor: 'text-white'
    },
    {
      value: metrics.filteredAudits,
      label: 'Total de Ações',
      color: 'bg-gradient-to-br from-purple-500 to-purple-700',
      textColor: 'text-white'
    }
  ];

  return (
    <div className="w-32 space-y-3 flex flex-col">
      {sidebarCards.map((card, index) => (
        <Card key={index} className={`${card.color} border-0 shadow-lg hover:shadow-xl transition-shadow duration-200`}>
          <CardContent className="p-4 text-center">
            <div className={`text-2xl font-bold ${card.textColor} mb-1`}>
              {card.value}
            </div>
            <div className={`text-xs ${card.textColor} font-medium leading-tight`}>
              {card.label}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default SidebarMetrics;