'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  PaymentElement,
  Elements,
  useStripe,
  useElements
} from '@stripe/react-stripe-js'
import { usePayment } from '@/contexts/PaymentContext'
import AnimatedButton from '@/components/ui/AnimatedButton'
import { CreditCard, Lock } from 'lucide-react'

interface StripeCheckoutFormProps {
  amount: number
  onSuccess: (paymentIntent: any) => void
  onProcessing: (isProcessing: boolean) => void
}

function CheckoutForm({ amount, onSuccess, onProcessing }: StripeCheckoutFormProps) {
  const stripe = useStripe()
  const elements = useElements()
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!stripe || !elements) {
      return
    }

    setIsLoading(true)
    onProcessing(true)

    try {
      const { error: submitError, paymentIntent } = await stripe.confirmPayment({
        elements,
        redirect: 'if_required',
      })

      if (submitError) {
        setError(submitError.message || 'Une erreur est survenue')
        setIsLoading(false)
        onProcessing(false)
      } else if (paymentIntent && paymentIntent.status === 'succeeded') {
        onSuccess(paymentIntent)
      }
    } catch (err) {
      console.error('Erreur paiement:', err)
      setError('Erreur lors du traitement du paiement')
      setIsLoading(false)
      onProcessing(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-6">
        <PaymentElement 
          options={{
            layout: 'tabs',
            defaultValues: {
              billingDetails: {
                email: '',
                phone: '',
                address: {
                  country: 'FR',
                }
              }
            }
          }}
        />
      </div>

      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm"
        >
          {error}
        </motion.div>
      )}

      <AnimatedButton
        type="submit"
        variant="primary"
        size="lg"
        fullWidth
        icon={Lock}
        loading={isLoading}
        disabled={!stripe || isLoading}
      >
        {isLoading ? 'Traitement...' : `Payer ${amount.toFixed(2)}€`}
      </AnimatedButton>

      <div className="mt-4 flex items-center justify-center gap-4 text-xs text-sb-gray-dark">
        <div className="flex items-center gap-1">
          <CreditCard className="w-4 h-4" />
          <span>Paiement sécurisé</span>
        </div>
        <div className="flex items-center gap-1">
          <Lock className="w-4 h-4" />
          <span>SSL/TLS</span>
        </div>
      </div>
    </form>
  )
}

export default function StripeCheckoutForm(props: StripeCheckoutFormProps) {
  const { stripe, createPaymentIntent } = usePayment()
  const [clientSecret, setClientSecret] = useState<string | null>(null)

  useEffect(() => {
    const initPayment = async () => {
      const secret = await createPaymentIntent(props.amount)
      if (secret) {
        setClientSecret(secret)
      }
    }
    
    initPayment()
  }, [props.amount, createPaymentIntent])

  if (!clientSecret || !stripe) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-sb-green" />
      </div>
    )
  }

  return (
    <Elements
      stripe={stripe}
      options={{
        clientSecret,
        appearance: {
          theme: 'stripe',
          variables: {
            colorPrimary: '#006400',
            colorBackground: '#ffffff',
            colorText: '#424242',
            colorDanger: '#dc2626',
            fontFamily: 'Inter, system-ui, sans-serif',
            borderRadius: '8px',
          },
        },
        locale: 'fr',
      }}
    >
      <CheckoutForm {...props} />
    </Elements>
  )
}