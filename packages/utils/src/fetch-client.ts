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

export async function inferJSON<
  Data,
  Status extends StatusCode,
  Format extends ResponseFormat,
  T extends ClientResponse<Data, Status, Format>,
  SuccessResponse extends ExtractSuccessResponse<T> = ExtractSuccessResponse<T>
>(
  data: T
): Promise<
  SuccessResponse extends ClientResponse<infer Data, StatusCode, ResponseFormat>
    ? Data
    : never
> {
  const json = await data.json()

  return json as SuccessResponse extends ClientResponse<
    infer D,
    StatusCode,
    ResponseFormat
  >
    ? D
    : never
}

export async function inferText<
  Data,
  Status extends StatusCode,
  Format extends ResponseFormat,
  T extends ClientResponse<Data, Status, Format>,
  SuccessResponse extends ExtractSuccessResponse<T> = ExtractSuccessResponse<T>
>(
  data: T
): Promise<
  SuccessResponse extends ClientResponse<infer Data, StatusCode, ResponseFormat>
    ? Data
    : never
> {
  const text = await data.text()

  return text as SuccessResponse extends ClientResponse<
    infer D,
    StatusCode,
    ResponseFormat
  >
    ? D
    : never
}
