import { pgTable, timestamp, boolean, varchar, uuid } from 'drizzle-orm/pg-core'

export const task = pgTable('task', {
  id: uuid().defaultRandom().primaryKey(),
  title: varchar({ length: 256 }).notNull(),
  description: varchar({ length: 1024 }),
  completed: boolean().notNull(),
  createdAt: timestamp().notNull().defaultNow(),
  updatedAt: timestamp()
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date())
})
