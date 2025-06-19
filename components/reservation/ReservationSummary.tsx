'use client'

import { motion } from 'framer-motion'
import { 
  CheckCircle,
  Calendar,
  Clock,
  MapPin,
  Building2,
  Euro,
  Edit2,
  AlertCircle,
  Download,
  Mail,
  MessageSquare
} from 'lucide-react'
import { format } from 'date-fns'
import { fr } from 'date-fns/locale'
import AnimatedButton from '@/components/ui/AnimatedButton'
import { toast } from 'react-hot-toast'

interface ReservationSummaryProps {
  reservationData: {
    service: any
    date: Date | null
    timeSlot: any
    address: string
    coordinates: { lat: number; lng: number } | null
    surface: number
    recurrence: string
    comments: string
    weather: any
  }
  onEdit: (step: number) => void
}

export default function ReservationSummary({ reservationData, onEdit }: ReservationSummaryProps) {
  const calculatePrice = () => {
    if (!reservationData.service) return 0
    
    const basePrice = reservationData.service.prix_base
    const surfaceMultiplier = Math.ceil(reservationData.surface / 50)
    const subtotal = basePrice * surfaceMultiplier
    
    // Réduction selon récurrence
    let discount = 0
    if (reservationData.recurrence === 'hebdomadaire') discount = 15
    else if (reservationData.recurrence === 'bimensuelle') discount = 10
    else if (reservationData.recurrence === 'mensuelle') discount = 5
    
    return {
      subtotal,
      discount,
      total: subtotal * (1 - discount / 100)
    }
  }

  const pricing = calculatePrice()

  const downloadSummary = () => {
    // En production, générer un PDF
    toast.success('Récapitulatif téléchargé')
  }

  const sendByEmail = () => {
    // En production, envoyer par email
    toast.success('Récapitulatif envoyé par email')
  }

  return (
    <div className="max-w-3xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-lg p-8"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-sb-green">
            Récapitulatif de votre réservation
          </h2>
          <CheckCircle className="w-8 h-8 text-sb-green" />
        </div>

        {/* Service */}
        <div className="mb-6 pb-6 border-b border-sb-gray-border">
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-3">
              <div className="bg-sb-green/10 p-2 rounded-lg">
                <Building2 className="w-5 h-5 text-sb-green" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Service sélectionné</h3>
                <p className="text-sb-gray-dark">{reservationData.service?.nom}</p>
                <p className="text-sm text-sb-gray-dark mt-1">
                  Surface : {reservationData.surface}m² • {reservationData.recurrence === 'unique' ? 'Intervention unique' : `Récurrence ${reservationData.recurrence}`}
                </p>
              </div>
            </div>
            <button
              onClick={() => onEdit(1)}
              className="text-sb-green hover:text-sb-green-hover transition-colors"
            >
              <Edit2 className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Date et heure */}
        <div className="mb-6 pb-6 border-b border-sb-gray-border">
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-3">
              <div className="bg-sb-green/10 p-2 rounded-lg">
                <Calendar className="w-5 h-5 text-sb-green" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Date et heure</h3>
                <p className="text-sb-gray-dark">
                  {reservationData.date && format(reservationData.date, 'EEEE dd MMMM yyyy', { locale: fr })}
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <Clock className="w-4 h-4 text-sb-gray-dark" />
                  <span className="text-sm text-sb-gray-dark">
                    {reservationData.timeSlot?.time} • Durée estimée : {reservationData.service?.duree_estimee}min
                  </span>
                </div>
                {reservationData.timeSlot?.optimized && (
                  <div className="mt-2 inline-flex items-center gap-1 px-2 py-1 bg-sb-orange/10 text-sb-orange rounded-full text-xs font-semibold">
                    <Zap className="w-3 h-3" />
                    Créneau optimisé
                  </div>
                )}
              </div>
            </div>
            <button
              onClick={() => onEdit(2)}
              className="text-sb-green hover:text-sb-green-hover transition-colors"
            >
              <Edit2 className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Adresse */}
        <div className="mb-6 pb-6 border-b border-sb-gray-border">
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-3">
              <div className="bg-sb-green/10 p-2 rounded-lg">
                <MapPin className="w-5 h-5 text-sb-green" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Lieu d'intervention</h3>
                <p className="text-sb-gray-dark">{reservationData.address}</p>
                {reservationData.comments && (
                  <div className="mt-2 p-3 bg-sb-gray-light rounded-lg">
                    <div className="flex items-start gap-2">
                      <MessageSquare className="w-4 h-4 text-sb-gray-dark flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-sb-gray-dark">
                        {reservationData.comments}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <button
              onClick={() => onEdit(3)}
              className="text-sb-green hover:text-sb-green-hover transition-colors"
            >
              <Edit2 className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Prix */}
        <div className="mb-6">
          <div className="flex items-start gap-3">
            <div className="bg-sb-green/10 p-2 rounded-lg">
              <Euro className="w-5 h-5 text-sb-green" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-lg mb-3">Tarification</h3>
              
              <div className="bg-sb-gray-light/50 rounded-lg p-4">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-sb-gray-dark">Service de base :</span>
                    <span>{reservationData.service?.prix_base}€</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sb-gray-dark">Surface ({reservationData.surface}m²) :</span>
                    <span>×{Math.ceil(reservationData.surface / 50)}</span>
                  </div>
                  {pricing.discount > 0 && (
                    <>
                      <div className="flex justify-between">
                        <span className="text-sb-gray-dark">Sous-total :</span>
                        <span>{pricing.subtotal.toFixed(2)}€</span>
                      </div>
                      <div className="flex justify-between text-sb-orange">
                        <span>Réduction fidélité :</span>
                        <span>-{pricing.discount}%</span>
                      </div>
                    </>
                  )}
                  <div className="border-t pt-2 mt-2">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-base">Total TTC :</span>
                      <span className="text-2xl font-bold text-sb-green">
                        {pricing.total.toFixed(2)}€
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Informations importantes */}
        <div className="bg-sb-orange/10 rounded-lg p-4 mb-6">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-sb-orange flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-sb-orange mb-1">
                Informations importantes
              </p>
              <ul className="text-sm text-sb-gray-dark space-y-1">
                <li>• Paiement sécurisé par carte bancaire ou PayPal</li>
                <li>• Annulation gratuite jusqu'à 24h avant l'intervention</li>
                <li>• Vous recevrez une confirmation par email et SMS</li>
                <li>• Notre équipe {reservationData.timeSlot?.team} sera en charge de votre intervention</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3">
          <AnimatedButton
            variant="outline"
            size="sm"
            icon={Download}
            onClick={downloadSummary}
          >
            Télécharger le récapitulatif
          </AnimatedButton>
          
          <AnimatedButton
            variant="outline"
            size="sm"
            icon={Mail}
            onClick={sendByEmail}
          >
            Envoyer par email
          </AnimatedButton>
        </div>

        {/* Météo si disponible */}
        {reservationData.weather && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-6 p-4 bg-blue-50 rounded-lg"
          >
            <div className="flex items-center gap-3">
              <Cloud className="w-5 h-5 text-blue-600" />
              <div>
                <p className="font-semibold text-blue-900">
                  Prévisions météo pour le jour de l'intervention
                </p>
                <p className="text-sm text-blue-700">
                  {reservationData.weather.temperature}°C - {reservationData.weather.condition}
                </p>
                <p className="text-xs text-blue-600 mt-1">
                  {reservationData.weather.recommendation}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  )
}