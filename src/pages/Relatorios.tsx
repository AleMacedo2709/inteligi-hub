import { useState } from "react"
import { 
  FileText, 
  Download, 
  Calendar,
  BarChart3,
  TrendingUp,
  Target,
  Users,
  Filter,
  Eye,
  Settings,
  Play,
  Pause,
  RefreshCw
} from "lucide-react"
import { useToast } from "@/hooks/useToast"
import { AppLayout } from "@/components/layout/AppLayout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Mock data
const relatoriosDisponiveis = [
  {
    id: 1,
    nome: "Relatório Estratégico Mensal",
    tipo: "estrategico",
    descricao: "Análise completa do progresso estratégico institucional",
    periodicidade: "mensal",
    ultimaGeracao: "2024-01-15",
    formato: "PDF",
    tamanho: "2.4 MB",
    status: "disponivel"
  },
  {
    id: 2,
    nome: "Dashboard de Indicadores",
    tipo: "indicadores",
    descricao: "Painel executivo com métricas principais",
    periodicidade: "semanal",
    ultimaGeracao: "2024-01-12",
    formato: "PDF",
    tamanho: "1.8 MB",
    status: "disponivel"
  },
  {
    id: 3,
    nome: "Relatório de PAAs",
    tipo: "paas",
    descricao: "Acompanhamento detalhado dos Planos Anuais",
    periodicidade: "trimestral",
    ultimaGeracao: "2024-01-10",
    formato: "Excel",
    tamanho: "3.1 MB",
    status: "disponivel"
  },
  {
    id: 4,
    nome: "Análise de Performance de Tarefas",
    tipo: "tarefas",
    descricao: "Produtividade e cumprimento de prazos",
    periodicidade: "mensal",
    ultimaGeracao: "2024-01-08",
    formato: "PDF",
    tamanho: "1.5 MB",
    status: "processando"
  },
  {
    id: 5,
    nome: "Relatório Executivo Anual",
    tipo: "executivo",
    descricao: "Síntese completa do ano institucional",
    periodicidade: "anual",
    ultimaGeracao: "2023-12-31",
    formato: "PDF",
    tamanho: "8.7 MB",
    status: "disponivel"
  }
]

const metricsResumo = {
  relatoriosGerados: 156,
  downloadsMes: 89,
  usuariosAtivos: 24,
  automacaoAtiva: 12
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "disponivel":
      return "bg-accent text-accent-foreground"
    case "processando":
      return "bg-warning text-warning-foreground"
    case "erro":
      return "bg-destructive text-destructive-foreground"
    default:
      return "bg-muted text-muted-foreground"
  }
}

const getStatusLabel = (status: string) => {
  switch (status) {
    case "disponivel":
      return "Disponível"
    case "processando":
      return "Processando"
    case "erro":
      return "Erro"
    default:
      return status
  }
}

const getTipoColor = (tipo: string) => {
  switch (tipo) {
    case "estrategico":
      return "bg-primary text-primary-foreground"
    case "indicadores":
      return "bg-accent text-accent-foreground"
    case "paas":
      return "bg-warning text-warning-foreground"
    case "tarefas":
      return "bg-secondary text-secondary-foreground"
    case "executivo":
      return "bg-destructive text-destructive-foreground"
    default:
      return "bg-muted text-muted-foreground"
  }
}

const getTipoLabel = (tipo: string) => {
  switch (tipo) {
    case "estrategico":
      return "Estratégico"
    case "indicadores":
      return "Indicadores"
    case "paas":
      return "PAAs"
    case "tarefas":
      return "Tarefas"
    case "executivo":
      return "Executivo"
    default:
      return tipo
  }
}

