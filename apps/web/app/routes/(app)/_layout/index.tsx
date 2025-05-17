import { createFileRoute } from '@tanstack/react-router'
import { seo } from '~web/config/app'
import { HomePage } from '~web/features/home/HomePage'

export const Route = createFileRoute('/(app)/_layout/')({
  component: HomePage,
  head: () => ({
    meta: [...seo({ title: 'Home' })]
  })
})
