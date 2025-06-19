'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { LucideIcon, ArrowRight } from 'lucide-react'

interface ServiceCardProps {
  title: string
  description: string
  icon: LucideIcon
  image: string
  link: string
  color: 'green' | 'orange'
}

export default function ServiceCard({ 
  title, 
  description, 
  icon: Icon, 
  image, 
  link, 
  color 
}: ServiceCardProps) {
  const colorClasses = {
    green: {
      bg: 'bg-sb-green',
      hover: 'hover:bg-sb-green-hover',
      text: 'text-sb-green',
      border: 'border-sb-green'
    },
    orange: {
      bg: 'bg-sb-orange',
      hover: 'hover:bg-sb-orange-hover',
      text: 'text-sb-orange',
      border: 'border-sb-orange'
    }
  }

  const classes = colorClasses[color]

  return (
    <Link href={link}>
      <motion.div
        whileHover={{ 
          rotateY: 5,
          translateZ: 50,
          scale: 1.05
        }}
        transition={{ type: "spring", stiffness: 300 }}
        className="relative h-full bg-white rounded-xl overflow-hidden shadow-sb hover:shadow-sb-hover transition-all duration-300 cursor-pointer group"
        style={{ transformStyle: 'preserve-3d', perspective: 1000 }}
      >
        {/* Image avec overlay */}
        <div className="relative h-48 overflow-hidden">
          <Image
            src={image}
            alt={title}
            width={400}
            height={300}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className={`absolute inset-0 ${classes.bg} opacity-0 group-hover:opacity-80 transition-opacity duration-300`} />
          
          {/* Icône flottante */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            whileInView={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", delay: 0.2 }}
            className={`absolute top-4 right-4 ${classes.bg} p-3 rounded-full shadow-lg`}
          >
            <Icon className="w-6 h-6 text-white" />
          </motion.div>
        </div>

        {/* Contenu */}
        <div className="p-6">
          <h3 className={`text-xl font-bold mb-2 ${classes.text}`}>
            {title}
          </h3>
          <p className="text-sb-gray-dark mb-4">
            {description}
          </p>
          
          {/* Bouton animé */}
          <motion.div
            className={`flex items-center ${classes.text} font-semibold group`}
            whileHover={{ x: 5 }}
          >
            <span className="mr-2">En savoir plus</span>
            <motion.div
              animate={{ x: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              <ArrowRight className="w-5 h-5" />
            </motion.div>
          </motion.div>
        </div>

        {/* Badge "Nouveau" ou "Populaire" */}
        {title.includes('IA') && (
          <div className="absolute top-4 left-4 bg-sb-orange text-white px-3 py-1 rounded-full text-sm font-semibold shadow-md">
            Nouveau
          </div>
        )}
      </motion.div>
    </Link>
  )
}