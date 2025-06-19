'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import { 
  MapPin, 
  Navigation, 
  Search,
  Home,
  Building,
  MessageSquare,
  Info,
  Check,
  AlertCircle
} from 'lucide-react'
import { useLoadScript, GoogleMap, Marker, Autocomplete } from '@react-google-maps/api'
import { toast } from 'react-hot-toast'

interface LocationInputProps {
  address: string
  onAddressChange: (address: string) => void
  onCoordinatesChange: (coords: { lat: number; lng: number }) => void
  comments: string
  onCommentsChange: (comments: string) => void
}

const libraries: ("places")[] = ["places"]

const mapContainerStyle = {
  width: '100%',
  height: '400px'
}

const defaultCenter = {
  lat: 48.8566,
  lng: 2.3522
}

const mapOptions = {
  disableDefaultUI: true,
  zoomControl: true,
  streetViewControl: false,
  mapTypeControl: false,
  fullscreenControl: false,
  styles: [
    {
      featureType: "poi",
      elementType: "labels",
      stylers: [{ visibility: "off" }]
    }
  ]
}

export default function LocationInput({
  address,
  onAddressChange,
  onCoordinatesChange,
  comments,
  onCommentsChange
}: LocationInputProps) {
  const [map, setMap] = useState<google.maps.Map | null>(null)
  const [autocomplete, setAutocomplete] = useState<google.maps.places.Autocomplete | null>(null)
  const [markerPosition, setMarkerPosition] = useState(defaultCenter)
  const [locationType, setLocationType] = useState<'maison' | 'appartement' | 'bureau' | 'commerce'>('maison')
  const [accessInfo, setAccessInfo] = useState({
    etage: '',
    codeAcces: '',
    parking: false,
    ascenseur: false
  })
  const [isLocating, setIsLocating] = useState(false)

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
    libraries
  })

  const onMapLoad = useCallback((map: google.maps.Map) => {
    setMap(map)
  }, [])

  const onAutocompleteLoad = useCallback((autocomplete: google.maps.places.Autocomplete) => {
    setAutocomplete(autocomplete)
  }, [])

  const onPlaceChanged = () => {
    if (autocomplete) {
      const place = autocomplete.getPlace()
      
      if (place.geometry && place.geometry.location) {
        const lat = place.geometry.location.lat()
        const lng = place.geometry.location.lng()
        
        setMarkerPosition({ lat, lng })
        onAddressChange(place.formatted_address || '')
        onCoordinatesChange({ lat, lng })
        
        if (map) {
          map.panTo({ lat, lng })
          map.setZoom(17)
        }
      }
    }
  }

  const handleUseMyLocation = () => {
    setIsLocating(true)
    
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords
          const coords = { lat: latitude, lng: longitude }
          
          setMarkerPosition(coords)
          onCoordinatesChange(coords)
          
          if (map) {
            map.panTo(coords)
            map.setZoom(17)
          }
          
          // Reverse geocoding pour obtenir l'adresse
          try {
            const geocoder = new google.maps.Geocoder()
            const response = await geocoder.geocode({ location: coords })
            
            if (response.results[0]) {
              onAddressChange(response.results[0].formatted_address)
              toast.success('Position trouvée avec succès !')
            }
          } catch (error) {
            console.error('Erreur geocoding:', error)
          }
          
          setIsLocating(false)
        },
        (error) => {
          console.error('Erreur géolocalisation:', error)
          toast.error('Impossible d\'obtenir votre position')
          setIsLocating(false)
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0
        }
      )
    } else {
      toast.error('La géolocalisation n\'est pas supportée')
      setIsLocating(false)
    }
  }

  if (loadError) {
    return (
      <div className="bg-red-50 rounded-lg p-4 text-red-600">
        Erreur lors du chargement de Google Maps
      </div>
    )
  }

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-sb-green" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Recherche d'adresse */}
      <div className="bg-white rounded-xl p-6 border border-sb-gray-border">
        <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
          <MapPin className="w-5 h-5 text-sb-green" />
          Adresse d'intervention
        </h3>

        <div className="space-y-4">
          <div className="relative">
            <Autocomplete
              onLoad={onAutocompleteLoad}
              onPlaceChanged={onPlaceChanged}
              options={{
                componentRestrictions: { country: 'fr' },
                fields: ['formatted_address', 'geometry']
              }}
            >
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-sb-gray-dark" />
                <input
                  type="text"
                  value={address}
                  onChange={(e) => onAddressChange(e.target.value)}
                  placeholder="Entrez votre adresse..."
                  className="w-full pl-10 pr-4 py-3 border border-sb-gray-border rounded-lg focus:outline-none focus:ring-2 focus:ring-sb-green focus:border-transparent"
                />
              </div>
            </Autocomplete>
          </div>

          <button
            onClick={handleUseMyLocation}
            disabled={isLocating}
            className="flex items-center gap-2 text-sb-green hover:text-sb-green-hover transition-colors"
          >
            <Navigation className={`w-5 h-5 ${isLocating ? 'animate-pulse' : ''}`} />
            <span>Utiliser ma position actuelle</span>
          </button>
        </div>
      </div>

      {/* Carte Google Maps */}
      <div className="bg-white rounded-xl overflow-hidden border border-sb-gray-border">
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={markerPosition}
          zoom={15}
          onLoad={onMapLoad}
          options={mapOptions}
        >
          <Marker
            position={markerPosition}
            animation={google.maps.Animation.DROP}
          />
        </GoogleMap>
      </div>

      {/* Type de lieu */}
      <div className="bg-white rounded-xl p-6 border border-sb-gray-border">
        <h3 className="text-lg font-bold mb-4">Type de lieu</h3>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { value: 'maison', label: 'Maison', icon: Home },
            { value: 'appartement', label: 'Appartement', icon: Building },
            { value: 'bureau', label: 'Bureau', icon: Building },
            { value: 'commerce', label: 'Commerce', icon: Building }
          ].map((type) => (
            <motion.button
              key={type.value}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setLocationType(type.value as any)}
              className={`
                p-4 rounded-lg border-2 flex flex-col items-center gap-2 transition-all
                ${locationType === type.value
                  ? 'border-sb-green bg-sb-green/5'
                  : 'border-sb-gray-border hover:border-sb-green'
                }
              `}
            >
              <type.icon className={`w-6 h-6 ${
                locationType === type.value ? 'text-sb-green' : 'text-sb-gray-dark'
              }`} />
              <span className={`text-sm font-medium ${
                locationType === type.value ? 'text-sb-green' : 'text-sb-gray-dark'
              }`}>
                {type.label}
              </span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Informations d'accès */}
      {(locationType === 'appartement' || locationType === 'bureau') && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl p-6 border border-sb-gray-border"
        >
          <h3 className="text-lg font-bold mb-4">Informations d'accès</h3>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-sb-gray-dark mb-2">
                Étage
              </label>
              <input
                type="text"
                value={accessInfo.etage}
                onChange={(e) => setAccessInfo({ ...accessInfo, etage: e.target.value })}
                placeholder="Ex: 3ème étage"
                className="w-full px-4 py-2 border border-sb-gray-border rounded-lg focus:outline-none focus:ring-2 focus:ring-sb-green"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-sb-gray-dark mb-2">
                Code d'accès / Interphone
              </label>
              <input
                type="text"
                value={accessInfo.codeAcces}
                onChange={(e) => setAccessInfo({ ...accessInfo, codeAcces: e.target.value })}
                placeholder="Ex: 1234A"
                className="w-full px-4 py-2 border border-sb-gray-border rounded-lg focus:outline-none focus:ring-2 focus:ring-sb-green"
              />
            </div>
          </div>
          
          <div className="flex gap-6 mt-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={accessInfo.parking}
                onChange={(e) => setAccessInfo({ ...accessInfo, parking: e.target.checked })}
                className="w-4 h-4 text-sb-green rounded focus:ring-sb-green"
              />
              <span className="text-sm text-sb-gray-dark">Parking disponible</span>
            </label>
            
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={accessInfo.ascenseur}
                onChange={(e) => setAccessInfo({ ...accessInfo, ascenseur: e.target.checked })}
                className="w-4 h-4 text-sb-green rounded focus:ring-sb-green"
              />
              <span className="text-sm text-sb-gray-dark">Ascenseur</span>
            </label>
          </div>
        </motion.div>
      )}

      {/* Commentaires */}
      <div className="bg-white rounded-xl p-6 border border-sb-gray-border">
        <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
          <MessageSquare className="w-5 h-5 text-sb-green" />
          Instructions particulières (optionnel)
        </h3>
        
        <textarea
          value={comments}
          onChange={(e) => onCommentsChange(e.target.value)}
          placeholder="Ex: Sonner à l'interphone 'Dupont', présence d'animaux domestiques, zones prioritaires..."
          rows={4}
          className="w-full px-4 py-3 border border-sb-gray-border rounded-lg focus:outline-none focus:ring-2 focus:ring-sb-green resize-none"
        />
        
        <p className="text-sm text-sb-gray-dark mt-2">
          Ces informations aideront notre équipe à mieux préparer l'intervention
        </p>
      </div>

      {/* Validation de l'adresse */}
      {address && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-sb-green/10 rounded-lg p-4 flex items-start gap-3"
        >
          <Check className="w-5 h-5 text-sb-green flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-sb-green">Adresse validée</p>
            <p className="text-sm text-sb-gray-dark mt-1">
              {address}
            </p>
            <p className="text-xs text-sb-gray-dark mt-2">
              Notre équipe sera sur place à l'heure convenue
            </p>
          </div>
        </motion.div>
      )}
    </div>
  )
}