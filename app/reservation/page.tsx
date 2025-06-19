'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Calendar, Clock, MapPin, Cloud, Users, Info } from 'lucide-react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import ChatbotWidget from '@/components/features/ChatbotWidget'
import CalendarScheduler from '@/components/calendar/CalendarScheduler'
import ServiceSelector from '@/components/reservation/ServiceSelector'
import LocationInput from '@/components/reservation/LocationInput'
import ReservationSummary from '@/components/reservation/ReservationSummary'
import AnimatedButton from '@/components/ui/AnimatedButton'
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/navigation'

const steps = [
  { id: 1, name: 'Service', icon: Users },
  { id: 2, name: 'Date & Heure', icon: Calendar },
  { id: 3, name: 'Localisation', icon: MapPin },
  { id: 4, name: 'Confirmation', icon: Info }
]

export default function ReservationPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [reservationData, setReservationData] = useState({
    service: null as any,
    date: null as Date | null,
    timeSlot: null as any,
    address: '',
    coordinates: null as { lat: number; lng: number } | null,
    surface: 100,
    recurrence: 'unique' as 'unique' | 'hebdomadaire' | 'bimensuelle' | 'mensuelle',
    comments: '',
    weather: null as any
  })

  // Récupérer la météo pour la date sélectionnée
  useEffect(() => {
    if (reservationData.date && reservationData.coordinates) {
      fetchWeatherData()
    }
  }, [reservationData.date, reservationData.coordinates])

  const fetchWeatherData = async () => {
    try {
      // Simuler l'appel API météo
      const mockWeather = {
        temperature: 18,
        condition: 'Nuageux',
        icon: '☁️',
        recommendation: 'Conditions idéales pour le nettoyage'
      }
      setReservationData(prev => ({ ...prev, weather: mockWeather }))
    } catch (error) {
      console.error('Erreur météo:', error)
    }
  }

  const handleNextStep = () => {
    // Validation selon l'étape
    if (currentStep === 1 && !reservationData.service) {
      toast.error('Veuillez sélectionner un service')
      return
    }
    if (currentStep === 2 && (!reservationData.date || !reservationData.timeSlot)) {
      toast.error('Veuillez sélectionner une date et un créneau horaire')
      return
    }
    if (currentStep === 3 && !reservationData.address) {
      toast.error('Veuillez entrer une adresse')
      return
    }

    if (currentStep < 4) {
      setCurrentStep(currentStep + 1)
    } else {
      handleSubmitReservation()
    }
  }

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmitReservation = () => {
    // Calculer le prix
    const basePrice = reservationData.service?.prix_base || 0
    const surfaceMultiplier = Math.ceil(reservationData.surface / 50)
    const totalPrice = basePrice * surfaceMultiplier

    // Rediriger vers la page de paiement avec les paramètres
    const params = new URLSearchParams({
      service: reservationData.service?.nom || '',
      date: reservationData.date?.toISOString() || '',
      address: reservationData.address,
      surface: reservationData.surface.toString(),
      price: totalPrice.toString()
    })

    router.push(`/reservation/payment?${params.toString()}`)
  }

  return (
    <>
      <Header />
      
      <main className="min-h-screen bg-gradient-to-b from-sb-gray-light/30 to-white py-12">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {/* Titre */}
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-sb-green mb-4">
                Réservez votre Service
              </h1>
              <p className="text-xl text-sb-gray-dark max-w-2xl mx-auto">
                Planifiez votre intervention en quelques clics grâce à notre système 
                de réservation intelligent
              </p>
            </div>

            {/* Stepper */}
            <div className="max-w-4xl mx-auto mb-12">
              <div className="flex items-center justify-between">
                {steps.map((step, index) => (
                  <div key={step.id} className="flex items-center flex-1">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      className="relative"
                    >
                      <div
                        className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                          currentStep >= step.id
                            ? 'bg-sb-green text-white'
                            : 'bg-white border-2 border-sb-gray-border text-sb-gray-dark'
                        }`}
                      >
                        {currentStep > step.id ? (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                          >
                            ✓
                          </motion.div>
                        ) : (
                          <step.icon className="w-5 h-5" />
                        )}
                      </div>
                      <p className={`absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-sm whitespace-nowrap ${
                        currentStep >= step.id ? 'text-sb-green font-semibold' : 'text-sb-gray-dark'
                      }`}>
                        {step.name}
                      </p>
                    </motion.div>
                    
                    {index < steps.length - 1 && (
                      <div className="flex-1 h-1 mx-4 bg-sb-gray-border">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ 
                            width: currentStep > step.id ? '100%' : '0%' 
                          }}
                          transition={{ duration: 0.5 }}
                          className="h-full bg-sb-green"
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Contenu des étapes */}
            <div className="max-w-6xl mx-auto">
              <AnimatePresence mode="wait">
                {currentStep === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                  >
                    <ServiceSelector
                      selectedService={reservationData.service}
                      onSelectService={(service) => 
                        setReservationData(prev => ({ ...prev, service }))
                      }
                      surface={reservationData.surface}
                      onSurfaceChange={(surface) =>
                        setReservationData(prev => ({ ...prev, surface }))
                      }
                      recurrence={reservationData.recurrence}
                      onRecurrenceChange={(recurrence) =>
                        setReservationData(prev => ({ ...prev, recurrence }))
                      }
                    />
                  </motion.div>
                )}

                {currentStep === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                  >
                    <CalendarScheduler
                      selectedDate={reservationData.date}
                      selectedTimeSlot={reservationData.timeSlot}
                      onSelectDate={(date) =>
                        setReservationData(prev => ({ ...prev, date }))
                      }
                      onSelectTimeSlot={(timeSlot) =>
                        setReservationData(prev => ({ ...prev, timeSlot }))
                      }
                      serviceId={reservationData.service?.id}
                      weather={reservationData.weather}
                    />
                  </motion.div>
                )}

                {currentStep === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                  >
                    <LocationInput
                      address={reservationData.address}
                      onAddressChange={(address) =>
                        setReservationData(prev => ({ ...prev, address }))
                      }
                      onCoordinatesChange={(coordinates) =>
                        setReservationData(prev => ({ ...prev, coordinates }))
                      }
                      comments={reservationData.comments}
                      onCommentsChange={(comments) =>
                        setReservationData(prev => ({ ...prev, comments }))
                      }
                    />
                  </motion.div>
                )}

                {currentStep === 4 && (
                  <motion.div
                    key="step4"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                  >
                    <ReservationSummary
                      reservationData={reservationData}
                      onEdit={(step) => setCurrentStep(step)}
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Boutons navigation */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="flex justify-between mt-12"
              >
                <AnimatedButton
                  variant="outline"
                  onClick={handlePrevStep}
                  disabled={currentStep === 1}
                  className={currentStep === 1 ? 'invisible' : ''}
                >
                  Précédent
                </AnimatedButton>

                <AnimatedButton
                  variant="primary"
                  onClick={handleNextStep}
                  icon={currentStep === 4 ? Clock : undefined}
                >
                  {currentStep === 4 ? 'Procéder au paiement' : 'Suivant'}
                </AnimatedButton>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </main>
      
      <Footer />
      <ChatbotWidget />
    </>
  )
}