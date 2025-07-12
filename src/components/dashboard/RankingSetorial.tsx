
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Trophy, TrendingUp, TrendingDown } from 'lucide-react';

interface RankingData {
  position: number;
  setor: string;
  score: number;
  trend: 'up' | 'down' | 'stable';
  color: string;
}

const RankingSetorial: React.FC = () => {
  const rankingData: RankingData[] = [
    { position: 1, setor: 'EXT', score: 70.59, trend: 'up', color: '#e67e22' },
    { position: 2, setor: 'LCA', score: 70.38, trend: 'stable', color: '#3b82f6' },
    { position: 3, setor: 'LCS', score: 50.76, trend: 'down', color: '#10b981' },
    { position: 4, setor: 'NU', score: 52.92, trend: 'up', color: '#8b5cf6' }
  ];

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="w-3 h-3 text-green-500" />;
      case 'down':
        return <TrendingDown className="w-3 h-3 text-red-500" />;
      default:
        return <div className="w-3 h-3" />;
    }
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base md:text-lg flex items-center gap-2">
          <Trophy className="w-4 h-4 text-yellow-500" />
          Ranking Setorial
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {rankingData.map((item) => (
            <div key={item.setor} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
              <div className="flex items-center space-x-3">
                <div className="flex items-center justify-center w-6 h-6 rounded-full bg-gray-100 text-sm font-bold">
                  {item.position}
                </div>
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: item.color }}
                />
                <span className="font-medium text-sm">{item.setor}</span>
              </div>
              <div className="flex items-center space-x-2">
                {getTrendIcon(item.trend)}
                <Badge variant="outline" className="text-xs">
                  {item.score.toFixed(2)}
                </Badge>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-4 pt-3 border-t">
          <div className="text-xs text-gray-500 text-center">
            Baseado na média das últimas 4 semanas
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RankingSetorial;
