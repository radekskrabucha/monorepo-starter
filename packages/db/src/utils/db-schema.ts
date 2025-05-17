import { sql } from 'drizzle-orm'
import { serial, timestamp as _timestamp, uuid } from 'drizzle-orm/pg-core'

export const primaryKey = (name: string) =>
  uuid(name).notNull().defaultRandom().primaryKey()
export const primaryKeySerial = (name: string) =>
  serial(name).primaryKey().notNull()

export const timestamp = (name: string) =>
  _timestamp(name, {
    precision: 3,
    withTimezone: true,
    mode: 'string'
  })
export const createdAt = timestamp('created_at')
  .default(sql`(now())`)
  .notNull()
export const updatedAt = timestamp('updated_at')
  .default(sql`(now())`)
  .notNull()
  .$onUpdate(() => sql`(now())`)

export const timestamps = {
  createdAt,
  updatedAt
}
