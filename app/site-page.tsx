import Link from 'next/link'
import type { ReactNode } from 'react'
import { Github, Linkedin, Mail } from 'lucide-react'
import { MathPlayground } from '@/components/math-playground'
import { SiteNav } from '@/components/site-nav'

type SitePageProps = {
  title: string
  eyebrow: string
  description: string
  actions?: ReactNode
  details?: ReactNode
  background?: ReactNode
  backgroundClassName?: string
  heroClassName?: string
  children?: ReactNode
}

const footerLinks = [
  { href: 'https://github.com/AdamLinCodes', label: 'GitHub', Icon: Github },
  { href: 'https://www.linkedin.com/in/adam-lin-7314ab19a/', label: 'LinkedIn', Icon: Linkedin },
  { href: 'mailto:adamnlin@gmail.com', label: 'Email', Icon: Mail },
]

export function SitePage({
  title,
  eyebrow,
  description,
  actions,
  details,
  background,
  backgroundClassName = 'opacity-45 blur-[2px]',
  heroClassName = '',
  children,
}: SitePageProps) {
  const sectionLayout = children
    ? 'min-h-[calc(100vh-73px)] items-center lg:grid-cols-[minmax(0,0.88fr)_minmax(360px,1.12fr)]'
    : details
      ? 'items-start'
      : 'min-h-[calc(100vh-73px)] content-center'

  return (
    <main className="relative flex min-h-screen flex-col overflow-hidden bg-background text-foreground">
      <div className={`absolute inset-0 z-0 ${backgroundClassName}`}>{background ?? <MathPlayground />}</div>

      <header className="relative z-20 border-b border-border/80 bg-background/75 backdrop-blur">
        <nav className="mx-auto grid w-full max-w-6xl grid-cols-[auto_1fr] items-center gap-4 px-6 py-2">
          <Link
            href="/"
            aria-label="Home"
            className="inline-flex size-24 items-center justify-center rounded-md transition-opacity hover:opacity-75 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            <img src="/adamlin-icon.png" alt="" className="size-18 object-contain" />
          </Link>
          <SiteNav />
        </nav>
      </header>

      <section
        className={`relative z-10 mx-auto grid w-full max-w-6xl flex-1 gap-12 px-6 py-14 ${sectionLayout}`}
      >
        <div className={`relative z-10 max-w-3xl ${heroClassName}`}>
          <p className="mb-4 flex items-center gap-2 text-sm font-medium uppercase tracking-wide text-muted-foreground">
            <span aria-hidden="true" className="inline-block h-px w-6 bg-accent-teal" />
            <span className="font-mono">{eyebrow}</span>
          </p>
          <h1 className="font-display text-4xl font-semibold text-balance sm:text-6xl">{title}</h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">{description}</p>
          {actions ? <div className="mt-8 flex flex-wrap items-center gap-3">{actions}</div> : null}
          {details ? <div className="mt-12">{details}</div> : null}
        </div>
        {children}
      </section>

      <footer className="relative z-10 border-t border-border/70 bg-background/60 backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-6 text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Adam Lin · Toronto</p>
          <div className="flex items-center gap-2">
            {footerLinks.map(({ href, label, Icon }) => (
              <a
                key={href}
                href={href}
                aria-label={label}
                title={label}
                target={href.startsWith('mailto:') ? undefined : '_blank'}
                rel={href.startsWith('mailto:') ? undefined : 'noreferrer'}
                className="inline-flex size-9 items-center justify-center rounded-md border border-border bg-card/60 transition-colors hover:bg-accent hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                <Icon className="size-4" aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>
      </footer>
    </main>
  )
}
