export type DbQueryErrorType = `db:${string}`

export class DbQueryError<T extends DbQueryErrorType> extends Error {
  public readonly type: T

  constructor(type: T, message = 'Failed to query database') {
    super(message)
    this.name = 'DbQueryError'
    this.type = type
  }
}
export const isDbQueryError = <T extends DbQueryErrorType>(
  error: unknown
): error is DbQueryError<T> => {
  return error instanceof DbQueryError
}
