import { appHC } from '@monorepo-starter/api/client'
import { envClient } from '~web/utils/env/client'

export const appClient = appHC(envClient.VITE_API_URL + '/api')
