'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { 
  Building2, 
  Factory, 
  Home, 
  Building,
  CheckCircle,
  Clock,
  Euro,
  ChevronRight,
  Filter,
  Grid,
  List,
  ArrowRight,
  Calendar,
  Star
} from 'lucide-react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import AnimatedButton from '@/components/ui/AnimatedButton'
import ChatbotWidget from '@/components/features/ChatbotWidget'

const servicesData = [
  {
    id: 1,
    slug: 'commercial',
    title: 'Nettoyage Commercial',
    description: 'Solutions complètes pour bureaux, commerces et espaces professionnels',
    icon: Building2,
    color: 'green',
    image: '/images/services/commercial-full.jpg',
    price: 'À partir de 25€/h',
    duration: '2-4h selon surface',
    features: [
      'Nettoyage des bureaux et open-spaces',
      'Entretien des espaces communs',
      'Désinfection des sanitaires',
      'Gestion des déchets',
      'Nettoyage des vitres',
      'Traitement des sols'
    ],
    gallery: [
      { before: '/images/gallery/commercial-before-1.jpg', after: '/images/gallery/commercial-after-1.jpg' },
      { before: '/images/gallery/commercial-before-2.jpg', after: '/images/gallery/commercial-after-2.jpg' },
      { before: '/images/gallery/commercial-before-3.jpg', after: '/images/gallery/commercial-after-3.jpg' }
    ]
  },
  {
    id: 2,
    slug: 'industriel',
    title: 'Nettoyage Industriel',
    description: 'Prestations spécialisées pour usines, ateliers et environnements techniques',
    icon: Factory,
    color: 'orange',
    image: '/images/services/industriel-full.jpg',
    price: 'Sur devis',
    duration: 'Selon projet',
    features: [
      'Dégraissage industriel',
      'Nettoyage haute pression',
      'Traitement des sols industriels',
      'Dépoussiérage technique',
      'Gestion des déchets spéciaux',
      'Interventions en milieu contrôlé'
    ],
    gallery: [
      { before: '/images/gallery/industriel-before-1.jpg', after: '/images/gallery/industriel-after-1.jpg' },
      { before: '/images/gallery/industriel-before-2.jpg', after: '/images/gallery/industriel-after-2.jpg' },
      { before: '/images/gallery/industriel-before-3.jpg', after: '/images/gallery/industriel-after-3.jpg' }
    ]
  },
  {
    id: 3,
    slug: 'particuliers',
    title: 'Nettoyage Particuliers',
    description: 'Services personnalisés pour maisons, appartements et résidences',
    icon: Home,
    color: 'green',
    image: '/images/services/particuliers-full.jpg',
    price: 'À partir de 20€/h',
    duration: '2-3h en moyenne',
    features: [
      'Ménage régulier ou ponctuel',
      'Grand ménage de printemps',
      'Nettoyage après déménagement',
      'Entretien du linge',
      'Nettoyage des vitres',
      'Services à la carte'
    ],
    gallery: [
      { before: '/images/gallery/particuliers-before-1.jpg', after: '/images/gallery/particuliers-after-1.jpg' },
      { before: '/images/gallery/particuliers-before-2.jpg', after: '/images/gallery/particuliers-after-2.jpg' },
      { before: '/images/gallery/particuliers-before-3.jpg', after: '/images/gallery/particuliers-after-3.jpg' }
    ]
  },
  {
    id: 4,
    slug: 'collectivites',
    title: 'Collectivités',
    description: 'Prestations adaptées pour administrations, écoles, hôpitaux et EHPAD',
    icon: Building,
    color: 'orange',
    image: '/images/services/collectivites-full.jpg',
    price: 'Contrat sur mesure',
    duration: 'Planning adapté',
    features: [
      'Protocoles sanitaires stricts',
      'Équipes dédiées et formées',
      'Traçabilité des interventions',
      'Produits éco-responsables',
      'Gestion des urgences',
      'Reporting détaillé'
    ],
    gallery: [
      { before: '/images/gallery/collectivites-before-1.jpg', after: '/images/gallery/collectivites-after-1.jpg' },
      { before: '/images/gallery/collectivites-before-2.jpg', after: '/images/gallery/collectivites-after-2.jpg' },
      { before: '/images/gallery/collectivites-before-3.jpg', after: '/images/gallery/collectivites-after-3.jpg' }
    ]
  }
]

const filterOptions = ['Tous', 'Entreprises', 'Particuliers', 'Collectivités']

