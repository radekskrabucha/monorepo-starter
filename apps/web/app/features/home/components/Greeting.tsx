import { useQuery } from '@tanstack/react-query'
import { QueryBoundary } from '~web/components/QueryBoundary'
import { getGreetingQueryOptions } from '../actions'

export const Greeting = () => {
  const getGreetingQuery = useQuery(getGreetingQueryOptions({ name: 'John' }))

  return (
    <QueryBoundary
      query={getGreetingQuery}
      loadingFallback={<p>Loading...</p>}
      errorFallback={({ error }) => <p>Error: {error.message}</p>}
    >
      {data => <h3 className="text-lg">{data.message}</h3>}
    </QueryBoundary>
  )
}
