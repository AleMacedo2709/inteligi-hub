import { useState } from "react"
import { 
  Settings, 
  User, 
  Bell, 
  Shield, 
  Database,
  Palette,
  Mail,
  Globe,
  Download,
  Upload,
  Key,
  Users,
  Activity
} from "lucide-react"
import { AppLayout } from "@/components/layout/AppLayout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

// Mock data
const currentUser = {
  nome: "João Silva",
  email: "joao.silva@institucional.gov.br",
  cargo: "Coordenador de Planejamento",
  departamento: "Secretaria de Gestão",
  telefone: "(61) 3333-4444",
  iniciais: "JS"
}

const systemSettings = {
  nomeInstituicao: "Ministério da Administração Pública",
  logoUrl: "",
  emailNotificacoes: "spe@institucional.gov.br",
  timezone: "America/Sao_Paulo",
  idioma: "pt-BR",
  theme: "light"
}

const notificationSettings = {
  emailIndicadores: true,
  emailTarefas: true,
  emailPrazos: true,
  emailRelatorios: false,
  pushNotifications: true,
  frequenciaResumo: "semanal"
}

const securitySettings = {
  twoFactorAuth: false,
  sessionTimeout: 480, // minutes
  passwordExpiry: 90, // days
  auditLog: true
}

const integrationSettings = {
  azureAdEnabled: true,
  seiEnabled: true,
  emailEnabled: true,
  apiEnabled: false
}

