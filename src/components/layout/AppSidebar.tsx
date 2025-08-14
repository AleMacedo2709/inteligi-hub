import { useState } from "react"
import { 
  LayoutDashboard, 
  Target, 
  Calendar, 
  BarChart3, 
  CheckSquare, 
  FileText,
  Brain,
  Settings,
  ChevronLeft,
  ChevronRight
} from "lucide-react"
import { NavLink, useLocation } from "react-router-dom"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"

const navigationItems = [
  { 
    title: "Dashboard", 
    url: "/", 
    icon: LayoutDashboard,
    description: "Visão geral do sistema"
  },
  { 
    title: "Ciclos Estratégicos", 
    url: "/ciclos", 
    icon: Target,
    description: "Planejamento de 6 anos"
  },
  { 
    title: "PAAs", 
    url: "/paas", 
    icon: Calendar,
    description: "Planos Anuais de Atividades"
  },
  { 
    title: "Indicadores", 
    url: "/indicadores", 
    icon: BarChart3,
    description: "Métricas e acompanhamento"
  },
  { 
    title: "Tarefas", 
    url: "/tarefas", 
    icon: CheckSquare,
    description: "Ações e atividades"
  },
  { 
    title: "Relatórios", 
    url: "/relatorios", 
    icon: FileText,
    description: "Documentos e análises"
  },
]

const integrationItems = [
  { 
    title: "SEI", 
    url: "/sei", 
    icon: FileText,
    description: "Integração SEI"
  },
  { 
    title: "IA Assistant", 
    url: "/ia", 
    icon: Brain,
    description: "Assistente inteligente"
  },
]

export function AppSidebar() {
  const { state, toggleSidebar } = useSidebar()
  const location = useLocation()
  const currentPath = location.pathname
  const collapsed = state === "collapsed"

  const isActive = (path: string) => currentPath === path
  const getNavCls = ({ isActive }: { isActive: boolean }) =>
    isActive 
      ? "bg-primary/10 text-primary font-medium border-r-2 border-primary" 
      : "hover:bg-muted/50 text-muted-foreground hover:text-foreground"

  return (
    <Sidebar
      className={`transition-all duration-300 border-r ${
        collapsed ? "w-16" : "w-64"
      }`}
      collapsible="icon"
    >
      <div className="flex items-center justify-between p-4 border-b">
        {!collapsed && (
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <Target className="h-5 w-5 text-white" />
            </div>
            <div>
              <h2 className="text-sm font-semibold">SPE</h2>
              <p className="text-xs text-muted-foreground">Planejamento</p>
            </div>
          </div>
        )}
        <button
          onClick={toggleSidebar}
          className="p-1.5 rounded-md hover:bg-muted/50 transition-colors"
        >
          {collapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </button>
      </div>

      <SidebarContent className="px-2">
        <SidebarGroup>
          <SidebarGroupLabel className={collapsed ? "sr-only" : ""}>
            Principal
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className="w-full">
                    <NavLink 
                      to={item.url} 
                      end 
                      className={({ isActive }) => 
                        `flex items-center space-x-3 px-3 py-2 rounded-md transition-all duration-200 ${getNavCls({ isActive })}`
                      }
                      title={collapsed ? item.title : undefined}
                    >
                      <item.icon className="h-5 w-5 flex-shrink-0" />
                      {!collapsed && (
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-medium">{item.title}</div>
                          <div className="text-xs text-muted-foreground truncate">
                            {item.description}
                          </div>
                        </div>
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className={collapsed ? "sr-only" : ""}>
            Integrações
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {integrationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className="w-full">
                    <NavLink 
                      to={item.url} 
                      end 
                      className={({ isActive }) => 
                        `flex items-center space-x-3 px-3 py-2 rounded-md transition-all duration-200 ${getNavCls({ isActive })}`
                      }
                      title={collapsed ? item.title : undefined}
                    >
                      <item.icon className="h-5 w-5 flex-shrink-0" />
                      {!collapsed && (
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-medium">{item.title}</div>
                          <div className="text-xs text-muted-foreground truncate">
                            {item.description}
                          </div>
                        </div>
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <div className="mt-auto p-2">
          <SidebarMenuButton asChild className="w-full">
            <NavLink 
              to="/configuracoes" 
              className={({ isActive }) => 
                `flex items-center space-x-3 px-3 py-2 rounded-md transition-all duration-200 ${getNavCls({ isActive })}`
              }
              title={collapsed ? "Configurações" : undefined}
            >
              <Settings className="h-5 w-5 flex-shrink-0" />
              {!collapsed && (
                <span className="text-sm font-medium">Configurações</span>
              )}
            </NavLink>
          </SidebarMenuButton>
        </div>
      </SidebarContent>
    </Sidebar>
  )
}