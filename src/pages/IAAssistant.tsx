import { useState, useRef, useEffect } from "react"
import { 
  Brain, 
  Send, 
  Mic, 
  MicOff,
  BarChart3,
  Target,
  Calendar,
  CheckSquare,
  Lightbulb,
  TrendingUp,
  FileText,
  Database
} from "lucide-react"
import { AppLayout } from "@/components/layout/AppLayout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Mock data para histórico de conversas
const conversationHistory = [
  {
    id: 1,
    type: "user",
    message: "Qual é o progresso atual dos indicadores estratégicos?",
    timestamp: new Date(Date.now() - 10 * 60 * 1000)
  },
  {
    id: 2,
    type: "assistant",
    message: "Com base nos dados atuais, temos 24 indicadores estratégicos com 75% de performance média. 18 estão no prazo, 6 estão atrasados. Os destaques são: Eficiência Operacional (75%), Satisfação do Cidadão (82%), e Processos Digitalizados (78%). O indicador 'Redução de Custos' precisa de atenção, estando em 45% da meta.",
    timestamp: new Date(Date.now() - 9 * 60 * 1000),
    suggestions: [
      { icon: BarChart3, text: "Ver detalhes dos indicadores atrasados" },
      { icon: TrendingUp, text: "Análise de tendências" }
    ]
  },
  {
    id: 3,
    type: "user", 
    message: "Gere um resumo dos PAAs para a reunião de hoje",
    timestamp: new Date(Date.now() - 5 * 60 * 1000)
  },
  {
    id: 4,
    type: "assistant",
    message: "**Resumo Executivo dos PAAs - Janeiro 2024**\n\n📊 **Status Geral:**\n- PAA 2024: 68% de progresso (15 ações, 89 tarefas)\n- PAA 2025: 15% de progresso (18 ações, 124 tarefas)\n\n🎯 **Destaques:**\n- Implementação do Sistema Digital: 85% concluído\n- Capacitação de Servidores: 60% em andamento\n\n⚠️ **Atenção:**\n- Otimização de Processos: 40% (prazo 20/12/2024)\n\n💰 **Orçamento:** R$ 7,8M total distribuído",
    timestamp: new Date(Date.now() - 4 * 60 * 1000),
    suggestions: [
      { icon: FileText, text: "Exportar resumo em PDF" },
      { icon: Calendar, text: "Agendar próxima revisão" }
    ]
  }
]

const quickActions = [
  {
    icon: BarChart3,
    title: "Análise de Indicadores",
    description: "Resumo da performance atual",
    prompt: "Faça uma análise completa dos indicadores estratégicos"
  },
  {
    icon: Target,
    title: "Status dos Objetivos",
    description: "Progresso dos objetivos estratégicos",
    prompt: "Qual o status atual dos objetivos estratégicos por perspectiva?"
  },
  {
    icon: Calendar,
    title: "Revisão de PAAs",
    description: "Análise dos planos anuais",
    prompt: "Preciso de um relatório detalhado sobre o progresso dos PAAs"
  },
  {
    icon: CheckSquare,
    title: "Tarefas Críticas",
    description: "Tarefas com prazo vencendo",
    prompt: "Quais tarefas estão com prazo crítico e precisam de atenção?"
  },
  {
    icon: TrendingUp,
    title: "Tendências",
    description: "Análise de tendências e projeções",
    prompt: "Analise as tendências dos indicadores e faça projeções"
  },
  {
    icon: Lightbulb,
    title: "Recomendações",
    description: "Sugestões de melhoria",
    prompt: "Com base nos dados atuais, que recomendações você faria?"
  }
]

const aiCapabilities = [
  {
    title: "Model Context Protocol (MCP)",
    description: "Acesso seguro e controlado aos dados do planejamento",
    status: "Ativo"
  },
  {
    title: "Azure OpenAI",
    description: "Integração com modelos GPT-4 para análises avançadas",
    status: "Configurado"
  },
  {
    title: "OpenRouter (Teste)",
    description: "Avaliação de diferentes modelos de IA",
    status: "Em Teste"
  }
]

