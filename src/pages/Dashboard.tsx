import { 
  Target, 
  Calendar, 
  BarChart3, 
  CheckSquare, 
  AlertTriangle, 
  TrendingUp,
  Clock,
  Users
} from "lucide-react"
import { MetricCard } from "@/components/dashboard/MetricCard"
import { ProgressChart } from "@/components/dashboard/ProgressChart"
import { RecentActivity } from "@/components/dashboard/RecentActivity"

// Mock data - In real app, this would come from API
const mockIndicators = [
  {
    id: "1",
    name: "Eficiência Operacional",
    progress: 75,
    target: 80,
    status: "on-track" as const
  },
  {
    id: "2",
    name: "Satisfação do Cidadão",
    progress: 65,
    target: 85,
    status: "behind" as const
  },
  {
    id: "3",
    name: "Digitalização de Processos",
    progress: 90,
    target: 95,
    status: "on-track" as const
  },
  {
    id: "4",
    name: "Redução de Custos",
    progress: 45,
    target: 70,
    status: "at-risk" as const
  }
]

const mockActivities = [
  {
    id: "1",
    type: "task" as const,
    title: "Implementação do Sistema SEI",
    description: "Tarefa concluída com sucesso",
    user: { name: "Maria Santos", initials: "MS" },
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    status: "completed" as const
  },
  {
    id: "2",
    type: "indicator" as const,
    title: "Indicador de Eficiência Atualizado",
    description: "Novo valor registrado: 75%",
    user: { name: "João Silva", initials: "JS" },
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
    status: "updated" as const
  },
  {
    id: "3",
    type: "paa" as const,
    title: "PAA 2025 Criado",
    description: "Plano Anual de Atividades para 2025",
    user: { name: "Ana Costa", initials: "AC" },
    timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    status: "created" as const
  },
  {
    id: "4",
    type: "task" as const,
    title: "Revisão de Processos",
    description: "Prazo vencido há 2 dias",
    user: { name: "Carlos Lima", initials: "CL" },
    timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    status: "delayed" as const
  }
]

export default function Dashboard() {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground">
          Dashboard Estratégico
        </h1>
        <p className="text-muted-foreground">
          Acompanhe o progresso do planejamento estratégico institucional
        </p>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Ciclos Ativos"
          value="2"
          subtitle="2023-2029 | 2024-2030"
          icon={Target}
          status="success"
          trend={{ value: 12, type: "up" }}
        />
        
        <MetricCard
          title="PAAs Vigentes"
          value="3"
          subtitle="2023, 2024, 2025"
          icon={Calendar}
          status="info"
        />
        
        <MetricCard
          title="Indicadores"
          value="24"
          subtitle="18 no prazo, 6 atrasados"
          icon={BarChart3}
          status="warning"
          trend={{ value: 8, type: "down" }}
        />
        
        <MetricCard
          title="Tarefas Pendentes"
          value="47"
          subtitle="12 vencendo esta semana"
          icon={CheckSquare}
          status="danger"
          trend={{ value: 15, type: "up" }}
        />
      </div>

      {/* Secondary Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <MetricCard
          title="Alerta de Prazos"
          value="8"
          subtitle="Ações com vencimento próximo"
          icon={AlertTriangle}
          status="warning"
        />
        
        <MetricCard
          title="Performance Geral"
          value="73%"
          subtitle="Meta institucional"
          icon={TrendingUp}
          status="success"
          trend={{ value: 5, type: "up" }}
        />
        
        <MetricCard
          title="Colaboradores Envolvidos"
          value="156"
          subtitle="Ativos no sistema"
          icon={Users}
          status="info"
        />
      </div>

      {/* Charts and Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ProgressChart
          title="Progresso dos Indicadores Principais"
          items={mockIndicators}
        />
        
        <RecentActivity activities={mockActivities} />
      </div>

      {/* Quick Actions */}
      <div className="bg-gradient-primary rounded-lg p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold mb-2">
              Ações Rápidas
            </h3>
            <p className="text-white/90 text-sm">
              Acesse as funcionalidades mais utilizadas
            </p>
          </div>
          <div className="flex space-x-4">
            <button className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-md text-sm font-medium transition-colors">
              Novo Ciclo
            </button>
            <button className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-md text-sm font-medium transition-colors">
              Relatório Mensal
            </button>
            <button className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-md text-sm font-medium transition-colors">
              Atualizar Indicador
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}