import { useState } from "react"
import { 
  Calendar, 
  Plus, 
  Eye, 
  Edit, 
  CheckSquare,
  Clock,
  AlertTriangle,
  Target,
  FileText,
  Users
} from "lucide-react"
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

// Mock data
const paas = [
  {
    id: 1,
    nome: "PAA 2024",
    ano: 2024,
    status: "ativo",
    progresso: 68,
    acoes: 15,
    tarefas: 89,
    tarefasConcluidas: 61,
    orcamento: 2500000,
    responsavel: "João Silva",
    dataInicio: "2024-01-01",
    dataFim: "2024-12-31"
  },
  {
    id: 2,
    nome: "PAA 2025", 
    ano: 2025,
    status: "planejamento",
    progresso: 15,
    acoes: 18,
    tarefas: 124,
    tarefasConcluidas: 0,
    orcamento: 3200000,
    responsavel: "Ana Costa",
    dataInicio: "2025-01-01",
    dataFim: "2025-12-31"
  },
  {
    id: 3,
    nome: "PAA 2023",
    ano: 2023,
    status: "concluido",
    progresso: 100,
    acoes: 12,
    tarefas: 78,
    tarefasConcluidas: 78,
    orcamento: 2100000,
    responsavel: "Maria Santos",
    dataInicio: "2023-01-01",
    dataFim: "2023-12-31"
  }
]

const acoesAnuais = [
  {
    id: 1,
    paaId: 1,
    nome: "Implementação do Sistema Digital",
    acaoEstrategica: "Modernização Digital",
    progresso: 85,
    prazo: "2024-06-30",
    status: "andamento",
    responsavel: "Carlos Lima",
    orcamento: 450000
  },
  {
    id: 2,
    paaId: 1,
    nome: "Capacitação de Servidores",
    acaoEstrategica: "Desenvolvimento Humano",
    progresso: 60,
    prazo: "2024-09-15",
    status: "andamento",
    responsavel: "Ana Costa",
    orcamento: 180000
  },
  {
    id: 3,
    paaId: 1,
    nome: "Otimização de Processos",
    acaoEstrategica: "Eficiência Operacional", 
    progresso: 40,
    prazo: "2024-12-20",
    status: "atrasado",
    responsavel: "João Silva",
    orcamento: 320000
  }
]

const getStatusColor = (status: string) => {
  switch (status) {
    case "ativo":
      return "bg-accent text-accent-foreground"
    case "planejamento":
      return "bg-warning text-warning-foreground"
    case "concluido":
      return "bg-primary text-primary-foreground"
    case "andamento":
      return "bg-primary text-primary-foreground"
    case "atrasado":
      return "bg-destructive text-destructive-foreground"
    default:
      return "bg-muted text-muted-foreground"
  }
}

const getStatusLabel = (status: string) => {
  switch (status) {
    case "ativo":
      return "Ativo"
    case "planejamento":
      return "Planejamento"
    case "concluido":
      return "Concluído"
    case "andamento":
      return "Em Andamento"
    case "atrasado":
      return "Atrasado"
    default:
      return status
  }
}

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value)
}

