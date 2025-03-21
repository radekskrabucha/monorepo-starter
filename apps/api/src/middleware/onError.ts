import type { ErrorHandler } from 'hono'
import type { ContentfulStatusCode } from 'hono/utils/http-status'
import { env } from '~/api/utils/env'
import { INTERNAL_SERVER_ERROR, OK } from '~/api/utils/httpCodes'

export const onError: ErrorHandler = (err, c) => {
  const currentStatus =
    'status' in err ? err.status : c.newResponse(null).status
  const statusCode =
    currentStatus !== OK
      ? (currentStatus as ContentfulStatusCode)
      : INTERNAL_SERVER_ERROR
  const nodeEnv = c.env?.NODE_ENV || env.NODE_ENV

  return c.json(
    {
      message: err.message,

      stack: nodeEnv === 'production' ? undefined : err.stack
    },
    statusCode
  )
}
