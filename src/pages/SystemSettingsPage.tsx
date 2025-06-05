
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Settings, Database, Users, Shield, Mail } from 'lucide-react';

const SystemSettingsPage: React.FC = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const [systemSettings, setSystemSettings] = useState({
    general: {
      siteName: 'Sistema Colormaq de Produção',
      timezone: 'America/Sao_Paulo',
      language: 'pt-BR',
      maintenanceMode: false,
    },
    audit: {
      autoApproval: false,
      reminderFrequency: '7',
      scoreThreshold: '70',
      allowSelfAudit: true,
    },
    notifications: {
      emailEnabled: true,
      smtpServer: 'smtp.gmail.com',
      smtpPort: '587',
      emailFrom: 'sistema@colormaq.com',
    },
    security: {
      sessionTimeout: '60',
      passwordMinLength: '8',
      requireTwoFactor: false,
      allowGuestAccess: false,
    }
  });

  const handleSave = async () => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast({
        title: "Configurações do sistema salvas",
        description: "As configurações foram atualizadas com sucesso.",
      });
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro ao salvar configurações do sistema.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4 md:p-6 max-w-4xl">
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Configurações do Sistema</h1>
        <p className="text-gray-600 mt-2">Gerencie as configurações globais do sistema</p>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="general" className="flex items-center gap-2">
            <Settings className="w-4 h-4" />
            <span className="hidden sm:inline">Geral</span>
          </TabsTrigger>
          <TabsTrigger value="audit" className="flex items-center gap-2">
            <Database className="w-4 h-4" />
            <span className="hidden sm:inline">Auditoria</span>
          </TabsTrigger>
          <TabsTrigger value="users" className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            <span className="hidden sm:inline">Usuários</span>
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-2">
            <Mail className="w-4 h-4" />
            <span className="hidden sm:inline">Email</span>
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2">
            <Shield className="w-4 h-4" />
            <span className="hidden sm:inline">Segurança</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>Configurações Gerais</CardTitle>
              <CardDescription>
                Configure as informações básicas do sistema
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="siteName">Nome do Sistema</Label>
                <Input
                  id="siteName"
                  value={systemSettings.general.siteName}
                  onChange={(e) => setSystemSettings({
                    ...systemSettings,
                    general: {...systemSettings.general, siteName: e.target.value}
                  })}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="timezone">Fuso Horário</Label>
                  <Select
                    value={systemSettings.general.timezone}
                    onValueChange={(value) => setSystemSettings({
                      ...systemSettings,
                      general: {...systemSettings.general, timezone: value}
                    })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="America/Sao_Paulo">São Paulo (GMT-3)</SelectItem>
                      <SelectItem value="America/New_York">Nova York (GMT-5)</SelectItem>
                      <SelectItem value="Europe/London">Londres (GMT+0)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="language">Idioma</Label>
                  <Select
                    value={systemSettings.general.language}
                    onValueChange={(value) => setSystemSettings({
                      ...systemSettings,
                      general: {...systemSettings.general, language: value}
                    })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pt-BR">Português (Brasil)</SelectItem>
                      <SelectItem value="en-US">English (US)</SelectItem>
                      <SelectItem value="es-ES">Español</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Modo de Manutenção</Label>
                  <p className="text-sm text-muted-foreground">
                    Ativar modo de manutenção para bloquear o acesso ao sistema
                  </p>
                </div>
                <Switch
                  checked={systemSettings.general.maintenanceMode}
                  onCheckedChange={(checked) => 
                    setSystemSettings({
                      ...systemSettings,
                      general: {...systemSettings.general, maintenanceMode: checked}
                    })
                  }
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="audit">
          <Card>
            <CardHeader>
              <CardTitle>Configurações de Auditoria</CardTitle>
              <CardDescription>
                Configure as regras e parâmetros das auditorias
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Aprovação Automática</Label>
                  <p className="text-sm text-muted-foreground">
                    Aprovar automaticamente auditorias que atingem o score mínimo
                  </p>
                </div>
                <Switch
                  checked={systemSettings.audit.autoApproval}
                  onCheckedChange={(checked) => 
                    setSystemSettings({
                      ...systemSettings,
                      audit: {...systemSettings.audit, autoApproval: checked}
                    })
                  }
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="reminderFrequency">Frequência de Lembretes (dias)</Label>
                  <Select
                    value={systemSettings.audit.reminderFrequency}
                    onValueChange={(value) => setSystemSettings({
                      ...systemSettings,
                      audit: {...systemSettings.audit, reminderFrequency: value}
                    })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">Diário</SelectItem>
                      <SelectItem value="7">Semanal</SelectItem>
                      <SelectItem value="15">Quinzenal</SelectItem>
                      <SelectItem value="30">Mensal</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="scoreThreshold">Score Mínimo (%)</Label>
                  <Input
                    id="scoreThreshold"
                    type="number"
                    min="0"
                    max="100"
                    value={systemSettings.audit.scoreThreshold}
                    onChange={(e) => setSystemSettings({
                      ...systemSettings,
                      audit: {...systemSettings.audit, scoreThreshold: e.target.value}
                    })}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Permitir Auto-Auditoria</Label>
                  <p className="text-sm text-muted-foreground">
                    Permitir que usuários auditem suas próprias áreas
                  </p>
                </div>
                <Switch
                  checked={systemSettings.audit.allowSelfAudit}
                  onCheckedChange={(checked) => 
                    setSystemSettings({
                      ...systemSettings,
                      audit: {...systemSettings.audit, allowSelfAudit: checked}
                    })
                  }
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users">
          <Card>
            <CardHeader>
              <CardTitle>Gerenciamento de Usuários</CardTitle>
              <CardDescription>
                Configure as políticas de usuários do sistema
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <Button variant="outline" className="w-full justify-start">
                  Exportar lista de usuários
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  Importar usuários em massa
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  Configurar perfis de acesso
                </Button>
              </div>

              <div className="pt-4 border-t">
                <h4 className="font-medium mb-4">Estatísticas de Usuários</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">45</div>
                    <div className="text-sm text-gray-600">Total</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">38</div>
                    <div className="text-sm text-gray-600">Ativos</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-600">5</div>
                    <div className="text-sm text-gray-600">Admins</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-600">2</div>
                    <div className="text-sm text-gray-600">Inativos</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Configurações de Email</CardTitle>
              <CardDescription>
                Configure o servidor SMTP para envio de emails
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between mb-4">
                <div className="space-y-0.5">
                  <Label>Email Habilitado</Label>
                  <p className="text-sm text-muted-foreground">
                    Ativar envio de emails do sistema
                  </p>
                </div>
                <Switch
                  checked={systemSettings.notifications.emailEnabled}
                  onCheckedChange={(checked) => 
                    setSystemSettings({
                      ...systemSettings,
                      notifications: {...systemSettings.notifications, emailEnabled: checked}
                    })
                  }
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="smtpServer">Servidor SMTP</Label>
                  <Input
                    id="smtpServer"
                    value={systemSettings.notifications.smtpServer}
                    onChange={(e) => setSystemSettings({
                      ...systemSettings,
                      notifications: {...systemSettings.notifications, smtpServer: e.target.value}
                    })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="smtpPort">Porta SMTP</Label>
                  <Input
                    id="smtpPort"
                    value={systemSettings.notifications.smtpPort}
                    onChange={(e) => setSystemSettings({
                      ...systemSettings,
                      notifications: {...systemSettings.notifications, smtpPort: e.target.value}
                    })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="emailFrom">Email Remetente</Label>
                <Input
                  id="emailFrom"
                  type="email"
                  value={systemSettings.notifications.emailFrom}
                  onChange={(e) => setSystemSettings({
                    ...systemSettings,
                    notifications: {...systemSettings.notifications, emailFrom: e.target.value}
                  })}
                />
              </div>

              <Button variant="outline" className="w-full">
                Testar configuração de email
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Configurações de Segurança</CardTitle>
              <CardDescription>
                Configure as políticas de segurança do sistema
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="sessionTimeout">Timeout de Sessão (minutos)</Label>
                  <Input
                    id="sessionTimeout"
                    type="number"
                    value={systemSettings.security.sessionTimeout}
                    onChange={(e) => setSystemSettings({
                      ...systemSettings,
                      security: {...systemSettings.security, sessionTimeout: e.target.value}
                    })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="passwordMinLength">Tamanho Mínimo da Senha</Label>
                  <Input
                    id="passwordMinLength"
                    type="number"
                    min="6"
                    max="20"
                    value={systemSettings.security.passwordMinLength}
                    onChange={(e) => setSystemSettings({
                      ...systemSettings,
                      security: {...systemSettings.security, passwordMinLength: e.target.value}
                    })}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Exigir Autenticação de Dois Fatores</Label>
                  <p className="text-sm text-muted-foreground">
                    Obrigar todos os usuários a usar 2FA
                  </p>
                </div>
                <Switch
                  checked={systemSettings.security.requireTwoFactor}
                  onCheckedChange={(checked) => 
                    setSystemSettings({
                      ...systemSettings,
                      security: {...systemSettings.security, requireTwoFactor: checked}
                    })
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Permitir Acesso de Convidados</Label>
                  <p className="text-sm text-muted-foreground">
                    Permitir visualização limitada sem login
                  </p>
                </div>
                <Switch
                  checked={systemSettings.security.allowGuestAccess}
                  onCheckedChange={(checked) => 
                    setSystemSettings({
                      ...systemSettings,
                      security: {...systemSettings.security, allowGuestAccess: checked}
                    })
                  }
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end pt-6">
        <Button onClick={handleSave} disabled={isLoading} className="min-w-[120px]">
          {isLoading ? "Salvando..." : "Salvar configurações"}
        </Button>
      </div>
    </div>
  );
};

export default SystemSettingsPage;
