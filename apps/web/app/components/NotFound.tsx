import { Button, buttonVariants } from '@monorepo-starter/ui/button'
import { Link } from '@tanstack/react-router'
import React from 'react'

type NotFoundProps = {
  title: React.ReactNode | undefined
  subtitle?: React.ReactNode | undefined
  description?: React.ReactNode | undefined
  goBack?: React.ReactNode | undefined
  goHome?: React.ReactNode | undefined
}

export const NotFound: React.FC<NotFoundProps> = ({
  title,
  subtitle,
  description,
  goBack,
  goHome
}) => (
  <div className="layout-container flex-1">
    <section className="layout-section flex-1 items-center justify-center gap-4 text-center">
      <h1 className="text-primary text-6xl font-bold">{title || '404'}</h1>
      {subtitle && <h2 className="text-2xl font-semibold">{subtitle}</h2>}
      {description && <p className="text-muted-foreground">{description}</p>}
      {goBack || goHome ? (
        <div className="flex flex-wrap items-center gap-4">
          {goBack && (
            <Button onClick={() => window.history.back()}>{goBack}</Button>
          )}
          {goHome && (
            <Link
              to="/"
              className={buttonVariants({ variant: 'secondary' })}
            >
              {goHome}
            </Link>
          )}
        </div>
      ) : null}
    </section>
  </div>
)