export default function IAAssistant() {
  const [messages, setMessages] = useState(conversationHistory)
  const [inputMessage, setInputMessage] = useState("")
  const [isListening, setIsListening] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return

    const newUserMessage = {
      id: messages.length + 1,
      type: "user" as const,
      message: inputMessage,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, newUserMessage])
    setInputMessage("")
    setIsTyping(true)

    // Simular resposta da IA
    setTimeout(() => {
      const aiResponse = {
        id: messages.length + 2,
        type: "assistant" as const,
        message: "Entendi sua solicitação. Com base nos dados do sistema de planejamento estratégico, vou analisar as informações e fornecer uma resposta detalhada. Por favor, aguarde enquanto processo os dados...",
        timestamp: new Date(),
        suggestions: [
          { icon: FileText, text: "Gerar relatório detalhado" },
          { icon: BarChart3, text: "Ver gráficos interativos" }
        ]
      }
      setMessages(prev => [...prev, aiResponse])
      setIsTyping(false)
    }, 2000)
  }

  const handleQuickAction = (prompt: string) => {
    setInputMessage(prompt)
  }

  const toggleListening = () => {
    setIsListening(!isListening)
    // Aqui implementaria a funcionalidade de reconhecimento de voz
  }

  return (
    <AppLayout>
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground flex items-center">
              <Brain className="h-8 w-8 mr-3 text-primary" />
              IA Assistant
            </h1>
            <p className="text-muted-foreground">
              Assistente inteligente para análise e insights do planejamento estratégico
            </p>
          </div>
          
          <div className="flex items-center space-x-2">
            <Badge className="bg-accent text-accent-foreground">
              <Database className="h-3 w-3 mr-1" />
              MCP Ativo
            </Badge>
            <Badge className="bg-primary text-primary-foreground">
              <Brain className="h-3 w-3 mr-1" />
              GPT-4 Conectado
            </Badge>
          </div>
        </div>

        <Tabs defaultValue="chat" className="space-y-4">
          <TabsList>
            <TabsTrigger value="chat">Chat Assistant</TabsTrigger>
            <TabsTrigger value="capabilities">Capacidades</TabsTrigger>
            <TabsTrigger value="settings">Configurações</TabsTrigger>
          </TabsList>

          <TabsContent value="chat" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* Quick Actions */}
              <div className="lg:col-span-1">
                <Card className="shadow-card">
                  <CardHeader>
                    <CardTitle className="text-base">Ações Rápidas</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {quickActions.map((action, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        className="w-full h-auto p-3 flex flex-col items-start space-y-1"
                        onClick={() => handleQuickAction(action.prompt)}
                      >
                        <div className="flex items-center space-x-2 w-full">
                          <action.icon className="h-4 w-4 text-primary" />
                          <span className="font-medium text-sm">{action.title}</span>
                        </div>
                        <span className="text-xs text-muted-foreground text-left">
                          {action.description}
                        </span>
                      </Button>
                    ))}
                  </CardContent>
                </Card>
              </div>

              {/* Chat Interface */}
              <div className="lg:col-span-3">
                <Card className="shadow-card h-[600px] flex flex-col">
                  <CardHeader className="border-b">
                    <CardTitle className="flex items-center space-x-2">
                      <Brain className="h-5 w-5 text-primary" />
                      <span>Conversa com IA</span>
                    </CardTitle>
                  </CardHeader>
                  
                  {/* Messages */}
                  <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div className={`flex space-x-2 max-w-[80%] ${message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                          <Avatar className="h-8 w-8 flex-shrink-0">
                            <AvatarFallback className={message.type === 'user' ? 'bg-primary text-primary-foreground' : 'bg-accent text-accent-foreground'}>
                              {message.type === 'user' ? 'U' : 'IA'}
                            </AvatarFallback>
                          </Avatar>
                          
                          <div className={`rounded-lg p-3 ${
                            message.type === 'user' 
                              ? 'bg-primary text-primary-foreground' 
                              : 'bg-muted'
                          }`}>
                            <div className="whitespace-pre-wrap text-sm">
                              {message.message}
                            </div>
                            
                            {message.suggestions && (
                              <div className="mt-3 space-y-2">
                                {message.suggestions.map((suggestion, index) => (
                                  <Button
                                    key={index}
                                    variant="outline"
                                    size="sm"
                                    className="h-auto p-2 w-full justify-start"
                                  >
                                    <suggestion.icon className="h-3 w-3 mr-2" />
                                    <span className="text-xs">{suggestion.text}</span>
                                  </Button>
                                ))}
                              </div>
                            )}
                            
                            <div className="text-xs opacity-70 mt-2">
                              {message.timestamp.toLocaleTimeString('pt-BR', { 
                                hour: '2-digit', 
                                minute: '2-digit' 
                              })}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                    
                    {isTyping && (
                      <div className="flex justify-start">
                        <div className="flex space-x-2 max-w-[80%]">
                          <Avatar className="h-8 w-8 flex-shrink-0">
                            <AvatarFallback className="bg-accent text-accent-foreground">
                              IA
                            </AvatarFallback>
                          </Avatar>
                          <div className="bg-muted rounded-lg p-3">
                            <div className="flex space-x-1">
                              <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                              <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                              <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    <div ref={messagesEndRef} />
                  </CardContent>

                  {/* Input */}
                  <div className="border-t p-4">
                    <div className="flex space-x-2">
                      <Textarea
                        placeholder="Faça uma pergunta sobre o planejamento estratégico..."
                        value={inputMessage}
                        onChange={(e) => setInputMessage(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault()
                            handleSendMessage()
                          }
                        }}
                        className="min-h-[60px] resize-none"
                      />
                      <div className="flex flex-col space-y-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={toggleListening}
                          className={isListening ? 'bg-destructive text-destructive-foreground' : ''}
                        >
                          {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                        </Button>
                        <Button
                          onClick={handleSendMessage}
                          disabled={!inputMessage.trim()}
                          className="bg-gradient-primary"
                        >
                          <Send className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="capabilities" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle>Capacidades da IA</CardTitle>
                  <p className="text-muted-foreground">
                    Funcionalidades disponíveis no sistema
                  </p>
                </CardHeader>
                <CardContent className="space-y-4">
                  {aiCapabilities.map((capability, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <h4 className="font-medium">{capability.title}</h4>
                        <p className="text-sm text-muted-foreground">{capability.description}</p>
                      </div>
                      <Badge className="bg-accent text-accent-foreground">
                        {capability.status}
                      </Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle>Dados Acessíveis</CardTitle>
                  <p className="text-muted-foreground">
                    Informações que a IA pode acessar via MCP
                  </p>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center space-x-3 p-2 rounded border">
                    <Target className="h-5 w-5 text-primary" />
                    <div>
                      <div className="font-medium">Ciclos Estratégicos</div>
                      <div className="text-sm text-muted-foreground">Objetivos e metas</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3 p-2 rounded border">
                    <Calendar className="h-5 w-5 text-primary" />
                    <div>
                      <div className="font-medium">PAAs</div>
                      <div className="text-sm text-muted-foreground">Planos e ações anuais</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3 p-2 rounded border">
                    <BarChart3 className="h-5 w-5 text-primary" />
                    <div>
                      <div className="font-medium">Indicadores</div>
                      <div className="text-sm text-muted-foreground">Métricas e performance</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3 p-2 rounded border">
                    <CheckSquare className="h-5 w-5 text-primary" />
                    <div>
                      <div className="font-medium">Tarefas</div>
                      <div className="text-sm text-muted-foreground">Atividades e progresso</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="settings" className="space-y-4">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Configurações da IA</CardTitle>
                <p className="text-muted-foreground">
                  Configure o comportamento e integrações da IA
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-semibold">Modelo de IA</h4>
                    <div className="space-y-2">
                      <label className="flex items-center space-x-2">
                        <input type="radio" name="model" defaultChecked />
                        <span>Azure OpenAI GPT-4</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input type="radio" name="model" />
                        <span>OpenRouter (Teste)</span>
                      </label>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h4 className="font-semibold">Preferências</h4>
                    <div className="space-y-2">
                      <label className="flex items-center space-x-2">
                        <input type="checkbox" defaultChecked />
                        <span>Respostas detalhadas</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input type="checkbox" defaultChecked />
                        <span>Sugerir ações</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input type="checkbox" />
                        <span>Modo debug</span>
                      </label>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end pt-4 border-t">
                  <Button className="bg-gradient-primary">Salvar Configurações</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  )
}