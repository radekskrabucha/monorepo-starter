import { Button } from '@monorepo-starter/ui/button'
import {
  SuspenseQuery as SuspenseQueryBase,
  SuspenseQueryWrapper as SuspenseQueryWrapperBase,
  type SuspenseQueryProps,
  type SuspenseQueryWrapperProps,
  type ErrorFallbackProps
} from '@monorepo-starter/ui/containers/suspense-query-boundary'
import type { QueryKey } from '@tanstack/react-query'
import type React from 'react'
import {
  DefaultErrorFallback as ErrorFallback,
  NavigateToHomeButton
} from './DefaultErrorFallback'

export function SuspenseQuery<
  TData,
  TError extends Error = Error,
  TQueryKey extends QueryKey = QueryKey
>({
  noDataFallback = <DefaultNoDataFallback />,
  ...props
}: SuspenseQueryProps<TData, TError, TQueryKey>) {
  return (
    <SuspenseQueryBase
      noDataFallback={noDataFallback}
      {...props}
    />
  )
}
export function SuspenseQueryWrapper<E extends Error = Error>({
  errorFallback = props => <DefaultErrorFallback {...props} />,
  ...props
}: SuspenseQueryWrapperProps<E>) {
  return (
    <SuspenseQueryWrapperBase
      errorFallback={errorFallback}
      {...props}
    />
  )
}

export const DefaultNoDataFallback = () => (
  <div className="flex flex-1 flex-col items-center justify-center gap-6 text-center text-balance">
    <h2 className="text-3xl font-bold">Oopss... not found.</h2>
    <p className="text-foreground-secondary">
      Seems like there is nothing here yet.
    </p>
  </div>
)
export const DefaultErrorFallback: React.FC<ErrorFallbackProps> = ({
  error,
  reset
}) => (
  <ErrorFallback error={error}>
    <div className="flex flex-wrap items-center gap-4">
      <Button onClick={reset}>Retry</Button>
      <NavigateToHomeButton />
    </div>
  </ErrorFallback>
)
