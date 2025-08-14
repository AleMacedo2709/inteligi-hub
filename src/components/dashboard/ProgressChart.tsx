import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"

interface ProgressItem {
  id: string
  name: string
  progress: number
  target: number
  status: "on-track" | "behind" | "at-risk" | "completed"
}

interface ProgressChartProps {
  title: string
  items: ProgressItem[]
}

export function ProgressChart({ title, items }: ProgressChartProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-accent text-accent-foreground"
      case "on-track":
        return "bg-primary text-primary-foreground"
      case "behind":
        return "bg-warning text-warning-foreground"
      case "at-risk":
        return "bg-destructive text-destructive-foreground"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "completed":
        return "Concluído"
      case "on-track":
        return "No prazo"
      case "behind":
        return "Atrasado"
      case "at-risk":
        return "Em risco"
      default:
        return "Indefinido"
    }
  }

  const getProgressColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-accent"
      case "on-track":
        return "bg-primary"
      case "behind":
        return "bg-warning"
      case "at-risk":
        return "bg-destructive"
      default:
        return "bg-muted"
    }
  }

  return (
    <Card className="shadow-card">
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {items.map((item) => (
          <div key={item.id} className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="text-sm font-medium">{item.name}</div>
                <div className="text-xs text-muted-foreground">
                  Meta: {item.target}%
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium">{item.progress}%</span>
                <Badge 
                  className={`text-xs ${getStatusColor(item.status)}`}
                  variant="secondary"
                >
                  {getStatusLabel(item.status)}
                </Badge>
              </div>
            </div>
            <Progress 
              value={item.progress} 
              className="h-2"
              style={{
                background: "hsl(var(--muted))",
              }}
            />
          </div>
        ))}
      </CardContent>
    </Card>
  )
}