export default function ServicesPage() {
  const [selectedFilter, setSelectedFilter] = useState('Tous')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [selectedGallery, setSelectedGallery] = useState<number | null>(null)

  const filteredServices = servicesData.filter(service => {
    if (selectedFilter === 'Tous') return true
    if (selectedFilter === 'Entreprises') return ['commercial', 'industriel'].includes(service.slug)
    if (selectedFilter === 'Particuliers') return service.slug === 'particuliers'
    if (selectedFilter === 'Collectivités') return service.slug === 'collectivites'
    return true
  })

  return (
    <>
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-sb text-white">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center max-w-3xl mx-auto"
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white">
                Nos Services de Nettoyage
              </h1>
              <p className="text-xl mb-8 text-white/90">
                Des solutions professionnelles adaptées à chaque environnement, 
                avec la garantie d'un service de qualité et d'un suivi personnalisé.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <AnimatedButton
                  variant="secondary"
                  size="lg"
                  icon={Calendar}
                >
                  <Link href="/reservation">Réserver un Service</Link>
                </AnimatedButton>
                <AnimatedButton
                  variant="outline"
                  size="lg"
                  className="!border-white !text-white hover:!bg-white hover:!text-sb-green"
                >
                  <Link href="/devis">Devis Gratuit</Link>
                </AnimatedButton>
              </div>
            </motion.div>
          </div>
          
          {/* Motif décoratif */}
          <div className="absolute bottom-0 left-0 right-0 h-20 bg-white"
            style={{
              clipPath: 'polygon(0 20px, 100% 0, 100% 100%, 0 100%)'
            }}
          />
        </section>

        {/* Filtres et contrôles */}
        <section className="py-8 border-b border-sb-gray-border">
          <div className="container-custom">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              {/* Filtres */}
              <div className="flex items-center gap-2">
                <Filter className="w-5 h-5 text-sb-gray-dark" />
                <div className="flex gap-2">
                  {filterOptions.map((filter) => (
                    <button
                      key={filter}
                      onClick={() => setSelectedFilter(filter)}
                      className={`px-4 py-2 rounded-lg font-medium transition-all ${
                        selectedFilter === filter
                          ? 'bg-sb-green text-white'
                          : 'bg-sb-gray-light text-sb-gray-dark hover:bg-sb-green/10'
                      }`}
                    >
                      {filter}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Vue Grid/List */}
              <div className="flex gap-2">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === 'grid'
                      ? 'bg-sb-green text-white'
                      : 'bg-sb-gray-light text-sb-gray-dark'
                  }`}
                >
                  <Grid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === 'list'
                      ? 'bg-sb-green text-white'
                      : 'bg-sb-gray-light text-sb-gray-dark'
                  }`}
                >
                  <List className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Services Grid/List */}
        <section className="section">
          <div className="container-custom">
            <AnimatePresence mode="wait">
              <motion.div
                key={viewMode}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className={viewMode === 'grid' ? 'grid md:grid-cols-2 gap-8' : 'space-y-8'}
              >
                {filteredServices.map((service, index) => (
                  <motion.div
                    key={service.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`${
                      viewMode === 'list' 
                        ? 'flex flex-col lg:flex-row gap-8 bg-white rounded-xl shadow-sb p-8' 
                        : ''
                    }`}
                  >
                    {viewMode === 'grid' ? (
                      /* Vue Grid - Carte 3D */
                      <motion.div
                        whileHover={{ 
                          rotateY: 5,
                          translateZ: 50,
                          scale: 1.02
                        }}
                        className="bg-white rounded-xl shadow-sb hover:shadow-sb-hover transition-all duration-300"
                        style={{ transformStyle: 'preserve-3d', perspective: 1000 }}
                      >
                        <div className="relative h-64 overflow-hidden rounded-t-xl">
                          <Image
                            src={service.image}
                            alt={service.title}
                            width={600}
                            height={400}
                            className="w-full h-full object-cover"
                          />
                          <div className={`absolute top-4 right-4 ${
                            service.color === 'green' ? 'bg-sb-green' : 'bg-sb-orange'
                          } p-3 rounded-full`}>
                            <service.icon className="w-6 h-6 text-white" />
                          </div>
                        </div>
                        
                        <div className="p-6">
                          <h3 className={`text-2xl font-bold mb-2 ${
                            service.color === 'green' ? 'text-sb-green' : 'text-sb-orange'
                          }`}>
                            {service.title}
                          </h3>
                          <p className="text-sb-gray-dark mb-4">{service.description}</p>
                          
                          <div className="flex items-center gap-4 mb-4 text-sm">
                            <div className="flex items-center text-sb-gray-dark">
                              <Euro className="w-4 h-4 mr-1" />
                              <span>{service.price}</span>
                            </div>
                            <div className="flex items-center text-sb-gray-dark">
                              <Clock className="w-4 h-4 mr-1" />
                              <span>{service.duration}</span>
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-2 mb-6">
                            {service.features.slice(0, 4).map((feature, idx) => (
                              <div key={idx} className="flex items-start">
                                <CheckCircle className="w-4 h-4 text-sb-green mt-0.5 mr-2 flex-shrink-0" />
                                <span className="text-sm text-sb-gray-dark">{feature}</span>
                              </div>
                            ))}
                          </div>
                          
                          <div className="flex gap-3">
                            <Link href={`/services/${service.slug}`} className="flex-1">
                              <AnimatedButton variant="primary" fullWidth icon={ArrowRight}>
                                En savoir plus
                              </AnimatedButton>
                            </Link>
                            <button
                              onClick={() => setSelectedGallery(service.id)}
                              className="px-4 py-2 bg-sb-gray-light rounded-lg hover:bg-sb-gray-light/70 transition-colors"
                            >
                              Galerie
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    ) : (
                      /* Vue List */
                      <>
                        <div className="lg:w-1/3">
                          <Image
                            src={service.image}
                            alt={service.title}
                            width={400}
                            height={300}
                            className="w-full h-64 lg:h-full object-cover rounded-lg"
                          />
                        </div>
                        
                        <div className="lg:w-2/3">
                          <div className="flex items-start justify-between mb-4">
                            <div>
                              <h3 className={`text-3xl font-bold mb-2 ${
                                service.color === 'green' ? 'text-sb-green' : 'text-sb-orange'
                              }`}>
                                {service.title}
                              </h3>
                              <p className="text-lg text-sb-gray-dark">{service.description}</p>
                            </div>
                            <div className={`${
                              service.color === 'green' ? 'bg-sb-green' : 'bg-sb-orange'
                            } p-3 rounded-full`}>
                              <service.icon className="w-8 h-8 text-white" />
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-6 mb-6">
                            <div className="flex items-center text-sb-gray-dark">
                              <Euro className="w-5 h-5 mr-2" />
                              <span className="font-semibold">{service.price}</span>
                            </div>
                            <div className="flex items-center text-sb-gray-dark">
                              <Clock className="w-5 h-5 mr-2" />
                              <span>{service.duration}</span>
                            </div>
                            <div className="flex items-center">
                              {[...Array(5)].map((_, i) => (
                                <Star key={i} className="w-5 h-5 text-sb-orange fill-sb-orange" />
                              ))}
                              <span className="ml-2 text-sb-gray-dark">(4.9/5)</span>
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-3 mb-6">
                            {service.features.map((feature, idx) => (
                              <div key={idx} className="flex items-start">
                                <CheckCircle className="w-5 h-5 text-sb-green mt-0.5 mr-2 flex-shrink-0" />
                                <span className="text-sb-gray-dark">{feature}</span>
                              </div>
                            ))}
                          </div>
                          
                          <div className="flex gap-4">
                            <Link href={`/services/${service.slug}`}>
                              <AnimatedButton variant="primary" icon={ArrowRight}>
                                Découvrir ce service
                              </AnimatedButton>
                            </Link>
                            <AnimatedButton
                              variant="outline"
                              onClick={() => setSelectedGallery(service.id)}
                            >
                              Voir la galerie
                            </AnimatedButton>
                          </div>
                        </div>
                      </>
                    )}
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </section>

        {/* Modal Galerie Avant/Après */}
        <AnimatePresence>
          {selectedGallery && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedGallery(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-6 border-b border-sb-gray-border flex justify-between items-center">
                  <h3 className="text-2xl font-bold text-sb-green">
                    Galerie Avant/Après - {servicesData.find(s => s.id === selectedGallery)?.title}
                  </h3>
                  <button
                    onClick={() => setSelectedGallery(null)}
                    className="p-2 hover:bg-sb-gray-light rounded-lg transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
                
                <div className="p-6 overflow-y-auto max-h-[calc(90vh-100px)]">
                  <div className="space-y-8">
                    {servicesData
                      .find(s => s.id === selectedGallery)
                      ?.gallery.map((item, index) => (
                        <div key={index} className="grid md:grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm font-semibold text-sb-gray-dark mb-2">AVANT</p>
                            <Image
                              src={item.before}
                              alt="Avant"
                              width={500}
                              height={400}
                              className="w-full rounded-lg"
                            />
                          </div>
                          <div>
                            <p className="text-sm font-s