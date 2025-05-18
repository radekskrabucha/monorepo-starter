import type { ErrorFallbackProps } from '@monorepo-starter/ui/containers/suspense-query-boundary'
import { isEmpty } from '@monorepo-starter/utils/common'
import type { NoEmpty } from '@monorepo-starter/utils/types'
import type { UseQueryResult, FetchStatus } from '@tanstack/react-query'
import {
  DefaultNoDataFallback,
  DefaultErrorFallback
} from './SuspenseQueryBoundary'

type QueryBoundaryProps<T = unknown, E extends Error = Error> = {
  query: UseQueryResult<T, E>
  loadingFallback?: React.ReactNode
  noDataFallback?: React.ReactNode
  errorFallback?: (errorFallbackProps: ErrorFallbackProps<E>) => React.ReactNode
  children: (data: NoEmpty<T>) => React.ReactNode
  isDataEmpty?: (data: T | undefined, fetchStatus: FetchStatus) => boolean
  isLoading?: (query: UseQueryResult<T, E>) => boolean
}

export function QueryBoundary<T = unknown, E extends Error = Error>({
  query,
  children,
  loadingFallback,
  noDataFallback,
  errorFallback,
  isDataEmpty,
  isLoading
}: QueryBoundaryProps<T, E>) {
  if (query.error) {
    return errorFallback ? (
      errorFallback({
        error: query.error,
        reset: async () => {
          await query.refetch()
        }
      })
    ) : (
      <DefaultErrorFallback
        error={query.error}
        reset={() => {
          query.refetch()
        }}
      />
    )
  }
  if (isLoading ? isLoading(query) : query.isFetching) {
    return loadingFallback
  }
  if (
    (!query.isFetching &&
      isDataEmpty &&
      isDataEmpty(query.data, query.fetchStatus)) ||
    (!query.isFetching && isEmpty(query.data))
  ) {
    return noDataFallback ? noDataFallback : <DefaultNoDataFallback />
  }

  return children(query.data as NoEmpty<T>)
}
