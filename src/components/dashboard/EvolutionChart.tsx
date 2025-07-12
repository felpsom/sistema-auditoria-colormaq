
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { TrendingUp } from 'lucide-react';

const EvolutionChart: React.FC = () => {
  const evolutionData = [
    { week: 'S19', LCA: 65, LCS: 58, NU: 52, EXT: 68 },
    { week: 'S20', LCA: 67, LCS: 60, NU: 54, EXT: 69 },
    { week: 'S21', LCA: 69, LCS: 59, NU: 53, EXT: 70 },
    { week: 'S22', LCA: 68, LCS: 61, NU: 55, EXT: 71 },
    { week: 'S23', LCA: 70, LCS: 62, NU: 54, EXT: 72 },
    { week: 'S24', LCA: 71, LCS: 58, NU: 52, EXT: 70 },
    { week: 'S25', LCA: 70, LCS: 59, NU: 53, EXT: 71 },
    { week: 'S26', LCA: 70.38, LCS: 50.76, NU: 52.92, EXT: 70.59 }
  ];

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base md:text-lg flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-blue-500" />
          Evolução
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={evolutionData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              dataKey="week" 
              tick={{ fontSize: 10 }}
              angle={-45}
              textAnchor="end"
              height={50}
            />
            <YAxis 
              domain={[40, 80]} 
              tick={{ fontSize: 10 }}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'white', 
                border: '1px solid #ccc', 
                borderRadius: '4px',
                fontSize: '12px'
              }}
            />
            <Legend 
              wrapperStyle={{ fontSize: '10px' }}
              iconSize={8}
            />
            <Line 
              type="monotone" 
              dataKey="LCA" 
              stroke="#3b82f6" 
              strokeWidth={2}
              dot={{ r: 3 }}
            />
            <Line 
              type="monotone" 
              dataKey="LCS" 
              stroke="#10b981" 
              strokeWidth={2}
              dot={{ r: 3 }}
            />
            <Line 
              type="monotone" 
              dataKey="NU" 
              stroke="#8b5cf6" 
              strokeWidth={2}
              dot={{ r: 3 }}
            />
            <Line 
              type="monotone" 
              dataKey="EXT" 
              stroke="#e67e22" 
              strokeWidth={2}
              dot={{ r: 3 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default EvolutionChart;
