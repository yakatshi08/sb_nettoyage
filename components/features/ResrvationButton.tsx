'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Calendar, CreditCard } from 'lucide-react'
import AnimatedButton from '@/components/ui/AnimatedButton'
import PaymentModal from '@/components/payment/PaymentModal'
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/navigation'

interface ReservationButtonProps {
  service: {
    id: number
    nom: string
    prix_base: number
  }
  date: string
  surface: number
  address: string
  className?: string
}

export default function ReservationButton({
  service,
  date,
  surface,
  address,
  className = ''
}: ReservationButtonProps) {
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false)
  const router = useRouter()

  // Calculer le prix total
  const calculatePrice = () => {
    const basePrice = service.prix_base
    const surfaceMultiplier = Math.ceil(surface / 50) // Prix par tranche de 50m²
    return basePrice * surfaceMultiplier
  }

  const totalPrice = calculatePrice()

  const handleReservation = () => {
    // Validation
    if (!date || !address || !surface) {
      toast.error('Veuillez remplir tous les champs requis')
      return
    }

    // Ouvrir le modal de paiement
    setIsPaymentModalOpen(true)
  }

  const handlePaymentSuccess = async (paymentDetails: any) => {
    try {
      // Créer la réservation en base de données
      const response = await fetch('/api/reservations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          service_id: service.id,
          date_service: date,
          adresse_intervention: address,
          surface,
          prix_final: totalPrice,
          payment_details: paymentDetails
        })
      })

      if (response.ok) {
        const reservation = await response.json()
        toast.success('Réservation confirmée ! Vous allez recevoir un email de confirmation.')
        
        // Rediriger vers la page de succès
        router.push(`/payment/success?reservation=${reservation.id}`)
      } else {
        throw new Error('Erreur lors de la création de la réservation')
      }
    } catch (error) {
      console.error('Erreur:', error)
      toast.error('Une erreur est survenue. Votre paiement sera remboursé.')
    }
  }

  return (
    <>
      <motion.div className={className}>
        <AnimatedButton
          variant="primary"
          size="lg"
          icon={CreditCard}
          onClick={handleReservation}
          fullWidth
        >
          Réserver et Payer ({totalPrice.toFixed(2)}€)
        </AnimatedButton>
        
        <p className="text-xs text-center text-sb-gray-dark mt-2">
          Paiement sécurisé • Annulation gratuite jusqu'à 24h avant
        </p>
      </motion.div>

      <PaymentModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        amount={totalPrice}
        serviceDetails={{
          service: service.nom,
          date: new Date(date).toLocaleDateString('fr-FR', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          }),
          address
        }}
        onSuccess={handlePaymentSuccess}
      />
    </>
  )
}