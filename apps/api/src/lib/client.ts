import type { Hono } from 'hono'
import { hc } from 'hono/client'
import type { appRouter } from '~api/routes'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type HonoClientArgs<T extends Hono<any, any, any>> = Parameters<typeof hc<T>>

export type AppRouter = typeof appRouter
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const appClientBase = hc<AppRouter>('')
export type AppClient = typeof appClientBase
export const appHC = (...args: HonoClientArgs<AppRouter>): AppClient =>
  hc<AppRouter>(...args)
