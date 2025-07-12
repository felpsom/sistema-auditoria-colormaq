
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Filter } from 'lucide-react';

interface DashboardFiltersProps {
  selectedSetor: string;
  selectedArea: string;
  selectedSenso: string;
  onSetorChange: (value: string) => void;
  onAreaChange: (value: string) => void;
  onSensoChange: (value: string) => void;
}

const DashboardFilters: React.FC<DashboardFiltersProps> = ({
  selectedSetor,
  selectedArea,
  selectedSenso,
  onSetorChange,
  onAreaChange,
  onSensoChange
}) => {
  const setores = [
    'Todos',
    'Produção',
    'Estamparia',
    'Pintura',
    'Montagem',
    'Expedição',
    'Almoxarifado'
  ];

  const areas = [
    'Todas',
    'Linha A',
    'Linha B', 
    'Linha C',
    'Área Externa',
    'Escritório',
    'Vestiário'
  ];

  const sensos = [
    'Todos os Sensos',
    '1º Senso - Seiri (Organização)',
    '2º Senso - Seiton (Ordem)',
    '3º Senso - Seiso (Limpeza)',
    '4º Senso - Seiketsu (Padronização)',
    '5º Senso - Shitsuke (Disciplina)'
  ];

  return (
    <Card className="mb-6">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Filter className="w-5 h-5 text-blue-600" />
          Filtros de Análise
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Setor</label>
            <Select value={selectedSetor} onValueChange={onSetorChange}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione o setor" />
              </SelectTrigger>
              <SelectContent>
                {setores.map((setor) => (
                  <SelectItem key={setor} value={setor}>
                    {setor}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Área</label>
            <Select value={selectedArea} onValueChange={onAreaChange}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione a área" />
              </SelectTrigger>
              <SelectContent>
                {areas.map((area) => (
                  <SelectItem key={area} value={area}>
                    {area}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Senso</label>
            <Select value={selectedSenso} onValueChange={onSensoChange}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione o senso" />
              </SelectTrigger>
              <SelectContent>
                {sensos.map((senso) => (
                  <SelectItem key={senso} value={senso}>
                    {senso}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DashboardFilters;
