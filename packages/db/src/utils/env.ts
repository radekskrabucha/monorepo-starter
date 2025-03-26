import { config } from 'dotenv'
import path from 'node:path'
import { z } from 'zod'

const envPath = path.resolve(
  process.cwd(),
  process.env.NODE_ENV === 'test' ? '.env.test' : '.env'
)

config({
  path: envPath
})

const EnvSchema = z.object({
  DATABASE_URL: z.string()
})

export type Env = z.infer<typeof EnvSchema>

export let env: Env

try {
  env = EnvSchema.parse(process.env)
} catch (error) {
  if (error instanceof z.ZodError) {
    console.error('❌ Invalid environment variables')
    console.error(error.flatten().fieldErrors)
    process.exit(1)
  }
}
