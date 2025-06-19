import { NextRequest, NextResponse } from 'next/server'

const PAYPAL_API_URL = process.env.NODE_ENV === 'production'
  ? 'https://api-m.paypal.com'
  : 'https://api-m.sandbox.paypal.com'

async function getAccessToken() {
  const auth = Buffer.from(
    `${process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID}:${process.env.PAYPAL_SECRET}`
  ).toString('base64')

  const response = await fetch(`${PAYPAL_API_URL}/v1/oauth2/token`, {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${auth}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'grant_type=client_credentials',
  })

  const data = await response.json()
  return data.access_token
}

export async function POST(req: NextRequest) {
  try {
    const { amount, metadata = {} } = await req.json()

    // Validation
    if (!amount || amount < 1) {
      return NextResponse.json(
        { error: 'Montant invalide' },
        { status: 400 }
      )
    }

    // Obtenir le token d'accès
    const accessToken = await getAccessToken()

    // Créer la commande PayPal
    const order = {
      intent: 'CAPTURE',
      purchase_units: [{
        reference_id: `SB-${Date.now()}`,
        description: 'Service de nettoyage professionnel - SB-Nettoyage',
        amount: {
          currency_code: 'EUR',
          value: amount.toFixed(2),
        },
        payee: {
          merchant_id: process.env.PAYPAL_MERCHANT_ID
        }
      }],
      application_context: {
        brand_name: 'SB-Nettoyage',
        landing_page: 'NO_PREFERENCE',
        user_action: 'PAY_NOW',
        return_url: `${process.env.NEXT_PUBLIC_SITE_URL}/payment/success`,
        cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/payment/cancel`,
      }
    }

    const response = await fetch(`${PAYPAL_API_URL}/v2/checkout/orders`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(order),
    })

    const orderData = await response.json()

    if (!response.ok) {
      throw new Error(orderData.message || 'Erreur PayPal')
    }

    return NextResponse.json({
      orderID: orderData.id,
      status: orderData.status
    })
  } catch (error: any) {
    console.error('Erreur PayPal:', error)
    return NextResponse.json(
      { error: error.message || 'Erreur lors de la création de la commande PayPal' },
      { status: 500 }
    )
  }
}