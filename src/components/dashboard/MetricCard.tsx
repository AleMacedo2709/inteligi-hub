import { LucideIcon } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface MetricCardProps {
  title: string
  value: string | number
  subtitle?: string
  icon: LucideIcon
  trend?: {
    value: number
    type: "up" | "down" | "stable"
  }
  status?: "success" | "warning" | "danger" | "info"
  className?: string
}

export function MetricCard({ 
  title, 
  value, 
  subtitle, 
  icon: Icon, 
  trend, 
  status = "info",
  className = ""
}: MetricCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "success":
        return "text-accent bg-accent/10"
      case "warning":
        return "text-warning bg-warning/10"
      case "danger":
        return "text-destructive bg-destructive/10"
      default:
        return "text-primary bg-primary/10"
    }
  }

  const getTrendColor = (type: string) => {
    switch (type) {
      case "up":
        return "text-accent"
      case "down":
        return "text-destructive"
      default:
        return "text-muted-foreground"
    }
  }

  return (
    <Card className={`shadow-card hover:shadow-elevated transition-all duration-300 hover:scale-[1.02] ${className}`}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <div className={`p-2 rounded-md ${getStatusColor(status)}`}>
          <Icon className="h-4 w-4" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-baseline justify-between">
          <div>
            <div className="text-2xl font-bold">{value}</div>
            {subtitle && (
              <p className="text-xs text-muted-foreground mt-1">
                {subtitle}
              </p>
            )}
          </div>
          {trend && (
            <Badge variant="outline" className={getTrendColor(trend.type)}>
              {trend.type === "up" ? "↗" : trend.type === "down" ? "↘" : "→"}
              {Math.abs(trend.value)}%
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  )
}