
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Audit } from '@/types/audit';
import { Eye, Edit, Download, Calendar, User, MapPin, TrendingUp, AlertTriangle } from 'lucide-react';

interface AuditHistoryCardProps {
  audit: Audit;
  compact?: boolean;
}

const AuditHistoryCard: React.FC<AuditHistoryCardProps> = ({ audit, compact = false }) => {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-green-100 text-green-700 border-green-300">Concluída</Badge>;
      case 'approved':
        return <Badge className="bg-blue-100 text-blue-700 border-blue-300">Aprovada</Badge>;
      case 'draft':
        return <Badge className="bg-yellow-100 text-yellow-700 border-yellow-300">Rascunho</Badge>;
      default:
        return <Badge variant="secondary">Desconhecido</Badge>;
    }
  };

  const getScoreColor = (percentage: number) => {
    if (percentage >= 80) return 'text-green-600';
    if (percentage >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getProgressColor = (percentage: number) => {
    if (percentage >= 80) return 'bg-green-500';
    if (percentage >= 60) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const getCategoryScores = () => {
    const categories = {
      '5S1': { name: 'Classificar', responses: [] as any[] },
      '5S2': { name: 'Organizar', responses: [] as any[] },
      '5S3': { name: 'Limpar', responses: [] as any[] },
      '5S4': { name: 'Padronizar', responses: [] as any[] },
      '5S5': { name: 'Disciplina', responses: [] as any[] }
    };

    // Group responses by category based on question IDs
    audit.responses.forEach(response => {
      const questionId = parseInt(response.questionId);
      if (questionId >= 1 && questionId <= 4) categories['5S1'].responses.push(response);
      else if (questionId >= 5 && questionId <= 8) categories['5S2'].responses.push(response);
      else if (questionId >= 9 && questionId <= 12) categories['5S3'].responses.push(response);
      else if (questionId >= 13 && questionId <= 16) categories['5S4'].responses.push(response);
      else if (questionId >= 17 && questionId <= 20) categories['5S5'].responses.push(response);
    });

    // Calculate average score for each category
    return Object.entries(categories).map(([key, category]) => {
      const average = category.responses.length > 0 
        ? category.responses.reduce((sum, r) => sum + r.score, 0) / category.responses.length
        : 0;
      return {
        key,
        name: category.name,
        score: average,
        percentage: (average / 5) * 100
      };
    });
  };

  const categoryScores = getCategoryScores();

  if (compact) {
    return (
      <Card className="hover:shadow-md transition-shadow">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-gray-900 truncate">{audit.title}</h3>
              <div className="flex items-center space-x-4 text-sm text-gray-500 mt-1">
                <div className="flex items-center space-x-1">
                  <Calendar className="w-4 h-4" />
                  <span>{formatDate(audit.date)}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <User className="w-4 h-4" />
                  <span>{audit.auditorName}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="text-right">
                <div className={`text-lg font-bold ${getScoreColor(audit.percentageScore)}`}>
                  {audit.percentageScore.toFixed(1)}%
                </div>
                <div className="text-xs text-gray-500">
                  {audit.totalScore.toFixed(1)}/5.0
                </div>
              </div>
              {getStatusBadge(audit.status)}
              <Button variant="outline" size="sm">
                <Eye className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <CardTitle className="text-xl text-gray-900 mb-2">{audit.title}</CardTitle>
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <div className="flex items-center space-x-1">
                <MapPin className="w-4 h-4" />
                <span>{audit.area.charAt(0).toUpperCase() + audit.area.slice(1)}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Calendar className="w-4 h-4" />
                <span>{formatDate(audit.date)}</span>
              </div>
              <div className="flex items-center space-x-1">
                <User className="w-4 h-4" />
                <span>{audit.auditorName}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            {getStatusBadge(audit.status)}
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Overall Score */}
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div>
            <h4 className="font-medium text-gray-900">Pontuação Geral</h4>
            <p className="text-sm text-gray-600">
              {audit.responses.length} perguntas respondidas
            </p>
          </div>
          <div className="text-right">
            <div className={`text-2xl font-bold ${getScoreColor(audit.percentageScore)}`}>
              {audit.percentageScore.toFixed(1)}%
            </div>
            <div className="text-sm text-gray-500">
              {audit.totalScore.toFixed(1)}/5.0
            </div>
          </div>
        </div>

        {/* Category Breakdown */}
        <div>
          <h4 className="font-medium text-gray-900 mb-3">Pontuação por Categoria 5S</h4>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
            {categoryScores.map(category => (
              <div key={category.key} className="text-center p-3 bg-gray-50 rounded-lg">
                <div className="text-xs font-medium text-gray-600 mb-1">
                  {category.key} - {category.name}
                </div>
                <div className={`text-lg font-bold ${getScoreColor(category.percentage)}`}>
                  {category.score.toFixed(1)}
                </div>
                <div className="text-xs text-gray-500">
                  {category.percentage.toFixed(1)}%
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                  <div 
                    className={`h-2 rounded-full transition-all ${getProgressColor(category.percentage)}`}
                    style={{ width: `${category.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recommendations */}
        {audit.recommendations && audit.recommendations.length > 0 && (
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Observações e Recomendações</h4>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
              {audit.recommendations.map((rec, index) => (
                <p key={index} className="text-sm text-blue-800">{rec}</p>
              ))}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex items-center justify-between pt-4 border-t">
          <div className="flex items-center space-x-2">
            {audit.percentageScore < 60 && (
              <div className="flex items-center space-x-1 text-red-600">
                <AlertTriangle className="w-4 h-4" />
                <span className="text-sm font-medium">Requer Plano de Ação</span>
              </div>
            )}
            {audit.percentageScore >= 80 && (
              <div className="flex items-center space-x-1 text-green-600">
                <TrendingUp className="w-4 h-4" />
                <span className="text-sm font-medium">Excelente Performance</span>
              </div>
            )}
          </div>
          
          <div className="flex space-x-2">
            <Button variant="outline" size="sm">
              <Eye className="w-4 h-4 mr-1" />
              Visualizar
            </Button>
            {audit.status === 'draft' && (
              <Button variant="outline" size="sm">
                <Edit className="w-4 h-4 mr-1" />
                Editar
              </Button>
            )}
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-1" />
              Exportar
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AuditHistoryCard;
