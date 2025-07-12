
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer, Legend } from 'recharts';
import { Target } from 'lucide-react';

const RadarChart5S: React.FC = () => {
  const radarData = [
    { category: 'Disciplina', LCA: 80, LCS: 70, NU: 65, EXT: 75 },
    { category: 'Organização', LCA: 85, LCS: 75, NU: 70, EXT: 80 },
    { category: 'Limpeza', LCA: 75, LCS: 65, NU: 60, EXT: 70 },
    { category: 'Padronização', LCA: 70, LCS: 60, NU: 55, EXT: 65 },
    { category: 'Utilização', LCA: 90, LCS: 80, NU: 75, EXT: 85 }
  ];

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base md:text-lg flex items-center gap-2">
          <Target className="w-4 h-4 text-purple-500" />
          Resultados por 5S
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          {/* Individual Radar Charts */}
          {['LCA', 'LCS', 'NU', 'EXT'].map((setor, index) => {
            const colors = ['#3b82f6', '#10b981', '#8b5cf6', '#e67e22'];
            const singleData = radarData.map(item => ({
              category: item.category.substring(0, 3),
              value: item[setor as keyof typeof item] as number
            }));

            return (
              <div key={setor} className="text-center">
                <h4 className="text-sm font-medium mb-2" style={{ color: colors[index] }}>
                  {setor}
                </h4>
                <div className="h-32">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart data={singleData}>
                      <PolarGrid stroke="#e0e0e0" />
                      <PolarAngleAxis 
                        dataKey="category" 
                        tick={{ fontSize: 8, fill: '#666' }}
                      />
                      <PolarRadiusAxis 
                        domain={[0, 100]} 
                        tick={false} 
                        axisLine={false}
                      />
                      <Radar
                        name={setor}
                        dataKey="value"
                        stroke={colors[index]}
                        fill={colors[index]}
                        fillOpacity={0.3}
                        strokeWidth={2}
                      />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            );
          })}
        </div>

        {/* Legend */}
        <div className="flex flex-wrap justify-center gap-2 text-xs">
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <span>Disciplina</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span>Organização</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
            <span>Limpeza</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
            <span>Padronização</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
            <span>Utilização</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RadarChart5S;
