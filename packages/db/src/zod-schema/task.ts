import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import type { z } from 'zod'
import { task } from '~db/schema/task.schema.js'

export const insertTaskSchema = createInsertSchema(task, {
  title: schema => schema.min(1).max(256)
}).omit({
  id: true,
  createdAt: true,
  updatedAt: true
})

export type InsertTask = z.infer<typeof insertTaskSchema>

export const updateTaskSchema = insertTaskSchema.partial()

export type UpdateTask = z.infer<typeof updateTaskSchema>

export const selectTaskSchema = createSelectSchema(task)

export type SelectTask = z.infer<typeof selectTaskSchema>
