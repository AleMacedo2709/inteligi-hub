import { useState } from "react"
import { 
  FileText, 
  Link as LinkIcon, 
  CheckCircle, 
  AlertCircle,
  Clock,
  ExternalLink,
  RefreshCw,
  Settings,
  Database
} from "lucide-react"
import { AppLayout } from "@/components/layout/AppLayout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"

// Mock data
const integracaoStatus = {
  conectado: true,
  ultimaSync: "2024-01-15 14:30:00",
  processosVinculados: 42,
  documentosGerados: 156,
  errosUltimas24h: 2
}

const processosVinculados = [
  {
    id: 1,
    numeroSEI: "23480.123456/2024-11",
    assunto: "Implementação do Sistema de Planejamento Estratégico",
    acaoEstrategica: "Modernização Digital",
    status: "tramitando",
    responsavelSEI: "João Silva",
    ultimaMovimentacao: "2024-01-15",
    documentos: 8
  },
  {
    id: 2,
    numeroSEI: "23480.789012/2024-15",
    assunto: "Capacitação em Gestão Estratégica",
    acaoEstrategica: "Desenvolvimento Humano", 
    status: "finalizado",
    responsavelSEI: "Ana Costa",
    ultimaMovimentacao: "2024-01-12",
    documentos: 12
  },
  {
    id: 3,
    numeroSEI: "23480.345678/2024-22",
    assunto: "Otimização de Processos Administrativos",
    acaoEstrategica: "Eficiência Operacional",
    status: "aguardando",
    responsavelSEI: "Carlos Lima",
    ultimaMovimentacao: "2024-01-10",
    documentos: 5
  }
]

const documentosGerados = [
  {
    id: 1,
    tipo: "Relatório Mensal",
    processo: "23480.123456/2024-11",
    dataGeracao: "2024-01-15",
    status: "enviado",
    tamanho: "2.4 MB"
  },
  {
    id: 2,
    tipo: "Ofício de Solicitação",
    processo: "23480.789012/2024-15",
    dataGeracao: "2024-01-12",
    status: "enviado",
    tamanho: "856 KB"
  },
  {
    id: 3,
    tipo: "Ata de Reunião",
    processo: "23480.123456/2024-11",
    dataGeracao: "2024-01-10",
    status: "erro",
    tamanho: "1.2 MB"
  }
]

const configuracoes = {
  autoSync: true,
  notificacoes: true,
  logDetalhado: false,
  backupAutomatico: true,
  intervaloSync: 30 // minutos
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "tramitando":
      return "bg-primary text-primary-foreground"
    case "finalizado":
      return "bg-accent text-accent-foreground"
    case "aguardando":
      return "bg-warning text-warning-foreground"
    case "enviado":
      return "bg-accent text-accent-foreground"
    case "erro":
      return "bg-destructive text-destructive-foreground"
    default:
      return "bg-muted text-muted-foreground"
  }
}

const getStatusLabel = (status: string) => {
  switch (status) {
    case "tramitando":
      return "Tramitando"
    case "finalizado":
      return "Finalizado"
    case "aguardando":
      return "Aguardando"
    case "enviado":
      return "Enviado"
    case "erro":
      return "Erro"
    default:
      return status
  }
}

