import { useState, useMemo } from 'react'

interface UsePaginationProps {
  totalItems: number
  itemsPerPage: number
  initialPage?: number
}

export function usePagination({ totalItems, itemsPerPage, initialPage = 1 }: UsePaginationProps) {
  const [currentPage, setCurrentPage] = useState(initialPage)

  const paginationInfo = useMemo(() => {
    const totalPages = Math.ceil(totalItems / itemsPerPage)
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    const hasNextPage = currentPage < totalPages
    const hasPreviousPage = currentPage > 1

    return {
      currentPage,
      totalPages,
      startIndex,
      endIndex,
      hasNextPage,
      hasPreviousPage,
      totalItems
    }
  }, [currentPage, totalItems, itemsPerPage])

  const goToPage = (page: number) => {
    const totalPages = Math.ceil(totalItems / itemsPerPage)
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page)
    }
  }

  const goToNextPage = () => {
    if (paginationInfo.hasNextPage) {
      setCurrentPage(prev => prev + 1)
    }
  }

  const goToPreviousPage = () => {
    if (paginationInfo.hasPreviousPage) {
      setCurrentPage(prev => prev - 1)
    }
  }

  const goToFirstPage = () => {
    setCurrentPage(1)
  }

  const goToLastPage = () => {
    const totalPages = Math.ceil(totalItems / itemsPerPage)
    setCurrentPage(totalPages)
  }

  return {
    ...paginationInfo,
    goToPage,
    goToNextPage,
    goToPreviousPage,
    goToFirstPage,
    goToLastPage
  }
}