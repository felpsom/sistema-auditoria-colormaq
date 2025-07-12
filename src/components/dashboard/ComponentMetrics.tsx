
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Settings } from 'lucide-react';

const ComponentMetrics: React.FC = () => {
  const componentData = [
    { name: 'Componentes', LCA: 118, LCS: 121, Célula1: 115, Célula2: 95, Célula3: 87, Célula4: 84, Esteira: 78 },
    { name: 'Linha', LCA: 125, LCS: 132, value: 0 },
    { name: 'Estamparia e Pintura', LCA: 128, value: 0 }
  ];

  const lineData = [
    { name: 'Linha 1', value: 121 },
    { name: 'Linha 2', value: 132 },
    { name: 'Linha 3', value: 87 },
    { name: 'Centrífuga', value: 95 },
    { name: 'Evaporador', value: 79 }
  ];

  const cellData = [
    { name: 'Célula 1', value: 115 },
    { name: 'Célula 2', value: 95 },
    { name: 'Célula 3', value: 87 },
    { name: 'Célula 4', value: 84 },
    { name: 'Esteira', value: 78 }
  ];

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base md:text-lg flex items-center gap-2">
          <Settings className="w-4 h-4 text-gray-600" />
          Resultados por Componente
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* LCA Section */}
          <div>
            <h4 className="text-sm font-medium mb-3 text-blue-600">LCA</h4>
            <div className="space-y-2">
              {lineData.map((item, index) => (
                <div key={item.name} className="flex justify-between items-center p-2 bg-blue-50 rounded">
                  <span className="text-xs text-blue-800">{item.name}</span>
                  <span className="text-sm font-medium text-blue-700">{item.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* LCS Section */}
          <div>
            <h4 className="text-sm font-medium mb-3 text-green-600">LCS</h4>
            <div className="space-y-2">
              {cellData.map((item, index) => (
                <div key={item.name} className="flex justify-between items-center p-2 bg-green-50 rounded">
                  <span className="text-xs text-green-800">{item.name}</span>
                  <span className="text-sm font-medium text-green-700">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Chart */}
        <div className="mt-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h5 className="text-xs font-medium mb-2 text-blue-600">NU</h5>
              <div className="h-16 bg-blue-100 rounded flex items-end justify-center">
                <div className="w-full bg-blue-500 h-12 rounded-b flex items-center justify-center text-white text-xs">
                  92
                </div>
              </div>
            </div>
            <div>
              <h5 className="text-xs font-medium mb-2 text-orange-600">EXT</h5>
              <div className="h-16 bg-orange-100 rounded flex items-end justify-center">
                <div className="w-full bg-orange-500 h-10 rounded-b flex items-center justify-center text-white text-xs">
                  78
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ComponentMetrics;
