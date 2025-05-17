import { pgTable, boolean, varchar } from 'drizzle-orm/pg-core'
import { primaryKey, timestamps } from '~db/utils/db-schema.js'

export const tasks = pgTable('tasks', {
  id: primaryKey('id'),
  title: varchar({ length: 256 }).notNull(),
  description: varchar({ length: 1024 }),
  completed: boolean().notNull(),
  ...timestamps
})
