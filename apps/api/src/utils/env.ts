import { validateEnv } from '@monorepo-starter/utils/env'
import { config } from 'dotenv'
import path from 'node:path'
import { z } from 'zod'

config({
  path: path.resolve(
    process.cwd(),
    process.env.NODE_ENV === 'test' ? '.env.test' : '.env'
  )
})

const EnvSchema = z.object({
  NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .default('development'),
  PORT: z.coerce.number().default(4000),
  LOG_LEVEL: z.enum([
    'trace',
    'debug',
    'info',
    'warn',
    'error',
    'fatal',
    'silent'
  ]),
  TRUSTED_ORIGINS: z.string(),
  DATABASE_URL: z.string(),
  REDIS_URL: z.string()
})

export type Env = z.infer<typeof EnvSchema>

export const env = validateEnv(EnvSchema)
