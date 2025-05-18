import { isEmpty } from '@monorepo-starter/utils/common'
import {
  QueryErrorResetBoundary,
  useSuspenseQuery,
  type FetchStatus,
  type QueryKey,
  type UseSuspenseQueryOptions,
  type UseSuspenseQueryResult
} from '@tanstack/react-query'
import { Suspense } from 'react'
import React from 'react'
import { ErrorBoundary } from './error-boundary.js'

export type ErrorFallbackProps<E extends Error = Error> = {
  error: E
  reset: VoidFunction
}
export type SuspenseQueryWrapperProps<E extends Error = Error> = {
  children: React.ReactNode
  errorFallback?: (errorFallbackProps: ErrorFallbackProps<E>) => React.ReactNode
  loadingFallback?: React.ReactNode
}

export function SuspenseQueryWrapper<E extends Error = Error>({
  children,
  errorFallback,
  loadingFallback
}: SuspenseQueryWrapperProps<E>) {
  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary<E>
          fallback={(error, reset) => {
            return errorFallback
              ? errorFallback({
                  error,
                  reset
                })
              : null
          }}
          onReset={reset}
        >
          <Suspense fallback={loadingFallback}>{children}</Suspense>
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  )
}

export type SuspenseQueryProps<
  TData = unknown,
  TError extends Error = Error,
  TQueryKey extends QueryKey = QueryKey
> = {
  children: (data: TData) => React.ReactNode
  options: UseSuspenseQueryOptions<TData, TError, TData, TQueryKey>
  isDataEmpty?: (data: TData, fetchStatus: FetchStatus) => boolean
  noDataFallback?: React.ReactNode
}
export function SuspenseQuery<
  T = unknown,
  TError extends Error = Error,
  TQueryKey extends QueryKey = QueryKey
>({
  children,
  options,
  isDataEmpty,
  noDataFallback
}: SuspenseQueryProps<T, TError, TQueryKey>) {
  return (
    <WithSuspenseQuery options={options}>
      {query => {
        if (
          (isDataEmpty && isDataEmpty(query.data, query.fetchStatus)) ||
          isEmpty(query.data)
        ) {
          return noDataFallback
        }

        return children(query.data)
      }}
    </WithSuspenseQuery>
  )
}

export type WithSuspenseQueryProps<
  T = unknown,
  TError extends Error = Error,
  TQueryKey extends QueryKey = QueryKey
> = {
  children: (query: UseSuspenseQueryResult<T, TError>) => React.ReactNode
} & Pick<SuspenseQueryProps<T, TError, TQueryKey>, 'options'>

export function WithSuspenseQuery<
  T = unknown,
  TError extends Error = Error,
  TQueryKey extends QueryKey = QueryKey
>({ children, options }: WithSuspenseQueryProps<T, TError, TQueryKey>) {
  return children(useSuspenseQuery<T, TError, T, TQueryKey>(options))
}
