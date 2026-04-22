import Link from 'next/link'
import type { ReactNode } from 'react'
import { MathPlayground } from '@/components/math-playground'

type SitePageProps = {
  title: string
  eyebrow: string
  description: string
  actions?: ReactNode
  details?: ReactNode
  background?: ReactNode
  backgroundClassName?: string
  children?: ReactNode
}

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/projects', label: 'Projects' },
  { href: '/research', label: 'Research' },
  { href: '/blog', label: 'Blog' },
]

export function SitePage({
  title,
  eyebrow,
  description,
  actions,
  details,
  background,
  backgroundClassName = 'opacity-45 blur-[2px]',
  children,
}: SitePageProps) {
  const sectionLayout = children
    ? 'min-h-[calc(100vh-73px)] items-center lg:grid-cols-[minmax(0,0.88fr)_minmax(360px,1.12fr)]'
    : details
      ? 'items-start'
      : 'min-h-[calc(100vh-73px)] content-center'

  return (
    <main className="relative min-h-screen overflow-hidden bg-background text-foreground">
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
          <div className="flex flex-wrap items-center justify-center gap-2 text-base font-medium text-muted-foreground sm:gap-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="relative rounded-md px-3 py-2 transition-colors before:absolute before:inset-x-3 before:bottom-1 before:h-px before:origin-center before:scale-x-0 before:bg-primary before:transition-transform before:duration-300 hover:bg-accent/55 hover:text-foreground hover:before:scale-x-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </nav>
      </header>

      <section
        className={`relative z-10 mx-auto grid w-full max-w-6xl gap-12 px-6 py-14 ${sectionLayout}`}
      >
        <div className="relative z-10 max-w-3xl">
          <p className="mb-4 text-sm font-medium uppercase text-muted-foreground">{eyebrow}</p>
          <h1 className="text-4xl font-semibold tracking-normal text-balance sm:text-6xl">{title}</h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">{description}</p>
          {actions ? <div className="mt-8 flex items-center gap-3">{actions}</div> : null}
          {details ? <div className="mt-12">{details}</div> : null}
        </div>
        {children}
      </section>
    </main>
  )
}