export default function Relatorios() {
  const [filtroTipo, setFiltroTipo] = useState<string>("todos")
  const [filtroStatus, setFiltroStatus] = useState<string>("todos")
  const [isGenerating, setIsGenerating] = useState(false)
  const [processingIds, setProcessingIds] = useState<Set<number>>(new Set())
  const toast = useToast()

  // Funções utilitárias
  const handleDownload = async (relatorio: any) => {
    if (relatorio.status !== "disponivel") {
      toast.warning("Relatório não disponível para download")
      return
    }

    setProcessingIds(prev => new Set(prev).add(relatorio.id))
    
    try {
      // Simula download
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Simula criação e download do arquivo
      const blob = new Blob([`Relatório: ${relatorio.nome}\nData: ${new Date().toLocaleDateString('pt-BR')}`], {
        type: 'text/plain'
      })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `${relatorio.nome.replace(/\s+/g, '_')}.${relatorio.formato.toLowerCase()}`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
      
      toast.success("Download realizado com sucesso")
    } catch (error) {
      toast.error("Erro ao fazer download do relatório")
    } finally {
      setProcessingIds(prev => {
        const newSet = new Set(prev)
        newSet.delete(relatorio.id)
        return newSet
      })
    }
  }

  const handlePreview = (relatorio: any) => {
    if (relatorio.status !== "disponivel") {
      toast.warning("Relatório não disponível para visualização")
      return
    }
    
    toast.info(`Abrindo preview: ${relatorio.nome}`)
    // Simula abertura em nova aba
    window.open(`/preview-relatorio/${relatorio.id}`, '_blank')
  }

  const handleGenerateCustomReport = async () => {
    setIsGenerating(true)
    
    try {
      await new Promise(resolve => setTimeout(resolve, 3000))
      toast.success("Relatório personalizado gerado com sucesso")
    } catch (error) {
      toast.error("Erro ao gerar relatório personalizado")
    } finally {
      setIsGenerating(false)
    }
  }

  const handleToggleAutomation = async (relatorioId: string, isActive: boolean) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      toast.success(`Automação ${isActive ? 'ativada' : 'desativada'} com sucesso`)
    } catch (error) {
      toast.error("Erro ao alterar automação")
    }
  }

  const handleRefreshReports = async () => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1500))
      toast.success("Lista de relatórios atualizada")
    } catch (error) {
      toast.error("Erro ao atualizar relatórios")
    }
  }

  const relatoriosFiltrados = relatoriosDisponiveis.filter(relatorio => {
    const matchTipo = filtroTipo === "todos" || relatorio.tipo === filtroTipo
    const matchStatus = filtroStatus === "todos" || relatorio.status === filtroStatus
    return matchTipo && matchStatus
  })

  return (
    <AppLayout>
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              Relatórios e Análises
            </h1>
            <p className="text-muted-foreground">
              Geração e acesso a relatórios estratégicos institucionais
            </p>
          </div>
          
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              onClick={handleRefreshReports}
              className="hover:bg-accent hover:text-accent-foreground"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Atualizar
            </Button>
            <Button 
              className="bg-gradient-primary hover:opacity-90 transition-opacity"
              onClick={handleGenerateCustomReport}
              disabled={isGenerating}
            >
              {isGenerating ? (
                <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <FileText className="h-4 w-4 mr-2" />
              )}
              {isGenerating ? "Gerando..." : "Gerar Relatório Personalizado"}
            </Button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="shadow-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Relatórios Gerados
              </CardTitle>
              <FileText className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metricsResumo.relatoriosGerados}</div>
              <p className="text-xs text-muted-foreground">
                Total no sistema
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Downloads/Mês
              </CardTitle>
              <Download className="h-4 w-4 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metricsResumo.downloadsMes}</div>
              <p className="text-xs text-muted-foreground">
                Janeiro 2024
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Usuários Ativos
              </CardTitle>
              <Users className="h-4 w-4 text-warning" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metricsResumo.usuariosAtivos}</div>
              <p className="text-xs text-muted-foreground">
                Acessaram relatórios
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Automação Ativa
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-destructive" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metricsResumo.automacaoAtiva}</div>
              <p className="text-xs text-muted-foreground">
                Relatórios automáticos
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Content Tabs */}
        <Tabs defaultValue="disponiveis" className="space-y-4">
          <TabsList>
            <TabsTrigger value="disponiveis">Relatórios Disponíveis</TabsTrigger>
            <TabsTrigger value="personalizados">Relatórios Personalizados</TabsTrigger>
            <TabsTrigger value="automaticos">Automação</TabsTrigger>
          </TabsList>

          <TabsContent value="disponiveis" className="space-y-4">
            {/* Filters */}
            <Card className="shadow-card">
              <CardContent className="pt-6">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex items-center space-x-2">
                    <Filter className="h-4 w-4 text-muted-foreground" />
                    <Label>Tipo:</Label>
                    <Select value={filtroTipo} onValueChange={setFiltroTipo}>
                      <SelectTrigger className="w-40">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="todos">Todos</SelectItem>
                        <SelectItem value="estrategico">Estratégico</SelectItem>
                        <SelectItem value="indicadores">Indicadores</SelectItem>
                        <SelectItem value="paas">PAAs</SelectItem>
                        <SelectItem value="tarefas">Tarefas</SelectItem>
                        <SelectItem value="executivo">Executivo</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Label>Status:</Label>
                    <Select value={filtroStatus} onValueChange={setFiltroStatus}>
                      <SelectTrigger className="w-40">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="todos">Todos</SelectItem>
                        <SelectItem value="disponivel">Disponível</SelectItem>
                        <SelectItem value="processando">Processando</SelectItem>
                        <SelectItem value="erro">Erro</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Reports List */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {relatoriosFiltrados.map((relatorio) => (
                <Card key={relatorio.id} className="shadow-card hover:shadow-elevated transition-all">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-lg mb-1">{relatorio.nome}</CardTitle>
                        <p className="text-sm text-muted-foreground mb-2">{relatorio.descricao}</p>
                        <div className="flex items-center space-x-2">
                          <Badge className={getTipoColor(relatorio.tipo)}>
                            {getTipoLabel(relatorio.tipo)}
                          </Badge>
                          <Badge className={getStatusColor(relatorio.status)}>
                            {getStatusLabel(relatorio.status)}
                          </Badge>
                        </div>
                      </div>
                      <FileText className="h-6 w-6 text-muted-foreground flex-shrink-0" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Periodicidade:</span>
                          <p className="font-medium capitalize">{relatorio.periodicidade}</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Formato:</span>
                          <p className="font-medium">{relatorio.formato}</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Última Geração:</span>
                          <p className="font-medium">
                            {new Date(relatorio.ultimaGeracao).toLocaleDateString('pt-BR')}
                          </p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Tamanho:</span>
                          <p className="font-medium">{relatorio.tamanho}</p>
                        </div>
                      </div>
                      
                      <div className="flex space-x-2 pt-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="flex-1 hover:bg-primary hover:text-primary-foreground transition-colors"
                          disabled={relatorio.status !== "disponivel"}
                          onClick={() => handlePreview(relatorio)}
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          Visualizar
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="flex-1 hover:bg-accent hover:text-accent-foreground transition-colors"
                          disabled={relatorio.status !== "disponivel" || processingIds.has(relatorio.id)}
                          onClick={() => handleDownload(relatorio)}
                        >
                          {processingIds.has(relatorio.id) ? (
                            <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                          ) : (
                            <Download className="h-4 w-4 mr-2" />
                          )}
                          {processingIds.has(relatorio.id) ? "Baixando..." : "Download"}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="personalizados" className="space-y-4">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Gerar Relatório Personalizado</CardTitle>
                <p className="text-muted-foreground">
                  Configure e gere relatórios específicos conforme sua necessidade
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="titulo">Título do Relatório</Label>
                    <Input id="titulo" placeholder="Ex: Análise Trimestral Q1 2024" />
                  </div>
                  <div>
                    <Label htmlFor="tipo">Tipo de Relatório</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o tipo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="estrategico">Estratégico</SelectItem>
                        <SelectItem value="operacional">Operacional</SelectItem>
                        <SelectItem value="financeiro">Financeiro</SelectItem>
                        <SelectItem value="performance">Performance</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="dataInicio">Data Início</Label>
                    <Input id="dataInicio" type="date" />
                  </div>
                  <div>
                    <Label htmlFor="dataFim">Data Fim</Label>
                    <Input id="dataFim" type="date" />
                  </div>
                </div>
                
                <div>
                  <Label>Módulos a Incluir</Label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-2">
                    {["Ciclos Estratégicos", "PAAs", "Indicadores", "Tarefas"].map((modulo) => (
                      <label key={modulo} className="flex items-center space-x-2">
                        <input type="checkbox" className="rounded" defaultChecked />
                        <span className="text-sm">{modulo}</span>
                      </label>
                    ))}
                  </div>
                </div>
                
                <div className="flex justify-end space-x-2">
                  <Button 
                    variant="outline"
                    className="hover:bg-muted transition-colors"
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    Pré-visualizar
                  </Button>
                  <Button 
                    className="bg-gradient-primary hover:opacity-90 transition-opacity"
                    onClick={handleGenerateCustomReport}
                    disabled={isGenerating}
                  >
                    {isGenerating ? (
                      <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                    ) : (
                      <FileText className="h-4 w-4 mr-2" />
                    )}
                    {isGenerating ? "Gerando..." : "Gerar Relatório"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="automaticos" className="space-y-4">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Automação de Relatórios</CardTitle>
                <p className="text-muted-foreground">
                  Configure a geração automática de relatórios periódicos
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                    <div>
                      <h4 className="font-medium">Relatório Estratégico Mensal</h4>
                      <p className="text-sm text-muted-foreground">Gerado automaticamente no dia 1 de cada mês</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge className="bg-accent text-accent-foreground">Ativo</Badge>
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="hover:bg-primary hover:text-primary-foreground transition-colors"
                      >
                        <Settings className="h-4 w-4 mr-1" />
                        Configurar
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="hover:bg-warning hover:text-warning-foreground transition-colors"
                        onClick={() => handleToggleAutomation("monthly", false)}
                      >
                        <Pause className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                    <div>
                      <h4 className="font-medium">Dashboard de Indicadores</h4>
                      <p className="text-sm text-muted-foreground">Gerado semanalmente às segundas-feiras</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge className="bg-accent text-accent-foreground">Ativo</Badge>
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="hover:bg-primary hover:text-primary-foreground transition-colors"
                      >
                        <Settings className="h-4 w-4 mr-1" />
                        Configurar
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="hover:bg-warning hover:text-warning-foreground transition-colors"
                        onClick={() => handleToggleAutomation("weekly", false)}
                      >
                        <Pause className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                    <div>
                      <h4 className="font-medium">Relatório de Performance de Tarefas</h4>
                      <p className="text-sm text-muted-foreground">Gerado mensalmente no último dia útil</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge className="bg-muted text-muted-foreground">Inativo</Badge>
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="hover:bg-accent hover:text-accent-foreground transition-colors"
                        onClick={() => handleToggleAutomation("tasks", true)}
                      >
                        <Play className="h-4 w-4 mr-1" />
                        Ativar
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <Button 
                    className="bg-gradient-primary hover:opacity-90 transition-opacity"
                    onClick={() => toast.info("Funcionalidade de nova automação em desenvolvimento")}
                  >
                    <Calendar className="h-4 w-4 mr-2" />
                    Nova Automação
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  )
}