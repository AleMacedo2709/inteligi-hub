import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { formatDistanceToNow } from "date-fns"
import { ptBR } from "date-fns/locale"

interface Activity {
  id: string
  type: "task" | "indicator" | "cycle" | "paa"
  title: string
  description: string
  user: {
    name: string
    initials: string
  }
  timestamp: Date
  status?: "completed" | "updated" | "created" | "delayed"
}

interface RecentActivityProps {
  activities: Activity[]
}

export function RecentActivity({ activities }: RecentActivityProps) {
  const getTypeLabel = (type: string) => {
    switch (type) {
      case "task":
        return "Tarefa"
      case "indicator":
        return "Indicador"
      case "cycle":
        return "Ciclo"
      case "paa":
        return "PAA"
      default:
        return type
    }
  }

  const getStatusColor = (status?: string) => {
    switch (status) {
      case "completed":
        return "bg-accent text-accent-foreground"
      case "updated":
        return "bg-primary text-primary-foreground"
      case "created":
        return "bg-secondary text-secondary-foreground"
      case "delayed":
        return "bg-destructive text-destructive-foreground"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  const getStatusLabel = (status?: string) => {
    switch (status) {
      case "completed":
        return "Concluído"
      case "updated":
        return "Atualizado"
      case "created":
        return "Criado"
      case "delayed":
        return "Atrasado"
      default:
        return ""
    }
  }

  return (
    <Card className="shadow-card">
      <CardHeader>
        <CardTitle className="text-lg">Atividades Recentes</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-muted/30 transition-colors">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-primary/10 text-primary text-xs">
                  {activity.user.initials}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-1">
                  <Badge variant="outline" className="text-xs">
                    {getTypeLabel(activity.type)}
                  </Badge>
                  {activity.status && (
                    <Badge className={`text-xs ${getStatusColor(activity.status)}`}>
                      {getStatusLabel(activity.status)}
                    </Badge>
                  )}
                </div>
                
                <div className="text-sm font-medium text-foreground mb-1">
                  {activity.title}
                </div>
                
                <div className="text-xs text-muted-foreground mb-2">
                  {activity.description}
                </div>
                
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>{activity.user.name}</span>
                  <span>
                    {formatDistanceToNow(activity.timestamp, { 
                      addSuffix: true, 
                      locale: ptBR 
                    })}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}