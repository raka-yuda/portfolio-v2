import type { Metadata, Viewport } from 'next'
import dynamic from 'next/dynamic'
import { Plus_Jakarta_Sans, Caveat } from 'next/font/google'
import { ThemeProvider } from 'next-themes'
import { ThemeContextProvider } from '@/lib/theme'
import { TweaksProvider } from '@/lib/tweaks'
import { Analytics } from '@/components/organisms/Analytics'
import { AnalyticsTracker } from '@/components/organisms/AnalyticsTracker'
import { SITE } from '@/lib/site'
import './globals.css'

const BottomNav = dynamic(() => import('@/components/organisms/BottomNav').then(m => ({ default: m.BottomNav })))
const TweaksPanel = dynamic(() => import('@/components/organisms/TweaksPanel').then(m => ({ default: m.TweaksPanel })))

const jakarta = Plus_Jakarta_Sans({ subsets: ['latin'], variable: '--font-jakarta' })
const caveat = Caveat({ subsets: ['latin'], variable: '--font-caveat', preload: false })

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#FAF6E9' },
    { media: '(prefers-color-scheme: dark)', color: '#1A1814' },
  ],
  width: 'device-width',
  initialScale: 1,
}

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: `${SITE.name} — ${SITE.role}`, template: `%s — ${SITE.name}` },
  description: SITE.description,
  authors: [{ name: SITE.fullName, url: SITE.url }],
  creator: SITE.fullName,
  keywords: ['Raka', 'Software Engineer', 'Portfolio', 'Frontend', 'Backend', 'React', 'Next.js'],
  alternates: { canonical: '/' },
  icons: {
    icon: { url: '/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
    shortcut: { url: '/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
    apple: { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
  },
  openGraph: {
    type: 'website', locale: 'en_US', url: SITE.url, siteName: SITE.name,
    title: `${SITE.name} — Personal Portfolio Website`, description: SITE.description,
    images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: SITE.name }],
  },
  twitter: { card: 'summary_large_image', title: `${SITE.name} — Personal Portfolio Website`, description: SITE.description },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large' } },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const personJsonLd = {
    '@context': 'https://schema.org', '@type': 'Person',
    name: SITE.fullName, alternateName: SITE.name, jobTitle: SITE.role,
    url: SITE.url, email: SITE.email, sameAs: [SITE.links.github, SITE.links.linkedin],
  }

  return (
    <html lang="en" suppressHydrationWarning className={`${jakarta.variable} ${caveat.variable}`}>
      <head />
      <body className="font-sans antialiased">
        <script dangerouslySetInnerHTML={{
          __html: `(function(){try{var s=localStorage.getItem('portfolio-style');if(s==='modern'||s==='skeumorphic'){document.documentElement.dataset.style=s;}}catch(e){}})();`
        }} />
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
          <ThemeContextProvider>
            <TweaksProvider>
              {children}
              <BottomNav />
              <TweaksPanel />
              <Analytics />
              <AnalyticsTracker />
            </TweaksProvider>
          </ThemeContextProvider>
        </ThemeProvider>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }} />
      </body>
    </html>
  )
}
