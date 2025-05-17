import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import type { z } from 'zod'
import { tasks } from '~db/schema/tasks.js'

export const insertTaskSchema = createInsertSchema(tasks, {
  title: schema => schema.min(1).max(256)
}).omit({
  id: true,
  createdAt: true,
  updatedAt: true
})

export type InsertTask = z.infer<typeof insertTaskSchema>

export const updateTaskSchema = insertTaskSchema.partial()

export type UpdateTask = z.infer<typeof updateTaskSchema>

export const selectTaskSchema = createSelectSchema(tasks)

export type SelectTask = z.infer<typeof selectTaskSchema>
