import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
})

export async function POST(req: NextRequest) {
  try {
    const { paymentId, method } = await req.json()

    if (!paymentId || !method) {
      return NextResponse.json(
        { error: 'Paramètres manquants' },
        { status: 400 }
      )
    }

    let paymentStatus = {
      verified: false,
      status: 'unknown',
      amount: 0,
      currency: 'EUR',
      method: method,
      metadata: {}
    }

    if (method === 'stripe') {
      // Vérifier le paiement Stripe
      const paymentIntent = await stripe.paymentIntents.retrieve(paymentId)
      
      paymentStatus = {
        verified: paymentIntent.status === 'succeeded',
        status: paymentIntent.status,
        amount: paymentIntent.amount / 100, // Convertir de centimes en euros
        currency: paymentIntent.currency.toUpperCase(),
        method: 'stripe',
        metadata: paymentIntent.metadata
      }
    } else if (method === 'paypal') {
      // Pour PayPal, vérifier via leur API
      // Ici on fait une vérification simplifiée
      // En production, il faudrait appeler l'API PayPal pour vérifier
      paymentStatus = {
        verified: true, // À implémenter avec l'API PayPal
        status: 'completed',
        amount: 0, // À récupérer depuis PayPal
        currency: 'EUR',
        method: 'paypal',
        metadata: {}
      }
    }

    return NextResponse.json(paymentStatus)
  } catch (error: any) {
    console.error('Erreur vérification paiement:', error)
    return NextResponse.json(
      { error: error.message || 'Erreur lors de la vérification du paiement' },
      { status: 500 }
    )
  }
}

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams
  const paymentId = searchParams.get('paymentId')
  const method = searchParams.get('method')

  if (!paymentId || !method) {
    return NextResponse.json(
      { error: 'Paramètres manquants' },
      { status: 400 }
    )
  }

  // Rediriger vers POST avec les mêmes paramètres
  return POST(req)
}