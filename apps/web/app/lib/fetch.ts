import { FETCH_DEFAULT_CONFIG } from '@monorepo-starter/utils/fetch-client'
import { ofetch } from 'ofetch'
import { envClient } from '~web/utils/env/client'

export const fetchApiClient = ofetch.create({
  ...FETCH_DEFAULT_CONFIG,
  baseURL: `${envClient.VITE_API_URL}/api`,
  mode: 'cors',
  credentials: 'include'
})
