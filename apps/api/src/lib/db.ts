import { runMigration } from '@monorepo-starter/db/migration'
import path from 'path'
import { fileURLToPath } from 'url'

export const runDbMigrations = async () => {
  try {
    const __filename = fileURLToPath(import.meta.url)
    const __dirname = path.dirname(__filename)

    console.log('Migrating schema...')
    await runMigration(
      path.resolve(
        __dirname,
        '../../node_modules/@monorepo-starter/db/src/migrations'
      )
    )
    console.log('Schema migrated successfully')
  } catch (error) {
    console.error('Error migrating schema')
    console.error(error)
  }
}
