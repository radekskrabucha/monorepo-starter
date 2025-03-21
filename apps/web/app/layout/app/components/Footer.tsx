import { Link } from '@tanstack/react-router'
import { SocialLinks } from '~web/components/SocialLinks'
import { appName } from '~web/config/app'

export const Footer = () => (
  <footer className="layout-container bg-background">
    <section className="layout-section flex-wrap justify-between gap-10 md:!flex-row">
      <Link
        to="/"
        className="text-muted-foreground hover:text-foreground text-xl uppercase transition-colors"
      >
        {appName}
      </Link>
      <SocialLinks />
    </section>
  </footer>
)
