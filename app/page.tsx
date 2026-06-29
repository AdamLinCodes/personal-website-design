import Link from 'next/link'
import { ArrowUpRight, Github, Instagram, Linkedin, Mail } from 'lucide-react'
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
  {
    href: 'mailto:adamnlin@gmail.com',
    label: 'Email',
    Icon: Mail,
  },
]

const quickLinks = [
  { href: '/about', label: 'About', blurb: 'Where I have worked and what I learned breaking things.' },
  { href: '/projects', label: 'Projects', blurb: 'Apps, agents, and experiments that escaped the lab.' },
  { href: '/blog', label: 'Blog', blurb: 'Short notes on tools I am betting on right now.' },
]

export default function HomePage() {
  return (
    <SitePage
      eyebrow="Software engineer · Toronto"
      title="Adam Lin"
      description="I build the quiet machinery underneath software — backend systems, cloud infrastructure, and, lately, AI agents that do the work instead of just talking about it."
      backgroundClassName=""
      heroClassName="rounded-2xl border border-border/45 bg-background/35 p-8 shadow-[0_24px_70px_rgba(82,64,39,0.14)] backdrop-blur-[6px] sm:p-10"
      actions={socialLinks.map(({ href, label, Icon }) => (
        <a
          key={href}
          href={href}
          aria-label={label}
          title={label}
          target={href.startsWith('mailto:') ? undefined : '_blank'}
          rel={href.startsWith('mailto:') ? undefined : 'noreferrer'}
          className="inline-flex size-10 items-center justify-center rounded-md border border-border bg-card/72 text-foreground shadow-sm transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          <Icon className="size-5" aria-hidden="true" />
        </a>
      ))}
      details={
        <div className="space-y-8">
          <p className="text-base leading-7 text-muted-foreground">
            Right now I am at{' '}
            <a
              href="https://www.expertise.ai/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 font-medium text-foreground underline decoration-accent-teal/50 underline-offset-4 transition-colors hover:text-accent-teal"
            >
              Expertise
              <ArrowUpRight className="size-3.5" aria-hidden="true" />
            </a>
            , building AI agents that go and do the work for go-to-market teams. Before that, Amazon. The throughline:
            making big systems feel small, fast, and honest.
          </p>
          <div className="grid gap-3 sm:grid-cols-3">
            {quickLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="group rounded-lg border border-border bg-card/55 p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-accent-teal/40 hover:bg-card/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                <span className="flex items-center justify-between text-base font-semibold text-foreground">
                  {link.label}
                  <ArrowUpRight
                    className="size-4 text-muted-foreground transition-colors group-hover:text-accent-teal"
                    aria-hidden="true"
                  />
                </span>
                <span className="mt-1.5 block text-sm leading-6 text-muted-foreground">{link.blurb}</span>
              </Link>
            ))}
          </div>
        </div>
      }
    />
  )
}
