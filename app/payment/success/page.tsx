'use client'

import { useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import confetti from 'canvas-confetti'
import { 
  CheckCircle, 
  Download, 
  Mail, 
  Calendar,
  MapPin,
  Clock,
  ArrowRight,
  Home
} from 'lucide-react'
import Link from 'next/link'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import AnimatedButton from '@/components/ui/AnimatedButton'
import { toast } from 'react-hot-toast'

interface ReservationDetails {
  id: number
  service: string
  date: string
  time: string
  address: string
  price: number
  paymentMethod: string
  confirmationNumber: string
}

export default function PaymentSuccessPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [reservation, setReservation] = useState<ReservationDetails | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Lancer les confettis
    const launchConfetti = () => {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#006400', '#FFA500', '#FFFFFF']
      })
    }

    // Récupérer les détails de la réservation
    const fetchReservationDetails = async () => {
      const reservationId = searchParams.get('reservation')
      
      if (!reservationId) {
        router.push('/')
        return
      }

      try {
        // Simuler la récupération des données
        // En production, faire un appel API réel
        const mockReservation: ReservationDetails = {
          id: parseInt(reservationId),
          service: 'Nettoyage Commercial',
          date: new Date().toLocaleDateString('fr-FR', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          }),
          time: '14:00',
          address: '123 rue de la Paix, 75001 Paris',
          price: 150.00,
          paymentMethod: 'Carte bancaire',
          confirmationNumber: `SB-${Date.now().toString().slice(-8)}`
        }

        setReservation(mockReservation)
        setTimeout(launchConfetti, 500)
      } catch (error) {
        console.error('Erreur:', error)
        toast.error('Erreur lors de la récupération de la réservation')
        router.push('/')
      } finally {
        setIsLoading(false)
      }
    }

    fetchReservationDetails()
  }, [searchParams, router])

  const downloadInvoice = async () => {
    if (!reservation) return

    try {
      // En production, générer un vrai PDF
      toast.success('Facture téléchargée avec succès')
    } catch (error) {
      toast.error('Erreur lors du téléchargement de la facture')
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sb-green" />
      </div>
    )
  }

  if (!reservation) {
    return null
  }

  return (
    <>
      <Header />
      
      <main className="min-h-screen bg-gradient-to-b from-sb-green/5 to-white py-20">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl mx-auto"
          >
            {/* Icône de succès animée */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", duration: 0.8 }}
              className="w-32 h-32 mx-auto mb-8 bg-sb-green rounded-full flex items-center justify-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3 }}
              >
                <CheckCircle className="w-20 h-20 text-white" />
              </motion.div>
            </motion.div>

            {/* Message de succès */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-center mb-12"
            >
              <h1 className="text-4xl md:text-5xl font-bold text-sb-green mb-4">
                Paiement Réussi !
              </h1>
              <p className="text-xl text-sb-gray-dark">
                Votre réservation a été confirmée avec succès
              </p>
              <p className="text-lg font-semibold text-sb-orange mt-2">
                N° de confirmation : {reservation.confirmationNumber}
              </p>
            </motion.div>

            {/* Détails de la réservation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="bg-white rounded-2xl shadow-lg p-8 mb-8"
            >
              <h2 className="text-2xl font-bold mb-6">Détails de votre réservation</h2>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="bg-sb-green/10 p-2 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-sb-green" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold">Service réservé</p>
                    <p className="text-sb-gray-dark">{reservation.service}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="bg-sb-green/10 p-2 rounded-lg">
                    <Calendar className="w-5 h-5 text-sb-green" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold">Date et heure</p>
                    <p className="text-sb-gray-dark">{reservation.date} à {reservation.time}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="bg-sb-green/10 p-2 rounded-lg">
                    <MapPin className="w-5 h-5 text-sb-green" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold">Adresse d'intervention</p>
                    <p className="text-sb-gray-dark">{reservation.address}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="bg-sb-green/10 p-2 rounded-lg">
                    <Mail className="w-5 h-5 text-sb-green" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold">Confirmation envoyée par email</p>
                    <p className="text-sb-gray-dark">Vérifiez votre boîte de réception</p>
                  </div>
                </div>

                <div className="border-t pt-4 mt-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-semibold">Montant payé</p>
                      <p className="text-sm text-sb-gray-dark">{reservation.paymentMethod}</p>
                    </div>
                    <p className="text-2xl font-bold text-sb-green">
                      {reservation.price.toFixed(2)}€
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <AnimatedButton
                variant="primary"
                icon={Download}
                onClick={downloadInvoice}
              >
                Télécharger la facture
              </AnimatedButton>
              
              <AnimatedButton
                variant="outline"
                icon={Calendar}
              >
                <Link href="/espace-client">
                  Voir mes réservations
                </Link>
              </AnimatedButton>
              
              <AnimatedButton
                variant="ghost"
                icon={Home}
              >
                <Link href="/">
                  Retour à l'accueil
                </Link>
              </AnimatedButton>
            </motion.div>

            {/* Informations supplémentaires */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1 }}
              className="mt-12 p-6 bg-sb-orange/10 rounded-xl"
            >
              <div className="flex items-start gap-3">
                <Clock className="w-6 h-6 text-sb-orange flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold text-sb-orange mb-1">
                    Rappel important
                  </p>
                  <p className="text-sm text-sb-gray-dark">
                    Notre équipe arrivera à l'heure convenue. Assurez-vous qu'une personne 
                    soit présente pour donner accès aux locaux. En cas d'empêchement, 
                    vous pouvez annuler ou reporter votre réservation jusqu'à 24h avant 
                    l'intervention sans frais.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Contact support */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.3 }}
              className="text-center mt-8 text-sm text-sb-gray-dark"
            >
              <p>
                Besoin d'aide ? Contactez notre support au{' '}
                <a href="tel:0123456789" className="text-sb-green font-semibold hover:underline">
                  01 23 45 67 89
                </a>{' '}
                ou par email à{' '}
                <a href="mailto:support@sb-nettoyage.com" className="text-sb-green font-semibold hover:underline">
                  support@sb-nettoyage.com
                </a>
              </p>
            </motion.div>
          </motion.div>
        </div>
      </main>
      
      <Footer />
    </>
  )
}