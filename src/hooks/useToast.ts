import { toast as sonnerToast } from "sonner"

type ToastType = "success" | "error" | "warning" | "info"

interface ToastOptions {
  title?: string
  description?: string
  duration?: number
}

export function useToast() {
  const toast = (type: ToastType, message: string, options?: ToastOptions) => {
    const { title, description, duration = 5000 } = options || {}
    
    switch (type) {
      case "success":
        sonnerToast.success(title || "Sucesso", {
          description: description || message,
          duration
        })
        break
      case "error":
        sonnerToast.error(title || "Erro", {
          description: description || message,
          duration
        })
        break
      case "warning":
        sonnerToast.warning(title || "Atenção", {
          description: description || message,
          duration
        })
        break
      case "info":
        sonnerToast.info(title || "Informação", {
          description: description || message,
          duration
        })
        break
    }
  }

  return {
    success: (message: string, options?: ToastOptions) => toast("success", message, options),
    error: (message: string, options?: ToastOptions) => toast("error", message, options),
    warning: (message: string, options?: ToastOptions) => toast("warning", message, options),
    info: (message: string, options?: ToastOptions) => toast("info", message, options)
  }
}