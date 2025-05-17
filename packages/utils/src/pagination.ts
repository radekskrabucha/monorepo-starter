import { z } from 'zod'
import type { NumbersToStrings } from './types.js'

export type PaginationClause = {
  limit: number
  offset: number
}
export type PaginationValues = {
  limit: number
  offset: number
  page: number
}
export type PaginationMeta = {
  total: number
} & PaginationValues
export type ResponseWithPagination<T> = {
  data: T
  meta: PaginationMeta
}

export type PaginationQuery = z.infer<typeof paginationQuerySchema>
export type PaginationQueryStrings = NumbersToStrings<PaginationQuery>

export type PaginationPageNumber = number | 'ellipsis'

export const paginationQuerySchema = z
  .object({
    page: z.coerce.number().int().positive().optional(),
    limit: z.coerce.number().int().positive().optional()
  })
  .optional()

export const computePaginationValues = (
  paginationQuery: PaginationQuery,
  defaultLimit = 10
): PaginationValues => {
  const finalPage =
    typeof paginationQuery?.page === 'number' ? paginationQuery.page : 1
  const finalLimit =
    typeof paginationQuery?.limit === 'number'
      ? paginationQuery.limit
      : defaultLimit

  return {
    page: finalPage,
    limit: finalLimit,
    offset: calculateOffset(finalPage, finalLimit)
  }
}
export const calculateOffset = (page: number, limit: number) =>
  (page - 1) * limit
export const calculateTotalPages = (total: number, limit: number) =>
  limit > 0 ? Math.ceil(total / limit) : 1

export const getPaginationClause = (
  paginationValues: PaginationValues
): PaginationClause => ({
  limit: paginationValues.limit,
  offset: paginationValues.offset
})

export const getPaginationPageNumbers = (
  totalPages: number,
  currentPage: number
) => {
  const pages: Array<PaginationPageNumber> = []

  if (totalPages <= 3) {
    // Show all pages if 3 or fewer
    return Array.from({ length: totalPages }, (_, i) => i + 1)
  }

  // Always show first page
  pages.push(1)

  if (currentPage > 3) {
    pages.push('ellipsis')
  }

  // Show current page and surrounding pages
  for (
    let i = Math.max(2, currentPage - 1);
    i <= Math.min(totalPages - 1, currentPage + 1);
    i++
  ) {
    pages.push(i)
  }

  if (currentPage < totalPages - 2) {
    pages.push('ellipsis')
  }

  // Always show last page
  if (totalPages > 1) {
    pages.push(totalPages)
  }

  return pages
}
