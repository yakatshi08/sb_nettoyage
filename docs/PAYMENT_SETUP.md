# 💳 Guide de Configuration des Paiements - SB-Nettoyage

## 📋 Configuration Stripe

### 1. Créer un compte Stripe
1. Aller sur [https://stripe.com](https://stripe.com)
2. Créer un compte business
3. Remplir les informations de l'entreprise

### 2. Récupérer les clés API
1. Dans le Dashboard Stripe, aller dans **Developers > API keys**
2. Copier la **Publishable key** (commence par `pk_`)
3. Copier la **Secret key** (commence par `sk_`)

### 3. Configurer les webhooks (optionnel mais recommandé)
1. Dans **Developers > Webhooks**
2. Ajouter un endpoint : `https://votre-domaine.com/api/payments/stripe/webhook`
3. Sélectionner les événements :
   - `payment_intent.succeeded`
   - `payment_intent.payment_failed`
4. Copier le **Webhook secret** (commence par `whsec_`)

### 4. Ajouter les clés dans `.env.local`
```env
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...