import type { ErrorStatusCode } from '@monorepo-starter/utils/api-error'
import { INTERNAL_SERVER_ERROR, OK } from '@monorepo-starter/utils/http-codes'
import type { ErrorHandler } from 'hono'
import { env } from '~api/utils/env'
import { ApiErrorType, errorResponse } from '~api/utils/error'

export const onError: ErrorHandler = (err, c) => {
  const currentStatus =
    'status' in err ? err.status : c.newResponse(null).status
  const statusCode =
    currentStatus !== OK
      ? (currentStatus as ErrorStatusCode)
      : INTERNAL_SERVER_ERROR
  const nodeEnv = c.env?.NODE_ENV || env.NODE_ENV

  return errorResponse({
    c,
    message: err.message,
    statusCode,
    type: ApiErrorType.generic.unknown,
    extra: nodeEnv === 'production' ? undefined : { stack: err.stack }
  })
}
