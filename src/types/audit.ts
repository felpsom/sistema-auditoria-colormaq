
export interface AuditQuestion {
  id: string;
  category: '5S1' | '5S2' | '5S3' | '5S4' | '5S5';
  question: string;
  weight: number;
}

export interface AuditResponse {
  questionId: string;
  score: number; // 0-5 scale
  comments?: string;
  evidence?: string; // URL to photo/document
}

export interface Audit {
  id: string;
  title: string;
  area: string;
  auditorId: string;
  auditorName: string;
  date: string;
  status: 'draft' | 'completed' | 'approved';
  responses: AuditResponse[];
  totalScore: number;
  maxScore: number;
  percentageScore: number;
  recommendations: string[];
  createdAt: string;
  updatedAt: string;
}

export interface AuditMetrics {
  totalAudits: number;
  averageScore: number;
  improvementTrend: number;
  criticalIssues: number;
  byCategory: {
    seiri: number;
    seiton: number;
    seiso: number;
    seiketsu: number;
    shitsuke: number;
  };
}

export const AUDIT_QUESTIONS: AuditQuestion[] = [
  // SEIRI (Classificar)
  { id: '1', category: '5S1', question: 'Área está livre de itens desnecessários?', weight: 1 },
  { id: '2', category: '5S1', question: 'Materiais obsoletos foram removidos?', weight: 1 },
  { id: '3', category: '5S1', question: 'Existe identificação clara do que é necessário?', weight: 1 },
  { id: '4', category: '5S1', question: 'Quantidade adequada de materiais no posto?', weight: 1 },
  
  // SEITON (Organizar)
  { id: '5', category: '5S2', question: 'Cada item tem um local específico definido?', weight: 1 },
  { id: '6', category: '5S2', question: 'Locais estão claramente identificados?', weight: 1 },
  { id: '7', category: '5S2', question: 'Itens são facilmente localizados?', weight: 1 },
  { id: '8', category: '5S2', question: 'Layout facilita o fluxo de trabalho?', weight: 1 },
  
  // SEISO (Limpar)
  { id: '9', category: '5S3', question: 'Área está limpa e livre de sujeira?', weight: 1 },
  { id: '10', category: '5S3', question: 'Equipamentos estão limpos?', weight: 1 },
  { id: '11', category: '5S3', question: 'Existe rotina de limpeza estabelecida?', weight: 1 },
  { id: '12', category: '5S3', question: 'Materiais de limpeza estão disponíveis?', weight: 1 },
  
  // SEIKETSU (Padronizar)
  { id: '13', category: '5S4', question: 'Padrões visuais estão implantados?', weight: 1 },
  { id: '14', category: '5S4', question: 'Procedimentos estão documentados?', weight: 1 },
  { id: '15', category: '5S4', question: 'Colaboradores conhecem os padrões?', weight: 1 },
  { id: '16', category: '5S4', question: 'Padrões são seguidos consistentemente?', weight: 1 },
  
  // SHITSUKE (Disciplina)
  { id: '17', category: '5S5', question: 'Colaboradores seguem os 4S anteriores?', weight: 1 },
  { id: '18', category: '5S5', question: 'Existe comprometimento da liderança?', weight: 1 },
  { id: '19', category: '5S5', question: 'Melhorias são sugeridas pelos colaboradores?', weight: 1 },
  { id: '20', category: '5S5', question: 'Existe cultura de melhoria contínua?', weight: 1 },
];
