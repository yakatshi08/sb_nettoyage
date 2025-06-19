'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Building2, 
  Factory, 
  Home, 
  Building,
  CheckCircle,
  Euro,
  Clock,
  Ruler,
  Calendar,
  Info
} from 'lucide-react'
import Image from 'next/image'
import AnimatedButton from '@/components/ui/AnimatedButton'

interface Service {
  id: number
  nom: string
  description: string
  prix_base: number
  duree_estimee: number
  image_url: string
  type: string
  icone: any
}

interface ServiceSelectorProps {
  selectedService: Service | null
  onSelectService: (service: Service) => void
  surface: number
  onSurfaceChange: (surface: number) => void
  recurrence: string
  onRecurrenceChange: (recurrence: 'unique' | 'hebdomadaire' | 'bimensuelle' | 'mensuelle') => void
}

const services: Service[] = [
  {
    id: 1,
    nom: 'Nettoyage Commercial',
    description: 'Bureaux, commerces et espaces professionnels',
    prix_base: 35,
    duree_estimee: 120,
    image_url: '/images/services/commercial-thumb.jpg',
    type: 'commercial',
    icone: Building2
  },
  {
    id: 2,
    nom: 'Nettoyage Industriel',
    description: 'Usines, ateliers et sites industriels',
    prix_base: 45,
    duree_estimee: 180,
    image_url: '/images/services/industriel-thumb.jpg',
    type: 'industriel',
    icone: Factory
  },
  {
    id: 3,
    nom: 'Nettoyage Particuliers',
    description: 'Maisons et appartements',
    prix_base: 25,
    duree_estimee: 90,
    image_url: '/images/services/particuliers-thumb.jpg',
    type: 'particulier',
    icone: Home
  },
  {
    id: 4,
    nom: 'Collectivités',
    description: 'Administrations, écoles et hôpitaux',
    prix_base: 40,
    duree_estimee: 150,
    image_url: '/images/services/collectivites-thumb.jpg',
    type: 'collectivite',
    icone: Building
  }
]

const recurrenceOptions = [
  { value: 'unique', label: 'Intervention unique', discount: 0 },
  { value: 'hebdomadaire', label: 'Chaque semaine', discount: 15 },
  { value: 'bimensuelle', label: 'Toutes les 2 semaines', discount: 10 },
  { value: 'mensuelle', label: 'Chaque mois', discount: 5 }
]

