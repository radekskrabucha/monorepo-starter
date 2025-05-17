import { sValidator } from '@hono/standard-validator'
import { BAD_REQUEST } from '@monorepo-starter/utils/http-codes'
import { Hono } from 'hono'
import { z } from 'zod'
import type { AppBindings } from '~api/types/app'
import { ApiErrorType, createErrorResponse } from '~api/utils/error'

const exampleSchema = z.object({
  name: z.string().min(1)
})

export const exampleRouter = new Hono<AppBindings>().basePath('/example').get(
  '/',
  sValidator('query', exampleSchema, (result, c) => {
    if (!result.success) {
      return c.json(
        createErrorResponse('Invalid query', ApiErrorType.example.invalidQuery),
        BAD_REQUEST
      )
    }
  }),
  async c => {
    const { name } = c.req.valid('query')

    return c.json({ message: `Hello, ${name}!` })
  }
)
