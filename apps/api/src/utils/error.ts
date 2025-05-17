import {
  ApiError as _ApiError,
  errorResponseFactory,
  type ErrorData as _ErrorData,
  type ErrorExtraData,
  type ErrorStatusCode
} from '@monorepo-starter/utils/api-error'
import {
  BAD_REQUEST,
  FORBIDDEN,
  INTERNAL_SERVER_ERROR,
  NOT_FOUND,
  UNAUTHORIZED
} from '@monorepo-starter/utils/http-codes'
import type { StringUnion } from '@monorepo-starter/utils/types'
import type { Context } from 'hono'

// Here define all API error types/codes so you can handle it accordingly on client
export const ApiErrorType = {
  generic: {
    unknown: 'unknown',
    notFound: 'not_found',
    unauthorized: 'unauthorized',
    forbidden: 'forbidden'
  },
  db: {
    queryFail: 'query_fail'
  },
  example: {
    invalidQuery: 'invalid_query'
  }
} as const

export type ApiErrorType = StringUnion<typeof ApiErrorType>
export type GenericApiErrorType = StringUnion<typeof ApiErrorType.generic>
export type DbApiErrorType = StringUnion<typeof ApiErrorType.db>
export type ExampleApiErrorType = StringUnion<typeof ApiErrorType.example>

export type ErrorData<
  T extends ApiErrorType = ApiErrorType,
  Extra extends ErrorExtraData = {}
> = _ErrorData<T, Extra>

export class ApiError<T extends ApiErrorType> extends _ApiError<T> {
  constructor(message: string, type: T, statusCode: ErrorStatusCode) {
    super(message, type, statusCode)
  }
}

export const errorResponse = errorResponseFactory<ApiErrorType>()

export const forbiddenErrorResponse = <Extra extends ErrorExtraData = {}>(
  c: Context,
  message = 'Forbidden',
  type = ApiErrorType.generic.forbidden,
  extra?: Extra
) =>
  errorResponse({
    c,
    message,
    statusCode: FORBIDDEN,
    type,
    extra
  })
export const unauthorizedErrorResponse = <Extra extends ErrorExtraData = {}>(
  c: Context,
  message = 'Unauthorized',
  type = ApiErrorType.generic.unauthorized,
  extra?: Extra
) =>
  errorResponse({
    c,
    message,
    statusCode: UNAUTHORIZED,
    type,
    extra
  })
export const notFoundErrorResponse = <Extra extends ErrorExtraData = {}>(
  c: Context,
  message: string,
  type: ApiErrorType,
  extra?: Extra
) =>
  errorResponse({
    c,
    statusCode: NOT_FOUND,
    type,
    message,
    extra
  })
export const invalidParamIDErrorResponse = <Extra extends ErrorExtraData = {}>(
  c: Context,
  type: ApiErrorType,
  message = 'Invalid param ID',
  statusCode: ErrorStatusCode = BAD_REQUEST,
  extra?: Extra
) =>
  errorResponse({
    c,
    message,
    statusCode,
    type,
    extra
  })
export const invalidQueryErrorResponse = <Extra extends ErrorExtraData = {}>(
  c: Context,
  type: ApiErrorType,
  message = 'Invalid query',
  statusCode: ErrorStatusCode = BAD_REQUEST,
  extra?: Extra
) =>
  errorResponse({
    c,
    message,
    statusCode,
    type,
    extra
  })
export const failedDbQueryErrorResponse = <Extra extends ErrorExtraData = {}>(
  c: Context,
  message = 'Failed to query data',
  type = ApiErrorType.db.queryFail,
  extra?: Extra
) =>
  errorResponse({
    c,
    message,
    type,
    statusCode: INTERNAL_SERVER_ERROR,
    extra
  })
