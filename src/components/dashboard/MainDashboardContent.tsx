import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import RankingSetorial from './RankingSetorial';
import EvolutionChart from './EvolutionChart';
import AreaDestaque from './AreaDestaque';
import RadarChart5S from './RadarChart5S';
import AuditChart from './AuditChart';
import { useFilteredMetrics } from '@/hooks/useFilteredMetrics';

const MainDashboardContent: React.FC = () => {
  const { metrics } = useFilteredMetrics();

  const chartData = [
    { name: 'Seiri', value: metrics.sensoMetrics.seiri },
    { name: 'Seiton', value: metrics.sensoMetrics.seiton },
    { name: 'Seiso', value: metrics.sensoMetrics.seiso },
    { name: 'Seiketsu', value: metrics.sensoMetrics.seiketsu },
    { name: 'Shitsuke', value: metrics.sensoMetrics.shitsuke }
  ];

  return (
    <div className="flex-1 bg-white rounded-lg shadow-sm">
      <Tabs defaultValue="acoes" className="w-full">
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-t-lg">
          <TabsList className="grid w-full grid-cols-4 bg-transparent border-0">
            <TabsTrigger 
              value="acesso" 
              className="text-white data-[state=active]:bg-white/20 data-[state=active]:text-white border-0"
            >
              Acesso
            </TabsTrigger>
            <TabsTrigger 
              value="acoes" 
              className="text-white data-[state=active]:bg-white/20 data-[state=active]:text-white border-0"
            >
              Ações
            </TabsTrigger>
            <TabsTrigger 
              value="localidade" 
              className="text-white data-[state=active]:bg-white/20 data-[state=active]:text-white border-0"
            >
              Localidade
            </TabsTrigger>
            <TabsTrigger 
              value="controle" 
              className="text-white data-[state=active]:bg-white/20 data-[state=active]:text-white border-0"
            >
              Controle
            </TabsTrigger>
          </TabsList>
        </div>

        <div className="p-6">
          <TabsContent value="acesso" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <RankingSetorial />
              <EvolutionChart />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <AreaDestaque />
              <RadarChart5S />
            </div>
          </TabsContent>

          <TabsContent value="acoes" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <RankingSetorial />
              <EvolutionChart />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <AreaDestaque />
              <AuditChart data={chartData} title="Pontuação por Senso" />
            </div>
          </TabsContent>

          <TabsContent value="localidade" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <AreaDestaque />
              <RadarChart5S />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <RankingSetorial />
              <EvolutionChart />
            </div>
          </TabsContent>

          <TabsContent value="controle" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <RadarChart5S />
              <AreaDestaque />
              <AuditChart data={chartData} title="Performance 5S" />
            </div>
            <div className="grid grid-cols-1 gap-6">
              <RankingSetorial />
            </div>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default MainDashboardContent;