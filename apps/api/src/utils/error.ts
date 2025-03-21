type ErrorResponse<T extends object> = {
  message: string
} & T

export const errorResponse = <T extends object>(response: ErrorResponse<T>) =>
  response
