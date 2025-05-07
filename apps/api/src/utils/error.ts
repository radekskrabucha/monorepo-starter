import {
  ApiError as ApiErrorGeneric,
  createErrorResponseFactory,
  type ErrorData as ErrorDataGeneric
} from '@monorepo-starter/utils/api-error'
import type { StringUnion } from '@monorepo-starter/utils/types'

export const ApiErrorType = {
  example: {
    invalidQuery: 'invalid_query'
  }
} as const

export type ApiErrorType = StringUnion<typeof ApiErrorType>
export type ExampleApiErrorType = StringUnion<typeof ApiErrorType.example>

export type ErrorData<T extends ApiErrorType> = ErrorDataGeneric<T>

export class ApiError<T extends ApiErrorType> extends ApiErrorGeneric<T> {
  constructor(message: string, type: T) {
    super(message, type)
  }
}

export const createErrorResponse = createErrorResponseFactory<ApiErrorType>()
