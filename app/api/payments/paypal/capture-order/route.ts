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
    const { orderID } = await req.json()

    if (!orderID) {
      return NextResponse.json(
        { error: 'ID de commande manquant' },
        { status: 400 }
      )
    }

    // Obtenir le token d'accès
    const accessToken = await getAccessToken()

    // Capturer le paiement
    const response = await fetch(
      `${PAYPAL_API_URL}/v2/checkout/orders/${orderID}/capture`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      }
    )

    const captureData = await response.json()

    if (!response.ok) {
      throw new Error(captureData.message || 'Erreur capture PayPal')
    }

    // Vérifier le statut
    if (captureData.status !== 'COMPLETED') {
      throw new Error('Le paiement n\'a pas été complété')
    }

    // Extraire les informations importantes
    const purchase = captureData.purchase_units[0]
    const capture = purchase.payments.captures[0]

    return NextResponse.json({
      success: true,
      orderID: captureData.id,
      status: captureData.status,
      transactionId: capture.id,
      amount: capture.amount.value,
      currency: capture.amount.currency_code,
      payer: {
        email: captureData.payer?.email_address,
        name: captureData.payer?.name?.given_name + ' ' + captureData.payer?.name?.surname
      }
    })
  } catch (error: any) {
    console.error('Erreur capture PayPal:', error)
    return NextResponse.json(
      { error: error.message || 'Erreur lors de la capture du paiement PayPal' },
      { status: 500 }
    )
  }
}