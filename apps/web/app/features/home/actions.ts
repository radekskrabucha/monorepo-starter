import { inferJSON } from '@monorepo-starter/utils/fetch-client'
import { queryOptions } from '@tanstack/react-query'
import type { InferRequestType } from 'hono/client'
import { apiClient } from '~web/lib/apiClient'

const getGreetingReq = apiClient.example.$get
type GetGreetingReq = InferRequestType<typeof getGreetingReq>['query']

export const getGreeting = async (req: GetGreetingReq) =>
  await getGreetingReq({ query: req }).then(inferJSON)
export const getGreetingQueryOptions = (req: GetGreetingReq) =>
  queryOptions({
    queryKey: ['getGreeting', req],
    queryFn: () => getGreeting(req)
  })
