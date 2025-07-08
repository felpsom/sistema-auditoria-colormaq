import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { useAudit } from '@/contexts/AuditContext';
import { useAuth } from '@/contexts/AuthContext';
import { AUDIT_QUESTIONS, AuditResponse } from '@/types/audit';
import { Save, Send, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AuditForm: React.FC = () => {
  const { createAudit, updateAudit } = useAudit();
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    title: '',
    area: '',
    observations: ''
  });
  const [responses, setResponses] = useState<Record<string, AuditResponse>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const handleResponseChange = (questionId: string, score: number, comments?: string) => {
    setResponses(prev => ({
      ...prev,
      [questionId]: {
        questionId,
        score,
        comments: comments || prev[questionId]?.comments || ''
      }
    }));
  };

  const calculateCategoryScore = (category: string): number => {
    const categoryQuestions = AUDIT_QUESTIONS.filter(q => q.category === category);
    const categoryResponses = categoryQuestions.filter(q => responses[q.id]);
    
    if (categoryResponses.length === 0) return 0;
    
    const total = categoryResponses.reduce((sum, q) => sum + responses[q.id].score, 0);
    return total / categoryResponses.length;
  };

  const calculateCategoryPercentage = (category: string): number => {
    const score = calculateCategoryScore(category);
    return (score / 5) * 100;
  };

  const getTotalScore = (): number => {
    const answeredQuestions = Object.keys(responses);
    if (answeredQuestions.length === 0) return 0;
    
    const total = answeredQuestions.reduce((sum, qId) => sum + responses[qId].score, 0);
    return total / answeredQuestions.length;
  };

  const getTotalPercentage = (): number => {
    return (getTotalScore() / 5) * 100;
  };

  const getScoreColor = (score: number) => {
    if (score >= 4.5) return 'bg-green-100 text-green-700 border-green-300';
    if (score >= 4.0) return 'bg-blue-100 text-blue-700 border-blue-300';
    if (score >= 3.5) return 'bg-yellow-100 text-yellow-700 border-yellow-300';
    if (score > 0) return 'bg-red-100 text-red-700 border-red-300';
    return 'bg-gray-100 text-gray-700 border-gray-300';
  };

  const getPercentageColor = (percentage: number) => {
    if (percentage >= 90) return 'bg-green-500';
    if (percentage >= 80) return 'bg-blue-500';
    if (percentage >= 70) return 'bg-yellow-500';
    if (percentage >= 60) return 'bg-orange-500';
    return 'bg-red-500';
  };

  const categoryNames = {
    '5S1': 'SEIRI - Classificar',
    '5S2': 'SEITON - Organizar', 
    '5S3': 'SEISO - Limpar',
    '5S4': 'SEIKETSU - Padronizar',
    '5S5': 'SHITSUKE - Disciplina'
  };

  const categories = ['5S1', '5S2', '5S3', '5S4', '5S5'];

  const handleSaveDraft = async () => {
    if (!formData.title.trim()) {
      toast({
        title: "Erro",
        description: "Por favor, preencha o título da auditoria",
        variant: "destructive"
      });
      return;
    }

    if (!user) {
      toast({
        title: "Erro",
        description: "Usuário não autenticado",
        variant: "destructive"
      });
      return;
    }

    try {
      const responsesArray = Object.values(responses);
      const totalScore = getTotalScore();
      const maxScore = 5;
      const percentageScore = getTotalPercentage();

      const auditData = {
        title: formData.title,
        area: formData.area,
        auditorId: user.id,
        auditorName: user.name,
        date: new Date().toISOString().split('T')[0],
        status: 'draft' as const,
        responses: responsesArray,
        totalScore,
        maxScore,
        percentageScore,
        recommendations: [formData.observations].filter(Boolean)
      };

      createAudit(auditData);
      
      toast({
        title: "Sucesso",
        description: "Rascunho salvo com sucesso!",
        variant: "default"
      });
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro ao salvar rascunho",
        variant: "destructive"
      });
    }
  };

  const handleSubmit = async () => {
    if (!formData.title.trim() || !formData.area.trim()) {
      toast({
        title: "Erro",
        description: "Por favor, preencha todos os campos obrigatórios",
        variant: "destructive"
      });
      return;
    }

    if (Object.keys(responses).length === 0) {
      toast({
        title: "Erro",
        description: "Por favor, responda pelo menos uma pergunta",
        variant: "destructive"
      });
      return;
    }

    if (!user) {
      toast({
        title: "Erro",
        description: "Usuário não autenticado",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const responsesArray = Object.values(responses);
      const totalScore = getTotalScore();
      const maxScore = 5;
      const percentageScore = getTotalPercentage();

      const auditData = {
        title: formData.title,
        area: formData.area,
        auditorId: user.id,
        auditorName: user.name,
        date: new Date().toISOString().split('T')[0],
        status: 'completed' as const,
        responses: responsesArray,
        totalScore,
        maxScore,
        percentageScore,
        recommendations: [formData.observations].filter(Boolean)
      };

      const auditId = createAudit(auditData);
      
      toast({
        title: "Sucesso",
        description: "Auditoria finalizada com sucesso!",
        variant: "default"
      });

      // Mostrar resultados
      setShowResults(true);
      
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro ao finalizar auditoria",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleResults = () => {
    setShowResults(!showResults);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Nova Auditoria 5S</h1>
            <p className="text-gray-600 mt-1">Preencha todos os campos para criar uma auditoria completa</p>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" onClick={toggleResults}>
              <Eye className="w-4 h-4 mr-2" />
              {showResults ? 'Ocultar' : 'Visualizar'} Resultados
            </Button>
            <Button variant="outline" onClick={handleSaveDraft}>
              <Save className="w-4 h-4 mr-2" />
              Salvar Rascunho
            </Button>
            <Button 
              className="bg-blue-600 hover:bg-blue-700" 
              onClick={handleSubmit}
              disabled={isSubmitting}
            >
              <Send className="w-4 h-4 mr-2" />
              {isSubmitting ? 'Finalizando...' : 'Finalizar Auditoria'}
            </Button>
          </div>
        </div>

        {/* Results Panel */}
        {showResults && (
          <Card className="bg-blue-50 border-blue-200">
            <CardHeader>
              <CardTitle className="text-blue-900">Resultados da Auditoria - Visualização</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Score Summary */}
              <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
                {categories.map(category => {
                  const score = calculateCategoryScore(category);
                  const percentage = calculateCategoryPercentage(category);
                  return (
                    <div key={category} className={`p-3 rounded-lg border-2 text-center ${getScoreColor(score)}`}>
                      <div className="text-xs font-medium mb-1">{category}</div>
                      <div className="text-lg font-bold">{score.toFixed(1)}/5.0</div>
                      <div className="text-sm">{percentage.toFixed(1)}%</div>
                      <div className={`w-full h-2 rounded-full mt-2 ${getPercentageColor(percentage)}`}></div>
                    </div>
                  );
                })}
                <div className={`p-3 rounded-lg border-2 text-center ${getScoreColor(getTotalScore())}`}>
                  <div className="text-xs font-medium mb-1">TOTAL</div>
                  <div className="text-lg font-bold">{getTotalScore().toFixed(1)}/5.0</div>
                  <div className="text-sm">{getTotalPercentage().toFixed(1)}%</div>
                  <div className={`w-full h-2 rounded-full mt-2 ${getPercentageColor(getTotalPercentage())}`}></div>
                </div>
              </div>

              {/* Detailed Results */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold mb-2">Pontuação por Categoria:</h4>
                  <ul className="space-y-1 text-sm">
                    {categories.map(category => (
                      <li key={category} className="flex justify-between">
                        <span>{categoryNames[category as keyof typeof categoryNames]}</span>
                        <span className="font-medium">{calculateCategoryScore(category).toFixed(1)}/5.0 ({calculateCategoryPercentage(category).toFixed(1)}%)</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Resumo Geral:</h4>
                  <ul className="space-y-1 text-sm">
                    <li className="flex justify-between">
                      <span>Perguntas Respondidas:</span>
                      <span className="font-medium">{Object.keys(responses).length}/{AUDIT_QUESTIONS.length}</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Pontuação Total:</span>
                      <span className="font-medium">{getTotalScore().toFixed(1)}/5.0</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Percentual Total:</span>
                      <span className="font-medium">{getTotalPercentage().toFixed(1)}%</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Status:</span>
                      <span className={`font-medium ${getTotalPercentage() >= 80 ? 'text-green-600' : getTotalPercentage() >= 60 ? 'text-yellow-600' : 'text-red-600'}`}>
                        {getTotalPercentage() >= 80 ? 'Excelente' : getTotalPercentage() >= 60 ? 'Bom' : 'Precisa Melhorar'}
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Basic Information */}
        <Card className="audit-form">
          <CardHeader>
            <CardTitle>Informações Básicas</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Título da Auditoria *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Ex: Auditoria 5S - Linha de Produção A"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="area">Área/Setor *</Label>
                <Select onValueChange={(value) => setFormData(prev => ({ ...prev, area: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione a área" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="producao">Produção</SelectItem>
                    <SelectItem value="logistica">Logística</SelectItem>
                    <SelectItem value="manutencao">Manutenção</SelectItem>
                    <SelectItem value="qualidade">Qualidade</SelectItem>
                    <SelectItem value="administrativo">Administrativo</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Score Summary */}
        <Card>
          <CardHeader>
            <CardTitle>Resumo das Pontuações</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
              {categories.map(category => {
                const score = calculateCategoryScore(category);
                const percentage = calculateCategoryPercentage(category);
                return (
                  <div key={category} className={`p-3 rounded-lg border-2 text-center ${getScoreColor(score)}`}>
                    <div className="text-xs font-medium mb-1">{category}</div>
                    <div className="text-lg font-bold">{score.toFixed(1)}/5.0</div>
                    <div className="text-sm">{percentage.toFixed(1)}%</div>
                  </div>
                );
              })}
              <div className={`p-3 rounded-lg border-2 text-center ${getScoreColor(getTotalScore())}`}>
                <div className="text-xs font-medium mb-1">TOTAL</div>
                <div className="text-lg font-bold">{getTotalScore().toFixed(1)}/5.0</div>
                <div className="text-sm">{getTotalPercentage().toFixed(1)}%</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Questions by Category */}
        {categories.map(category => {
          const score = calculateCategoryScore(category);
          const percentage = calculateCategoryPercentage(category);
          return (
            <Card key={category} className="audit-form">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  {categoryNames[category as keyof typeof categoryNames]}
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline" className={getScoreColor(score)}>
                      {score.toFixed(1)}/5.0
                    </Badge>
                    <Badge variant="outline" className={getScoreColor(score)}>
                      {percentage.toFixed(1)}%
                    </Badge>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {AUDIT_QUESTIONS.filter(q => q.category === category).map(question => (
                  <div key={question.id} className="space-y-3">
                    <Label className="text-base font-medium">{question.question}</Label>
                    <div className="flex space-x-2">
                      {[0, 1, 2, 3, 4, 5].map(score => (
                        <Button
                          key={score}
                          variant={responses[question.id]?.score === score ? "default" : "outline"}
                          size="sm"
                          onClick={() => handleResponseChange(question.id, score, responses[question.id]?.comments)}
                          className={`w-12 h-10 ${responses[question.id]?.score === score ? 'bg-blue-600 text-white' : ''}`}
                        >
                          {score}
                        </Button>
                      ))}
                    </div>
                    <Textarea
                      placeholder="Observações (opcional)"
                      value={responses[question.id]?.comments || ''}
                      onChange={(e) => handleResponseChange(question.id, responses[question.id]?.score || 0, e.target.value)}
                      className="text-sm"
                      rows={2}
                    />
                  </div>
                ))}
              </CardContent>
            </Card>
          );
        })}

        {/* General Observations */}
        <Card className="audit-form">
          <CardHeader>
            <CardTitle>Observações Gerais</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder="Observações gerais sobre a auditoria, recomendações e planos de ação..."
              value={formData.observations}
              onChange={(e) => setFormData(prev => ({ ...prev, observations: e.target.value }))}
              rows={4}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AuditForm;
