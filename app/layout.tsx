import type { Metadata, Viewport } from 'next'
import { Plus_Jakarta_Sans, Caveat } from 'next/font/google'
import { ThemeProvider } from 'next-themes'
import { ThemeContextProvider } from '@/lib/theme'
import { TweaksProvider } from '@/lib/tweaks'
import { TooltipProvider } from '@/components/ui/tooltip'
import Script from 'next/script'
import { BottomNav } from '@/components/organisms/BottomNav'
import { TweaksPanel } from '@/components/organisms/TweaksPanel'
import { Analytics } from '@/components/organisms/Analytics'
import { SITE } from '@/lib/site'
import './globals.css'

const jakarta = Plus_Jakarta_Sans({ subsets: ['latin'], variable: '--font-jakarta' })
const caveat = Caveat({ subsets: ['latin'], variable: '--font-caveat' })

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
        <Script id="theme-style" strategy="beforeInteractive">
          {`
            (function() {
              try {
                var saved = localStorage.getItem('portfolio-style');
                if (saved === 'modern' || saved === 'skeumorphic') {
                  document.documentElement.dataset.style = saved;
                }
              } catch (e) {}
            })();
          `}
        </Script>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
          <ThemeContextProvider>
            <TweaksProvider>
              <TooltipProvider>
              {children}
              <BottomNav />
              <TweaksPanel />
              <Analytics />
              </TooltipProvider>
            </TweaksProvider>
          </ThemeContextProvider>
        </ThemeProvider>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }} />
      </body>
    </html>
  )
}
