import { useState } from "react"
import { 
  BarChart3, 
  Plus, 
  TrendingUp, 
  TrendingDown, 
  Minus,
  Target,
  Calendar,
  AlertTriangle,
  CheckCircle,
  RefreshCw,
  Download,
  Eye
} from "lucide-react"
import { useToast } from "@/hooks/useToast"
import { AppLayout } from "@/components/layout/AppLayout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Mock data
const indicadores = [
  {
    id: 1,
    nome: "Eficiência Operacional",
    unidade: "%",
    valorAtual: 75,
    metaAnual: 80,
    metaCiclo: 85,
    tendencia: "up",
    variacao: 5.2,
    status: "no-prazo",
    objetivo: "Modernização Digital",
    responsavel: "João Silva",
    ultimaAtualizacao: "2024-01-15",
    frequencia: "mensal"
  },
  {
    id: 2,
    nome: "Satisfação do Cidadão",
    unidade: "pontos",
    valorAtual: 8.2,
    metaAnual: 8.5,
    metaCiclo: 9.0,
    tendencia: "up",
    variacao: 2.1,
    status: "no-prazo",
    objetivo: "Excelência no Atendimento",
    responsavel: "Ana Costa",
    ultimaAtualizacao: "2024-01-10",
    frequencia: "trimestral"
  },
  {
    id: 3,
    nome: "Redução de Custos",
    unidade: "%",
    valorAtual: 45,
    metaAnual: 70,
    metaCiclo: 75,
    tendencia: "down",
    variacao: -1.8,
    status: "atrasado",
    objetivo: "Eficiência Financeira",
    responsavel: "Carlos Lima",
    ultimaAtualizacao: "2024-01-05",
    frequencia: "mensal"
  },
  {
    id: 4,
    nome: "Processos Digitalizados",
    unidade: "qtd",
    valorAtual: 156,
    metaAnual: 200,
    metaCiclo: 300,
    tendencia: "up",
    variacao: 12.5,
    status: "no-prazo",
    objetivo: "Transformação Digital",
    responsavel: "Maria Santos",
    ultimaAtualizacao: "2024-01-12",
    frequencia: "semanal"
  }
]

const historico = [
  { periodo: "Jan/24", valor: 72 },
  { periodo: "Fev/24", valor: 74 },
  { periodo: "Mar/24", valor: 73 },
  { periodo: "Abr/24", valor: 75 },
  { periodo: "Mai/24", valor: 76 },
  { periodo: "Jun/24", valor: 75 }
]

const getStatusColor = (status: string) => {
  switch (status) {
    case "no-prazo":
      return "bg-accent text-accent-foreground"
    case "atrasado":
      return "bg-destructive text-destructive-foreground"
    case "critico":
      return "bg-warning text-warning-foreground"
    case "concluido":
      return "bg-primary text-primary-foreground"
    default:
      return "bg-muted text-muted-foreground"
  }
}

const getStatusLabel = (status: string) => {
  switch (status) {
    case "no-prazo":
      return "No Prazo"
    case "atrasado":
      return "Atrasado"
    case "critico":
      return "Crítico"
    case "concluido":
      return "Concluído"
    default:
      return status
  }
}

const getTrendIcon = (tendencia: string) => {
  switch (tendencia) {
    case "up":
      return <TrendingUp className="h-4 w-4 text-accent" />
    case "down":
      return <TrendingDown className="h-4 w-4 text-destructive" />
    default:
      return <Minus className="h-4 w-4 text-muted-foreground" />
  }
}

const calcularProgresso = (atual: number, meta: number) => {
  return Math.min((atual / meta) * 100, 100)
}

