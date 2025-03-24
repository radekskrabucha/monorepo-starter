import { baseConfig } from '@monorepo-starter/eslint-config'
import globals from 'globals'

export default [
  ...baseConfig,
  {
    languageOptions: { globals: globals.browser }
  }
]
