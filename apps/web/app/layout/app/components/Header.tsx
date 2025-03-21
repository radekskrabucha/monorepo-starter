import { Link } from '@tanstack/react-router'
import { appName } from '~web/config/app'

export const Header = () => (
  <header className="layout-container bg-background border-border/10 sticky top-0 isolate z-30 border-b shadow-sm">
    <div className="layout-section items-center justify-center">
      <Link
        to="/"
        className="text-center text-xl uppercase"
      >
        {appName}
      </Link>
    </div>
  </header>
)
