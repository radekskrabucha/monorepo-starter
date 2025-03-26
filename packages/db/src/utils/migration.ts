import { migrate } from 'drizzle-orm/node-postgres/migrator'
import path from 'path'
import { fileURLToPath } from 'url'
import { db } from '~db/index.js'

export const runMigration = async () => {
  const __filename = fileURLToPath(import.meta.url)
  const __dirname = path.dirname(__filename)

  await migrate(db, {
    migrationsFolder: path.resolve(__dirname, '../migrations')
  })
}
