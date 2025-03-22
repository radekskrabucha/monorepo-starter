import { config } from 'dotenv'
import { defineConfig } from 'drizzle-kit'
import { env } from './src/utils/env'

config({ path: '.env' })

export default defineConfig({
  schema: './src/schema/*.schema.ts',
  out: './src/migrations',
  dialect: 'postgresql',
  dbCredentials: {
    url: env.DATABASE_URL
  }
})
