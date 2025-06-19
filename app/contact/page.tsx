'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Send, 
  Building,
  MessageSquare,
  CheckCircle,
  Navigation,
  Globe,
  Users,
  X
} from 'lucide-react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import AnimatedButton from '@/components/ui/AnimatedButton'
import ChatbotWidget from '@/components/features/ChatbotWidget'

declare global {
  interface Window {
    google: any;
    grecaptcha: any;
  }
}

interface ContactFormData {
  nom: string
  email: string
  telephone: string
  entreprise?: string
  service: string
  message: string
  consent: boolean
}

const contactInfo = [
  {
    icon: MapPin,
    title: 'Adresse',
    content: 'Paris & Île-de-France',
    detail: 'Intervention dans toute la région'
  },
  {
    icon: Phone,
    title: 'Téléphone',
    content: '01 23 45 67 89',
    detail: 'Du lundi au samedi'
  },
  {
    icon: Mail,
    title: 'Email',
    content: 'contact@sb-nettoyage.com',
    detail: 'Réponse sous 24h'
  },
  {
    icon: Clock,
    title: 'Horaires',
    content: 'Lun-Ven: 8h-19h',
    detail: 'Sam: 9h-17h'
  }
]

const services = [
  'Nettoyage Commercial',
  'Nettoyage Industriel',
  'Nettoyage Particuliers',
  'Collectivités',
  'Devis personnalisé',
  'Autre demande'
]

const stats = [
  { icon: Building, value: '500+', label: 'Entreprises clientes' },
  { icon: Users, value: '2847+', label: 'Clients satisfaits' },
  { icon: Globe, value: '8', label: 'Départements couverts' },
  { icon: CheckCircle, value: '99%', label: 'Satisfaction client' }
]

