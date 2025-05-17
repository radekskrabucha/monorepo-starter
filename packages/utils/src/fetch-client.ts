import type { ClientResponse } from 'hono/client'
import { ofetch, type FetchOptions } from 'ofetch'
import { ONE_MINUTE, secondsToMs } from '~utils/time.js'

export const FETCH_DEFAULT_TIMEOUT = secondsToMs(ONE_MINUTE * 3)
export const FETCH_DEFAULT_CONFIG: FetchOptions = {
  timeout: FETCH_DEFAULT_TIMEOUT
}

export const fetchBasicClient = ofetch.create({
  ...FETCH_DEFAULT_CONFIG
})

export function inferJSON<T extends ClientResponse<unknown>>(data: T) {
  type JsonData = Awaited<ReturnType<(typeof data)['json']>>
  return data as unknown as JsonData
}
export function inferText<T extends ClientResponse<unknown>>(data: T) {
  type JsonData = Awaited<ReturnType<(typeof data)['text']>>
  return data as unknown as JsonData
}
