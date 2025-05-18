import { DefaultErrorFallback } from '~web/components/DefaultErrorFallback'
import {
  SuspenseQuery,
  SuspenseQueryWrapper
} from '~web/components/SuspenseQueryBoundary'
import { getGreetingQueryOptions } from '../actions'

export const Greeting = () => (
  <SuspenseQueryWrapper
    loadingFallback={<p>Loading...</p>}
    errorFallback={({ error }) => <DefaultErrorFallback error={error} />}
  >
    <SuspenseQuery options={getGreetingQueryOptions({ name: 'John' })}>
      {data => <h3 className="text-lg">{data.message}</h3>}
    </SuspenseQuery>
  </SuspenseQueryWrapper>
)
