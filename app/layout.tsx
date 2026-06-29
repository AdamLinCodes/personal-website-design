import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://adamlin.online'),
  title: {
    default: 'Adam Lin — Software Engineer',
    template: '%s · Adam Lin',
  },
  description:
    'Adam Lin is a software engineer in Toronto building AI agents at Expertise. Backend systems, cloud infrastructure, and a few side projects that got out of hand.',
  openGraph: {
    title: 'Adam Lin — Software Engineer',
    description:
      'Building AI agents at Expertise. Backend systems, cloud infrastructure, and the occasional side project.',
    url: 'https://adamlin.online',
    siteName: 'Adam Lin',
    type: 'website',
  },
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
