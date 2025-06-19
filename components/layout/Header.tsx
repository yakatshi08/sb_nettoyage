'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Phone, Mail, MapPin, ChevronDown } from 'lucide-react'

const navigationItems = [
  { 
    name: 'Accueil', 
    href: '/' 
  },
  { 
    name: 'Services', 
    href: '/services',
    subItems: [
      { name: 'Nettoyage Commercial', href: '/services/commercial' },
      { name: 'Nettoyage Industriel', href: '/services/industriel' },
      { name: 'Nettoyage Particuliers', href: '/services/particuliers' },
      { name: 'Collectivités', href: '/services/collectivites' },
    ]
  },
  { 
    name: 'Réservation', 
    href: '/reservation' 
  },
  { 
    name: 'Devis Gratuit', 
    href: '/devis' 
  },
  { 
    name: 'À Propos', 
    href: '/a-propos' 
  },
  { 
    name: 'Contact', 
    href: '/contact' 
  },
]

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      {/* Top Bar */}
      <div className="bg-sb-green text-white py-2">
        <div className="container-custom">
          <div className="flex flex-wrap justify-between items-center text-sm">
            <div className="flex items-center space-x-4 md:space-x-6">
              <a href="tel:+33123456789" className="flex items-center hover:text-sb-orange transition-colors">
                <Phone className="w-4 h-4 mr-1" />
                01 23 45 67 89
              </a>
              <a href="mailto:contact@sb-nettoyage.com" className="flex items-center hover:text-sb-orange transition-colors">
                <Mail className="w-4 h-4 mr-1" />
                contact@sb-nettoyage.com
              </a>
            </div>
            <div className="flex items-center">
              <MapPin className="w-4 h-4 mr-1" />
              <span>Paris & Île-de-France</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled ? 'bg-white shadow-lg' : 'bg-white/95 backdrop-blur-md'
        }`}
      >
        <nav className="container-custom">
          <div className="flex justify-between items-center py-4">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="text-2xl font-bold text-sb-green"
              >
                SB-Nettoyage
              </motion.div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              {navigationItems.map((item) => (
                <div key={item.name} className="relative">
                  {item.subItems ? (
                    <div
                      onMouseEnter={() => setActiveDropdown(item.name)}
                      onMouseLeave={() => setActiveDropdown(null)}
                    >
                      <button className="flex items-center text-gray-700 hover:text-sb-green font-medium transition-colors">
                        {item.name}
                        <ChevronDown className="w-4 h-4 ml-1" />
                      </button>
                      
                      <AnimatePresence>
                        {activeDropdown === item.name && (
                          <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                            className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-xl py-2 z-50"
                          >
                            {item.subItems.map((subItem) => (
                              <Link
                                key={subItem.name}
                                href={subItem.href}
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-sb-green/10 hover:text-sb-green transition-colors"
                              >
                                {subItem.name}
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <Link
                      href={item.href}
                      className="text-gray-700 hover:text-sb-green font-medium transition-colors"
                    >
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}

              {/* CTA Buttons */}
              <div className="flex items-center space-x-4">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link href="/reservation" className="btn-primary">
                    Réserver
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link href="/devis" className="btn-secondary">
                    Devis Gratuit
                  </Link>
                </motion.div>
              </div>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden text-gray-700 hover:text-sb-green transition-colors"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </nav>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden overflow-hidden bg-white border-t border-sb-gray-border"
            >
              <nav className="container-custom py-4">
                {navigationItems.map((item) => (
                  <div key={item.name}>
                    {item.subItems ? (
                      <div className="mb-2">
                        <button
                          onClick={() => setActiveDropdown(activeDropdown === item.name ? null : item.name)}
                          className="w-full text-left py-2 text-gray-700 hover:text-sb-green font-medium transition-colors flex items-center justify-between"
                        >
                          {item.name}
                          <ChevronDown 
                            className={`w-4 h-4 transition-transform ${
                              activeDropdown === item.name ? 'rotate-180' : ''
                            }`} 
                          />
                        </button>
                        
                        <AnimatePresence>
                          {activeDropdown === item.name && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="pl-4"
                            >
                              {item.subItems.map((subItem) => (
                                <Link
                                  key={subItem.name}
                                  href={subItem.href}
                                  className="block py-2 text-sm text-gray-600 hover:text-sb-green transition-colors"
                                  onClick={() => setIsOpen(false)}
                                >
                                  {subItem.name}
                                </Link>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ) : (
                      <Link
                        href={item.href}
                        className="block py-2 text-gray-700 hover:text-sb-green font-medium transition-colors"
                        onClick={() => setIsOpen(false)}
                      >
                        {item.name}
                      </Link>
                    )}
                  </div>
                ))}
                
                {/* Mobile CTA Buttons */}
                <div className="mt-4 space-y-2">
                  <Link 
                    href="/reservation" 
                    className="btn-primary w-full text-center"
                    onClick={() => setIsOpen(false)}
                  >
                    Réserver Maintenant
                  </Link>
                  <Link 
                    href="/devis" 
                    className="btn-secondary w-full text-center"
                    onClick={() => setIsOpen(false)}
                  >
                    Devis Gratuit
                  </Link>
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  )
}