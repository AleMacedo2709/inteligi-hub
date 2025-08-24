import { useState } from "react"
import { Button } from "@/components/ui/button"
import { 
  Download, 
  Eye, 
  Play, 
  Pause, 
  Settings, 
  RefreshCw,
  Trash2
} from "lucide-react"
import { useToast } from "@/hooks/useToast"

interface ActionButtonsProps {
  variant?: "download" | "preview" | "play" | "pause" | "settings" | "refresh" | "delete"
  size?: "sm" | "default" | "lg"
  disabled?: boolean
  loading?: boolean
  onClick?: () => void
  children?: React.ReactNode
  className?: string
}

export function ActionButtons({ 
  variant = "download", 
  size = "default", 
  disabled = false, 
  loading = false,
  onClick,
  children,
  className = ""
}: ActionButtonsProps) {
  const toast = useToast()
  
  const getButtonConfig = () => {
    switch (variant) {
      case "download":
        return {
          icon: loading ? RefreshCw : Download,
          text: loading ? "Baixando..." : "Download",
          className: "hover:bg-accent hover:text-accent-foreground"
        }
      case "preview":
        return {
          icon: Eye,
          text: "Visualizar",
          className: "hover:bg-primary hover:text-primary-foreground"
        }
      case "play":
        return {
          icon: Play,
          text: "Ativar",
          className: "hover:bg-accent hover:text-accent-foreground"
        }
      case "pause":
        return {
          icon: Pause,
          text: "Pausar",
          className: "hover:bg-warning hover:text-warning-foreground"
        }
      case "settings":
        return {
          icon: Settings,
          text: "Configurar",
          className: "hover:bg-primary hover:text-primary-foreground"
        }
      case "refresh":
        return {
          icon: loading ? RefreshCw : RefreshCw,
          text: loading ? "Atualizando..." : "Atualizar",
          className: "hover:bg-accent hover:text-accent-foreground"
        }
      case "delete":
        return {
          icon: Trash2,
          text: "Excluir",
          className: "hover:bg-destructive hover:text-destructive-foreground"
        }
      default:
        return {
          icon: Download,
          text: "Download",
          className: "hover:bg-accent hover:text-accent-foreground"
        }
    }
  }

  const config = getButtonConfig()
  const IconComponent = config.icon

  return (
    <Button
      variant="outline"
      size={size}
      disabled={disabled || loading}
      onClick={onClick}
      className={`transition-colors ${config.className} ${className} ${loading ? 'animate-pulse' : ''}`}
    >
      <IconComponent className={`h-4 w-4 ${children ? 'mr-2' : ''} ${loading && config.icon === RefreshCw ? 'animate-spin' : ''}`} />
      {children || config.text}
    </Button>
  )
}

// Hook para ações comuns
export function useActionHandlers() {
  const [loading, setLoading] = useState<Record<string, boolean>>({})
  const toast = useToast()

  const setLoadingState = (key: string, isLoading: boolean) => {
    setLoading(prev => ({ ...prev, [key]: isLoading }))
  }

  const handleDownload = async (item: any, key?: string) => {
    const loadingKey = key || `download-${item.id}`
    setLoadingState(loadingKey, true)
    
    try {
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      const blob = new Blob([`Arquivo: ${item.nome || item.title}\nData: ${new Date().toLocaleDateString('pt-BR')}`], {
        type: 'text/plain'
      })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `${(item.nome || item.title).replace(/\s+/g, '_')}.txt`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
      
      toast.success("Download realizado com sucesso")
    } catch (error) {
      toast.error("Erro ao fazer download")
    } finally {
      setLoadingState(loadingKey, false)
    }
  }

  const handlePreview = (item: any) => {
    toast.info(`Abrindo preview: ${item.nome || item.title}`)
    window.open(`/preview/${item.id}`, '_blank')
  }

  const handleToggle = async (id: string, action: string, key?: string) => {
    const loadingKey = key || `toggle-${id}`
    setLoadingState(loadingKey, true)
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      toast.success(`${action} realizada com sucesso`)
    } catch (error) {
      toast.error(`Erro ao executar ${action}`)
    } finally {
      setLoadingState(loadingKey, false)
    }
  }

  const handleDelete = async (item: any, key?: string) => {
    const loadingKey = key || `delete-${item.id}`
    setLoadingState(loadingKey, true)
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1500))
      toast.success("Item excluído com sucesso")
    } catch (error) {
      toast.error("Erro ao excluir item")
    } finally {
      setLoadingState(loadingKey, false)
    }
  }

  return {
    loading,
    handleDownload,
    handlePreview,
    handleToggle,
    handleDelete
  }
}