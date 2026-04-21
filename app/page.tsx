import { Github, Instagram, Linkedin } from 'lucide-react'
import { MathPlayground } from '@/components/math-playground'
import { SitePage } from './site-page'

const socialLinks = [
  {
    href: 'https://www.linkedin.com/in/adam-lin-7314ab19a/',
    label: 'LinkedIn',
    Icon: Linkedin,
  },
  {
    href: 'https://github.com/AdamLinCodes',
    label: 'GitHub',
    Icon: Github,
  },
  {
    href: 'https://www.instagram.com/adam_lin12/',
    label: 'Instagram',
    Icon: Instagram,
  },
]

export default function HomePage() {
  return (
    <SitePage
      eyebrow="Personal website"
      title="Adam Lin"
      description="Hi! I'm Adam, and this is site is where I will be posting anything that I think people might want to see from me."
      actions={socialLinks.map(({ href, label, Icon }) => (
        <a
          key={href}
          href={href}
          aria-label={label}
          title={label}
          target="_blank"
          rel="noreferrer"
          className="inline-flex size-10 items-center justify-center rounded-md border border-border bg-card/72 text-foreground shadow-sm transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          <Icon className="size-5" aria-hidden="true" />
        </a>
      ))}
    >
      <MathPlayground />
    </SitePage>
  )
}
