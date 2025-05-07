import { useQuery } from '@tanstack/react-query'
import { DefaultErrorFallback } from '~web/components/DefaultErrorFallback'
import { QueryBoundary } from '~web/components/QueryBoundary'
import { getGreetingQueryOptions } from '../actions'

export const Greeting = () => {
  const getGreetingQuery = useQuery(getGreetingQueryOptions({ name: 'John' }))

  return (
    <QueryBoundary
      query={getGreetingQuery}
      loadingFallback={<p>Loading...</p>}
      errorFallback={({ error }) => <DefaultErrorFallback error={error} />}
    >
      {data => <h3 className="text-lg">{data.message}</h3>}
    </QueryBoundary>
  )
}