export default function PAAs() {
  const [selectedPAA, setSelectedPAA] = useState<number | null>(null)

  return (
    <AppLayout>
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              Planos Anuais de Atividades (PAAs)
            </h1>
            <p className="text-muted-foreground">
              Planejamento anual e acompanhamento de ações estratégicas
            </p>
          </div>
          
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-gradient-primary">
                <Plus className="h-4 w-4 mr-2" />
                Novo PAA
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Criar Novo PAA</DialogTitle>
                <DialogDescription>
                  Define um novo Plano Anual de Atividades
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="nome" className="text-right">
                    Nome
                  </Label>
                  <Input
                    id="nome"
                    placeholder="PAA 2025"
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="ano" className="text-right">
                    Ano
                  </Label>
                  <Select>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Selecione o ano" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="2024">2024</SelectItem>
                      <SelectItem value="2025">2025</SelectItem>
                      <SelectItem value="2026">2026</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="orcamento" className="text-right">
                    Orçamento
                  </Label>
                  <Input
                    id="orcamento"
                    placeholder="R$ 0,00"
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="descricao" className="text-right">
                    Descrição
                  </Label>
                  <Textarea
                    id="descricao"
                    placeholder="Descreva os objetivos do PAA..."
                    className="col-span-3"
                  />
                </div>
              </div>
              <div className="flex justify-end">
                <Button>Criar PAA</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="shadow-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                PAAs Ativos
              </CardTitle>
              <Calendar className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2</div>
              <p className="text-xs text-muted-foreground">
                2024 e planejamento 2025
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Ações em Andamento
              </CardTitle>
              <Target className="h-4 w-4 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">33</div>
              <p className="text-xs text-muted-foreground">
                Distribuídas nos PAAs
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Tarefas Concluídas
              </CardTitle>
              <CheckSquare className="h-4 w-4 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">139</div>
              <p className="text-xs text-muted-foreground">
                De 291 tarefas totais
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Orçamento Total
              </CardTitle>
              <FileText className="h-4 w-4 text-warning" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">R$ 7,8M</div>
              <p className="text-xs text-muted-foreground">
                Todos os PAAs
              </p>
            </CardContent>
          </Card>
        </div>

        {/* PAAs Table */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Planos Anuais de Atividades</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead>Ano</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Progresso</TableHead>
                  <TableHead>Ações</TableHead>
                  <TableHead>Tarefas</TableHead>
                  <TableHead>Orçamento</TableHead>
                  <TableHead>Responsável</TableHead>
                  <TableHead>Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paas.map((paa) => (
                  <TableRow key={paa.id}>
                    <TableCell className="font-medium">{paa.nome}</TableCell>
                    <TableCell>{paa.ano}</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(paa.status)}>
                        {getStatusLabel(paa.status)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Progress value={paa.progresso} className="h-2 w-20" />
                        <span className="text-sm">{paa.progresso}%</span>
                      </div>
                    </TableCell>
                    <TableCell>{paa.acoes}</TableCell>
                    <TableCell>
                      <span className="text-sm">
                        {paa.tarefasConcluidas}/{paa.tarefas}
                      </span>
                    </TableCell>
                    <TableCell>{formatCurrency(paa.orcamento)}</TableCell>
                    <TableCell>{paa.responsavel}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => setSelectedPAA(paa.id)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Ações do PAA Selecionado */}
        {selectedPAA && (
          <Card className="shadow-card animate-slide-up">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Target className="h-5 w-5" />
                <span>Ações Anuais - PAA 2024</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {acoesAnuais.map((acao) => (
                  <Card key={acao.id} className="border-2 hover:shadow-elevated transition-all">
                    <CardContent className="pt-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="font-semibold text-base mb-2">{acao.nome}</h4>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                            <div>
                              <span className="text-muted-foreground">Ação Estratégica:</span>
                              <p className="font-medium">{acao.acaoEstrategica}</p>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Responsável:</span>
                              <p className="font-medium">{acao.responsavel}</p>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Prazo:</span>
                              <p className="font-medium">{new Date(acao.prazo).toLocaleDateString('pt-BR')}</p>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Orçamento:</span>
                              <p className="font-medium">{formatCurrency(acao.orcamento)}</p>
                            </div>
                          </div>
                        </div>
                        <div className="ml-4 text-right">
                          <Badge className={getStatusColor(acao.status)}>
                            {getStatusLabel(acao.status)}
                          </Badge>
                          <div className="mt-2">
                            <div className="flex items-center space-x-2 mb-1">
                              <Progress value={acao.progresso} className="h-2 w-20" />
                              <span className="text-sm font-medium">{acao.progresso}%</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </AppLayout>
  )
}