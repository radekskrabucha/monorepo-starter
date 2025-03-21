import { createEnv } from '@t3-oss/env-core'
import { z } from 'zod'

export const envServer = createEnv({
  server: {
    NODE_ENV: z
      .enum(['development', 'production', 'test'])
      .default('development')
  },
  runtimeEnv: process.env
})
