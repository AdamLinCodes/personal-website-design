'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

// Static export can't emit a server redirect(), so /thoughts redirects on the
// client. Keeps the legacy alias working without breaking the GitHub Pages build.
export default function ThoughtsPage() {
  const router = useRouter()

  useEffect(() => {
    router.replace('/blog')
  }, [router])

  return (
    <main className="flex min-h-screen items-center justify-center bg-background p-6 text-muted-foreground">
      <p>
        Redirecting to the{' '}
        <a href="/blog" className="font-medium text-foreground underline decoration-accent-teal/50 underline-offset-4">
          blog
        </a>
        …
      </p>
    </main>
  )
}
