import { baseConfig } from '@monorepo-starter/eslint-config'
import drizzle from 'eslint-plugin-drizzle'
import globals from 'globals'

export default [
  ...baseConfig,
  {
    languageOptions: { globals: globals.node }
  },
  {
    plugins: {
      drizzle
    },
    rules: {
      ...drizzle.configs.recommended.rules
    }
  }
]
