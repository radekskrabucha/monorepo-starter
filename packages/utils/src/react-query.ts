import {
  QueryClient,
  defaultShouldDehydrateQuery,
  isServer,
  type QueryClientConfig
} from '@tanstack/react-query'
import { ONE_MINUTE, secondsToMs } from '~utils/time.js'

const FIVE_MINUTES = secondsToMs(ONE_MINUTE * 5)
export const QUERY_STALE_TIME = FIVE_MINUTES
export const QUERY_CACHE_TIME = QUERY_STALE_TIME + FIVE_MINUTES

export const defaultConfig: QueryClientConfig = {
  defaultOptions: {
    queries: {
      staleTime: QUERY_STALE_TIME,
      gcTime: QUERY_CACHE_TIME,
      retry: false,
      refetchOnWindowFocus: false
    },
    mutations: {
      gcTime: QUERY_CACHE_TIME
    },
    dehydrate: {
      shouldDehydrateQuery: query =>
        defaultShouldDehydrateQuery(query) || query.state.status === 'pending'
    }
  }
}

export function makeQueryClient(config: QueryClientConfig = defaultConfig) {
  return new QueryClient(config)
}

export function getQueryClientFactory(config?: QueryClientConfig) {
  let browserQueryClient: QueryClient | undefined

  return function () {
    if (isServer) {
      return makeQueryClient(config)
    }
    if (!browserQueryClient) {
      browserQueryClient = makeQueryClient(config)
    }

    return browserQueryClient
  }
}
