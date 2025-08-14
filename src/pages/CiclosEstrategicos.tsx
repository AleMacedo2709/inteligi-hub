import { useState } from "react"
import { 
  Target, 
  Plus, 
  Eye, 
  Edit, 
  Calendar,
  BarChart3,
  Users,
  CheckCircle,
  AlertCircle,
  Clock
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

// Mock data
const ciclosEstrategicos = [
  {
    id: 1,
    nome: "Ciclo Estratégico 2023-2029",
    periodo: "2023-2029",
    status: "ativo",
    progresso: 65,
    objetivos: 8,
    indicadores: 24,
    responsavel: "Ana Costa",
    dataInicio: "2023-01-01",
    dataFim: "2029-12-31"
  },
  {
    id: 2,
    nome: "Ciclo Estratégico 2024-2030",
    periodo: "2024-2030", 
    status: "planejamento",
    progresso: 25,
    objetivos: 6,
    indicadores: 18,
    responsavel: "João Silva",
    dataInicio: "2024-01-01",
    dataFim: "2030-12-31"
  },
  {
    id: 3,
    nome: "Ciclo Estratégico 2022-2028",
    periodo: "2022-2028",
    status: "concluido",
    progresso: 100,
    objetivos: 10,
    indicadores: 30,
    responsavel: "Maria Santos",
    dataInicio: "2022-01-01",
    dataFim: "2028-12-31"
  }
]

const objetivosEstrategicos = [
  {
    id: 1,
    cicloId: 1,
    nome: "Modernização Digital",
    perspectiva: "Processos Internos",
    progresso: 75,
    status: "andamento"
  },
  {
    id: 2,
    cicloId: 1,
    nome: "Eficiência Operacional",
    perspectiva: "Financeira",
    progresso: 60,
    status: "andamento"
  },
  {
    id: 3,
    cicloId: 1,
    nome: "Satisfação do Cidadão",
    perspectiva: "Cliente",
    progresso: 85,
    status: "andamento"
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
    default:
      return status
  }
}

export default function CiclosEstrategicos() {
  const [selectedCiclo, setSelectedCiclo] = useState<number | null>(null)

  return (
    <AppLayout>
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              Ciclos Estratégicos
            </h1>
            <p className="text-muted-foreground">
              Planejamento estratégico de 6 anos da instituição
            </p>
          </div>
          
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-gradient-primary">
                <Plus className="h-4 w-4 mr-2" />
                Novo Ciclo
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Criar Novo Ciclo Estratégico</DialogTitle>
                <DialogDescription>
                  Define um novo ciclo de planejamento estratégico de 6 anos
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="nome" className="text-right">
                    Nome
                  </Label>
                  <Input
                    id="nome"
                    placeholder="Ciclo Estratégico 2025-2031"
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="periodo" className="text-right">
                    Período
                  </Label>
                  <Input
                    id="periodo"
                    placeholder="2025-2031"
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="descricao" className="text-right">
                    Descrição
                  </Label>
                  <Textarea
                    id="descricao"
                    placeholder="Descreva os objetivos gerais do ciclo..."
                    className="col-span-3"
                  />
                </div>
              </div>
              <div className="flex justify-end">
                <Button>Criar Ciclo</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="shadow-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total de Ciclos
              </CardTitle>
              <Target className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-muted-foreground">
                1 ativo, 1 em planejamento
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Objetivos Estratégicos
              </CardTitle>
              <CheckCircle className="h-4 w-4 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24</div>
              <p className="text-xs text-muted-foreground">
                Todos os ciclos
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Indicadores Totais
              </CardTitle>
              <BarChart3 className="h-4 w-4 text-warning" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">72</div>
              <p className="text-xs text-muted-foreground">
                Distribuídos nos ciclos
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Performance Média
              </CardTitle>
              <AlertCircle className="h-4 w-4 text-destructive" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">73%</div>
              <p className="text-xs text-muted-foreground">
                Progresso geral
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Ciclos Table */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Ciclos Estratégicos</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead>Período</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Progresso</TableHead>
                  <TableHead>Objetivos</TableHead>
                  <TableHead>Responsável</TableHead>
                  <TableHead>Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {ciclosEstrategicos.map((ciclo) => (
                  <TableRow key={ciclo.id}>
                    <TableCell className="font-medium">{ciclo.nome}</TableCell>
                    <TableCell>{ciclo.periodo}</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(ciclo.status)}>
                        {getStatusLabel(ciclo.status)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Progress value={ciclo.progresso} className="h-2 w-20" />
                        <span className="text-sm">{ciclo.progresso}%</span>
                      </div>
                    </TableCell>
                    <TableCell>{ciclo.objetivos}</TableCell>
                    <TableCell>{ciclo.responsavel}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => setSelectedCiclo(ciclo.id)}
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

        {/* Objetivos do Ciclo Selecionado */}
        {selectedCiclo && (
          <Card className="shadow-card animate-slide-up">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Target className="h-5 w-5" />
                <span>Objetivos Estratégicos - Ciclo 2023-2029</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {objetivosEstrategicos.map((objetivo) => (
                  <Card key={objetivo.id} className="border-2 hover:shadow-elevated transition-all">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base">{objetivo.nome}</CardTitle>
                      <Badge variant="outline" className="w-fit">
                        {objetivo.perspectiva}
                      </Badge>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">Progresso</span>
                          <span className="text-sm font-medium">{objetivo.progresso}%</span>
                        </div>
                        <Progress value={objetivo.progresso} className="h-2" />
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