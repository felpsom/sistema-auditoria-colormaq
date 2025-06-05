
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

interface AreaData {
  area: string;
  audits: number;
  averageScore: number;
  criticalIssues: number;
  color: string;
}

const AreaMetrics: React.FC = () => {
  // Mock data - em uma aplicação real viria da API
  const areaData: AreaData[] = [
    { area: 'Linha Produção A', audits: 24, averageScore: 4.3, criticalIssues: 1, color: '#3b82f6' },
    { area: 'Linha Produção B', audits: 21, averageScore: 4.1, criticalIssues: 2, color: '#10b981' },
    { area: 'Estoque MP', audits: 18, averageScore: 3.9, criticalIssues: 3, color: '#f59e0b' },
    { area: 'Expedição', audits: 14, averageScore: 4.0, criticalIssues: 1, color: '#ef4444' },
    { area: 'Almoxarifado', audits: 12, averageScore: 4.2, criticalIssues: 0, color: '#8b5cf6' },
    { area: 'Oficina Manutenção', audits: 16, averageScore: 3.7, criticalIssues: 4, color: '#06b6d4' },
    { area: 'Laboratório', audits: 19, averageScore: 4.5, criticalIssues: 0, color: '#84cc16' },
    { area: 'Escritório', audits: 13, averageScore: 4.1, criticalIssues: 1, color: '#f97316' }
  ];

  const getScoreColor = (score: number) => {
    if (score >= 4.5) return 'bg-green-100 text-green-700 border-green-300';
    if (score >= 4.0) return 'bg-blue-100 text-blue-700 border-blue-300';
    if (score >= 3.5) return 'bg-yellow-100 text-yellow-700 border-yellow-300';
    return 'bg-red-100 text-red-700 border-red-300';
  };

  const pieData = areaData.map(area => ({
    name: area.area,
    value: area.audits,
    color: area.color
  }));

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Lista de Áreas */}
        <Card>
          <CardHeader>
            <CardTitle>Performance por Área</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {areaData.map((area) => (
                <div key={area.area} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
                  <div className="flex items-center space-x-3">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: area.color }}
                    />
                    <div>
                      <div className="font-medium text-sm">{area.area}</div>
                      <div className="text-xs text-gray-500">
                        {area.audits} auditorias
                        {area.criticalIssues > 0 && (
                          <span className="ml-2 text-red-600">
                            • {area.criticalIssues} questões críticas
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <Badge variant="outline" className={getScoreColor(area.averageScore)}>
                    {area.averageScore.toFixed(1)}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Gráfico de Pizza - Distribuição de Auditorias */}
        <Card>
          <CardHeader>
            <CardTitle>Distribuição de Auditorias por Área</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={400}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  outerRadius={120}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  labelLine={false}
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AreaMetrics;
