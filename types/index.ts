// Types pour le projet SB-Nettoyage

// Types de base
export type ServiceType = 'commercial' | 'industriel' | 'particulier' | 'collectivite'

export interface Service {
  id: number
  nom: string
  description: string
  prix_base: number
  duree_estimee: number // en minutes
  image_url: string
  type: ServiceType
  actif: boolean
  icone?: string
}

export interface Client {
  id: number
  nom: string
  email: string
  telephone?: string
  adresse?: string
  latitude?: number
  longitude?: number
  type?: 'particulier' | 'entreprise' | 'collectivite'
  created_at: Date
}

export interface Reservation {
  id: number
  client_id: number
  service_id: number
  date_service: Date
  statut: 'attente' | 'confirmee' | 'en_cours' | 'terminee' | 'annulee'
  prix_final: number
  commentaires?: string
  adresse_intervention?: string
  surface?: number // en m²
  recurrence?: 'unique' | 'hebdomadaire' | 'bimensuelle' | 'mensuelle'
}

// Types pour le chatbot IA
export interface ChatMessage {
  id: string
  role: 'user' | 'assistant' | 'system'
  content: string
  timestamp: Date
  metadata?: {
    intent?: string
    confidence?: number
    suggested_actions?: string[]
  }
}

export interface ChatConversation {
  id: number
  client_id?: number
  session_id: string
  messages: ChatMessage[]
  resolu: boolean
  satisfaction?: number // 1-5
  created_at: Date
}

// Types pour le calendrier
export interface TimeSlot {
  date: Date
  heure_debut: string
  heure_fin: string
  disponible: boolean
  equipe_id?: number
}

export interface CalendarEvent {
  id: string
  title: string
  start: Date
  end: Date
  service: Service
  client: Client
  statut: Reservation['statut']
  couleur?: string
}

// Types pour les paiements
export interface Payment {
  id: string
  reservation_id: number
  montant: number
  methode: 'stripe' | 'paypal' | 'especes' | 'cheque'
  statut: 'en_attente' | 'complete' | 'echoue' | 'rembourse'
  transaction_id?: string
  created_at: Date
}

// Types pour les notifications
export interface Notification {
  id: number
  user_id: number
  type: 'rappel' | 'promotion' | 'status' | 'feedback'
  titre: string
  message: string
  lu: boolean
  envoye_at: Date
  clique?: boolean
}

// Types pour la géolocalisation
export interface GeoLocation {
  latitude: number
  longitude: number
  adresse: string
  ville?: string
  code_postal?: string
  distance?: number // en km depuis le siège
}

// Types pour les analytics
export interface Analytics {
  visites_site: number
  conversations_chat: number
  devis_generes: number
  conversions: number
  revenus: number
  nps_score?: number
  date: Date
}

// Types pour les formulaires
export interface ContactForm {
  nom: string
  email: string
  telephone?: string
  service?: string
  message: string
  consent_rgpd: boolean
}

export interface DevisForm extends ContactForm {
  adresse: string
  surface: number
  type_local: 'bureau' | 'commerce' | 'industrie' | 'maison' | 'appartement'
  frequence: 'unique' | 'hebdomadaire' | 'bimensuelle' | 'mensuelle'
  date_souhaitee?: Date
}

// Types pour les réponses API
export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: {
    code: string
    message: string
  }
  meta?: {
    page?: number
    total?: number
    per_page?: number
  }
}

// Types pour les configurations
export interface SiteConfig {
  name: string
  description: string
  url: string
  theme: {
    colors: {
      primary: string
      secondary: string
      accent: string
    }
  }
  contact: {
    email: string
    telephone: string
    adresse: string
  }
  social?: {
    facebook?: string
    instagram?: string
    linkedin?: string
  }
}

// Types utilitaires
export type Status = 'idle' | 'loading' | 'success' | 'error'

export interface PaginationParams {
  page: number
  limit: number
  sort?: string
  order?: 'asc' | 'desc'
}