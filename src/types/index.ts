// Core entity types for the Strategic Planning System

export interface CicloEstrategico {
  id: number
  nome: string
  periodo: string
  status: "ativo" | "planejamento" | "concluido"
  progresso: number
  objetivos: number
  indicadores: number
  responsavel: string
  dataInicio: string
  dataFim: string
}

export interface ObjetivoEstrategico {
  id: number
  cicloId: number
  nome: string
  perspectiva: string
  progresso: number
  status: "andamento" | "concluido" | "atrasado"
}

export interface PAA {
  id: number
  nome: string
  ano: number
  status: "ativo" | "planejamento" | "concluido"
  progresso: number
  acoes: number
  tarefas: number
  tarefasConcluidas: number
  orcamento: number
  responsavel: string
  dataInicio: string
  dataFim: string
}

export interface AcaoAnual {
  id: number
  paaId: number
  nome: string
  acaoEstrategica: string
  progresso: number
  prazo: string
  status: "andamento" | "atrasado" | "concluido"
  responsavel: string
  orcamento: number
}

export interface Indicador {
  id: number
  nome: string
  unidade: string
  valorAtual: number
  metaAnual: number
  metaCiclo: number
  tendencia: "up" | "down" | "stable"
  variacao: number
  status: "no-prazo" | "atrasado" | "critico" | "concluido"
  objetivo: string
  responsavel: string
  ultimaAtualizacao: string
  frequencia: "semanal" | "mensal" | "trimestral" | "semestral" | "anual"
}

export interface Tarefa {
  id: number
  titulo: string
  descricao: string
  acaoAnual: string
  status: "em-andamento" | "pendente" | "concluida" | "atrasada"
  prioridade: "alta" | "media" | "baixa"
  progresso: number
  responsavel: {
    nome: string
    iniciais: string
  }
  prazo: string
  dataInicio: string
  estimativa: number
  tempoGasto: number
}

export interface Activity {
  id: string
  type: "task" | "indicator" | "paa" | "cycle" | "meeting"
  title: string
  description: string
  user: {
    name: string
    initials: string
  }
  timestamp: Date
  status?: "completed" | "updated" | "created" | "delayed"
}

export interface User {
  id: string
  nome: string
  email: string
  cargo: string
  departamento: string
  telefone?: string
  iniciais: string
}

export interface ProcessoSEI {
  id: number
  numeroSEI: string
  assunto: string
  acaoEstrategica: string
  status: "tramitando" | "finalizado" | "aguardando"
  responsavelSEI: string
  ultimaMovimentacao: string
  documentos: number
}

export interface Relatorio {
  id: number
  nome: string
  tipo: "estrategico" | "indicadores" | "paas" | "tarefas" | "executivo"
  descricao: string
  periodicidade: "semanal" | "mensal" | "trimestral" | "semestral" | "anual"
  ultimaGeracao: string
  formato: "PDF" | "Excel" | "Word"
  tamanho: string
  status: "disponivel" | "processando" | "erro"
}

// Form types
export interface CicloEstrategicoForm {
  nome: string
  periodo: string
  descricao: string
  dataInicio: string
  dataFim: string
  responsavel: string
}

export interface PAAForm {
  nome: string
  ano: number
  orcamento: number
  descricao: string
  responsavel: string
}

export interface IndicadorForm {
  nome: string
  unidade: string
  metaAnual: number
  metaCiclo: number
  frequencia: string
  objetivo: string
  responsavel: string
  descricao: string
}

export interface TarefaForm {
  titulo: string
  descricao: string
  acaoAnual: string
  prioridade: "alta" | "media" | "baixa"
  prazo: string
  estimativa: number
  responsavel: string
}

// API Response types
export interface ApiResponse<T> {
  data: T
  message: string
  success: boolean
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  limit: number
  hasMore: boolean
}

// Filter and search types
export interface FilterOptions {
  status?: string[]
  responsavel?: string[]
  dateRange?: {
    start: string
    end: string
  }
  search?: string
}

export interface SortOptions {
  field: string
  direction: "asc" | "desc"
}