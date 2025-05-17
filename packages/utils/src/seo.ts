import { appName } from './app-config.js'

type SeoTitleArgs =
  | { title: string; titleSuffix?: string | null }
  | { title?: undefined; titleSuffix: string }

type SeoArgs = {
  description?: string
  image?: string
  keywords?: string
} & SeoTitleArgs

const seo = ({
  title: _title,
  titleSuffix,
  description,
  keywords,
  image
}: SeoArgs) => {
  const title = getSeoTitle({ title: _title, titleSuffix } as SeoTitleArgs)
  const tags = [
    { title },
    { name: 'twitter:title', content: title },
    { name: 'og:title', content: title },
    { name: 'og:type', content: 'website' },
    ...(description
      ? [
          { name: 'description', content: description },
          { name: 'twitter:description', content: description },
          { name: 'og:description', content: description }
        ]
      : []),
    ...(keywords ? [{ name: 'keywords', content: keywords }] : []),

    ...(image
      ? [
          { name: 'twitter:image', content: image },
          { name: 'twitter:card', content: 'summary_large_image' },
          { name: 'og:image', content: image }
        ]
      : [])
  ]

  return tags
}

const getSeoTitle = ({
  title,
  titleSuffix = appName
}: SeoTitleArgs): string => {
  if (title && titleSuffix) {
    return `${title} | ${titleSuffix}`
  }
  if (title) {
    return title
  }

  return titleSuffix ?? appName
}

type DefaultSeoArgs = Omit<SeoArgs, 'title'>
export const seoFactory = (defaultArgs: DefaultSeoArgs) => {
  return (args: SeoArgs = {} as SeoArgs) => {
    const mergedArgs = { ...defaultArgs, ...args }

    return seo(mergedArgs)
  }
}