export default function ContactPage() {
  const [isMapLoaded, setIsMapLoaded] = useState(false)
  const [userLocation, setUserLocation] = useState<{lat: number, lng: number} | null>(null)
  const [isLoadingLocation, setIsLoadingLocation] = useState(false)
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = useForm<ContactFormData>()

  // Charger Google Maps
  useEffect(() => {
    const loadGoogleMaps = () => {
      if (window.google && window.google.maps) {
        setIsMapLoaded(true)
        return
      }

      const script = document.createElement('script')
      script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`
      script.async = true
      script.defer = true
      script.onload = () => setIsMapLoaded(true)
      document.head.appendChild(script)
    }

    loadGoogleMaps()
  }, [])

  // Initialiser la carte
  useEffect(() => {
    if (isMapLoaded && typeof window !== 'undefined') {
      const mapElement = document.getElementById('map')
      if (mapElement) {
        const map = new window.google.maps.Map(mapElement, {
          center: { lat: 48.8566, lng: 2.3522 }, // Paris
          zoom: 12,
          styles: [
            {
              featureType: 'all',
              elementType: 'geometry',
              stylers: [{ color: '#f5f5f5' }]
            },
            {
              featureType: 'water',
              elementType: 'geometry',
              stylers: [{ color: '#c9c9c9' }]
            },
            {
              featureType: 'water',
              elementType: 'labels.text.fill',
              stylers: [{ color: '#9e9e9e' }]
            }
          ]
        })

        // Marqueur principal
        new window.google.maps.Marker({
          position: { lat: 48.8566, lng: 2.3522 },
          map,
          title: 'SB-Nettoyage',
          icon: {
            url: '/images/map-marker.png',
            scaledSize: new window.google.maps.Size(40, 40)
          }
        })

        // Si l'utilisateur partage sa position
        if (userLocation) {
          new window.google.maps.Marker({
            position: userLocation,
            map,
            title: 'Votre position',
            icon: {
              url: '/images/user-location.png',
              scaledSize: new window.google.maps.Size(30, 30)
            }
          })

          // Tracer une ligne entre les deux points
          new window.google.maps.Polyline({
            path: [userLocation, { lat: 48.8566, lng: 2.3522 }],
            geodesic: true,
            strokeColor: '#006400',
            strokeOpacity: 0.8,
            strokeWeight: 2,
            map
          })

          // Ajuster le zoom pour voir les deux points
          const bounds = new window.google.maps.LatLngBounds()
          bounds.extend(userLocation)
          bounds.extend({ lat: 48.8566, lng: 2.3522 })
          map.fitBounds(bounds)
        }
      }
    }
  }, [isMapLoaded, userLocation])

  // Obtenir la position de l'utilisateur
  const getUserLocation = useCallback(() => {
    setIsLoadingLocation(true)
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          })
          setIsLoadingLocation(false)
          toast.success('Position détectée avec succès !')
        },
        (error) => {
          setIsLoadingLocation(false)
          toast.error('Impossible d\'obtenir votre position')
          console.error('Erreur géolocalisation:', error)
        }
      )
    } else {
      setIsLoadingLocation(false)
      toast.error('La géolocalisation n\'est pas supportée par votre navigateur')
    }
  }, [])

  // Soumettre le formulaire
  const onSubmit = async (data: ContactFormData) => {
    try {
      // Vérifier reCAPTCHA v3
      if (window.grecaptcha) {
        const token = await window.grecaptcha.execute(
          process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!,
          { action: 'contact' }
        )
        
        // Envoyer le formulaire avec le token
        const response = await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...data, recaptchaToken: token })
        })

        if (response.ok) {
          toast.success('Message envoyé avec succès ! Nous vous répondrons sous 24h.')
          reset()
        } else {
          throw new Error('Erreur lors de l\'envoi')
        }
      }
    } catch (error) {
      toast.error('Une erreur est survenue. Veuillez réessayer.')
      console.error('Erreur:', error)
    }
  }

  return (
    <>
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-sb text-white">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center max-w-3xl mx-auto"
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white">
                Contactez-Nous
              </h1>
              <p className="text-xl mb-8 text-white/90">
                Notre équipe est à votre écoute pour répondre à toutes vos questions 
                et vous proposer des solutions adaptées à vos besoins.
              </p>
              
              <div className="flex flex-wrap justify-center gap-4">
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white/10 backdrop-blur-sm rounded-lg p-4 flex items-center gap-3"
                  >
                    <stat.icon className="w-8 h-8 text-sb-orange" />
                    <div className="text-left">
                      <p className="text-2xl font-bold text-white">{stat.value}</p>
                      <p className="text-sm text-white/80">{stat.label}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
          
          {/* Motif décoratif */}
          <div className="absolute bottom-0 left-0 right-0 h-20 bg-white"
            style={{
              clipPath: 'polygon(0 20px, 100% 0, 100% 100%, 0 100%)'
            }}
          />
        </section>

        {/* Section Contact Info + Formulaire */}
        <section className="section">
          <div className="container-custom">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Informations de contact */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <h2 className="text-3xl font-bold mb-8">Informations de Contact</h2>
                
                <div className="space-y-6 mb-8">
                  {contactInfo.map((info, index) => (
                    <motion.div
                      key={info.title}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                      className="flex items-start gap-4"
                    >
                      <div className="bg-sb-green/10 p-3 rounded-lg">
                        <info.icon className="w-6 h-6 text-sb-green" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">{info.title}</h3>
                        <p className="text-sb-gray-dark">{info.content}</p>
                        <p className="text-sm text-sb-gray-dark/70">{info.detail}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Carte Google Maps */}
                <div className="relative">
                  <div 
                    id="map" 
                    className="w-full h-80 rounded-xl shadow-lg bg-sb-gray-light"
                  />
                  
                  {/* Bouton géolocalisation */}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={getUserLocation}
                    disabled={isLoadingLocation}
                    className="absolute bottom-4 right-4 bg-white shadow-lg rounded-lg p-3 hover:bg-sb-gray-light transition-colors"
                  >
                    <Navigation className={`w-5 h-5 text-sb-green ${
                      isLoadingLocation ? 'animate-pulse' : ''
                    }`} />
                  </motion.button>
                </div>
              </motion.div>

              {/* Formulaire de contact */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-white rounded-xl shadow-lg p-8"
              >
                <h2 className="text-3xl font-bold mb-2">Envoyez-nous un Message</h2>
                <p className="text-sb-gray-dark mb-6">
                  Remplissez le formulaire ci-dessous et nous vous répondrons dans les plus brefs délais.
                </p>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Nom */}
                    <div>
                      <label className="label">
                        Nom complet <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        {...register('nom', { 
                          required: 'Le nom est requis',
                          minLength: { value: 2, message: 'Le nom doit contenir au moins 2 caractères' }
                        })}
                        className="input"
                        placeholder="Jean Dupont"
                      />
                      {errors.nom && (
                        <p className="text-red-500 text-sm mt-1">{errors.nom.message}</p>
                      )}
                    </div>

                    {/* Email */}
                    <div>
                      <label className="label">
                        Email <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        {...register('email', { 
                          required: 'L\'email est requis',
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: 'Email invalide'
                          }
                        })}
                        className="input"
                        placeholder="jean.dupont@exemple.com"
                      />
                      {errors.email && (
                        <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                      )}
                    </div>

                    {/* Téléphone */}
                    <div>
                      <label className="label">
                        Téléphone <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        {...register('telephone', { 
                          required: 'Le téléphone est requis',
                          pattern: {
                            value: /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/,
                            message: 'Numéro de téléphone invalide'
                          }
                        })}
                        className="input"
                        placeholder="06 12 34 56 78"
                      />
                      {errors.telephone && (
                        <p className="text-red-500 text-sm mt-1">{errors.telephone.message}</p>
                      )}
                    </div>

                    {/* Entreprise */}
                    <div>
                      <label className="label">
                        Entreprise (optionnel)
                      </label>
                      <input
                        type="text"
                        {...register('entreprise')}
                        className="input"
                        placeholder="Nom de votre entreprise"
                      />
                    </div>
                  </div>

                  {/* Service */}
                  <div>
                    <label className="label">
                      Service concerné <span className="text-red-500">*</span>
                    </label>
                    <select
                      {...register('service', { required: 'Veuillez sélectionner un service' })}
                      className="input"
                    >
                      <option value="">Sélectionnez un service</option>
                      {services.map((service) => (
                        <option key={service} value={service}>
                          {service}
                        </option>