export default function Configuracoes() {
  const [activeTab, setActiveTab] = useState("perfil")

  return (
    <AppLayout>
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground flex items-center">
              <Settings className="h-8 w-8 mr-3 text-primary" />
              Configurações
            </h1>
            <p className="text-muted-foreground">
              Gerencie as configurações do sistema e sua conta
            </p>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="perfil">Perfil</TabsTrigger>
            <TabsTrigger value="sistema">Sistema</TabsTrigger>
            <TabsTrigger value="notificacoes">Notificações</TabsTrigger>
            <TabsTrigger value="seguranca">Segurança</TabsTrigger>
            <TabsTrigger value="integracoes">Integrações</TabsTrigger>
            <TabsTrigger value="backup">Backup</TabsTrigger>
          </TabsList>

          <TabsContent value="perfil" className="space-y-4">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <User className="h-5 w-5" />
                  <span>Informações Pessoais</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center space-x-6">
                  <Avatar className="h-20 w-20">
                    <AvatarFallback className="bg-primary text-primary-foreground text-lg">
                      {currentUser.iniciais}
                    </AvatarFallback>
                  </Avatar>
                  <div className="space-y-2">
                    <Button variant="outline">Alterar Foto</Button>
                    <Button variant="outline" size="sm">Remover</Button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="nome">Nome Completo</Label>
                    <Input id="nome" defaultValue={currentUser.nome} />
                  </div>
                  <div>
                    <Label htmlFor="email">E-mail</Label>
                    <Input id="email" type="email" defaultValue={currentUser.email} />
                  </div>
                  <div>
                    <Label htmlFor="cargo">Cargo</Label>
                    <Input id="cargo" defaultValue={currentUser.cargo} />
                  </div>
                  <div>
                    <Label htmlFor="departamento">Departamento</Label>
                    <Input id="departamento" defaultValue={currentUser.departamento} />
                  </div>
                  <div>
                    <Label htmlFor="telefone">Telefone</Label>
                    <Input id="telefone" defaultValue={currentUser.telefone} />
                  </div>
                  <div>
                    <Label htmlFor="idioma">Idioma</Label>
                    <Select defaultValue="pt-BR">
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

                <div className="flex justify-end space-x-2 pt-4 border-t">
                  <Button variant="outline">Cancelar</Button>
                  <Button className="bg-gradient-primary">Salvar Alterações</Button>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Key className="h-5 w-5" />
                  <span>Alterar Senha</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="senhaAtual">Senha Atual</Label>
                  <Input id="senhaAtual" type="password" />
                </div>
                <div>
                  <Label htmlFor="novaSenha">Nova Senha</Label>
                  <Input id="novaSenha" type="password" />
                </div>
                <div>
                  <Label htmlFor="confirmarSenha">Confirmar Nova Senha</Label>
                  <Input id="confirmarSenha" type="password" />
                </div>
                
                <div className="flex justify-end pt-4 border-t">
                  <Button className="bg-gradient-primary">Alterar Senha</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="sistema" className="space-y-4">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Globe className="h-5 w-5" />
                  <span>Configurações Gerais</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="nomeInstituicao">Nome da Instituição</Label>
                    <Input id="nomeInstituicao" defaultValue={systemSettings.nomeInstituicao} />
                  </div>
                  <div>
                    <Label htmlFor="emailSistema">E-mail do Sistema</Label>
                    <Input id="emailSistema" type="email" defaultValue={systemSettings.emailNotificacoes} />
                  </div>
                  <div>
                    <Label htmlFor="timezone">Fuso Horário</Label>
                    <Select defaultValue={systemSettings.timezone}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="America/Sao_Paulo">Brasília (GMT-3)</SelectItem>
                        <SelectItem value="America/Manaus">Manaus (GMT-4)</SelectItem>
                        <SelectItem value="America/Rio_Branco">Rio Branco (GMT-5)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="theme">Tema</Label>
                    <Select defaultValue={systemSettings.theme}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="light">Claro</SelectItem>
                        <SelectItem value="dark">Escuro</SelectItem>
                        <SelectItem value="auto">Automático</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="logoUpload">Logo da Instituição</Label>
                  <div className="mt-2 flex items-center space-x-4">
                    <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center">
                      <Palette className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <div className="space-x-2">
                      <Button variant="outline">
                        <Upload className="h-4 w-4 mr-2" />
                        Enviar Logo
                      </Button>
                      <Button variant="outline" size="sm">Remover</Button>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end space-x-2 pt-4 border-t">
                  <Button variant="outline">Restaurar Padrões</Button>
                  <Button className="bg-gradient-primary">Salvar Configurações</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notificacoes" className="space-y-4">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Bell className="h-5 w-5" />
                  <span>Preferências de Notificação</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Notificações por E-mail - Indicadores</Label>
                      <p className="text-sm text-muted-foreground">
                        Receber alertas sobre indicadores atrasados
                      </p>
                    </div>
                    <Switch defaultChecked={notificationSettings.emailIndicadores} />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Notificações por E-mail - Tarefas</Label>
                      <p className="text-sm text-muted-foreground">
                        Alertas sobre tarefas vencendo
                      </p>
                    </div>
                    <Switch defaultChecked={notificationSettings.emailTarefas} />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Notificações por E-mail - Prazos</Label>
                      <p className="text-sm text-muted-foreground">
                        Lembretes de prazos importantes
                      </p>
                    </div>
                    <Switch defaultChecked={notificationSettings.emailPrazos} />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Notificações por E-mail - Relatórios</Label>
                      <p className="text-sm text-muted-foreground">
                        Quando novos relatórios estiverem disponíveis
                      </p>
                    </div>
                    <Switch defaultChecked={notificationSettings.emailRelatorios} />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Notificações Push</Label>
                      <p className="text-sm text-muted-foreground">
                        Notificações em tempo real no navegador
                      </p>
                    </div>
                    <Switch defaultChecked={notificationSettings.pushNotifications} />
                  </div>
                </div>

                <div>
                  <Label htmlFor="frequenciaResumo">Frequência do Resumo</Label>
                  <Select defaultValue={notificationSettings.frequenciaResumo}>
                    <SelectTrigger className="w-48">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="diario">Diário</SelectItem>
                      <SelectItem value="semanal">Semanal</SelectItem>
                      <SelectItem value="mensal">Mensal</SelectItem>
                      <SelectItem value="nunca">Nunca</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex justify-end pt-4 border-t">
                  <Button className="bg-gradient-primary">Salvar Preferências</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="seguranca" className="space-y-4">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Shield className="h-5 w-5" />
                  <span>Configurações de Segurança</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Autenticação de Dois Fatores</Label>
                      <p className="text-sm text-muted-foreground">
                        Adicionar uma camada extra de segurança
                      </p>
                    </div>
                    <Switch defaultChecked={securitySettings.twoFactorAuth} />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Log de Auditoria</Label>
                      <p className="text-sm text-muted-foreground">
                        Registrar todas as ações do usuário
                      </p>
                    </div>
                    <Switch defaultChecked={securitySettings.auditLog} />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="sessionTimeout">Timeout da Sessão (minutos)</Label>
                    <Input 
                      id="sessionTimeout" 
                      type="number" 
                      defaultValue={securitySettings.sessionTimeout}
                    />
                  </div>
                  <div>
                    <Label htmlFor="passwordExpiry">Expiração da Senha (dias)</Label>
                    <Input 
                      id="passwordExpiry" 
                      type="number" 
                      defaultValue={securitySettings.passwordExpiry}
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <Label>Sessões Ativas</Label>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <div className="font-medium">Sessão Atual</div>
                        <div className="text-sm text-muted-foreground">
                          Chrome - Brasília, DF • Agora
                        </div>
                      </div>
                      <Badge className="bg-accent text-accent-foreground">Ativa</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <div className="font-medium">Escritório</div>
                        <div className="text-sm text-muted-foreground">
                          Firefox - Brasília, DF • 2 horas atrás
                        </div>
                      </div>
                      <Button variant="outline" size="sm">Encerrar</Button>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end pt-4 border-t">
                  <Button className="bg-gradient-primary">Salvar Configurações</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="integracoes" className="space-y-4">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Database className="h-5 w-5" />
                  <span>Integrações do Sistema</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Users className="h-6 w-6 text-primary" />
                      <div>
                        <h4 className="font-medium">Azure Active Directory</h4>
                        <p className="text-sm text-muted-foreground">
                          Autenticação e gerenciamento de usuários
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge className="bg-accent text-accent-foreground">Conectado</Badge>
                      <Button variant="outline" size="sm">Configurar</Button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Globe className="h-6 w-6 text-primary" />
                      <div>
                        <h4 className="font-medium">Sistema SEI</h4>
                        <p className="text-sm text-muted-foreground">
                          Integração com processos administrativos
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge className="bg-accent text-accent-foreground">Conectado</Badge>
                      <Button variant="outline" size="sm">Configurar</Button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Mail className="h-6 w-6 text-primary" />
                      <div>
                        <h4 className="font-medium">Servidor de E-mail</h4>
                        <p className="text-sm text-muted-foreground">
                          Envio de notificações e relatórios
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge className="bg-accent text-accent-foreground">Conectado</Badge>
                      <Button variant="outline" size="sm">Configurar</Button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Activity className="h-6 w-6 text-muted-foreground" />
                      <div>
                        <h4 className="font-medium">API Externa</h4>
                        <p className="text-sm text-muted-foreground">
                          Integração com sistemas terceiros
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge className="bg-muted text-muted-foreground">Desconectado</Badge>
                      <Button variant="outline" size="sm">Conectar</Button>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end pt-4 border-t">
                  <Button className="bg-gradient-primary">Testar Todas as Conexões</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="backup" className="space-y-4">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Database className="h-5 w-5" />
                  <span>Backup e Restauração</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="border-2 border-dashed border-muted-foreground/25">
                    <CardContent className="pt-6 text-center">
                      <Download className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                      <h3 className="font-semibold mb-2">Backup dos Dados</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Faça download de todos os dados do sistema
                      </p>
                      <Button className="w-full">
                        <Download className="h-4 w-4 mr-2" />
                        Gerar Backup
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="border-2 border-dashed border-muted-foreground/25">
                    <CardContent className="pt-6 text-center">
                      <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                      <h3 className="font-semibold mb-2">Restaurar Dados</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Restaure dados de um arquivo de backup
                      </p>
                      <Button variant="outline" className="w-full">
                        <Upload className="h-4 w-4 mr-2" />
                        Selecionar Arquivo
                      </Button>
                    </CardContent>
                  </Card>
                </div>

                <div>
                  <h4 className="font-semibold mb-3">Histórico de Backups</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <div className="font-medium">backup_2024_01_15.sql</div>
                        <div className="text-sm text-muted-foreground">
                          15/01/2024 às 14:30 • 45.2 MB
                        </div>
                      </div>
                      <div className="space-x-2">
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">Restaurar</Button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <div className="font-medium">backup_2024_01_08.sql</div>
                        <div className="text-sm text-muted-foreground">
                          08/01/2024 às 14:30 • 43.8 MB
                        </div>
                      </div>
                      <div className="space-x-2">
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">Restaurar</Button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold">Backup Automático</h4>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Ativar Backup Automático</Label>
                      <p className="text-sm text-muted-foreground">
                        Backup semanal aos domingos às 2:00
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>

                <div className="flex justify-end pt-4 border-t">
                  <Button className="bg-gradient-primary">Salvar Configurações</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  )
}