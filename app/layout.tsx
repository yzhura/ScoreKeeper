import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'

const inter = Inter({ subsets: ['latin', 'cyrillic'] })

export const metadata: Metadata = {
  title: 'Score Keeper - Лічильник Балів | Счетчик Очков',
  description: 'Лучший додаток для підрахунку очок у будь-якій грі! Відстежуйте очки, рахунки та багато іншого — швидко, просто й без реклами. Ідеально підходить для настільних ігор, карткових ігор та щоденних занять.',
  keywords: 'score keeper, лічильник балів, счетчик очков, настільні ігри, board games, dice, таймер, timer',
  authors: [{ name: 'Score Keeper' }],
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Score Keeper',
  },
  openGraph: {
    title: 'Score Keeper - Лічильник Балів',
    description: 'Лучший додаток для підрахунку очок у будь-якій грі!',
    type: 'website',
    locale: 'uk_UA',
    alternateLocale: ['ru_RU', 'en_US', 'be_BY'],
  },
  robots: {
    index: true,
    follow: true,
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
    userScalable: true,
    viewportFit: 'cover',
  },
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#3B82F6' },
    { media: '(prefers-color-scheme: dark)', color: '#3B82F6' },
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="uk" suppressHydrationWarning>
      <head>
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        
        {/* Theme and PWA */}
        <meta name="theme-color" content="#3B82F6" media="(prefers-color-scheme: light)" />
        <meta name="theme-color" content="#3B82F6" media="(prefers-color-scheme: dark)" />
        <meta name="color-scheme" content="light dark" />
        
        {/* iOS PWA Meta Tags */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Score Keeper" />
        
        {/* Android PWA Meta Tags */}
        <meta name="application-name" content="Score Keeper" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-TileColor" content="#3B82F6" />
        
        {/* PWA Display */}
        <meta name="display" content="standalone" />
        <meta name="orientation" content="portrait" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebApplication',
              name: 'Score Keeper - Лічильник Балів',
              description: 'Лучший додаток для підрахунку очок у будь-якій грі! Відстежуйте очки, рахунки та багато іншого — швидко, просто й без реклами.',
              applicationCategory: 'GameApplication',
              operatingSystem: 'Web',
              offers: {
                '@type': 'Offer',
                price: '0',
                priceCurrency: 'USD',
              },
              aggregateRating: {
                '@type': 'AggregateRating',
                ratingValue: '4.9',
                ratingCount: '3880',
              },
            }),
          }}
        />
      </head>
      <body className={inter.className} suppressHydrationWarning>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}

