import { useState } from "react"
import { 
  CheckSquare, 
  Plus, 
  Clock, 
  AlertTriangle,
  Calendar,
  User,
  Filter,
  Search
} from "lucide-react"
import { AppLayout } from "@/components/layout/AppLayout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
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
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

// Mock data
const tarefas = [
  {
    id: 1,
    titulo: "Implementar módulo de autenticação SSO",
    descricao: "Integrar sistema com Azure AD para login único",
    acaoAnual: "Implementação do Sistema Digital",
    status: "em-andamento",
    prioridade: "alta",
    progresso: 75,
    responsavel: { nome: "Carlos Lima", iniciais: "CL" },
    prazo: "2024-02-15",
    dataInicio: "2024-01-10",
    estimativa: 40,
    tempoGasto: 32
  },
  {
    id: 2,
    titulo: "Capacitar equipe técnica em React",
    descricao: "Treinamento da equipe de desenvolvimento frontend",
    acaoAnual: "Capacitação de Servidores",
    status: "pendente",
    prioridade: "media",
    progresso: 0,
    responsavel: { nome: "Ana Costa", iniciais: "AC" },
    prazo: "2024-03-01",
    dataInicio: "2024-02-01",
    estimativa: 80,
    tempoGasto: 0
  },
  {
    id: 3,
    titulo: "Otimizar consultas do banco de dados",
    descricao: "Melhorar performance das consultas críticas",
    acaoAnual: "Otimização de Processos",
    status: "concluida",
    prioridade: "alta",
    progresso: 100,
    responsavel: { nome: "João Silva", iniciais: "JS" },
    prazo: "2024-01-30",
    dataInicio: "2024-01-15",
    estimativa: 24,
    tempoGasto: 20
  },
  {
    id: 4,
    titulo: "Criar documentação técnica da API",
    descricao: "Documentar endpoints e fluxos da API REST",
    acaoAnual: "Implementação do Sistema Digital",
    status: "atrasada",
    prioridade: "media",
    progresso: 30,
    responsavel: { nome: "Maria Santos", iniciais: "MS" },
    prazo: "2024-01-20",
    dataInicio: "2024-01-05",
    estimativa: 16,
    tempoGasto: 12
  },
  {
    id: 5,
    titulo: "Configurar ambiente de homologação",
    descricao: "Preparar ambiente para testes integrados",
    acaoAnual: "Implementação do Sistema Digital",
    status: "em-andamento",
    prioridade: "alta",
    progresso: 60,
    responsavel: { nome: "Pedro Oliveira", iniciais: "PO" },
    prazo: "2024-02-10",
    dataInicio: "2024-01-25",
    estimativa: 32,
    tempoGasto: 18
  }
]

const getStatusColor = (status: string) => {
  switch (status) {
    case "concluida":
      return "bg-accent text-accent-foreground"
    case "em-andamento":
      return "bg-primary text-primary-foreground"
    case "pendente":
      return "bg-secondary text-secondary-foreground"
    case "atrasada":
      return "bg-destructive text-destructive-foreground"
    default:
      return "bg-muted text-muted-foreground"
  }
}

const getStatusLabel = (status: string) => {
  switch (status) {
    case "concluida":
      return "Concluída"
    case "em-andamento":
      return "Em Andamento"
    case "pendente":
      return "Pendente"
    case "atrasada":
      return "Atrasada"
    default:
      return status
  }
}

const getPrioridadeColor = (prioridade: string) => {
  switch (prioridade) {
    case "alta":
      return "bg-destructive text-destructive-foreground"
    case "media":
      return "bg-warning text-warning-foreground"
    case "baixa":
      return "bg-muted text-muted-foreground"
    default:
      return "bg-muted text-muted-foreground"
  }
}

const getPrioridadeLabel = (prioridade: string) => {
  switch (prioridade) {
    case "alta":
      return "Alta"
    case "media":
      return "Média"
    case "baixa":
      return "Baixa"
    default:
      return prioridade
  }
}

const isAtrasada = (prazo: string, status: string) => {
  if (status === "concluida") return false
  return new Date(prazo) < new Date()
}

const getDiasRestantes = (prazo: string) => {
  const hoje = new Date()
  const dataPrazo = new Date(prazo)
  const diffTime = dataPrazo.getTime() - hoje.getTime()
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  return diffDays
}

