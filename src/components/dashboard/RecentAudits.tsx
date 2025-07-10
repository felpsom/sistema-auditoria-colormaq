import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Eye, Edit, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { useAudit } from '@/contexts/AuditContext';
import { Link, useNavigate } from 'react-router-dom';

const RecentAudits: React.FC = () => {
  const { getUserAudits } = useAudit();
  const navigate = useNavigate();
  
  // Get user's recent audits (last 4)
  const recentAudits = getUserAudits()
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 4);

  const handleViewAudit = (auditId: string) => {
    navigate(`/audits/${auditId}`);
  };

  const handleEditAudit = (auditId: string) => {
    navigate(`/audit/edit/${auditId}`);
  };

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
        return <Badge variant="secondary" className="bg-green-100 text-green-700 text-xs">Completa</Badge>;
      case 'approved':
        return <Badge variant="secondary" className="bg-blue-100 text-blue-700 text-xs">Aprovada</Badge>;
      case 'draft':
        return <Badge variant="secondary" className="bg-yellow-100 text-yellow-700 text-xs">Rascunho</Badge>;
      default:
        return <Badge variant="secondary" className="text-xs">Desconhecido</Badge>;
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600 font-semibold';
    if (score >= 60) return 'text-yellow-600 font-semibold';
    if (score > 0) return 'text-red-600 font-semibold';
    return 'text-gray-400';
  };

  if (recentAudits.length === 0) {
    return (
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base md:text-lg">Auditorias Recentes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <p className="text-gray-500 mb-4">Nenhuma auditoria encontrada</p>
            <Link to="/audit/new">
              <Button className="bg-blue-600 hover:bg-blue-700">
                Criar Primeira Auditoria
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="pb-3 flex flex-row items-center justify-between">
        <CardTitle className="text-base md:text-lg">Auditorias Recentes</CardTitle>
        <Link to="/audits">
          <Button variant="outline" size="sm">
            Ver Todas
          </Button>
        </Link>
      </CardHeader>
      <CardContent>
        <div className="space-y-3 md:space-y-4">
          {recentAudits.map((audit) => (
            <div
              key={audit.id}
              className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 md:p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors space-y-2 sm:space-y-0"
            >
              <div className="flex items-start space-x-3">
                {getStatusIcon(audit.status)}
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-gray-900 text-sm md:text-base truncate">{audit.title}</h4>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-3 text-xs md:text-sm text-gray-600 mt-1 space-y-1 sm:space-y-0">
                    <span>Área: {audit.area.charAt(0).toUpperCase() + audit.area.slice(1)}</span>
                    <span className="hidden sm:inline">•</span>
                    <span>Por: {audit.auditorName}</span>
                    <span className="hidden sm:inline">•</span>
                    <span>{new Date(audit.date).toLocaleDateString('pt-BR')}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between sm:justify-end sm:space-x-4">
                <div className="flex items-center space-x-2">
                  <div className={`text-base md:text-lg ${getScoreColor(audit.percentageScore)}`}>
                    {audit.percentageScore > 0 ? `${audit.percentageScore.toFixed(1)}%` : '--'}
                  </div>
                  {getStatusBadge(audit.status)}
                </div>
                <div className="flex space-x-1 md:space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="h-8 w-8 p-0"
                    onClick={() => handleViewAudit(audit.id)}
                    title="Visualizar auditoria"
                  >
                    <Eye className="w-3 h-3 md:w-4 md:h-4" />
                  </Button>
                  {audit.status === 'draft' && (
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="h-8 w-8 p-0"
                      onClick={() => handleEditAudit(audit.id)}
                      title="Editar auditoria"
                    >
                      <Edit className="w-3 h-3 md:w-4 md:h-4" />
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
