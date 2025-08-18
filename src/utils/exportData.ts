interface ExportOptions {
  filename?: string
  format?: 'csv' | 'json' | 'xlsx'
  title?: string
}

export function exportToCSV<T extends Record<string, any>>(
  data: T[], 
  options: ExportOptions = {}
) {
  const { filename = 'export', title } = options
  
  if (data.length === 0) {
    throw new Error('Não há dados para exportar')
  }

  // Get headers from first object
  const headers = Object.keys(data[0])
  
  // Create CSV content
  let csvContent = ''
  
  if (title) {
    csvContent += `${title}\n\n`
  }
  
  // Add headers
  csvContent += headers.join(';') + '\n'
  
  // Add data rows
  data.forEach(row => {
    const values = headers.map(header => {
      const value = row[header]
      // Handle special values
      if (value === null || value === undefined) return ''
      if (typeof value === 'string' && value.includes(';')) {
        return `"${value}"`
      }
      return String(value)
    })
    csvContent += values.join(';') + '\n'
  })

  // Create and download file
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
  const link = document.createElement('a')
  
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob)
    link.setAttribute('href', url)
    link.setAttribute('download', `${filename}.csv`)
    link.style.visibility = 'hidden'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }
}

export function exportToJSON<T extends Record<string, any>>(
  data: T[], 
  options: ExportOptions = {}
) {
  const { filename = 'export', title } = options
  
  const exportData = {
    title: title || 'Dados Exportados',
    exportedAt: new Date().toISOString(),
    totalRecords: data.length,
    data
  }

  const jsonContent = JSON.stringify(exportData, null, 2)
  const blob = new Blob([jsonContent], { type: 'application/json' })
  const link = document.createElement('a')
  
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob)
    link.setAttribute('href', url)
    link.setAttribute('download', `${filename}.json`)
    link.style.visibility = 'hidden'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }
}

export function exportData<T extends Record<string, any>>(
  data: T[], 
  options: ExportOptions = {}
) {
  const { format = 'csv' } = options
  
  try {
    switch (format) {
      case 'csv':
        exportToCSV(data, options)
        break
      case 'json':
        exportToJSON(data, options)
        break
      default:
        throw new Error(`Formato ${format} não suportado`)
    }
    
    return {
      success: true,
      message: `Dados exportados com sucesso em formato ${format.toUpperCase()}`
    }
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Erro ao exportar dados'
    }
  }
}

// Utility function to generate report data
export function generateDashboardReport() {
  const reportData = {
    timestamp: new Date().toLocaleString('pt-BR'),
    summary: {
      ciclosAtivos: 2,
      paasVigentes: 3,
      indicadores: 24,
      tarefasPendentes: 47,
      performanceGeral: '78%'
    },
    metrics: [
      { metric: 'Eficiência Operacional', value: 85, target: 90, status: 'Em dia' },
      { metric: 'Satisfação do Cidadão', value: 72, target: 80, status: 'Atenção' },
      { metric: 'Processos Digitais', value: 90, target: 85, status: 'Superou' },
      { metric: 'Redução de Custos', value: 45, target: 70, status: 'Atrasado' }
    ],
    alerts: [
      'Prazo próximo do vencimento: 8 tarefas',
      'Indicadores atrasados: 6',
      'Metas não atingidas: 3'
    ]
  }

  return exportData([reportData], {
    filename: `dashboard-report-${new Date().toISOString().split('T')[0]}`,
    format: 'json',
    title: 'Relatório do Dashboard Estratégico'
  })
}