export default function ServiceSelector({
  selectedService,
  onSelectService,
  surface,
  onSurfaceChange,
  recurrence,
  onRecurrenceChange
}: ServiceSelectorProps) {
  const [showDetails, setShowDetails] = useState(false)

  const calculatePrice = (service: Service) => {
    const basePrice = service.prix_base
    const surfaceMultiplier = Math.ceil(surface / 50)
    const subtotal = basePrice * surfaceMultiplier
    
    // Appliquer la réduction selon la récurrence
    const recurrenceOption = recurrenceOptions.find(opt => opt.value === recurrence)
    const discount = recurrenceOption?.discount || 0
    const total = subtotal * (1 - discount / 100)
    
    return {
      subtotal,
      discount,
      total
    }
  }

  return (
    <div>
      {/* Sélection du service */}
      <div className="mb-8">
        <h3 className="text-xl font-bold text-sb-green mb-4">
          Choisissez votre service
        </h3>
        
        <div className="grid md:grid-cols-2 gap-4">
          {services.map((service) => {
            const isSelected = selectedService?.id === service.id
            const pricing = calculatePrice(service)
            
            return (
              <motion.div
                key={service.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onSelectService(service)}
                className={`
                  relative p-6 rounded-xl border-2 cursor-pointer transition-all
                  ${isSelected 
                    ? 'border-sb-green bg-sb-green/5 shadow-lg' 
                    : 'border-sb-gray-border hover:border-sb-green bg-white'
                  }
                `}
              >
                {/* Badge sélectionné */}
                {isSelected && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute top-4 right-4"
                  >
                    <CheckCircle className="w-6 h-6 text-sb-green" />
                  </motion.div>
                )}

                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-lg ${
                    isSelected ? 'bg-sb-green' : 'bg-sb-gray-light'
                  }`}>
                    <service.icone className={`w-6 h-6 ${
                      isSelected ? 'text-white' : 'text-sb-green'
                    }`} />
                  </div>
                  
                  <div className="flex-1">
                    <h4 className="font-bold text-lg mb-1">{service.nom}</h4>
                    <p className="text-sm text-sb-gray-dark mb-3">
                      {service.description}
                    </p>
                    
                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-1">
                        <Euro className="w-4 h-4 text-sb-gray-dark" />
                        <span className="font-semibold">
                          {pricing.total.toFixed(2)}€
                        </span>
                        {pricing.discount > 0 && (
                          <span className="text-sb-orange text-xs">
                            (-{pricing.discount}%)
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-1 text-sb-gray-dark">
                        <Clock className="w-4 h-4" />
                        <span>~{service.duree_estimee}min</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* Options supplémentaires */}
      {selectedService && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Surface */}
          <div className="bg-white rounded-xl p-6 border border-sb-gray-border">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <Ruler className="w-5 h-5 text-sb-green" />
              Surface à nettoyer
            </h3>
            
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <input
                  type="range"
                  min="20"
                  max="500"
                  step="10"
                  value={surface}
                  onChange={(e) => onSurfaceChange(parseInt(e.target.value))}
                  className="flex-1 h-2 bg-sb-gray-light rounded-lg appearance-none cursor-pointer slider"
                />
                <div className="w-24 text-right">
                  <input
                    type="number"
                    min="20"
                    max="500"
                    value={surface}
                    onChange={(e) => onSurfaceChange(parseInt(e.target.value) || 20)}
                    className="w-full px-3 py-2 border border-sb-gray-border rounded-lg text-center font-semibold"
                  />
                  <span className="text-sm text-sb-gray-dark">m²</span>
                </div>
              </div>
              
              {/* Suggestions de surface */}
              <div className="flex gap-2">
                {[50, 100, 150, 200, 300].map((size) => (
                  <button
                    key={size}
                    onClick={() => onSurfaceChange(size)}
                    className={`px-3 py-1 rounded-full text-sm transition-all ${
                      surface === size
                        ? 'bg-sb-green text-white'
                        : 'bg-sb-gray-light hover:bg-sb-green/20'
                    }`}
                  >
                    {size}m²
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Récurrence */}
          <div className="bg-white rounded-xl p-6 border border-sb-gray-border">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-sb-green" />
              Fréquence d'intervention
            </h3>
            
            <div className="grid grid-cols-2 gap-3">
              {recurrenceOptions.map((option) => (
                <motion.button
                  key={option.value}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => onRecurrenceChange(option.value as any)}
                  className={`
                    p-4 rounded-lg border-2 text-left transition-all
                    ${recurrence === option.value
                      ? 'border-sb-green bg-sb-green/5'
                      : 'border-sb-gray-border hover:border-sb-green'
                    }
                  `}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-semibold">{option.label}</span>
                    {option.discount > 0 && (
                      <span className="text-sm font-bold text-sb-orange">
                        -{option.discount}%
                      </span>
                    )}
                  </div>
                  {option.discount > 0 && (
                    <p className="text-xs text-sb-gray-dark">
                      Économisez avec un contrat régulier
                    </p>
                  )}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Détails du prix */}
          <div className="bg-sb-green/5 rounded-xl p-6">
            <div className="flex items-start gap-3">
              <Info className="w-5 h-5 text-sb-green flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <h4 className="font-semibold text-sb-green mb-2">
                  Détails du tarif
                </h4>
                
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-sb-gray-dark">Prix de base :</span>
                    <span>{selectedService.prix_base}€/50m²</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sb-gray-dark">Surface ({surface}m²) :</span>
                    <span>×{Math.ceil(surface / 50)}</span>
                  </div>
                  {calculatePrice(selectedService).discount > 0 && (
                    <div className="flex justify-between text-sb-orange">
                      <span>Réduction récurrence :</span>
                      <span>-{calculatePrice(selectedService).discount}%</span>
                    </div>
                  )}
                  <div className="border-t pt-2 mt-2">
                    <div className="flex justify-between items-center">
                      <span className="font-bold">Total estimé :</span>
                      <span className="text-xl font-bold text-sb-green">
                        {calculatePrice(selectedService).total.toFixed(2)}€
                      </span>
                    </div>
                  </div>
                </div>
                
                <p className="text-xs text-sb-gray-dark mt-3">
                  * Prix TTC. Le tarif final peut varier selon l'état des lieux.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 20px;
          height: 20px;
          background: #006400;
          cursor: pointer;
          border-radius: 50%;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }

        .slider::-moz-range-thumb {
          width: 20px;
          height: 20px;
          background: #006400;
          cursor: pointer;
          border-radius: 50%;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
          border: none;
        }
      `}</style>
    </div>
  )
}