import { neon } from '@neondatabase/serverless'
import { drizzle } from 'drizzle-orm/neon-http'
import * as taskSchema from '~db/schema/task.schema.js'
import { env } from '~db/utils/env.js'

const sql = neon(env.DATABASE_URL)

export const db = drizzle(sql, {
  schema: {
    ...taskSchema
  }
})
