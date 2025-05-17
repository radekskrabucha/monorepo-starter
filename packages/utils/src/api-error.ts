import type { Context } from 'hono'
import type {
  ClientErrorStatusCode,
  ServerErrorStatusCode
} from 'hono/utils/http-status'
import { FetchError } from 'ofetch'

export type ErrorStatusCode = ServerErrorStatusCode | ClientErrorStatusCode

export class ApiError<T extends string = string> extends Error {
  public readonly type: T
  public readonly statusCode: ErrorStatusCode

  constructor(message: string, type: T, statusCode: ErrorStatusCode) {
    super(message)
    this.name = 'ApiError'
    this.type = type
    this.statusCode = statusCode
  }
}
export const isApiError = <T extends string>(
  error: unknown
): error is FetchError<ErrorData<T, ErrorExtraData>> => {
  return (
    error instanceof FetchError &&
    'type' in error.data &&
    'message' in error.data &&
    'statusCode' in error.data
  )
}

export type ErrorExtraData = Record<string, unknown>
export type ErrorData<T extends string, Extra extends ErrorExtraData> = {
  message: string
  type: T
  statusCode: ErrorStatusCode
} & Extra

type CreateErrorResponseArgs<
  T extends string,
  Extra extends ErrorExtraData = {}
> = {
  type: T
  statusCode: ErrorStatusCode
  message: string
  extra?: Extra
}
export const createErrorResponse = <
  T extends string,
  Extra extends ErrorExtraData = {}
>({
  message,
  statusCode,
  type,
  extra
}: CreateErrorResponseArgs<T, Extra>): ErrorData<T, Extra> => ({
  type,
  statusCode,
  message,
  ...(extra || ({} as Extra))
})
export const createErrorResponseFactory = <T extends string>() => {
  return <Extra extends ErrorExtraData = {}>(
    args: CreateErrorResponseArgs<T, Extra>
  ): ErrorData<T, Extra> => createErrorResponse<T, Extra>(args)
}

type ErrorResponseArgs<T extends string, Extra extends ErrorExtraData = {}> = {
  c: Context
} & CreateErrorResponseArgs<T, Extra>
export const errorResponse = <
  T extends string,
  Extra extends ErrorExtraData = {}
>({
  c,
  message,
  statusCode,
  type,
  extra
}: ErrorResponseArgs<T, Extra>) =>
  c.json(
    {
      type,
      statusCode,
      message,
      ...((extra || {}) as Extra)
    } satisfies ErrorData<T, Extra>,
    statusCode
  )
export const errorResponseFactory = <T extends string>() => {
  return <Extra extends ErrorExtraData = {}>(
    args: ErrorResponseArgs<T, Extra>
  ) => errorResponse<T, Extra>(args)
}