export default function Tarefas() {
  const [filtroStatus, setFiltroStatus] = useState<string>("todas")
  const [busca, setBusca] = useState<string>("")

  const tarefasFiltradas = tarefas.filter(tarefa => {
    const matchStatus = filtroStatus === "todas" || tarefa.status === filtroStatus
    const matchBusca = tarefa.titulo.toLowerCase().includes(busca.toLowerCase()) || 
                      tarefa.acaoAnual.toLowerCase().includes(busca.toLowerCase())
    return matchStatus && matchBusca
  })

  const tarefasPorStatus = {
    total: tarefas.length,
    concluidas: tarefas.filter(t => t.status === "concluida").length,
    emAndamento: tarefas.filter(t => t.status === "em-andamento").length,
    pendentes: tarefas.filter(t => t.status === "pendente").length,
    atrasadas: tarefas.filter(t => t.status === "atrasada").length
  }

  return (
    <AppLayout>
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              Gestão de Tarefas
            </h1>
            <p className="text-muted-foreground">
              Acompanhamento e controle de ações e atividades
            </p>
          </div>
          
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-gradient-primary">
                <Plus className="h-4 w-4 mr-2" />
                Nova Tarefa
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Criar Nova Tarefa</DialogTitle>
                <DialogDescription>
                  Adicione uma nova tarefa ao sistema
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="titulo" className="text-right">
                    Título
                  </Label>
                  <Input
                    id="titulo"
                    placeholder="Título da tarefa"
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="acaoAnual" className="text-right">
                    Ação Anual
                  </Label>
                  <Select>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Selecione a ação anual" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sistema-digital">Implementação do Sistema Digital</SelectItem>
                      <SelectItem value="capacitacao">Capacitação de Servidores</SelectItem>
                      <SelectItem value="otimizacao">Otimização de Processos</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="prioridade" className="text-right">
                    Prioridade
                  </Label>
                  <Select>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Selecione a prioridade" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="alta">Alta</SelectItem>
                      <SelectItem value="media">Média</SelectItem>
                      <SelectItem value="baixa">Baixa</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="prazo" className="text-right">
                    Prazo
                  </Label>
                  <Input
                    id="prazo"
                    type="date"
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="estimativa" className="text-right">
                    Estimativa (h)
                  </Label>
                  <Input
                    id="estimativa"
                    placeholder="0"
                    type="number"
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="descricao" className="text-right">
                    Descrição
                  </Label>
                  <Textarea
                    id="descricao"
                    placeholder="Descreva a tarefa..."
                    className="col-span-3"
                  />
                </div>
              </div>
              <div className="flex justify-end">
                <Button>Criar Tarefa</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          <Card className="shadow-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Tarefas
              </CardTitle>
              <CheckSquare className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{tarefasPorStatus.total}</div>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Concluídas
              </CardTitle>
              <CheckSquare className="h-4 w-4 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{tarefasPorStatus.concluidas}</div>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Em Andamento
              </CardTitle>
              <Clock className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{tarefasPorStatus.emAndamento}</div>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Pendentes
              </CardTitle>
              <Calendar className="h-4 w-4 text-secondary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{tarefasPorStatus.pendentes}</div>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Atrasadas
              </CardTitle>
              <AlertTriangle className="h-4 w-4 text-destructive" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{tarefasPorStatus.atrasadas}</div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="shadow-card">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder="Buscar tarefas..."
                    value={busca}
                    onChange={(e) => setBusca(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <Select value={filtroStatus} onValueChange={setFiltroStatus}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todas">Todas</SelectItem>
                    <SelectItem value="pendente">Pendentes</SelectItem>
                    <SelectItem value="em-andamento">Em Andamento</SelectItem>
                    <SelectItem value="concluida">Concluídas</SelectItem>
                    <SelectItem value="atrasada">Atrasadas</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tasks List */}
        <div className="space-y-4">
          {tarefasFiltradas.map((tarefa) => (
            <Card key={tarefa.id} className="shadow-card hover:shadow-elevated transition-all">
              <CardContent className="pt-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-start space-x-4">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback className="bg-primary/10 text-primary">
                          {tarefa.responsavel.iniciais}
                        </AvatarFallback>
                      </Avatar>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-2">
                          <h4 className="font-semibold text-lg">{tarefa.titulo}</h4>
                          <Badge className={getStatusColor(tarefa.status)}>
                            {getStatusLabel(tarefa.status)}
                          </Badge>
                          <Badge className={getPrioridadeColor(tarefa.prioridade)}>
                            {getPrioridadeLabel(tarefa.prioridade)}
                          </Badge>
                        </div>
                        
                        <p className="text-muted-foreground mb-3">{tarefa.descricao}</p>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <span className="text-muted-foreground">Ação Anual:</span>
                            <p className="font-medium">{tarefa.acaoAnual}</p>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Responsável:</span>
                            <p className="font-medium">{tarefa.responsavel.nome}</p>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Prazo:</span>
                            <div className="flex items-center space-x-1">
                              <p className="font-medium">
                                {new Date(tarefa.prazo).toLocaleDateString('pt-BR')}
                              </p>
                              {isAtrasada(tarefa.prazo, tarefa.status) && (
                                <AlertTriangle className="h-4 w-4 text-destructive" />
                              )}
                            </div>
                            {getDiasRestantes(tarefa.prazo) > 0 && tarefa.status !== "concluida" && (
                              <p className="text-xs text-muted-foreground">
                                {getDiasRestantes(tarefa.prazo)} dias restantes
                              </p>
                            )}
                          </div>
                          <div>
                            <span className="text-muted-foreground">Tempo:</span>
                            <p className="font-medium">
                              {tarefa.tempoGasto}h / {tarefa.estimativa}h
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="ml-6 text-right min-w-0">
                    <div className="mb-2">
                      <span className="text-2xl font-bold">{tarefa.progresso}%</span>
                    </div>
                    <Progress value={tarefa.progresso} className="h-2 w-24" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {tarefasFiltradas.length === 0 && (
          <Card className="shadow-card">
            <CardContent className="pt-6 text-center">
              <p className="text-muted-foreground">Nenhuma tarefa encontrada com os filtros aplicados.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </AppLayout>
  )
}