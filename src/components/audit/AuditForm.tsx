
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { AUDIT_QUESTIONS, AuditResponse } from '@/types/audit';
import { Save, Send } from 'lucide-react';

const AuditForm: React.FC = () => {
  const [formData, setFormData] = useState({
    title: '',
    area: '',
    observations: ''
  });
  const [responses, setResponses] = useState<Record<string, AuditResponse>>({});

  const handleResponseChange = (questionId: string, score: number, comments?: string) => {
    setResponses(prev => ({
      ...prev,
      [questionId]: {
        questionId,
        score,
        comments
      }
    }));
  };

  const calculateCategoryScore = (category: string): string => {
    const categoryQuestions = AUDIT_QUESTIONS.filter(q => q.category === category);
    const categoryResponses = categoryQuestions.filter(q => responses[q.id]);
    
    if (categoryResponses.length === 0) return '0.0';
    
    const total = categoryResponses.reduce((sum, q) => sum + responses[q.id].score, 0);
    return (total / categoryResponses.length).toFixed(1);
  };

  const getTotalScore = (): string => {
    const answeredQuestions = Object.keys(responses);
    if (answeredQuestions.length === 0) return '0.0';
    
    const total = answeredQuestions.reduce((sum, qId) => sum + responses[qId].score, 0);
    return (total / answeredQuestions.length).toFixed(1);
  };

  const getScoreColor = (score: number) => {
    if (score >= 4.5) return 'bg-green-100 text-green-700 border-green-300';
    if (score >= 4.0) return 'bg-blue-100 text-blue-700 border-blue-300';
    if (score >= 3.5) return 'bg-yellow-100 text-yellow-700 border-yellow-300';
    if (score > 0) return 'bg-red-100 text-red-700 border-red-300';
    return 'bg-gray-100 text-gray-700 border-gray-300';
  };

  const categoryNames = {
    '5S1': 'SEIRI - Classificar',
    '5S2': 'SEITON - Organizar', 
    '5S3': 'SEISO - Limpar',
    '5S4': 'SEIKETSU - Padronizar',
    '5S5': 'SHITSUKE - Disciplina'
  };

  const categories = ['5S1', '5S2', '5S3', '5S4', '5S5'];

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
            <Button variant="outline">
              <Save className="w-4 h-4 mr-2" />
              Salvar Rascunho
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Send className="w-4 h-4 mr-2" />
              Finalizar Auditoria
            </Button>
          </div>
        </div>

        {/* Basic Information */}
        <Card className="audit-form">
          <CardHeader>
            <CardTitle>Informações Básicas</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Título da Auditoria</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Ex: Auditoria 5S - Linha de Produção A"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="area">Área/Setor</Label>
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
                const scoreString = calculateCategoryScore(category);
                const score = parseFloat(scoreString);
                return (
                  <div key={category} className={`p-3 rounded-lg border-2 text-center ${getScoreColor(score)}`}>
                    <div className="text-xs font-medium mb-1">{category}</div>
                    <div className="text-lg font-bold">{scoreString}/5.0</div>
                  </div>
                );
              })}
              <div className={`p-3 rounded-lg border-2 text-center ${getScoreColor(parseFloat(getTotalScore()))}`}>
                <div className="text-xs font-medium mb-1">TOTAL</div>
                <div className="text-lg font-bold">{getTotalScore()}/5.0</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Questions by Category */}
        {categories.map(category => {
          const scoreString = calculateCategoryScore(category);
          const score = parseFloat(scoreString);
          return (
            <Card key={category} className="audit-form">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  {categoryNames[category as keyof typeof categoryNames]}
                  <Badge variant="outline" className={getScoreColor(score)}>
                    {scoreString}/5.0
                  </Badge>
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
