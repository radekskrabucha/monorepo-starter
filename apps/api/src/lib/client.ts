import type { Hono } from 'hono'
import { hc } from 'hono/client'
import type {
  ClientResponse,
  InferRequestType,
  InferResponseType
} from 'hono/client'
import type { ResponseFormat } from 'hono/types'
import type { SuccessStatusCode, StatusCode } from 'hono/utils/http-status'
import type { appRouter } from '~api/routes'
import { ApiError, ApiErrorType, type ErrorData } from '~api/utils/error'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type HonoClientArgs<T extends Hono<any, any, any>> = Parameters<typeof hc<T>>

export type AppRouter = typeof appRouter
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const appClientBase = hc<AppRouter>('')
export type AppClient = typeof appClientBase
export const appHC = (...args: HonoClientArgs<AppRouter>): AppClient =>
  hc<AppRouter>(...args)

// Helper type to extract successful response type from ClientResponse union
type ExtractSuccessResponse<T> =
  T extends ClientResponse<infer Data, infer Status, infer Format>
    ? Status extends SuccessStatusCode
      ? ClientResponse<Data, Status, Format>
      : never
    : never

export async function fetchWrapper<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  T extends ClientResponse<any, StatusCode, any>,
  SuccessResponse extends ExtractSuccessResponse<T> = ExtractSuccessResponse<T>
>(
  resPromise: Promise<T>
): Promise<
  SuccessResponse extends ClientResponse<infer Data, StatusCode, ResponseFormat>
    ? Data
    : never
> {
  const response = await resPromise

  const contentHeader = response.headers.get('content-type')
  const isJsonContent = contentHeader && contentHeader === 'application/json'

  if (!response.ok) {
    const errorData = isJsonContent
      ? ((await response.json()) as ErrorData)
      : ((await response.text()) as string)

    if (typeof errorData === 'object') {
      throw new ApiError(
        'message' in errorData ? errorData.message : 'API request failed',
        'type' in errorData ? errorData.type : ApiErrorType.generic.unknown
      )
    }

    throw new ApiError(errorData, ApiErrorType.generic.unknown)
  }

  return isJsonContent ? response.json() : response.text()
}

export type { InferRequestType, InferResponseType }