export default function Indicadores() {
  const [selectedIndicador, setSelectedIndicador] = useState<number | null>(null)
  const toast = useToast()

  const handleCreateIndicator = () => {
    toast.info("Abrindo formulário de novo indicador")
  }

  const handleRefreshIndicators = async () => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1500))
      toast.success("Indicadores atualizados com sucesso")
    } catch (error) {
      toast.error("Erro ao atualizar indicadores")
    }
  }

  return (
    <AppLayout>
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              Indicadores Estratégicos
            </h1>
            <p className="text-muted-foreground">
              Monitoramento e acompanhamento de métricas institucionais
            </p>
          </div>
          
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={handleRefreshIndicators}
              className="hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Atualizar
            </Button>
            <Dialog>
              <DialogTrigger asChild>
                <Button 
                  className="bg-gradient-primary hover:opacity-90 transition-opacity"
                  onClick={handleCreateIndicator}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Novo Indicador
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>Criar Novo Indicador</DialogTitle>
                  <DialogDescription>
                    Define um novo indicador para acompanhamento
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="nome" className="text-right">
                      Nome
                    </Label>
                    <Input
                      id="nome"
                      placeholder="Nome do indicador"
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="unidade" className="text-right">
                      Unidade
                    </Label>
                    <Input
                      id="unidade"
                      placeholder="%, qtd, pontos..."
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="metaAnual" className="text-right">
                      Meta Anual
                    </Label>
                    <Input
                      id="metaAnual"
                      placeholder="0"
                      type="number"
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="metaCiclo" className="text-right">
                      Meta Ciclo
                    </Label>
                    <Input
                      id="metaCiclo"
                      placeholder="0"
                      type="number"
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="frequencia" className="text-right">
                      Frequência
                    </Label>
                    <Select>
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Selecione a frequência" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="semanal">Semanal</SelectItem>
                        <SelectItem value="mensal">Mensal</SelectItem>
                        <SelectItem value="trimestral">Trimestral</SelectItem>
                        <SelectItem value="semestral">Semestral</SelectItem>
                        <SelectItem value="anual">Anual</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="descricao" className="text-right">
                      Descrição
                    </Label>
                    <Textarea
                      id="descricao"
                      placeholder="Descreva como calcular o indicador..."
                      className="col-span-3"
                    />
                  </div>
                </div>
                <div className="flex justify-end">
                  <Button>Criar Indicador</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="shadow-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Indicadores
              </CardTitle>
              <BarChart3 className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24</div>
              <p className="text-xs text-muted-foreground">
                Distribuídos nos objetivos
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                No Prazo
              </CardTitle>
              <CheckCircle className="h-4 w-4 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">18</div>
              <p className="text-xs text-muted-foreground">
                75% dos indicadores
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Atrasados
              </CardTitle>
              <AlertTriangle className="h-4 w-4 text-destructive" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">6</div>
              <p className="text-xs text-muted-foreground">
                Requerem atenção
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Performance Média
              </CardTitle>
              <Target className="h-4 w-4 text-warning" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">81%</div>
              <p className="text-xs text-muted-foreground">
                Das metas anuais
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Indicadores Content */}
        <Tabs defaultValue="lista" className="space-y-4">
          <TabsList>
            <TabsTrigger value="lista">Lista de Indicadores</TabsTrigger>
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          </TabsList>

          <TabsContent value="lista" className="space-y-4">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Indicadores Estratégicos</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Indicador</TableHead>
                      <TableHead>Valor Atual</TableHead>
                      <TableHead>Meta Anual</TableHead>
                      <TableHead>Progresso</TableHead>
                      <TableHead>Tendência</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Responsável</TableHead>
                      <TableHead>Última Atualização</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {indicadores.map((indicador) => (
                      <TableRow 
                        key={indicador.id}
                        className="cursor-pointer hover:bg-muted/30"
                        onClick={() => setSelectedIndicador(indicador.id)}
                      >
                        <TableCell className="font-medium">
                          <div>
                            <div>{indicador.nome}</div>
                            <div className="text-xs text-muted-foreground">
                              {indicador.objetivo}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <span className="font-medium">
                            {indicador.valorAtual} {indicador.unidade}
                          </span>
                        </TableCell>
                        <TableCell>
                          {indicador.metaAnual} {indicador.unidade}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Progress 
                              value={calcularProgresso(indicador.valorAtual, indicador.metaAnual)} 
                              className="h-2 w-20" 
                            />
                            <span className="text-sm">
                              {Math.round(calcularProgresso(indicador.valorAtual, indicador.metaAnual))}%
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            {getTrendIcon(indicador.tendencia)}
                            <span className={`text-sm ${
                              indicador.tendencia === 'up' 
                                ? 'text-accent' 
                                : indicador.tendencia === 'down' 
                                  ? 'text-destructive' 
                                  : 'text-muted-foreground'
                            }`}>
                              {indicador.variacao > 0 ? '+' : ''}{indicador.variacao}%
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(indicador.status)}>
                            {getStatusLabel(indicador.status)}
                          </Badge>
                        </TableCell>
                        <TableCell>{indicador.responsavel}</TableCell>
                        <TableCell>
                          {new Date(indicador.ultimaAtualizacao).toLocaleDateString('pt-BR')}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="dashboard" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {indicadores.map((indicador) => (
                <Card key={indicador.id} className="shadow-card hover:shadow-elevated transition-all">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-base">{indicador.nome}</CardTitle>
                        <p className="text-sm text-muted-foreground">{indicador.objetivo}</p>
                      </div>
                      <Badge className={getStatusColor(indicador.status)}>
                        {getStatusLabel(indicador.status)}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-2xl font-bold">
                          {indicador.valorAtual} <span className="text-sm font-normal">{indicador.unidade}</span>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Meta: {indicador.metaAnual} {indicador.unidade}
                        </div>
                      </div>
                      <div className="flex items-center space-x-1">
                        {getTrendIcon(indicador.tendencia)}
                        <span className={`text-sm ${
                          indicador.tendencia === 'up' 
                            ? 'text-accent' 
                            : indicador.tendencia === 'down' 
                              ? 'text-destructive' 
                              : 'text-muted-foreground'
                        }`}>
                          {indicador.variacao > 0 ? '+' : ''}{indicador.variacao}%
                        </span>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progresso Anual</span>
                        <span>{Math.round(calcularProgresso(indicador.valorAtual, indicador.metaAnual))}%</span>
                      </div>
                      <Progress 
                        value={calcularProgresso(indicador.valorAtual, indicador.metaAnual)} 
                        className="h-2" 
                      />
                    </div>

                    <div className="text-xs text-muted-foreground">
                      <div>Responsável: {indicador.responsavel}</div>
                      <div>Última atualização: {new Date(indicador.ultimaAtualizacao).toLocaleDateString('pt-BR')}</div>
                      <div>Frequência: {indicador.frequencia}</div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Detalhes do Indicador Selecionado */}
        {selectedIndicador && (
          <Card className="shadow-card animate-slide-up">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BarChart3 className="h-5 w-5" />
                <span>Detalhes - Eficiência Operacional</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-semibold">Evolução Histórica</h4>
                  <div className="space-y-2">
                    {historico.map((item, index) => (
                      <div key={index} className="flex items-center justify-between p-2 rounded border">
                        <span className="text-sm">{item.periodo}</span>
                        <span className="font-medium">{item.valor}%</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h4 className="font-semibold">Informações Detalhadas</h4>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Valor Atual:</span>
                      <span className="font-medium">75%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Meta Anual:</span>
                      <span className="font-medium">80%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Meta do Ciclo:</span>
                      <span className="font-medium">85%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Frequência:</span>
                      <span className="font-medium">Mensal</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Responsável:</span>
                      <span className="font-medium">João Silva</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </AppLayout>
  )
}