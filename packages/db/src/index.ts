import { drizzle } from 'drizzle-orm/node-postgres'
import { Pool } from 'pg'
import * as taskSchema from '~db/schema/task.schema.js'
import { env } from '~db/utils/env.js'

const pool = new Pool({
  connectionString: env.DATABASE_URL
})

export const db = drizzle({
  client: pool,
  schema: {
    ...taskSchema
  }
})
