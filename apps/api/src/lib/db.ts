import { runMigration } from '@monorepo-starter/db/migration'

export const runDbMigrations = async () => {
  try {
    console.log('Migrating schema...')
    await runMigration()
    console.log('Schema migrated successfully')
  } catch (error) {
    console.error('Error migrating schema')
    console.error(error)
  }
}
