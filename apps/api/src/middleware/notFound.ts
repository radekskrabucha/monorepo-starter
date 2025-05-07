import { NOT_FOUND } from '@monorepo-starter/utils/http-codes'
import type { NotFoundHandler } from 'hono'
import { ApiErrorType, createErrorResponse } from '~api/utils/error'

export const notFound: NotFoundHandler = c => {
  return c.json(
    createErrorResponse('Not found', ApiErrorType.generic.notFound, {
      path: c.req.path
    }),
    NOT_FOUND
  )
}
