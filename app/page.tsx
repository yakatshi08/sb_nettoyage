'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { 
  Building2, 
  Factory, 
  Home, 
  Building,
  CheckCircle,
  Star,
  Users,
  Clock,
  Shield,
  Award,
  ArrowRight,
  Play,
  MessageCircle
} from 'lucide-react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import AnimatedButton from '@/components/ui/AnimatedButton'
import StatsCounter from '@/components/ui/StatsCounter'
import ServiceCard from '@/components/features/ServiceCard'
import TestimonialCard from '@/components/features/TestimonialCard'
import ChatbotWidget from '@/components/features/ChatbotWidget'

const services = [
  {
    id: 1,
    title: 'Nettoyage Commercial',
    description: 'Services adaptés pour bureaux, commerces et espaces professionnels',
    icon: Building2,
    image: '/images/services/commercial.jpg',
    link: '/services/commercial',
    color: 'green'
  },
  {
    id: 2,
    title: 'Nettoyage Industriel',
    description: 'Solutions spécialisées pour usines, ateliers et sites industriels',
    icon: Factory,
    image: '/images/services/industriel.jpg',
    link: '/services/industriel',
    color: 'orange'
  },
  {
    id: 3,
    title: 'Nettoyage Particuliers',
    description: 'Services personnalisés pour maisons et appartements',
    icon: Home,
    image: '/images/services/particuliers.jpg',
    link: '/services/particuliers',
    color: 'green'
  },
  {
    id: 4,
    title: 'Collectivités',
    description: 'Prestations pour administrations, écoles et hôpitaux',
    icon: Building,
    image: '/images/services/collectivites.jpg',
    link: '/services/collectivites',
    color: 'orange'
  }
]

const testimonials = [
  {
    id: 1,
    name: 'Marie Dupont',
    role: 'Directrice, TechCorp',
    content: 'Service impeccable ! L\'équipe est professionnelle et le système de réservation en ligne est très pratique.',
    rating: 5,
    image: '/images/testimonials/1.jpg'
  },
  {
    id: 2,
    name: 'Jean Martin',
    role: 'Gestionnaire d\'immeuble',
    content: 'Nous travaillons avec SB-Nettoyage depuis 2 ans. Leur chatbot IA nous fait gagner un temps précieux.',
    rating: 5,
    image: '/images/testimonials/2.jpg'
  },
  {
    id: 3,
    name: 'Sophie Bernard',
    role: 'Particulier',
    content: 'Je recommande vivement ! Le devis automatique est transparent et le service est de qualité.',
    rating: 5,
    image: '/images/testimonials/3.jpg'
  }
]

const stats = [
  { label: 'Clients Satisfaits', value: 2847, suffix: '+' },
  { label: 'm² Nettoyés', value: 150000, suffix: '' },
  { label: 'Années d\'Expérience', value: 15, suffix: '' },
  { label: 'Équipes Professionnelles', value: 50, suffix: '+' }
]

export default function HomePage() {
  return (
    <>
      <Header />
      
      <main>
        {/* Hero Section avec vidéo de fond */}
        <section className="relative h-screen flex items-center justify-center overflow-hidden">
          {/* Vidéo de fond */}
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src="/videos/hero-background.webm" type="video/webm" />
            <source src="/videos/hero-background.mp4" type="video/mp4" />
          </video>
          
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-sb-green/80 to-sb-green/40" />
          
          {/* Contenu */}
          <div className="relative z-10 container-custom text-center text-white">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-white">
                Services de Nettoyage
                <span className="block text-sb-orange mt-2">Professionnels avec IA</span>
              </h1>
              
              <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
                Premier site du secteur avec assistant IA 24/7. 
                Réservation en ligne, devis automatique et paiement sécurisé.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <AnimatedButton
                  variant="primary"
                  size="lg"
                  icon={ArrowRight}
                  iconPosition="right"
                >
                  <Link href="/reservation">Réserver Maintenant</Link>
                </AnimatedButton>
                
                <AnimatedButton
                  variant="secondary"
                  size="lg"
                  icon={MessageCircle}
                >
                  <Link href="/devis">Devis Gratuit Instantané</Link>
                </AnimatedButton>
              </div>
            </motion.div>
            
            {/* Bouton scroll */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.5 }}
              className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
            >
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="w-6 h-10 border-2 border-white rounded-full flex justify-center"
              >
                <div className="w-1 h-3 bg-white rounded-full mt-2" />
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Section Statistiques */}
        <section className="section bg-sb-gray-light/30">
          <div className="container-custom">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <StatsCounter
                    value={stat.value}
                    suffix={stat.suffix}
                    label={stat.label}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Section Services */}
        <section className="section">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Nos Services
              </h2>
              <p className="text-xl text-sb-gray-dark max-w-2xl mx-auto">
                Des solutions de nettoyage adaptées à tous vos besoins, 
                avec la garantie d'un service professionnel et de qualité.
              </p>
            </motion.div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {services.map((service, index) => (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <ServiceCard {...service} />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Section Avantages */}
        <section className="section bg-gradient-sb text-white">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
                Pourquoi Choisir SB-Nettoyage ?
              </h2>
              <p className="text-xl opacity-90 max-w-2xl mx-auto">
                Une approche innovante du nettoyage professionnel
              </p>
            </motion.div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: MessageCircle,
                  title: 'Assistant IA 24/7',
                  description: 'Premier chatbot IA du secteur pour répondre à toutes vos questions instantanément'
                },
                {
                  icon: Clock,
                  title: 'Réservation en 3 clics',
                  description: 'Système de réservation ultra-simple avec calendrier interactif'
                },
                {
                  icon: Shield,
                  title: 'Paiement Sécurisé',
                  description: 'Transactions protégées avec Stripe et PayPal'
                },
                {
                  icon: Award,
                  title: 'Certifié Qualité',
                  description: 'Normes ISO et certifications environnementales'
                },
                {
                  icon: Users,
                  title: 'Équipes Formées',
                  description: 'Personnel qualifié et régulièrement formé'
                },
                {
                  icon: CheckCircle,
                  title: 'Satisfaction Garantie',
                  description: 'Service garanti ou remboursé sous 24h'
                }
              ].map((advantage, index) => (
                <motion.div
                  key={advantage.title}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center"
                >
                  <advantage.icon className="w-12 h-12 text-sb-orange mx-auto mb-4" />
                  <h3 className="text-xl font-bold mb-2 text-white">{advantage.title}</h3>
                  <p className="text-white/80">{advantage.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Section Témoignages */}
        <section className="section">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Ils Nous Font Confiance
              </h2>
              <p className="text-xl text-sb-gray-dark max-w-2xl mx-auto">
                Découvrez les avis de nos clients satisfaits
              </p>
            </motion.div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <TestimonialCard {...testimonial} />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Section CTA finale */}
        <section className="section bg-sb-gray-light/30">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 text-center"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Prêt à Transformer Votre Espace ?
              </h2>
              <p className="text-xl text-sb-gray-dark mb-8 max-w-2xl mx-auto">
                Obtenez un devis gratuit en moins de 2 minutes grâce à notre assistant IA
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <AnimatedButton
                  variant="primary"
                  size="lg"
                  icon={ArrowRight}
                  iconPosition="right"
                >
                  <Link href="/devis">Obtenir un Devis</Link>
                </AnimatedButton>
                
                <AnimatedButton
                  variant="outline"
                  size="lg"
                  icon={Play}
                >
                  <Link href="/demo">Voir la Démo</Link>
                </AnimatedButton>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      
      <Footer />
      <ChatbotWidget />
    </>
  )
}