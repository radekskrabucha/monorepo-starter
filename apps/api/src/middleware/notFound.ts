import type { NotFoundHandler } from 'hono'
import { ApiErrorType, notFoundErrorResponse } from '~api/utils/error'

export const notFound: NotFoundHandler = c => {
  return notFoundErrorResponse(c, 'Not found', ApiErrorType.generic.notFound)
}
