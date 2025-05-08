import {
  ApiError as ApiErrorGeneric,
  createErrorResponseFactory,
  type ErrorData as ErrorDataGeneric
} from '@monorepo-starter/utils/api-error'
import type { StringUnion } from '@monorepo-starter/utils/types'

// Here define all API error types/codes so you can handle it accordingly on client
export const ApiErrorType = {
  generic: {
    unknown: 'unknown',
    notFound: 'not_found'
  },
  example: {
    invalidQuery: 'invalid_query'
  }
} as const

export type ApiErrorType = StringUnion<typeof ApiErrorType>
export type GenericApiErrorType = StringUnion<typeof ApiErrorType.generic>
export type ExampleApiErrorType = StringUnion<typeof ApiErrorType.example>

export type ErrorData<T extends ApiErrorType = ApiErrorType> =
  ErrorDataGeneric<T>

export class ApiError<T extends ApiErrorType> extends ApiErrorGeneric<T> {
  constructor(message: string, type: T) {
    super(message, type)
  }
}

export const isApiError = <T extends ApiErrorType = ApiErrorType>(
  error: unknown
): error is ApiError<T> => {
  return error instanceof ApiError
}

export const createErrorResponse = createErrorResponseFactory<ApiErrorType>()
