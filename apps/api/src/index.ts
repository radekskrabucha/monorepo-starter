import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { notFound } from '~/api/middleware/notFound'
import { onError } from '~/api/middleware/onError'
import { pinoLogger } from '~/api/middleware/pinoLogger'
import { serveEmojiFavicon } from '~/api/middleware/serveEmojiFavicon'
import type { AppBindings } from '~/api/types/app'
import { env } from '~/api/utils/env'

export const app = new Hono<AppBindings>()
  .basePath('/api')
  .use(pinoLogger())
  .use(
    '*',
    cors({
      origin: env.TRUSTED_ORIGINS,
      credentials: true
    })
  )
  .get('/health-check', c => c.json({ status: 'ok' }))

app.use('/favicon.ico', serveEmojiFavicon('💸'))

app.notFound(notFound)
app.onError(onError)

const port = env.PORT
console.log(`Server is running on http://localhost:${port}`)

serve({
  fetch: app.fetch,
  port
})
