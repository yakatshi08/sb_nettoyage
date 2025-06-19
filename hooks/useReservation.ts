'use client'

import { useState } from 'react'
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/navigation'

interface ReservationData {
  service_id: number
  date_service: string
  adresse_intervention: string
  surface?: number
  prix_final: number
  commentaires?: string
  recurrence?: 'unique' | 'hebdomadaire' | 'bimensuelle' | 'mensuelle'
}

export function useReservation() {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const createReservation = async (data: ReservationData) => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/reservations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })

      if (!response.ok) {
        throw new Error('Erreur lors de la création de la réservation')
      }

      const reservation = await response.json()
      return { success: true, reservation }
    } catch (error) {
      console.error('Erreur:', error)
      toast.error('Impossible de créer la réservation')
      return { success: false, error }
    } finally {
      setIsLoading(false)
    }
  }

  const updateReservation = async (id: number, data: Partial<ReservationData>) => {
    setIsLoading(true)
    try {
      const response = await fetch(`/api/reservations/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })

      if (!response.ok) {
        throw new Error('Erreur lors de la mise à jour')
      }

      const reservation = await response.json()
      toast.success('Réservation mise à jour')
      return { success: true, reservation }
    } catch (error) {
      console.error('Erreur:', error)
      toast.error('Impossible de mettre à jour la réservation')
      return { success: false, error }
    } finally {
      setIsLoading(false)
    }
  }

  const cancelReservation = async (id: number) => {
    setIsLoading(true)
    try {
      const response = await fetch(`/api/reservations/${id}`, {
        method: 'DELETE'
      })

      if (!response.ok) {
        throw new Error('Erreur lors de l\'annulation')
      }

      toast.success('Réservation annulée')
      return { success: true }
    } catch (error) {
      console.error('Erreur:', error)
      toast.error('Impossible d\'annuler la réservation')
      return { success: false, error }
    } finally {
      setIsLoading(false)
    }
  }

  const getAvailableSlots = async (date: string, service_id: number) => {
    try {
      const response = await fetch(
        `/api/reservations/slots?date=${date}&service_id=${service_id}`
      )

      if (!response.ok) {
        throw new Error('Erreur lors de la récupération des créneaux')
      }

      const slots = await response.json()
      return { success: true, slots }
    } catch (error) {
      console.error('Erreur:', error)
      toast.error('Impossible de charger les créneaux disponibles')
      return { success: false, error }
    }
  }

  const checkAvailability = async (date: string, time: string) => {
    try {
      const response = await fetch('/api/reservations/check-availability', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ date, time })
      })

      const result = await response.json()
      return result.available
    } catch (error) {
      console.error('Erreur:', error)
      return false
    }
  }

  return {
    isLoading,
    createReservation,
    updateReservation,
    cancelReservation,
    getAvailableSlots,
    checkAvailability
  }
}