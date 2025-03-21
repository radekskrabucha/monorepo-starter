import { createEnv } from '@t3-oss/env-core'
import { z } from 'zod'

export const envClient = createEnv({
  clientPrefix: 'VITE_',
  client: {
    VITE_IS_DEV: z
      .enum(['true', 'false'])
      .default('false')
      .transform(v => v === 'true')
  },
  runtimeEnv: import.meta.env
})
