'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { CreditCard, Euro, Shield, Check } from 'lucide-react'
import { PayPalButtons } from '@paypal/react-paypal-js'
import { usePayment } from '@/contexts/PaymentContext'
import StripeCheckoutForm from './StripeCheckoutForm'
import AnimatedButton from '@/components/ui/AnimatedButton'
import { toast } from 'react-hot-toast'

interface PaymentFormProps {
  amount: number
  serviceDetails: {
    service: string
    date: string
    address: string
  }
  onSuccess: (paymentDetails: any) => void
  onCancel?: () => void
}

export default function PaymentForm({ 
  amount, 
  serviceDetails, 
  onSuccess,
  onCancel 
}: PaymentFormProps) {
  const [paymentMethod, setPaymentMethod] = useState<'stripe' | 'paypal'>('stripe')
  const [isProcessing, setIsProcessing] = useState(false)
  const { processPayment } = usePayment()

  const handlePayPalSuccess = async (data: any) => {
    try {
      const response = await fetch('/api/payments/paypal/capture-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderID: data.orderID })
      })

      if (response.ok) {
        const result = await response.json()
        toast.success('Paiement PayPal réussi !')
        onSuccess({ method: 'paypal', ...result })
      } else {
        throw new Error('Erreur capture PayPal')
      }
    } catch (error) {
      console.error('Erreur PayPal:', error)
      toast.error('Erreur lors du paiement PayPal')
    }
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      {/* Récapitulatif */}
      <div className="mb-6 p-4 bg-sb-gray-light/30 rounded-lg">
        <h3 className="font-semibold text-lg mb-3">Récapitulatif de votre commande</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-sb-gray-dark">Service :</span>
            <span className="font-medium">{serviceDetails.service}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sb-gray-dark">Date :</span>
            <span className="font-medium">{serviceDetails.date}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sb-gray-dark">Adresse :</span>
            <span className="font-medium text-right max-w-[200px]">{serviceDetails.address}</span>
          </div>
          <div className="border-t pt-2 mt-2">
            <div className="flex justify-between items-center">
              <span className="font-semibold">Total :</span>
              <span className="text-2xl font-bold text-sb-green">{amount.toFixed(2)}€</span>
            </div>
          </div>
        </div>
      </div>

      {/* Sélection mode de paiement */}
      <div className="mb-6">
        <h3 className="font-semibold text-lg mb-3">Mode de paiement</h3>
        <div className="grid grid-cols-2 gap-3">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setPaymentMethod('stripe')}
            className={`p-4 rounded-lg border-2 transition-all ${
              paymentMethod === 'stripe'
                ? 'border-sb-green bg-sb-green/5'
                : 'border-sb-gray-border hover:border-sb-gray-dark'
            }`}
          >
            <CreditCard className="w-6 h-6 mx-auto mb-2 text-sb-green" />
            <p className="font-medium">Carte bancaire</p>
            <p className="text-xs text-sb-gray-dark mt-1">CB, Visa, Mastercard</p>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setPaymentMethod('paypal')}
            className={`p-4 rounded-lg border-2 transition-all ${
              paymentMethod === 'paypal'
                ? 'border-sb-green bg-sb-green/5'
                : 'border-sb-gray-border hover:border-sb-gray-dark'
            }`}
          >
            <div className="w-6 h-6 mx-auto mb-2 bg-[#003087] text-white rounded flex items-center justify-center text-xs font-bold">
              PP
            </div>
            <p className="font-medium">PayPal</p>
            <p className="text-xs text-sb-gray-dark mt-1">Paiement express</p>
          </motion.button>
        </div>
      </div>

      {/* Formulaire de paiement */}
      <div className="mb-6">
        {paymentMethod === 'stripe' ? (
          <StripeCheckoutForm
            amount={amount}
            onSuccess={(paymentIntent) => {
              toast.success('Paiement réussi !')
              onSuccess({ method: 'stripe', paymentIntent })
            }}
            onProcessing={setIsProcessing}
          />
        ) : (
          <div className="p-4 bg-sb-gray-light/30 rounded-lg">
            <PayPalButtons
              style={{ layout: 'vertical' }}
              disabled={isProcessing}
              createOrder={async (data, actions) => {
                const result = await processPayment(amount, 'paypal')
                if (result.success) {
                  return result.orderID
                }
                throw new Error('Erreur création commande PayPal')
              }}
              onApprove={handlePayPalSuccess}
              onError={(err) => {
                console.error('Erreur PayPal:', err)
                toast.error('Erreur lors du paiement PayPal')
              }}
            />
          </div>
        )}
      </div>

      {/* Sécurité */}
      <div className="flex items-center justify-center gap-2 text-sm text-sb-gray-dark mb-4">
        <Shield className="w-4 h-4" />
        <span>Paiement 100% sécurisé - SSL/TLS</span>
      </div>

      {/* Bouton annuler */}
      {onCancel && (
        <button
          onClick={onCancel}
          className="w-full text-center text-sm text-sb-gray-dark hover:text-sb-green transition-colors"
        >
          Annuler et revenir
        </button>
      )}
    </div>
  )
}