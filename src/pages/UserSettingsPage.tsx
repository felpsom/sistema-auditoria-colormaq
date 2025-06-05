
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Switch } from '@/components/ui/switch';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { User, Bell, Shield, Eye } from 'lucide-react';

const UserSettingsPage: React.FC = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const [userSettings, setUserSettings] = useState({
    name: user?.name || '',
    email: user?.email || '',
    company: user?.company || '',
    notifications: {
      email: true,
      push: false,
      auditReminders: true,
    },
    privacy: {
      showProfile: true,
      shareActivity: false,
    }
  });

  const handleSave = async () => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast({
        title: "Configurações salvas",
        description: "Suas configurações foram atualizadas com sucesso.",
      });
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro ao salvar configurações.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4 md:p-6 max-w-4xl">
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Configurações do Usuário</h1>
        <p className="text-gray-600 mt-2">Gerencie suas informações pessoais e preferências</p>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="profile" className="flex items-center gap-2">
            <User className="w-4 h-4" />
            <span className="hidden sm:inline">Perfil</span>
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-2">
            <Bell className="w-4 h-4" />
            <span className="hidden sm:inline">Notificações</span>
          </TabsTrigger>
          <TabsTrigger value="privacy" className="flex items-center gap-2">
            <Eye className="w-4 h-4" />
            <span className="hidden sm:inline">Privacidade</span>
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2">
            <Shield className="w-4 h-4" />
            <span className="hidden sm:inline">Segurança</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>Informações do Perfil</CardTitle>
              <CardDescription>
                Atualize suas informações pessoais e de contato
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center space-x-4">
                <Avatar className="w-20 h-20">
                  <AvatarFallback className="text-lg">{user?.name?.charAt(0)}</AvatarFallback>
                </Avatar>
                <Button variant="outline">Alterar foto</Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome completo</Label>
                  <Input
                    id="name"
                    value={userSettings.name}
                    onChange={(e) => setUserSettings({...userSettings, name: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={userSettings.email}
                    onChange={(e) => setUserSettings({...userSettings, email: e.target.value})}
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="company">Empresa</Label>
                  <Input
                    id="company"
                    value={userSettings.company}
                    onChange={(e) => setUserSettings({...userSettings, company: e.target.value})}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Preferências de Notificação</CardTitle>
              <CardDescription>
                Configure como e quando você deseja receber notificações
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Notificações por email</Label>
                  <p className="text-sm text-muted-foreground">
                    Receba atualizações importantes por email
                  </p>
                </div>
                <Switch
                  checked={userSettings.notifications.email}
                  onCheckedChange={(checked) => 
                    setUserSettings({
                      ...userSettings,
                      notifications: {...userSettings.notifications, email: checked}
                    })
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Notificações push</Label>
                  <p className="text-sm text-muted-foreground">
                    Receba notificações em tempo real no navegador
                  </p>
                </div>
                <Switch
                  checked={userSettings.notifications.push}
                  onCheckedChange={(checked) => 
                    setUserSettings({
                      ...userSettings,
                      notifications: {...userSettings.notifications, push: checked}
                    })
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Lembretes de auditoria</Label>
                  <p className="text-sm text-muted-foreground">
                    Receba lembretes sobre auditorias pendentes
                  </p>
                </div>
                <Switch
                  checked={userSettings.notifications.auditReminders}
                  onCheckedChange={(checked) => 
                    setUserSettings({
                      ...userSettings,
                      notifications: {...userSettings.notifications, auditReminders: checked}
                    })
                  }
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="privacy">
          <Card>
            <CardHeader>
              <CardTitle>Configurações de Privacidade</CardTitle>
              <CardDescription>
                Controle a visibilidade do seu perfil e atividades
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Perfil público</Label>
                  <p className="text-sm text-muted-foreground">
                    Permitir que outros usuários vejam seu perfil
                  </p>
                </div>
                <Switch
                  checked={userSettings.privacy.showProfile}
                  onCheckedChange={(checked) => 
                    setUserSettings({
                      ...userSettings,
                      privacy: {...userSettings.privacy, showProfile: checked}
                    })
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Compartilhar atividade</Label>
                  <p className="text-sm text-muted-foreground">
                    Permitir que outros vejam suas atividades recentes
                  </p>
                </div>
                <Switch
                  checked={userSettings.privacy.shareActivity}
                  onCheckedChange={(checked) => 
                    setUserSettings({
                      ...userSettings,
                      privacy: {...userSettings.privacy, shareActivity: checked}
                    })
                  }
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Segurança da Conta</CardTitle>
              <CardDescription>
                Gerencie a segurança da sua conta e senhas
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <Button variant="outline" className="w-full justify-start">
                  Alterar senha
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  Configurar autenticação de dois fatores
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  Ver dispositivos conectados
                </Button>
              </div>

              <div className="pt-4 border-t">
                <h4 className="font-medium text-red-600 mb-2">Zona de Perigo</h4>
                <Button variant="destructive" className="w-full">
                  Excluir conta
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end pt-6">
        <Button onClick={handleSave} disabled={isLoading} className="min-w-[120px]">
          {isLoading ? "Salvando..." : "Salvar alterações"}
        </Button>
      </div>
    </div>
  );
};

export default UserSettingsPage;
