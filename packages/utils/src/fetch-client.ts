import type { ClientResponse } from 'hono/client'
import type { ResponseFormat } from 'hono/types'
import type { StatusCode, SuccessStatusCode } from 'hono/utils/http-status'
import { ofetch, type FetchOptions } from 'ofetch'
import { ONE_MINUTE, secondsToMs } from '~utils/time.js'

export const FETCH_DEFAULT_TIMEOUT = secondsToMs(ONE_MINUTE * 3)
export const FETCH_DEFAULT_CONFIG: FetchOptions = {
  timeout: FETCH_DEFAULT_TIMEOUT
}

export const fetchBasicClient = ofetch.create({
  ...FETCH_DEFAULT_CONFIG
})

type ExtractSuccessResponse<T> =
  T extends ClientResponse<infer Data, infer Status, infer Format>
    ? Status extends SuccessStatusCode
      ? ClientResponse<Data, Status, Format>
      : never
    : never

export function inferJSON<
  T extends ClientResponse<unknown, StatusCode, ResponseFormat>,
  SuccessData = ExtractSuccessResponse<T> extends ClientResponse<
    infer D,
    StatusCode,
    ResponseFormat
  >
    ? D
    : never
>(data: T): SuccessData {
  return data as unknown as SuccessData
}
export function inferText<
  T extends ClientResponse<unknown, StatusCode, ResponseFormat>,
  SuccessData = ExtractSuccessResponse<T> extends ClientResponse<
    infer D,
    StatusCode,
    ResponseFormat
  >
    ? D
    : never
>(data: T): SuccessData {
  return data as unknown as SuccessData
}