export default function SEI() {
  const [syncing, setSyncing] = useState(false)

  const handleSync = () => {
    setSyncing(true)
    // Simular sincronização
    setTimeout(() => {
      setSyncing(false)
    }, 3000)
  }

  return (
    <AppLayout>
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              Integração SEI
            </h1>
            <p className="text-muted-foreground">
              Sistema Eletrônico de Informações - Integração e Monitoramento
            </p>
          </div>
          
          <div className="flex space-x-2">
            <Button 
              variant="outline" 
              onClick={handleSync}
              disabled={syncing}
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${syncing ? 'animate-spin' : ''}`} />
              {syncing ? 'Sincronizando...' : 'Sincronizar'}
            </Button>
            <Button className="bg-gradient-primary">
              <Settings className="h-4 w-4 mr-2" />
              Configurações
            </Button>
          </div>
        </div>

        {/* Status Connection */}
        <Card className={`shadow-card border-l-4 ${
          integracaoStatus.conectado ? 'border-l-accent' : 'border-l-destructive'
        }`}>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className={`p-2 rounded-full ${
                  integracaoStatus.conectado ? 'bg-accent text-accent-foreground' : 'bg-destructive text-destructive-foreground'
                }`}>
                  {integracaoStatus.conectado ? (
                    <CheckCircle className="h-6 w-6" />
                  ) : (
                    <AlertCircle className="h-6 w-6" />
                  )}
                </div>
                <div>
                  <h3 className="font-semibold text-lg">
                    Status da Integração: {integracaoStatus.conectado ? 'Conectado' : 'Desconectado'}
                  </h3>
                  <p className="text-muted-foreground">
                    Última sincronização: {new Date(integracaoStatus.ultimaSync).toLocaleString('pt-BR')}
                  </p>
                </div>
              </div>
              <Button variant="outline" size="sm">
                <ExternalLink className="h-4 w-4 mr-2" />
                Abrir SEI
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="shadow-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Processos Vinculados
              </CardTitle>
              <LinkIcon className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{integracaoStatus.processosVinculados}</div>
              <p className="text-xs text-muted-foreground">
                Conectados ao planejamento
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Documentos Gerados
              </CardTitle>
              <FileText className="h-4 w-4 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{integracaoStatus.documentosGerados}</div>
              <p className="text-xs text-muted-foreground">
                Automaticamente
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Última Sync
              </CardTitle>
              <Clock className="h-4 w-4 text-warning" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2h</div>
              <p className="text-xs text-muted-foreground">
                Atrás
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Erros (24h)
              </CardTitle>
              <AlertCircle className="h-4 w-4 text-destructive" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{integracaoStatus.errosUltimas24h}</div>
              <p className="text-xs text-muted-foreground">
                Requerem atenção
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Content Tabs */}
        <Tabs defaultValue="processos" className="space-y-4">
          <TabsList>
            <TabsTrigger value="processos">Processos Vinculados</TabsTrigger>
            <TabsTrigger value="documentos">Documentos</TabsTrigger>
            <TabsTrigger value="configuracoes">Configurações</TabsTrigger>
            <TabsTrigger value="logs">Logs</TabsTrigger>
          </TabsList>

          <TabsContent value="processos" className="space-y-4">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Processos SEI Vinculados</CardTitle>
                <p className="text-muted-foreground">
                  Processos do SEI conectados às ações estratégicas
                </p>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Número SEI</TableHead>
                      <TableHead>Assunto</TableHead>
                      <TableHead>Ação Estratégica</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Responsável</TableHead>
                      <TableHead>Última Movimentação</TableHead>
                      <TableHead>Documentos</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {processosVinculados.map((processo) => (
                      <TableRow key={processo.id}>
                        <TableCell className="font-mono text-sm">
                          <div className="flex items-center space-x-2">
                            <span>{processo.numeroSEI}</span>
                            <Button variant="ghost" size="sm" className="p-1">
                              <ExternalLink className="h-3 w-3" />
                            </Button>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="max-w-xs">
                            <p className="font-medium truncate">{processo.assunto}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{processo.acaoEstrategica}</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(processo.status)}>
                            {getStatusLabel(processo.status)}
                          </Badge>
                        </TableCell>
                        <TableCell>{processo.responsavelSEI}</TableCell>
                        <TableCell>
                          {new Date(processo.ultimaMovimentacao).toLocaleDateString('pt-BR')}
                        </TableCell>
                        <TableCell>
                          <span className="font-medium">{processo.documentos}</span>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="documentos" className="space-y-4">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Documentos Gerados Automaticamente</CardTitle>
                <p className="text-muted-foreground">
                  Documentos criados automaticamente no SEI pelo sistema
                </p>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Tipo</TableHead>
                      <TableHead>Processo</TableHead>
                      <TableHead>Data Geração</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Tamanho</TableHead>
                      <TableHead>Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {documentosGerados.map((documento) => (
                      <TableRow key={documento.id}>
                        <TableCell className="font-medium">{documento.tipo}</TableCell>
                        <TableCell className="font-mono text-sm">{documento.processo}</TableCell>
                        <TableCell>
                          {new Date(documento.dataGeracao).toLocaleDateString('pt-BR')}
                        </TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(documento.status)}>
                            {getStatusLabel(documento.status)}
                          </Badge>
                        </TableCell>
                        <TableCell>{documento.tamanho}</TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm">
                              <ExternalLink className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="configuracoes" className="space-y-4">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Configurações da Integração</CardTitle>
                <p className="text-muted-foreground">
                  Configure as opções de integração com o SEI
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-semibold">Conexão</h4>
                    
                    <div>
                      <Label htmlFor="urlSei">URL do SEI</Label>
                      <Input 
                        id="urlSei" 
                        placeholder="https://sei.exemplo.gov.br"
                        defaultValue="https://sei.institucional.gov.br"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="usuario">Usuário de Integração</Label>
                      <Input 
                        id="usuario" 
                        placeholder="usuario.integracao"
                        defaultValue="spe.integracao"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="intervalo">Intervalo de Sincronização (min)</Label>
                      <Input 
                        id="intervalo" 
                        type="number"
                        defaultValue={configuracoes.intervaloSync}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h4 className="font-semibold">Opções</h4>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="autoSync">Sincronização Automática</Label>
                        <p className="text-sm text-muted-foreground">
                          Sincronizar dados automaticamente
                        </p>
                      </div>
                      <Switch 
                        id="autoSync" 
                        defaultChecked={configuracoes.autoSync}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="notificacoes">Notificações</Label>
                        <p className="text-sm text-muted-foreground">
                          Receber notificações de eventos
                        </p>
                      </div>
                      <Switch 
                        id="notificacoes" 
                        defaultChecked={configuracoes.notificacoes}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="logDetalhado">Log Detalhado</Label>
                        <p className="text-sm text-muted-foreground">
                          Registrar logs detalhados
                        </p>
                      </div>
                      <Switch 
                        id="logDetalhado" 
                        defaultChecked={configuracoes.logDetalhado}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="backup">Backup Automático</Label>
                        <p className="text-sm text-muted-foreground">
                          Backup dos dados de integração
                        </p>
                      </div>
                      <Switch 
                        id="backup" 
                        defaultChecked={configuracoes.backupAutomatico}
                      />
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end space-x-2 pt-4 border-t">
                  <Button variant="outline">Testar Conexão</Button>
                  <Button className="bg-gradient-primary">Salvar Configurações</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="logs" className="space-y-4">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Logs de Integração</CardTitle>
                <p className="text-muted-foreground">
                  Histórico de operações e eventos da integração
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4 p-3 bg-accent/10 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-accent" />
                    <div className="flex-1">
                      <p className="font-medium">Sincronização realizada com sucesso</p>
                      <p className="text-sm text-muted-foreground">
                        15/01/2024 14:30:00 - 42 processos sincronizados
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4 p-3 bg-primary/10 rounded-lg">
                    <Database className="h-5 w-5 text-primary" />
                    <div className="flex-1">
                      <p className="font-medium">Documento gerado automaticamente</p>
                      <p className="text-sm text-muted-foreground">
                        15/01/2024 13:45:00 - Relatório Mensal no processo 23480.123456/2024-11
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4 p-3 bg-destructive/10 rounded-lg">
                    <AlertCircle className="h-5 w-5 text-destructive" />
                    <div className="flex-1">
                      <p className="font-medium">Erro na geração de documento</p>
                      <p className="text-sm text-muted-foreground">
                        15/01/2024 12:20:00 - Falha ao gerar Ata de Reunião (timeout)
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4 p-3 bg-warning/10 rounded-lg">
                    <Clock className="h-5 w-5 text-warning" />
                    <div className="flex-1">
                      <p className="font-medium">Processo atualizado no SEI</p>
                      <p className="text-sm text-muted-foreground">
                        15/01/2024 11:15:00 - Processo 23480.789012/2024-15 movimentado
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-center mt-6">
                  <Button variant="outline">Carregar Mais Logs</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  )
}