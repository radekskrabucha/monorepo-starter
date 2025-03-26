import { runMigration } from '@monorepo-starter/db/migration'
import path from 'path'
import { fileURLToPath } from 'url'
import { env } from '~api/utils/env'

export const runDbMigrations = async () => {
  try {
    console.log('Migrating schema...')

    if (!env.DRIZZLE_MIGRATIONS_FOLDER) {
      console.log('No migrations folder provided, skipping migrations')
      return
    }

    const __filename = fileURLToPath(import.meta.url)
    const __dirname = path.dirname(__filename)

    await runMigration(path.resolve(__dirname, env.DRIZZLE_MIGRATIONS_FOLDER))
    console.log('Schema migrated successfully')
  } catch (error) {
    console.error('Error migrating schema')
    console.error(error)
  }
}
