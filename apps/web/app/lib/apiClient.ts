import { appHC } from '@monorepo-starter/api/client'
import { fetchApiClient } from './fetch'

export const apiClient = appHC('', {
  fetch: (input: RequestInfo | URL, requestInit?: RequestInit) => {
    return fetchApiClient(
      input instanceof URL ? input.toString() : input,
      requestInit
    )
  }
})
