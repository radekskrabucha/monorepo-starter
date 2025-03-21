import type { StringWithAutoCompleteOptions } from '@monorepo-starter/utils/types'

export const appName = 'Monorepo Starter'

export const ExternalLinks = {
  X: 'https://x.com/radek_1313',
  GitHub: 'https://github.com/radekskrabucha/',
  SourceCode: 'https://github.com/radekskrabucha/monorepo-starter'
} as const

export type ExternalLinks = typeof ExternalLinks
export type ExternalLink = keyof ExternalLinks
export type ExternalLinkUrl = StringWithAutoCompleteOptions<
  ExternalLinks[ExternalLink]
>
