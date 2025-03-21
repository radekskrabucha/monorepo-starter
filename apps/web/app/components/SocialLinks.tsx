import { ExternalLinks } from '~web/config/app'
import { ExternalLink } from './ExternalLink'

export const SocialLinks = () => (
  <div className="flex flex-col gap-4">
    <h3 className="font-semibold">See more</h3>
    <div className="flex flex-col gap-2">
      <SocialLink href={ExternalLinks.X}>My X</SocialLink>
      <SocialLink href={ExternalLinks.GitHub}>My GitHub</SocialLink>
      <SocialLink href={ExternalLinks.SourceCode}>Source Code</SocialLink>
    </div>
  </div>
)

type SocialLinkProps = Pick<
  React.ComponentProps<typeof ExternalLink>,
  'href' | 'children'
>

const SocialLink: React.FC<SocialLinkProps> = ({ href, children }) => (
  <ExternalLink
    href={href}
    className="text-muted-foreground hover:text-foreground text-sm transition-colors"
  >
    {children}
  </ExternalLink>
)
