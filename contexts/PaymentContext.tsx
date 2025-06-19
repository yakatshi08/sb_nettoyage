'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { loadStripe, Stripe } from '@stripe/stripe-js'
import { PayPalScriptProvider } from '@paypal/react-paypal-js'
import { toast } from 'react-hot-toast'

interface PaymentContextType {
  stripe: Stripe | null
  isLoading: boolean
  processPayment: (amount: number, method: 'stripe' | 'paypal') => Promise<any>
  createPaymentIntent: (amount: number) => Promise<string | null>
}

const PaymentContext = createContext<PaymentContextType | undefined>(undefined)

export function PaymentProvider({ children }: { children: ReactNode }) {
  const [stripe, setStripe] = useState<Stripe | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const initStripe = async () => {
      try {
        const stripeInstance = await loadStripe(
          process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
        )
        setStripe(stripeInstance)
      } catch (error) {
        console.error('Erreur initialisation Stripe:', error)
        toast.error('Erreur lors du chargement du système de paiement')
      } finally {
        setIsLoading(false)
      }
    }

    initStripe()
  }, [])

  const createPaymentIntent = async (amount: number): Promise<string | null> => {
    try {
      const response = await fetch('/api/payments/stripe/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount })
      })

      if (!response.ok) {
        throw new Error('Erreur lors de la création du paiement')
      }

      const { clientSecret } = await response.json()
      return clientSecret
    } catch (error) {
      console.error('Erreur createPaymentIntent:', error)
      toast.error('Impossible de créer le paiement')
      return null
    }
  }

  const processPayment = async (amount: number, method: 'stripe' | 'paypal') => {
    setIsLoading(true)
    try {
      if (method === 'stripe') {
        const clientSecret = await createPaymentIntent(amount)
        return { success: true, clientSecret }
      } else if (method === 'paypal') {
        const response = await fetch('/api/payments/paypal/create-order', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ amount })
        })

        if (!response.ok) {
          throw new Error('Erreur PayPal')
        }

        const { orderID } = await response.json()
        return { success: true, orderID }
      }
    } catch (error) {
      console.error('Erreur processPayment:', error)
      toast.error('Erreur lors du traitement du paiement')
      return { success: false, error }
    } finally {
      setIsLoading(false)
    }
  }

  const paypalOptions = {
    'client-id': process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID!,
    currency: 'EUR',
    intent: 'capture',
    components: 'buttons,messages'
  }

  return (
    <PaymentContext.Provider value={{ stripe, isLoading, processPayment, createPaymentIntent }}>
      <PayPalScriptProvider options={paypalOptions}>
        {children}
      </PayPalScriptProvider>
    </PaymentContext.Provider>
  )
}

export function usePayment() {
  const context = useContext(PaymentContext)
  if (!context) {
    throw new Error('usePayment doit être utilisé dans PaymentProvider')
  }
  return context
}