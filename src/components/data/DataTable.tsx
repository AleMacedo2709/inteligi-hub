import { useState } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  ChevronLeft, 
  ChevronRight, 
  ChevronsLeft, 
  ChevronsRight,
  Search,
  Filter,
  Download,
  Eye,
  Edit,
  Trash2
} from "lucide-react"
import { usePagination } from "@/hooks/usePagination"
import { useDebounce } from "@/hooks/useDebounce"

export interface Column<T> {
  key: keyof T
  header: string
  sortable?: boolean
  filterable?: boolean
  render?: (value: any, item: T) => React.ReactNode
  width?: string
}

export interface DataTableProps<T> {
  data: T[]
  columns: Column<T>[]
  title?: string
  searchPlaceholder?: string
  pageSize?: number
  onView?: (item: T) => void
  onEdit?: (item: T) => void
  onDelete?: (item: T) => void
  onExport?: () => void
  filters?: {
    key: keyof T
    label: string
    options: { value: string; label: string }[]
  }[]
}

export function DataTable<T extends Record<string, any>>({
  data,
  columns,
  title,
  searchPlaceholder = "Buscar...",
  pageSize = 10,
  onView,
  onEdit,
  onDelete,
  onExport,
  filters = []
}: DataTableProps<T>) {
  const [searchTerm, setSearchTerm] = useState("")
  const [sortColumn, setSortColumn] = useState<keyof T | null>(null)
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")
  const [activeFilters, setActiveFilters] = useState<Record<string, string>>({})

  const debouncedSearchTerm = useDebounce(searchTerm, 300)

  // Filter and search data
  const filteredData = data.filter(item => {
    // Apply search
    const searchMatch = debouncedSearchTerm === "" || 
      Object.values(item).some(value => 
        String(value).toLowerCase().includes(debouncedSearchTerm.toLowerCase())
      )

    // Apply filters
    const filtersMatch = Object.entries(activeFilters).every(([key, value]) => {
      if (!value) return true
      return String(item[key]) === value
    })

    return searchMatch && filtersMatch
  })

  // Sort data
  const sortedData = [...filteredData].sort((a, b) => {
    if (!sortColumn) return 0
    
    const aValue = a[sortColumn]
    const bValue = b[sortColumn]
    
    if (aValue < bValue) return sortDirection === "asc" ? -1 : 1
    if (aValue > bValue) return sortDirection === "asc" ? 1 : -1
    return 0
  })

  const {
    currentPage,
    totalPages,
    startIndex,
    endIndex,
    hasNextPage,
    hasPreviousPage,
    goToFirstPage,
    goToPreviousPage,
    goToNextPage,
    goToLastPage
  } = usePagination({ 
    totalItems: sortedData.length, 
    itemsPerPage: pageSize 
  })

  const paginatedData = sortedData.slice(startIndex, endIndex)
  const canGoToPrevious = hasPreviousPage
  const canGoToNext = hasNextPage

  const handleSort = (column: keyof T) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortColumn(column)
      setSortDirection("asc")
    }
  }

  const handleFilterChange = (filterKey: string, value: string) => {
    setActiveFilters(prev => ({
      ...prev,
      [filterKey]: value
    }))
  }

  return (
    <div className="space-y-4">
      <Card className="shadow-card">
        {title && (
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>{title}</CardTitle>
            {onExport && (
              <Button variant="outline" size="sm" onClick={onExport}>
                <Download className="h-4 w-4 mr-2" />
                Exportar
              </Button>
            )}
          </CardHeader>
        )}
        
        <CardContent>
          {/* Search and Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder={searchPlaceholder}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            {filters.length > 0 && (
              <div className="flex items-center space-x-2">
                <Filter className="h-4 w-4 text-muted-foreground" />
                {filters.map((filter) => (
                  <Select
                    key={String(filter.key)}
                    value={activeFilters[String(filter.key)] || ""}
                    onValueChange={(value) => handleFilterChange(String(filter.key), value)}
                  >
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder={filter.label} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">Todos</SelectItem>
                      {filter.options.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                ))}
              </div>
            )}
          </div>

          {/* Table */}
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  {columns.map((column) => (
                    <TableHead 
                      key={String(column.key)}
                      className={`${column.width || ''} ${
                        column.sortable ? 'cursor-pointer hover:bg-muted/50' : ''
                      }`}
                      onClick={() => column.sortable && handleSort(column.key)}
                    >
                      <div className="flex items-center space-x-1">
                        <span>{column.header}</span>
                        {column.sortable && sortColumn === column.key && (
                          <span className="text-xs">
                            {sortDirection === "asc" ? "↑" : "↓"}
                          </span>
                        )}
                      </div>
                    </TableHead>
                  ))}
                  {(onView || onEdit || onDelete) && (
                    <TableHead className="w-32">Ações</TableHead>
                  )}
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedData.length === 0 ? (
                  <TableRow>
                    <TableCell 
                      colSpan={columns.length + (onView || onEdit || onDelete ? 1 : 0)} 
                      className="text-center py-8 text-muted-foreground"
                    >
                      Nenhum resultado encontrado
                    </TableCell>
                  </TableRow>
                ) : (
                  paginatedData.map((item, index) => (
                    <TableRow key={index} className="hover:bg-muted/30">
                      {columns.map((column) => (
                        <TableCell key={String(column.key)}>
                          {column.render 
                            ? column.render(item[column.key], item)
                            : String(item[column.key])
                          }
                        </TableCell>
                      ))}
                      {(onView || onEdit || onDelete) && (
                        <TableCell>
                          <div className="flex space-x-1">
                            {onView && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => onView(item)}
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                            )}
                            {onEdit && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => onEdit(item)}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                            )}
                            {onDelete && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => onDelete(item)}
                                className="text-destructive hover:text-destructive"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      )}
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between px-2 pt-4">
              <div className="text-sm text-muted-foreground">
                Mostrando {((currentPage - 1) * pageSize) + 1} a {Math.min(currentPage * pageSize, filteredData.length)} de {filteredData.length} resultados
              </div>
              
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={goToFirstPage}
                  disabled={!canGoToPrevious}
                >
                  <ChevronsLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={goToPreviousPage}
                  disabled={!canGoToPrevious}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                
                <span className="text-sm">
                  Página {currentPage} de {totalPages}
                </span>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={goToNextPage}
                  disabled={!canGoToNext}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={goToLastPage}
                  disabled={!canGoToNext}
                >
                  <ChevronsRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}