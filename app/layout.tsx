import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from 'react-hot-toast'
import { PaymentProvider } from '@/contexts/PaymentContext'

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'SB-Nettoyage - Services de Nettoyage Professionnel avec IA',
  description: 'Premier site du secteur avec IA conversationnelle. Services de nettoyage pour entreprises, particuliers et collectivités. Réservation en ligne et devis automatique.',
  keywords: 'nettoyage, professionnel, entreprise, bureau, industriel, particulier, IA, chatbot, réservation',
  authors: [{ name: 'SB-Nettoyage', url: 'https://sb-nettoyage.com' }],
  creator: 'Save BOULAY',
  publisher: 'SB-Nettoyage',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://sb-nettoyage.com'),
  openGraph: {
    title: 'SB-Nettoyage - Services de Nettoyage Professionnel avec IA',
    description: 'Services de nettoyage innovants avec assistant IA 24/7',
    url: 'https://sb-nettoyage.com',
    siteName: 'SB-Nettoyage',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'SB-Nettoyage - Nettoyage professionnel',
      }
    ],
    locale: 'fr_FR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SB-Nettoyage - Services de Nettoyage Professionnel',
    description: 'Premier site du secteur avec IA conversationnelle',
    images: ['/twitter-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  manifest: '/manifest.json',
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/icon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/icon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-icon-180x180.png', sizes: '180x180', type: 'image/png' },
    ],
  },
}

export const viewport: Viewport = {
  themeColor: '#006400',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" className={inter.variable}>
      <head>
        <meta name="application-name" content="SB-Nettoyage" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="SB-Nettoyage" />
        <meta name="mobile-web-app-capable" content="yes" />
        <link rel="apple-touch-icon" href="/apple-icon-180x180.png" />
      </head>
      <body className="font-sans antialiased bg-white text-gray-900">
        <PaymentProvider>
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#FFFFFF',
                color: '#006400',
                border: '1px solid #006400',
                borderRadius: '8px',
                padding: '16px',
                fontSize: '14px',
              },
              success: {
                iconTheme: {
                  primary: '#006400',
                  secondary: '#FFFFFF',
                },
              },
              error: {
                iconTheme: {
                  primary: '#dc2626',
                  secondary: '#FFFFFF',
                },
                style: {
                  borderColor: '#dc2626',
                  color: '#dc2626',
                },
              },
            }}
          />
          {children}
        </PaymentProvider>
      </body>
    </html>
  )
}