import globals from 'globals'
import { baseConfig } from '@monorepo-starter/eslint-config'

export default [
  ...baseConfig,
  {
    languageOptions: { globals: globals.node }
  }
]
