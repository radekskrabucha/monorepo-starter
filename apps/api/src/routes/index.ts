import { Hono } from 'hono'
import type { AppBindings } from '~api/types/app'
import { exampleRouter } from './example'

export const appRouter = new Hono<AppBindings>().route('/', exampleRouter)
