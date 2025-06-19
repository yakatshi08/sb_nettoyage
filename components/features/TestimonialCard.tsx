'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Star, Quote } from 'lucide-react'

interface TestimonialCardProps {
  name: string
  role: string
  content: string
  rating: number
  image: string
}

export default function TestimonialCard({ 
  name, 
  role, 
  content, 
  rating, 
  image 
}: TestimonialCardProps) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-white rounded-xl shadow-sb hover:shadow-sb-hover transition-all duration-300 p-6 relative overflow-hidden h-full"
    >
      {/* Quote icon décoratif */}
      <Quote className="absolute top-4 right-4 w-20 h-20 text-sb-gray-light/50 rotate-180" />
      
      <div className="relative z-10">
        {/* Étoiles */}
        <div className="flex mb-4">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
            >
              <Star
                className={`w-5 h-5 ${
                  i < rating 
                    ? 'text-sb-orange fill-sb-orange' 
                    : 'text-sb-gray-border'
                }`}
              />
            </motion.div>
          ))}
        </div>

        {/* Contenu */}
        <p className="text-sb-gray-dark mb-6 italic relative">
          "{content}"
        </p>

        {/* Auteur */}
        <div className="flex items-center">
          <div className="relative w-12 h-12 mr-4">
            <Image
              src={image}
              alt={name}
              width={48}
              height={48}
              className="rounded-full object-cover"
            />
            <div className="absolute inset-0 rounded-full border-2 border-sb-green/20" />
          </div>
          
          <div>
            <h4 className="font-bold text-sb-green">{name}</h4>
            <p className="text-sm text-sb-gray-dark">{role}</p>
          </div>
        </div>
      </div>

      {/* Décoration de fond */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.3 }}
        className="absolute -bottom-10 -right-10 w-40 h-40 bg-sb-green/5 rounded-full"
      />
    </motion.div>
  )
}