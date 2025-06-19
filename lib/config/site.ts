import { SiteConfig } from '@/types'

export const siteConfig: SiteConfig = {
  name: 'SB-Nettoyage',
  description: 'Premier site du secteur avec IA conversationnelle. Services de nettoyage pour entreprises, particuliers et collectivités.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://sb-nettoyage.com',
  theme: {
    colors: {
      primary: '#006400',
      secondary: '#FFA500',
      accent: '#004d00'
    }
  },
  contact: {
    email: 'contact@sb-nettoyage.com',
    telephone: '+33123456789',
    adresse: 'Paris, Île-de-France'
  },
  social: {
    facebook: 'https://facebook.com/sbnettoyage',
    instagram: 'https://instagram.com/sbnettoyage',
    linkedin: 'https://linkedin.com/company/sb-nettoyage'
  }
}

// Configuration des meta tags par défaut
export const defaultMetadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} - Services de Nettoyage Professionnel avec IA`,
    template: `%s | ${siteConfig.name}`
  },
  description: siteConfig.description,
  keywords: [
    'nettoyage professionnel',
    'services nettoyage',
    'entreprise nettoyage',
    'nettoyage bureaux',
    'nettoyage industriel',
    'nettoyage particuliers',
    'IA chatbot',
    'réservation en ligne',
    'devis automatique',
    'Paris',
    'Île-de-France'
  ],
  authors: [
    {
      name: 'Save BOULAY',
      url: siteConfig.url,
    }
  ],
  creator: 'SB-Nettoyage',
  publisher: 'SB-Nettoyage',
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
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: `${siteConfig.url}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.name,
    description: siteConfig.description,
    images: [`${siteConfig.url}/twitter-image.jpg`],
    creator: '@sbnettoyage',
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
    yandex: process.env.NEXT_PUBLIC_YANDEX_VERIFICATION,
    yahoo: process.env.NEXT_PUBLIC_YAHOO_VERIFICATION,
  },
}

// Configuration des services
export const servicesConfig = {
  commercial: {
    nom: 'Nettoyage Commercial',
    description: 'Services de nettoyage pour bureaux, commerces et espaces professionnels',
    icone: 'Building2',
    couleur: 'sb-green'
  },
  industriel: {
    nom: 'Nettoyage Industriel',
    description: 'Solutions adaptées pour usines, ateliers et sites industriels',
    icone: 'Factory',
    couleur: 'sb-orange'
  },
  particuliers: {
    nom: 'Nettoyage Particuliers',
    description: 'Services pour maisons et appartements',
    icone: 'Home',
    couleur: 'sb-green'
  },
  collectivites: {
    nom: 'Collectivités',
    description: 'Prestations pour administrations, écoles et hôpitaux',
    icone: 'Building',
    couleur: 'sb-orange'
  }
}

// Configuration PWA
export const pwaConfig = {
  name: 'SB-Nettoyage Pro',
  short_name: 'SB-Nettoyage',
  description: siteConfig.description,
  theme_color: siteConfig.theme.colors.primary,
  background_color: '#FFFFFF',
  display: 'standalone',
  orientation: 'portrait',
  scope: '/',
  start_url: '/',
  shortcuts: [
    {
      name: 'Réserver un service',
      short_name: 'Réserver',
      description: 'Réservez rapidement un service de nettoyage',
      url: '/reservation',
    },
    {
      name: 'Obtenir un devis',
      short_name: 'Devis',
      description: 'Demandez un devis gratuit instantané',
      url: '/devis',
    }
  ]
}

// Configuration des performances
export const performanceConfig = {
  images: {
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60 * 60 * 24 * 365, // 1 an
  },
  fonts: {
    preconnect: ['https://fonts.googleapis.com', 'https://fonts.gstatic.com'],
    families: {
      sans: ['Inter', 'Roboto', 'system-ui', 'sans-serif'],
    }
  },
  optimization: {
    lazyLoading: true,
    removeConsoleInProd: true,
    minifyCSS: true,
    minifyJS: true,
  }
}

// Configuration API
export const apiConfig = {
  baseURL: process.env.NEXT_PUBLIC_API_URL || '/api',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
  endpoints: {
    // Services
    services: '/services',
    serviceById: (id: number) => `/services/${id}`,
    
    // Réservations
    reservations: '/reservations',
    reservationById: (id: number) => `/reservations/${id}`,
    availableSlots: '/reservations/slots',
    
    // Devis
    devis: '/devis',
    devisCalculate: '/devis/calculate',
    
    // Clients
    clients: '/clients',
    clientById: (id: number) => `/clients/${id}`,
    
    // Chat
    chat: '/chat',
    chatConversation: (sessionId: string) => `/chat/${sessionId}`,
    
    // Paiements
    payments: '/payments',
    paymentIntent: '/payments/intent',
    
    // Géolocalisation
    geocode: '/geo/geocode',
    distance: '/geo/distance',
    
    // Analytics
    analytics: '/analytics',
    analyticsEvent: '/analytics/event',
  }
}