import { zValidator } from '@hono/zod-validator'
import { Hono } from 'hono'
import { z } from 'zod'
import type { AppBindings } from '~api/types/app'
import { errorResponse } from '~api/utils/error'

const exampleSchema = z.object({
  name: z.string().min(1)
})

export const exampleRouter = new Hono<AppBindings>().basePath('/example').get(
  '/',
  zValidator('query', exampleSchema, (result, c) => {
    if (!result.success) {
      return c.json(errorResponse({ message: 'Invalid query', ...result }), 400)
    }
  }),
  async c => {
    const { name } = c.req.valid('query')

    return c.json({ message: `Hello, ${name}!` })
  }
)
