import { useState, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { 
  TrendingUp, 
  TrendingDown, 
  Target, 
  Calendar, 
  BarChart3,
  PieChart,
  Activity,
  Zap
} from "lucide-react"
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  Legend
} from "recharts"

const performanceData = {
  overall: {
    score: 78,
    trend: 5.2,
    status: "improving"
  },
  indicators: [
    { name: "Eficiência Operacional", value: 85, target: 90, variance: 5.2 },
    { name: "Satisfação do Cidadão", value: 72, target: 80, variance: -1.8 },
    { name: "Processos Digitais", value: 90, target: 85, variance: 12.3 },
    { name: "Redução de Custos", value: 45, target: 70, variance: -8.5 }
  ],
  monthly: [
    { month: "Jan", value: 72, target: 75 },
    { month: "Fev", value: 74, target: 76 },
    { month: "Mar", value: 76, target: 77 },
    { month: "Abr", value: 78, target: 78 },
    { month: "Mai", value: 80, target: 79 },
    { month: "Jun", value: 78, target: 80 }
  ],
  distribution: [
    { name: "Muito Bom", value: 35, color: "#22c55e" },
    { name: "Bom", value: 40, color: "#3b82f6" },
    { name: "Regular", value: 20, color: "#f59e0b" },
    { name: "Ruim", value: 5, color: "#ef4444" }
  ],
  departments: [
    { name: "TI", performance: 92, tasks: 45 },
    { name: "RH", performance: 78, tasks: 32 },
    { name: "Financeiro", performance: 85, tasks: 28 },
    { name: "Jurídico", performance: 68, tasks: 18 },
    { name: "Comunicação", performance: 82, tasks: 22 }
  ]
}

interface PerformanceMetricsProps {
  period?: "mensal" | "trimestral" | "anual"
}

export function PerformanceMetrics({ period = "mensal" }: PerformanceMetricsProps) {
  const [selectedPeriod, setSelectedPeriod] = useState<"mensal" | "trimestral" | "anual">(period)
  const [selectedDepartment, setSelectedDepartment] = useState<string>("todos")

  const filteredData = useMemo(() => {
    if (selectedDepartment === "todos") {
      return performanceData
    }
    // Filter data by department (simplified for demo)
    return performanceData
  }, [selectedDepartment])

  const getStatusColor = (variance: number) => {
    if (variance > 5) return "text-accent"
    if (variance > 0) return "text-primary"
    if (variance > -5) return "text-warning"
    return "text-destructive"
  }

  const getStatusIcon = (variance: number) => {
    if (variance > 0) return <TrendingUp className="h-4 w-4" />
    return <TrendingDown className="h-4 w-4" />
  }

  return (
    <div className="space-y-6">
      {/* Header with Filters */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Métricas de Performance</h2>
          <p className="text-muted-foreground">
            Análise detalhada do desempenho institucional
          </p>
        </div>
        
        <div className="flex items-center space-x-4">
          <Select value={selectedPeriod} onValueChange={(value: "mensal" | "trimestral" | "anual") => setSelectedPeriod(value)}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="mensal">Mensal</SelectItem>
              <SelectItem value="trimestral">Trimestral</SelectItem>
              <SelectItem value="anual">Anual</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos os Setores</SelectItem>
              <SelectItem value="ti">TI</SelectItem>
              <SelectItem value="rh">RH</SelectItem>
              <SelectItem value="financeiro">Financeiro</SelectItem>
              <SelectItem value="juridico">Jurídico</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Overall Performance */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="shadow-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Performance Geral</CardTitle>
            <Activity className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {filteredData.overall.score}%
            </div>
            <div className="flex items-center space-x-2 text-sm">
              {getStatusIcon(filteredData.overall.trend)}
              <span className={getStatusColor(filteredData.overall.trend)}>
                {filteredData.overall.trend > 0 ? '+' : ''}{filteredData.overall.trend}%
              </span>
              <span className="text-muted-foreground">vs mês anterior</span>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Meta Atingida</CardTitle>
            <Target className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">75%</div>
            <Progress value={75} className="h-2 mt-2" />
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Indicadores Ativos</CardTitle>
            <BarChart3 className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">
              18 no prazo, 6 atrasados
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Velocidade</CardTitle>
            <Zap className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8.2</div>
            <p className="text-xs text-muted-foreground">
              Tarefas/semana por pessoa
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Analytics */}
      <Tabs defaultValue="trends" className="space-y-4">
        <TabsList>
          <TabsTrigger value="trends">Tendências</TabsTrigger>
          <TabsTrigger value="indicators">Indicadores</TabsTrigger>
          <TabsTrigger value="distribution">Distribuição</TabsTrigger>
          <TabsTrigger value="departments">Setores</TabsTrigger>
        </TabsList>

        <TabsContent value="trends">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Evolução da Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={filteredData.monthly}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="month" className="text-muted-foreground" />
                  <YAxis className="text-muted-foreground" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '6px'
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="value" 
                    stroke="hsl(var(--primary))" 
                    strokeWidth={2}
                    name="Realizado"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="target" 
                    stroke="hsl(var(--accent))" 
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    name="Meta"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="indicators">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredData.indicators.map((indicator, index) => (
              <Card key={index} className="shadow-card">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base">{indicator.name}</CardTitle>
                    <Badge className={`${getStatusColor(indicator.variance)}`}>
                      {indicator.variance > 0 ? '+' : ''}{indicator.variance}%
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span>Atual: {indicator.value}%</span>
                      <span>Meta: {indicator.target}%</span>
                    </div>
                    <Progress 
                      value={(indicator.value / indicator.target) * 100} 
                      className="h-2" 
                    />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="distribution">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Distribuição de Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <RechartsPieChart>
                  <Pie
                    data={filteredData.distribution}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}%`}
                  >
                    {filteredData.distribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </RechartsPieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="departments">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Performance por Setor</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={filteredData.departments}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="name" className="text-muted-foreground" />
                  <YAxis className="text-muted-foreground" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '6px'
                    }}
                  />
                  <Legend />
                  <Bar 
                    dataKey="performance" 
                    fill="hsl(var(--primary))" 
                    name="Performance (%)"
                  />
                  <Bar 
                    dataKey="tasks" 
                    fill="hsl(var(--accent))" 
                    name="Tarefas"
                  />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}