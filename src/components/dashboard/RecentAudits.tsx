
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Eye, Edit, CheckCircle, Clock, AlertCircle } from 'lucide-react';

const RecentAudits: React.FC = () => {
  // Mock data - in real app this would come from API
  const recentAudits = [
    {
      id: '1',
      title: 'Auditoria Linha Produção A',
      area: 'Produção',
      date: '2024-06-05',
      score: 4.2,
      status: 'completed',
      auditor: 'Maria Santos'
    },
    {
      id: '2',
      title: 'Auditoria Estoque',
      area: 'Logística',
      date: '2024-06-04',
      score: 3.8,
      status: 'completed',
      auditor: 'João Silva'
    },
    {
      id: '3',
      title: 'Auditoria Manutenção',
      area: 'Manutenção',
      date: '2024-06-03',
      score: 4.5,
      status: 'approved',
      auditor: 'Ana Costa'
    },
    {
      id: '4',
      title: 'Auditoria Qualidade',
      area: 'Qualidade',
      date: '2024-06-02',
      score: 0,
      status: 'draft',
      auditor: 'Carlos Lima'
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'approved':
        return <CheckCircle className="w-4 h-4 text-blue-500" />;
      case 'draft':
        return <Clock className="w-4 h-4 text-yellow-500" />;
      default:
        return <AlertCircle className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge variant="secondary" className="bg-green-100 text-green-700">Completa</Badge>;
      case 'approved':
        return <Badge variant="secondary" className="bg-blue-100 text-blue-700">Aprovada</Badge>;
      case 'draft':
        return <Badge variant="secondary" className="bg-yellow-100 text-yellow-700">Rascunho</Badge>;
      default:
        return <Badge variant="secondary">Desconhecido</Badge>;
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 4.5) return 'text-green-600 font-semibold';
    if (score >= 4.0) return 'text-blue-600 font-semibold';
    if (score >= 3.5) return 'text-yellow-600 font-semibold';
    if (score > 0) return 'text-red-600 font-semibold';
    return 'text-gray-400';
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Auditorias Recentes</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentAudits.map((audit) => (
            <div
              key={audit.id}
              className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center space-x-4">
                {getStatusIcon(audit.status)}
                <div>
                  <h4 className="font-medium text-gray-900">{audit.title}</h4>
                  <div className="flex items-center space-x-3 text-sm text-gray-600 mt-1">
                    <span>Área: {audit.area}</span>
                    <span>•</span>
                    <span>Por: {audit.auditor}</span>
                    <span>•</span>
                    <span>{new Date(audit.date).toLocaleDateString('pt-BR')}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <div className={`text-lg ${getScoreColor(audit.score)}`}>
                    {audit.score > 0 ? `${audit.score}/5.0` : '--'}
                  </div>
                  {getStatusBadge(audit.status)}
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    <Eye className="w-4 h-4" />
                  </Button>
                  {audit.status === 'draft' && (
                    <Button variant="outline" size="sm">
                      <Edit className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentAudits;
