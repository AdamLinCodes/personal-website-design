import Link from 'next/link'
import type { ReactNode } from 'react'

type SitePageProps = {
  title: string
  eyebrow: string
  description: string
  actions?: ReactNode
  children?: ReactNode
}

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/projects', label: 'Projects' },
  { href: '/research', label: 'Research' },
  { href: '/blog', label: 'Blog' },
]

export function SitePage({ title, eyebrow, description, actions, children }: SitePageProps) {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border/80 bg-background/75 backdrop-blur">
        <nav className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-2">
          <Link
            href="/"
            aria-label="Home"
            className="inline-flex size-24 items-center justify-center rounded-md transition-opacity hover:opacity-75 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            <img src="/adamlin-icon.png" alt="" className="size-18 object-contain" />
          </Link>
          <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className="transition-colors hover:text-foreground">
                {item.label}
              </Link>
            ))}
          </div>
        </nav>
      </header>

      <section
        className={`mx-auto grid min-h-[calc(100vh-73px)] w-full max-w-6xl items-center gap-12 px-6 py-14 ${
          children ? 'lg:grid-cols-[minmax(0,0.88fr)_minmax(360px,1.12fr)]' : 'content-center'
        }`}
      >
        <div className="max-w-3xl">
          <p className="mb-4 text-sm font-medium uppercase text-muted-foreground">{eyebrow}</p>
          <h1 className="text-4xl font-semibold tracking-normal text-balance sm:text-6xl">{title}</h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">{description}</p>
          {actions ? <div className="mt-8 flex items-center gap-3">{actions}</div> : null}
        </div>
        {children}
      </section>
    </main>
  )
}
