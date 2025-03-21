import { fetchWrapper, type InferRequestType } from '@monorepo-starter/api/client'
import { queryOptions } from '@tanstack/react-query'
import { appClient } from '~web/lib/apiClient'

const getGreetingReq = appClient.example.$get

type GetGreetingReq = InferRequestType<typeof getGreetingReq>['query']

export const getGreeting = async (req: GetGreetingReq) =>
  await fetchWrapper(getGreetingReq({ query: req }))

export const getGreetingQueryOptions = (req: GetGreetingReq) =>
  queryOptions({
    queryKey: ['getGreeting', req],
    queryFn: () => getGreeting(req)
  })
