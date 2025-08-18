import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { 
  Bell, 
  BellRing, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  Target,
  X
} from "lucide-react"
import { formatDistanceToNow } from "date-fns"
import { ptBR } from "date-fns/locale"

export interface Notification {
  id: string
  type: "info" | "warning" | "success" | "error"
  title: string
  message: string
  timestamp: Date
  read: boolean
  actionUrl?: string
  user?: {
    name: string
    initials: string
  }
}

const mockNotifications: Notification[] = [
  {
    id: "1",
    type: "warning",
    title: "Prazo próximo do vencimento",
    message: "A tarefa 'Implementar módulo de autenticação SSO' vence em 2 dias",
    timestamp: new Date(Date.now() - 30 * 60 * 1000),
    read: false,
    actionUrl: "/tarefas",
    user: { name: "Sistema", initials: "S" }
  },
  {
    id: "2",
    type: "success",
    title: "Indicador atualizado",
    message: "O indicador 'Eficiência Operacional' foi atualizado para 78%",
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    read: false,
    user: { name: "João Silva", initials: "JS" }
  },
  {
    id: "3",
    type: "info",
    title: "Novo PAA criado",
    message: "PAA 2025 foi criado com sucesso",
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
    read: true,
    actionUrl: "/paas",
    user: { name: "Ana Costa", initials: "AC" }
  },
  {
    id: "4",
    type: "error",
    title: "Tarefa atrasada",
    message: "A tarefa 'Criar documentação técnica da API' está atrasada há 3 dias",
    timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    read: false,
    actionUrl: "/tarefas",
    user: { name: "Sistema", initials: "S" }
  },
  {
    id: "5",
    type: "info",
    title: "Reunião agendada",
    message: "Reunião de planejamento estratégico agendada para amanhã às 14:00",
    timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    read: true,
    user: { name: "Secretaria", initials: "SE" }
  }
]

const getNotificationIcon = (type: Notification["type"]) => {
  switch (type) {
    case "warning":
      return <AlertTriangle className="h-4 w-4 text-warning" />
    case "success":
      return <CheckCircle className="h-4 w-4 text-accent" />
    case "error":
      return <AlertTriangle className="h-4 w-4 text-destructive" />
    case "info":
    default:
      return <Target className="h-4 w-4 text-primary" />
  }
}

const getNotificationColor = (type: Notification["type"]) => {
  switch (type) {
    case "warning":
      return "border-l-warning"
    case "success":
      return "border-l-accent"
    case "error":
      return "border-l-destructive"
    case "info":
    default:
      return "border-l-primary"
  }
}

export function NotificationCenter() {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications)
  const [isOpen, setIsOpen] = useState(false)

  const unreadCount = notifications.filter(n => !n.read).length

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id 
          ? { ...notification, read: true }
          : notification
      )
    )
  }

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(notification => ({ ...notification, read: true }))
    )
  }

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id))
  }

  // Simulate real-time notifications
  useEffect(() => {
    const interval = setInterval(() => {
      // Randomly add a new notification
      if (Math.random() > 0.8) {
        const newNotification: Notification = {
          id: Date.now().toString(),
          type: ["info", "warning", "success"][Math.floor(Math.random() * 3)] as any,
          title: "Nova notificação",
          message: "Esta é uma notificação simulada em tempo real",
          timestamp: new Date(),
          read: false,
          user: { name: "Sistema", initials: "S" }
        }
        setNotifications(prev => [newNotification, ...prev.slice(0, 9)])
      }
    }, 30000) // Check every 30 seconds

    return () => clearInterval(interval)
  }, [])

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="relative">
          {unreadCount > 0 ? (
            <BellRing className="h-4 w-4" />
          ) : (
            <Bell className="h-4 w-4" />
          )}
          {unreadCount > 0 && (
            <Badge 
              variant="destructive" 
              className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center text-xs"
            >
              {unreadCount > 9 ? "9+" : unreadCount}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      
      <PopoverContent className="w-96 p-0" align="end">
        <Card className="border-0 shadow-lg">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Notificações</CardTitle>
              {unreadCount > 0 && (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={markAllAsRead}
                  className="text-xs"
                >
                  Marcar todas como lidas
                </Button>
              )}
            </div>
            {unreadCount > 0 && (
              <p className="text-sm text-muted-foreground">
                {unreadCount} não lida{unreadCount > 1 ? 's' : ''}
              </p>
            )}
          </CardHeader>
          
          <CardContent className="p-0">
            <ScrollArea className="h-96">
              {notifications.length === 0 ? (
                <div className="p-6 text-center text-muted-foreground">
                  <Bell className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">Nenhuma notificação</p>
                </div>
              ) : (
                <div className="space-y-1">
                  {notifications.map((notification, index) => (
                    <div key={notification.id}>
                      <div 
                        className={`p-4 hover:bg-muted/30 transition-colors cursor-pointer border-l-4 ${getNotificationColor(notification.type)} ${
                          !notification.read ? 'bg-muted/20' : ''
                        }`}
                        onClick={() => !notification.read && markAsRead(notification.id)}
                      >
                        <div className="flex items-start space-x-3">
                          <div className="flex-shrink-0 mt-1">
                            {getNotificationIcon(notification.type)}
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <p className={`text-sm font-medium ${
                                !notification.read ? 'text-foreground' : 'text-muted-foreground'
                              }`}>
                                {notification.title}
                              </p>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-6 w-6 p-0 hover:bg-destructive/20"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  removeNotification(notification.id)
                                }}
                              >
                                <X className="h-3 w-3" />
                              </Button>
                            </div>
                            
                            <p className="text-xs text-muted-foreground mt-1">
                              {notification.message}
                            </p>
                            
                            <div className="flex items-center justify-between mt-2">
                              <div className="flex items-center space-x-2">
                                {notification.user && (
                                  <Avatar className="h-5 w-5">
                                    <AvatarFallback className="text-xs bg-primary/10 text-primary">
                                      {notification.user.initials}
                                    </AvatarFallback>
                                  </Avatar>
                                )}
                                <span className="text-xs text-muted-foreground">
                                  {formatDistanceToNow(notification.timestamp, {
                                    addSuffix: true,
                                    locale: ptBR
                                  })}
                                </span>
                              </div>
                              
                              {!notification.read && (
                                <Badge variant="secondary" className="h-2 w-2 p-0 rounded-full bg-primary" />
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {index < notifications.length - 1 && <Separator />}
                    </div>
                  ))}
                </div>
              )}
            </ScrollArea>
          </CardContent>
        </Card>
      </PopoverContent>
    </Popover>
  )
}