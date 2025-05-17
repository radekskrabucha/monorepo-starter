import { appName as _appName } from '@monorepo-starter/utils/app-config'
import { seoFactory } from '@monorepo-starter/utils/seo'
import type { StringWithAutoCompleteOptions } from '@monorepo-starter/utils/types'

export const appName = _appName
export const description =
  'A comprehensive monorepo starter template with integrated tools and configurations for efficient development.'

export const seo = seoFactory({
  titleSuffix: appName,
  description
})

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
