
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, AlertTriangle } from 'lucide-react';

const AreaDestaque: React.FC = () => {
  const areaDestaque = {
    nome: 'Linha LCA',
    tipo: 'Estamparia/Pintura',
    score: 72,
    status: 'Área Crítica'
  };

  const problematico = {
    nome: 'Esteiras',
    score: 43,
    status: 'EXT'
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base md:text-lg flex items-center gap-2">
          <Star className="w-4 h-4 text-yellow-500" />
          Área Destaque
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Área Destaque Positiva */}
        <div className="p-3 border rounded-lg bg-green-50 border-green-200">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h3 className="font-medium text-sm text-green-800">{areaDestaque.nome}</h3>
              <p className="text-xs text-green-600">{areaDestaque.tipo}</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-green-700">{areaDestaque.score}%</div>
              <Badge className="bg-blue-500 text-white text-xs">
                {areaDestaque.status}
              </Badge>
            </div>
          </div>
        </div>

        {/* Área Problemática */}
        <div className="p-3 border rounded-lg bg-red-50 border-red-200">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-red-500" />
              <div>
                <h3 className="font-medium text-sm text-red-800">{problematico.nome}</h3>
                <p className="text-xs text-red-600">Setor {problematico.status}</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-red-700">{problematico.score}%</div>
              <Badge variant="destructive" className="text-xs">
                Crítico
              </Badge>
            </div>
          </div>
        </div>

        {/* Resumo */}
        <div className="pt-2 border-t">
          <div className="text-xs text-gray-500 text-center">
            Análise baseada na semana atual
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AreaDestaque;
