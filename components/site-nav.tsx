'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/projects', label: 'Projects' },
  { href: '/blog', label: 'Blog' },
]

export function SiteNav() {
  const pathname = usePathname()

  return (
    <div className="flex flex-wrap items-center justify-center gap-1 text-base font-medium text-muted-foreground sm:gap-2">
      {navItems.map((item) => {
        const isActive = item.href === '/' ? pathname === '/' : pathname.startsWith(item.href)

        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={isActive ? 'page' : undefined}
            className={`relative rounded-md px-3 py-2 transition-colors before:absolute before:inset-x-3 before:bottom-1 before:h-px before:origin-center before:bg-accent-teal before:transition-transform before:duration-300 hover:bg-accent/55 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
              isActive
                ? 'text-foreground before:scale-x-100'
                : 'before:scale-x-0 hover:before:scale-x-100'
            }`}
          >
            {item.label}
          </Link>
        )
      })}
    </div>
  )
}
