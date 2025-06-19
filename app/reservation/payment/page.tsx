'use client'

import { useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { ArrowLeft, CreditCard } from 'lucide-react'
import Link from 'next/link'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import PaymentForm from '@/components/payment/PaymentForm'
import AnimatedButton from '@/components/ui/AnimatedButton'
import { toast } from 'react-hot-toast'

export default function ReservationPaymentPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  
  // Récupérer les paramètres de l'URL
  const service = searchParams.get('service') || 'Nettoyage Commercial'
  const date = searchParams.get('date') || new Date().toISOString()
  const address = searchParams.get('address') || ''
  const surface = parseInt(searchParams.get('surface') || '100')
  const price = parseFloat(searchParams.get('price') || '150')

  const handlePaymentSuccess = async (paymentDetails: any) => {
    try {
      // Créer la réservation avec les détails du paiement
      const response = await fetch('/api/reservations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          service,
          date_service: date,
          adresse_intervention: address,
          surface,
          prix_final: price,
          payment_details: paymentDetails,
          statut: 'confirmee'
        })
      })

      if (response.ok) {
        const reservation = await response.json()
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

  const handleCancel = () => {
    router.back()
  }

  return (
    <>
      <Header />
      
      <main className="min-h-screen bg-gray-50 py-12">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto"
          >
            {/* Breadcrumb */}
            <nav className="mb-8">
              <ol className="flex items-center space-x-2 text-sm">
                <li>
                  <Link href="/" className="text-sb-gray-dark hover:text-sb-green">
                    Accueil
                  </Link>
                </li>
                <li className="text-sb-gray-dark">/</li>
                <li>
                  <Link href="/reservation" className="text-sb-gray-dark hover:text-sb-green">
                    Réservation
                  </Link>
                </li>
                <li className="text-sb-gray-dark">/</li>
                <li className="text-sb-green font-medium">Paiement</li>
              </ol>
            </nav>

            {/* Titre */}
            <div className="text-center mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-sb-green mb-2">
                Finaliser votre réservation
              </h1>
              <p className="text-lg text-sb-gray-dark">
                Dernière étape : procédez au paiement sécurisé
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Colonne principale - Formulaire de paiement */}
              <div className="lg:col-span-2">
                <PaymentForm
                  amount={price}
                  serviceDetails={{
                    service,
                    date: new Date(date).toLocaleDateString('fr-FR', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    }),
                    address
                  }}
                  onSuccess={handlePaymentSuccess}
                  onCancel={handleCancel}
                />
              </div>

              {/* Colonne latérale - Récapitulatif */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-xl shadow-lg p-6 sticky top-24">
                  <h3 className="font-semibold text-lg mb-4">Votre réservation</h3>
                  
                  <div className="space-y-3 text-sm">
                    <div className="pb-3 border-b border-sb-gray-border">
                      <p className="text-sb-gray-dark">Service</p>
                      <p className="font-medium">{service}</p>
                    </div>
                    
                    <div className="pb-3 border-b border-sb-gray-border">
                      <p className="text-sb-gray-dark">Date d'intervention</p>
                      <p className="font-medium">
                        {new Date(date).toLocaleDateString('fr-FR', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </p>
                    </div>
                    
                    <div className="pb-3 border-b border-sb-gray-border">
                      <p className="text-sb-gray-dark">Adresse</p>
                      <p className="font-medium">{address}</p>
                    </div>
                    
                    <div className="pb-3 border-b border-sb-gray-border">
                      <p className="text-sb-gray-dark">Surface</p>
                      <p className="font-medium">{surface} m²</p>
                    </div>
                    
                    <div className="pt-3">
                      <div className="flex justify-between items-center mb-4">
                        <p className="font-semibold">Total TTC</p>
                        <p className="text-2xl font-bold text-sb-green">{price.toFixed(2)}€</p>
                      </div>
                      
                      <div className="bg-sb-green/10 rounded-lg p-3">
                        <p className="text-xs text-sb-green">
                          ✓ Annulation gratuite jusqu'à 24h avant<br />
                          ✓ Paiement 100% sécurisé<br />
                          ✓ Facture envoyée par email
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Bouton retour */}
                  <button
                    onClick={handleCancel}
                    className="mt-6 w-full flex items-center justify-center gap-2 text-sm text-sb-gray-dark hover:text-sb-green transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Modifier ma réservation
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
      
      <Footer />
    </>
  )
}