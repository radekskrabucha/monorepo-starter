import { migrate } from 'drizzle-orm/node-postgres/migrator'
import { db } from '~db/index.js'

export const runMigration = async (migrationsFolder: string) =>
  await migrate(db, { migrationsFolder })
