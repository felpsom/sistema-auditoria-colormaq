
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface SectorData {
  sector: string;
  audits: number;
  averageScore: number;
  lastAudit: string;
  trend: number;
}

const SectorMetrics: React.FC = () => {
  // Mock data - em uma aplicação real viria da API
  const sectorData: SectorData[] = [
    { sector: 'Produção', audits: 45, averageScore: 4.2, lastAudit: '2024-06-03', trend: 8.5 },
    { sector: 'Logística', audits: 32, averageScore: 4.0, lastAudit: '2024-06-02', trend: 12.3 },
    { sector: 'Manutenção', audits: 28, averageScore: 3.8, lastAudit: '2024-06-01', trend: -2.1 },
    { sector: 'Qualidade', audits: 38, averageScore: 4.4, lastAudit: '2024-06-03', trend: 15.7 },
    { sector: 'Administrativo', audits: 13, averageScore: 4.1, lastAudit: '2024-05-30', trend: 5.2 }
  ];

  const getScoreColor = (score: number) => {
    if (score >= 4.5) return 'bg-green-100 text-green-700 border-green-300';
    if (score >= 4.0) return 'bg-blue-100 text-blue-700 border-blue-300';
    if (score >= 3.5) return 'bg-yellow-100 text-yellow-700 border-yellow-300';
    return 'bg-red-100 text-red-700 border-red-300';
  };

  const getTrendColor = (trend: number) => {
    if (trend > 0) return 'text-green-600';
    if (trend < 0) return 'text-red-600';
    return 'text-gray-600';
  };

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Resumo por Setor */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base md:text-lg">Performance por Setor</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3 md:gap-4 mb-4 md:mb-6">
            {sectorData.map((sector) => (
              <div key={sector.sector} className="p-3 md:p-4 border rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-medium text-sm md:text-base truncate">{sector.sector}</h3>
                  <Badge variant="outline" className={`${getScoreColor(sector.averageScore)} text-xs`}>
                    {sector.averageScore.toFixed(1)}
                  </Badge>
                </div>
                <div className="space-y-1 text-xs text-gray-600">
                  <div>{sector.audits} auditorias</div>
                  <div>Última: {new Date(sector.lastAudit).toLocaleDateString('pt-BR')}</div>
                  <div className={getTrendColor(sector.trend)}>
                    Tendência: {sector.trend > 0 ? '+' : ''}{sector.trend.toFixed(1)}%
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Gráfico de Performance por Setor */}
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={sectorData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="sector" tick={{ fontSize: 10 }} angle={-45} textAnchor="end" height={60} />
              <YAxis domain={[0, 5]} tick={{ fontSize: 12 }} />
              <Tooltip />
              <Bar dataKey="averageScore" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default SectorMetrics;
