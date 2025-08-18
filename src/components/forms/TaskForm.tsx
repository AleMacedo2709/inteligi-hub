import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"

const taskSchema = z.object({
  titulo: z.string().min(3, "Título deve ter ao menos 3 caracteres"),
  descricao: z.string().min(10, "Descrição deve ter ao menos 10 caracteres"),
  acaoAnual: z.string().min(1, "Selecione uma ação anual"),
  prioridade: z.enum(["baixa", "media", "alta"]),
  prazo: z.string().min(1, "Selecione um prazo"),
  estimativa: z.coerce.number().min(1, "Estimativa deve ser maior que 0"),
  responsavel: z.string().min(1, "Selecione um responsável")
})

type TaskFormData = z.infer<typeof taskSchema>

interface TaskFormProps {
  onSubmit: (data: TaskFormData) => void
  onCancel: () => void
  initialData?: Partial<TaskFormData>
  isEditing?: boolean
}

const acoesAnuais = [
  { value: "sistema-digital", label: "Implementação do Sistema Digital" },
  { value: "capacitacao", label: "Capacitação de Servidores" },
  { value: "otimizacao", label: "Otimização de Processos" },
  { value: "infraestrutura", label: "Modernização da Infraestrutura" }
]

const responsaveis = [
  { value: "carlos-lima", label: "Carlos Lima" },
  { value: "ana-costa", label: "Ana Costa" },
  { value: "joao-silva", label: "João Silva" },
  { value: "maria-santos", label: "Maria Santos" },
  { value: "pedro-oliveira", label: "Pedro Oliveira" }
]

export function TaskForm({ onSubmit, onCancel, initialData, isEditing = false }: TaskFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const form = useForm<TaskFormData>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      titulo: initialData?.titulo || "",
      descricao: initialData?.descricao || "",
      acaoAnual: initialData?.acaoAnual || "",
      prioridade: initialData?.prioridade || "media",
      prazo: initialData?.prazo || "",
      estimativa: initialData?.estimativa || 8,
      responsavel: initialData?.responsavel || ""
    }
  })

  const handleSubmit = async (data: TaskFormData) => {
    setIsSubmitting(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      onSubmit(data)
      toast({
        title: isEditing ? "Tarefa atualizada" : "Tarefa criada",
        description: `A tarefa "${data.titulo}" foi ${isEditing ? 'atualizada' : 'criada'} com sucesso`
      })
    } catch (error) {
      toast({
        title: "Erro",
        description: "Ocorreu um erro ao salvar a tarefa",
        variant: "destructive"
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>
          {isEditing ? "Editar Tarefa" : "Nova Tarefa"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="titulo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Título da Tarefa</FormLabel>
                  <FormControl>
                    <Input placeholder="Digite o título da tarefa" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="descricao"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descrição</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Descreva detalhadamente a tarefa..."
                      className="min-h-[100px]"
                      {...field} 
                    />
                  </FormControl>
                  <FormDescription>
                    Forneça uma descrição clara e detalhada da tarefa
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="acaoAnual"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ação Anual</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione a ação anual" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {acoesAnuais.map((acao) => (
                          <SelectItem key={acao.value} value={acao.value}>
                            {acao.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="prioridade"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Prioridade</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione a prioridade" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="baixa">Baixa</SelectItem>
                        <SelectItem value="media">Média</SelectItem>
                        <SelectItem value="alta">Alta</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="prazo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Prazo</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="estimativa"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Estimativa (horas)</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        min={1}
                        placeholder="0"
                        {...field} 
                      />
                    </FormControl>
                    <FormDescription>
                      Tempo estimado em horas
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="responsavel"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Responsável</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o responsável" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {responsaveis.map((responsavel) => (
                        <SelectItem key={responsavel.value} value={responsavel.value}>
                          {responsavel.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end space-x-2 pt-4">
              <Button 
                type="button" 
                variant="outline" 
                onClick={onCancel}
              >
                Cancelar
              </Button>
              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="bg-gradient-primary"
              >
                {isSubmitting ? "Salvando..." : isEditing ? "Atualizar" : "Criar Tarefa"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}