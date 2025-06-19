'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import PaymentForm from './PaymentForm'

interface PaymentModalProps {
  isOpen: boolean
  onClose: () => void
  amount: number
  serviceDetails: {
    service: string
    date: string
    address: string
  }
  onSuccess: (paymentDetails: any) => void
}

export default function PaymentModal({
  isOpen,
  onClose,
  amount,
  serviceDetails,
  onSuccess
}: PaymentModalProps) {
  const handleSuccess = (paymentDetails: any) => {
    onSuccess(paymentDetails)
    onClose()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-hidden">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-sb-gray-border">
                <h2 className="text-2xl font-bold text-sb-green">
                  Finaliser votre paiement
                </h2>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-sb-gray-light rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Contenu */}
              <div className="p-6 overflow-y-auto max-h-[calc(90vh-100px)]">
                <PaymentForm
                  amount={amount}
                  serviceDetails={serviceDetails}
                  onSuccess={handleSuccess}
                  onCancel={onClose}
                />
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}