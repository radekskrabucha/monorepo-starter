export class ApiError<T extends string = string> extends Error {
  public readonly type: T

  constructor(message: string, type: T) {
    super(message)
    this.name = 'ApiError'
    this.type = type
  }
}

export type ErrorExtraData = Record<string, unknown>
export type ErrorData<T extends string> = {
  message: string
  type: T
} & ErrorExtraData

export const createErrorResponse = <
  T extends string,
  Extra extends ErrorExtraData = {}
>(
  message: string,
  type: T,
  extra?: Extra
) =>
  ({
    message,
    type,
    ...(extra || {})
  }) as ErrorData<T>

export const createErrorResponseFactory = <T extends string>() => {
  return <Extra extends ErrorExtraData = {}>(
    message: string,
    type: T,
    extra?: Extra
  ) => createErrorResponse<T, Extra>(message, type, extra)
}
