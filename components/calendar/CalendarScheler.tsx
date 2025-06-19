'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Calendar,
  ChevronLeft,
  ChevronRight,
  Clock,
  Cloud,
  MapPin,
  Users,
  AlertCircle,
  Zap
} from 'lucide-react'
import { format, addDays, startOfWeek, addWeeks, isSameDay, isToday, isPast } from 'date-fns'
import { fr } from 'date-fns/locale'
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd'
import { toast } from 'react-hot-toast'

interface TimeSlot {
  id: string
  time: string
  available: boolean
  team?: string
  optimized?: boolean
  weather?: {
    condition: string
    suitable: boolean
  }
}

interface CalendarSchedulerProps {
  selectedDate: Date | null
  selectedTimeSlot: TimeSlot | null
  onSelectDate: (date: Date) => void
  onSelectTimeSlot: (slot: TimeSlot) => void
  serviceId?: number
  weather?: any
}

export default function CalendarScheduler({
  selectedDate,
  selectedTimeSlot,
  onSelectDate,
  onSelectTimeSlot,
  serviceId,
  weather
}: CalendarSchedulerProps) {
  const [view, setView] = useState<'week' | 'month'>('week')
  const [currentDate, setCurrentDate] = useState(new Date())
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [hoveredSlot, setHoveredSlot] = useState<string | null>(null)

  // Générer les créneaux horaires
  useEffect(() => {
    if (selectedDate) {
      generateTimeSlots()
    }
  }, [selectedDate, serviceId])

  const generateTimeSlots = () => {
    setIsLoading(true)
    
    // Simuler la génération de créneaux
    const slots: TimeSlot[] = []
    const startHour = 8
    const endHour = 18
    
    for (let hour = startHour; hour < endHour; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`
        const isOptimized = (hour === 10 || hour === 14) && minute === 0 // Créneaux optimisés
        
        slots.push({
          id: `${selectedDate?.toISOString()}-${time}`,
          time,
          available: Math.random() > 0.3, // 70% de disponibilité
          team: `Équipe ${Math.floor(Math.random() * 3) + 1}`,
          optimized: isOptimized,
          weather: {
            condition: weather?.condition || 'Ensoleillé',
            suitable: true
          }
        })
      }
    }
    
    setTimeSlots(slots)
    setIsLoading(false)
  }

  // Drag & Drop handlers
  const handleDragEnd = (result: any) => {
    if (!result.destination) return

    const items = Array.from(timeSlots)
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)

    setTimeSlots(items)
    toast.success('Créneau déplacé avec succès')
  }

  // Génération du calendrier
  const generateCalendarDays = () => {
    const days = []
    const start = startOfWeek(currentDate, { locale: fr })
    
    for (let i = 0; i < 7; i++) {
      days.push(addDays(start, i))
    }
    
    return days
  }

  const calendarDays = generateCalendarDays()

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-sb-green mb-2">
          Choisissez votre date et créneau
        </h2>
        <p className="text-sb-gray-dark">
          Sélectionnez un jour puis glissez-déposez pour réorganiser les créneaux
        </p>
      </div>

      {/* Contrôles de vue */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setView('week')}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              view === 'week'
                ? 'bg-sb-green text-white'
                : 'bg-sb-gray-light text-sb-gray-dark hover:bg-sb-green/10'
            }`}
          >
            Semaine
          </button>
          <button
            onClick={() => setView('month')}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              view === 'month'
                ? 'bg-sb-green text-white'
                : 'bg-sb-gray-light text-sb-gray-dark hover:bg-sb-green/10'
            }`}
          >
            Mois
          </button>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={() => setCurrentDate(addWeeks(currentDate, -1))}
            className="p-2 hover:bg-sb-gray-light rounded-lg transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          
          <span className="font-medium text-lg">
            {format(currentDate, 'MMMM yyyy', { locale: fr })}
          </span>
          
          <button
            onClick={() => setCurrentDate(addWeeks(currentDate, 1))}
            className="p-2 hover:bg-sb-gray-light rounded-lg transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Indicateur météo */}
        {weather && (
          <div className="flex items-center gap-2 text-sm text-sb-gray-dark">
            <Cloud className="w-4 h-4" />
            <span>{weather.temperature}°C - {weather.condition}</span>
          </div>
        )}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Calendrier */}
        <div>
          <div className="grid grid-cols-7 gap-2 mb-4">
            {['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'].map((day) => (
              <div key={day} className="text-center text-sm font-semibold text-sb-gray-dark">
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-2">
            {calendarDays.map((day) => {
              const isSelected = selectedDate && isSameDay(day, selectedDate)
              const isCurrentDay = isToday(day)
              const isPastDay = isPast(day) && !isCurrentDay
              
              return (
                <motion.button
                  key={day.toISOString()}
                  whileHover={{ scale: isPastDay ? 1 : 1.05 }}
                  whileTap={{ scale: isPastDay ? 1 : 0.95 }}
                  onClick={() => !isPastDay && onSelectDate(day)}
                  disabled={isPastDay}
                  className={`
                    aspect-square rounded-lg flex flex-col items-center justify-center
                    transition-all relative overflow-hidden
                    ${isSelected 
                      ? 'bg-sb-green text-white shadow-lg' 
                      : isCurrentDay
                      ? 'bg-sb-orange/20 text-sb-orange border-2 border-sb-orange'
                      : isPastDay
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-white border-2 border-sb-gray-border hover:border-sb-green'
                    }
                  `}
                >
                  <span className="text-lg font-semibold">
                    {format(day, 'd')}
                  </span>
                  
                  {/* Badge disponibilité */}
                  {!isPastDay && (
                    <div className={`absolute bottom-1 w-2 h-2 rounded-full ${
                      Math.random() > 0.3 ? 'bg-green-500' : 'bg-red-500'
                    }`} />
                  )}
                </motion.button>
              )
            })}
          </div>

          {/* Légende */}
          <div className="mt-4 flex items-center gap-4 text-xs text-sb-gray-dark">
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-green-500 rounded-full" />
              <span>Disponible</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-red-500 rounded-full" />
              <span>Complet</span>
            </div>
            <div className="flex items-center gap-1">
              <Zap className="w-3 h-3 text-sb-orange" />
              <span>Optimisé</span>
            </div>
          </div>
        </div>

        {/* Créneaux horaires avec Drag & Drop */}
        <div>
          {selectedDate ? (
            <>
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5 text-sb-green" />
                Créneaux disponibles le {format(selectedDate, 'dd MMMM', { locale: fr })}
              </h3>

              {isLoading ? (
                <div className="flex items-center justify-center h-64">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-sb-green" />
                </div>
              ) : (
                <DragDropContext onDragEnd={handleDragEnd}>
                  <Droppable droppableId="timeSlots">
                    {(provided) => (
                      <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        className="space-y-2 max-h-96 overflow-y-auto"
                      >
                        <AnimatePresence>
                          {timeSlots.map((slot, index) => (
                            <Draggable
                              key={slot.id}
                              draggableId={slot.id}
                              index={index}
                              isDragDisabled={!slot.available}
                            >
                              {(provided, snapshot) => (
                                <motion.div
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  initial={{ opacity: 0, y: 20 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ delay: index * 0.05 }}
                                  onMouseEnter={() => setHoveredSlot(slot.id)}
                                  onMouseLeave={() => setHoveredSlot(null)}
                                  className={`
                                    p-4 rounded-lg border-2 transition-all cursor-pointer
                                    ${snapshot.isDragging ? 'shadow-2xl rotate-1' : ''}
                                    ${slot.available
                                      ? selectedTimeSlot?.id === slot.id
                                        ? 'border-sb-green bg-sb-green/10'
                                        : 'border-sb-gray-border hover:border-sb-green bg-white'
                                      : 'border-gray-200 bg-gray-50 cursor-not-allowed'
                                    }
                                  `}
                                  onClick={() => slot.available && onSelectTimeSlot(slot)}
                                >
                                  <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                      <Clock className={`w-5 h-5 ${
                                        slot.available ? 'text-sb-green' : 'text-gray-400'
                                      }`} />
                                      <div>
                                        <p className={`font-semibold ${
                                          !slot.available ? 'text-gray-400' : ''
                                        }`}>
                                          {slot.time}
                                        </p>
                                        {slot.team && (
                                          <p className="text-sm text-sb-gray-dark">
                                            {slot.team}
                                          </p>
                                        )}
                                      </div>
                                    </div>

                                    <div className="flex items-center gap-2">
                                      {slot.optimized && (
                                        <motion.div
                                          animate={{ scale: [1, 1.2, 1] }}
                                          transition={{ repeat: Infinity, duration: 2 }}
                                        >
                                          <Zap className="w-5 h-5 text-sb-orange" />
                                        </motion.div>
                                      )}
                                      
                                      {!slot.available && (
                                        <span className="text-sm text-gray-500">Complet</span>
                                      )}
                                    </div>
                                  </div>

                                  {/* Tooltip avec infos supplémentaires */}
                                  {hoveredSlot === slot.id && slot.available && (
                                    <motion.div
                                      initial={{ opacity: 0, y: -5 }}
                                      animate={{ opacity: 1, y: 0 }}
                                      className="mt-2 p-2 bg-sb-gray-light rounded text-sm"
                                    >
                                      <div className="flex items-center gap-2">
                                        <MapPin className="w-4 h-4" />
                                        <span>Distance optimale depuis le dernier client</span>
                                      </div>
                                      {slot.weather && (
                                        <div className="flex items-center gap-2 mt-1">
                                          <Cloud className="w-4 h-4" />
                                          <span>{slot.weather.condition} - Idéal pour le nettoyage</span>
                                        </div>
                                      )}
                                    </motion.div>
                                  )}
                                </motion.div>
                              )}
                            </Draggable>
                          ))}
                        </AnimatePresence>
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </DragDropContext>
              )}
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-64 text-center">
              <Calendar className="w-12 h-12 text-sb-gray-border mb-4" />
              <p className="text-sb-gray-dark">
                Sélectionnez une date pour voir les créneaux disponibles
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Notification SMS/Email */}
      {selectedDate && selectedTimeSlot && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 p-4 bg-sb-green/10 rounded-lg flex items-start gap-3"
        >
          <AlertCircle className="w-5 h-5 text-sb-green flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-sb-green">Rappels automatiques activés</p>
            <p className="text-sm text-sb-gray-dark">
              Vous recevrez un SMS et un email de rappel 24h avant l'intervention
            </p>
          </div>
        </motion.div>
      )}
    </div>
  )
}