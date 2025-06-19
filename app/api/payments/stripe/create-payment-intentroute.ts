import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
})

export async function POST(req: NextRequest) {
  try {
    const { amount, metadata = {} } = await req.json()

    // Validation du montant
    if (!amount || amount < 1) {
      return NextResponse.json(
        { error: 'Montant invalide' },
        { status: 400 }
      )
    }

    // Créer le PaymentIntent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Convertir en centimes
      currency: 'eur',
      automatic_payment_methods: {
        enabled: true,
      },
      metadata: {
        ...metadata,
        company: 'SB-Nettoyage',
        timestamp: new Date().toISOString()
      },
      description: 'Service de nettoyage professionnel - SB-Nettoyage',
      statement_descriptor: 'SB NETTOYAGE',
    })

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id
    })
  } catch (error: any) {
    console.error('Erreur Stripe:', error)
    return NextResponse.json(
      { error: error.message || 'Erreur lors de la création du paiement' },
      { status: 500 }
    )
  }
}