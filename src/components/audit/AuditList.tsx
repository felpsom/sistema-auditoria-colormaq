
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { useAudit } from '@/contexts/AuditContext';
import { useAuth } from '@/contexts/AuthContext';
import AuditHistoryCard from './AuditHistoryCard';
import { Search, Filter, Download, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';

const AuditList: React.FC = () => {
  const { audits, getUserAudits } = useAudit();
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedArea, setSelectedArea] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');

  // Get user's audits
  const userAudits = getUserAudits();
  
  // Filter audits based on search and filters
  const filteredAudits = userAudits.filter(audit => {
    const matchesSearch = audit.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         audit.area.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesArea = selectedArea === 'all' || audit.area === selectedArea;
    const matchesStatus = selectedStatus === 'all' || audit.status === selectedStatus;
    
    return matchesSearch && matchesArea && matchesStatus;
  });

  // Group audits by area
  const auditsByArea = filteredAudits.reduce((acc, audit) => {
    if (!acc[audit.area]) {
      acc[audit.area] = [];
    }
    acc[audit.area].push(audit);
    return acc;
  }, {} as Record<string, typeof filteredAudits>);

  // Get unique areas
  const areas = [...new Set(userAudits.map(audit => audit.area))];

  // Calculate statistics
  const totalAudits = userAudits.length;
  const completedAudits = userAudits.filter(audit => audit.status === 'completed').length;
  const draftAudits = userAudits.filter(audit => audit.status === 'draft').length;
  const approvedAudits = userAudits.filter(audit => audit.status === 'approved').length;

  const averageScore = completedAudits > 0 
    ? userAudits.filter(audit => audit.status === 'completed')
        .reduce((sum, audit) => sum + audit.percentageScore, 0) / completedAudits
    : 0;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center space-y-4 md:space-y-0">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Histórico de Auditorias</h1>
            <p className="text-gray-600 mt-1">Gerencie e acompanhe todas as auditorias realizadas</p>
          </div>
          <Link to="/audit/new">
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="w-4 h-4 mr-2" />
              Nova Auditoria
            </Button>
          </Link>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total de Auditorias</p>
                  <p className="text-2xl font-bold text-gray-900">{totalAudits}</p>
                </div>
                <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                  {areas.length} áreas
                </Badge>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Concluídas</p>
                  <p className="text-2xl font-bold text-green-600">{completedAudits}</p>
                </div>
                <Badge variant="secondary" className="bg-green-100 text-green-700">
                  {totalAudits > 0 ? Math.round((completedAudits / totalAudits) * 100) : 0}%
                </Badge>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Pontuação Média</p>
                  <p className="text-2xl font-bold text-blue-600">{averageScore.toFixed(1)}%</p>
                </div>
                <Badge variant="secondary" className={
                  averageScore >= 80 ? "bg-green-100 text-green-700" :
                  averageScore >= 60 ? "bg-yellow-100 text-yellow-700" :
                  "bg-red-100 text-red-700"
                }>
                  {averageScore >= 80 ? 'Excelente' : averageScore >= 60 ? 'Bom' : 'Crítico'}
                </Badge>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Rascunhos</p>
                  <p className="text-2xl font-bold text-yellow-600">{draftAudits}</p>
                </div>
                <Badge variant="secondary" className="bg-yellow-100 text-yellow-700">
                  Pendentes
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Buscar por título ou área..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={selectedArea} onValueChange={setSelectedArea}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Filtrar por área" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas as áreas</SelectItem>
                  {areas.map(area => (
                    <SelectItem key={area} value={area}>
                      {area.charAt(0).toUpperCase() + area.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Filtrar por status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os status</SelectItem>
                  <SelectItem value="draft">Rascunho</SelectItem>
                  <SelectItem value="completed">Concluída</SelectItem>
                  <SelectItem value="approved">Aprovada</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Audit Lists */}
        <Tabs defaultValue="all" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="all">Todas as Auditorias</TabsTrigger>
            <TabsTrigger value="by-area">Por Área</TabsTrigger>
            <TabsTrigger value="timeline">Linha do Tempo</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            {filteredAudits.length === 0 ? (
              <Card>
                <CardContent className="p-12 text-center">
                  <p className="text-gray-500 text-lg">Nenhuma auditoria encontrada</p>
                  <p className="text-gray-400 mt-2">Ajuste os filtros ou crie uma nova auditoria</p>
                </CardContent>
              </Card>
            ) : (
              filteredAudits
                .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                .map(audit => (
                  <AuditHistoryCard key={audit.id} audit={audit} />
                ))
            )}
          </TabsContent>

          <TabsContent value="by-area" className="space-y-6">
            {Object.keys(auditsByArea).length === 0 ? (
              <Card>
                <CardContent className="p-12 text-center">
                  <p className="text-gray-500 text-lg">Nenhuma auditoria encontrada</p>
                </CardContent>
              </Card>
            ) : (
              Object.entries(auditsByArea).map(([area, areaAudits]) => (
                <Card key={area}>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>{area.charAt(0).toUpperCase() + area.slice(1)}</span>
                      <Badge variant="outline">{areaAudits.length} auditorias</Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {areaAudits
                      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                      .map(audit => (
                        <AuditHistoryCard key={audit.id} audit={audit} compact />
                      ))}
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>

          <TabsContent value="timeline" className="space-y-4">
            {filteredAudits.length === 0 ? (
              <Card>
                <CardContent className="p-12 text-center">
                  <p className="text-gray-500 text-lg">Nenhuma auditoria encontrada</p>
                </CardContent>
              </Card>
            ) : (
              <div className="relative">
                {/* Timeline line */}
                <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-200"></div>
                
                {filteredAudits
                  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                  .map((audit, index) => (
                    <div key={audit.id} className="relative flex items-start space-x-6 pb-8">
                      {/* Timeline dot */}
                      <div className={`
                        relative z-10 flex items-center justify-center w-4 h-4 rounded-full border-2 
                        ${audit.status === 'completed' ? 'bg-green-500 border-green-500' :
                          audit.status === 'approved' ? 'bg-blue-500 border-blue-500' :
                          'bg-yellow-500 border-yellow-500'}
                      `}></div>
                      
                      {/* Audit card */}
                      <div className="flex-1">
                        <AuditHistoryCard audit={audit} compact />
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AuditList;
