'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X, Send, Bot, User } from 'lucide-react'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

export default function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Bonjour ! Je suis Sam, votre assistant SB-Nettoyage 👋 Comment puis-je vous aider aujourd\'hui ?',
      timestamp: new Date()
    }
  ])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)

  // Message de bienvenue après 3 secondes
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isOpen) {
        // Animation pulse sur le bouton
        const button = document.getElementById('chatbot-button')
        button?.classList.add('animate-pulse-slow')
        setTimeout(() => {
          button?.classList.remove('animate-pulse-slow')
        }, 3000)
      }
    }, 3000)
    return () => clearTimeout(timer)
  }, [isOpen])

  const handleSend = async () => {
    if (!input.trim()) return

    // Ajouter le message de l'utilisateur
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date()
    }
    
    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsTyping(true)

    // Simuler une réponse après un délai
    setTimeout(() => {
      const responses = [
        'Je peux vous aider à réserver un service de nettoyage. Quel type de service recherchez-vous ?',
        'Souhaitez-vous obtenir un devis gratuit ? Je peux calculer cela pour vous instantanément.',
        'Nos équipes sont disponibles du lundi au samedi. Quelle date vous conviendrait ?',
        'Je peux vous proposer nos services de nettoyage commercial, industriel ou pour particuliers. Lequel vous intéresse ?'
      ]
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: responses[Math.floor(Math.random() * responses.length)],
        timestamp: new Date()
      }
      
      setMessages(prev => [...prev, assistantMessage])
      setIsTyping(false)
    }, 1500)
  }

  return (
    <>
      {/* Bouton flottant */}
      <motion.button
        id="chatbot-button"
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 bg-sb-green text-white p-4 rounded-full shadow-lg hover:bg-sb-green-hover transition-all duration-300 z-40 ${
          isOpen ? 'hidden' : 'block'
        }`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <MessageCircle className="w-6 h-6" />
        
        {/* Badge de notification */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute -top-1 -right-1 bg-sb-orange w-3 h-3 rounded-full"
        />
      </motion.button>

      {/* Fenêtre de chat */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="fixed bottom-6 right-6 w-96 h-[600px] bg-white rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-sb-green text-white p-4 flex items-center justify-between">
              <div className="flex items-center">
                <div className="bg-white/20 p-2 rounded-full mr-3">
                  <Bot className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold">Sam - Assistant IA</h3>
                  <p className="text-xs text-white/80">En ligne 24/7</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="hover:bg-white/20 p-2 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex items-start max-w-[80%] ${
                    message.role === 'user' ? 'flex-row-reverse' : ''
                  }`}>
                    <div className={`p-2 rounded-full ${
                      message.role === 'user' ? 'bg-sb-orange ml-2' : 'bg-sb-gray-light mr-2'
                    }`}>
                      {message.role === 'user' ? (
                        <User className="w-4 h-4 text-white" />
                      ) : (
                        <Bot className="w-4 h-4 text-sb-green" />
                      )}
                    </div>
                    <div className={`px-4 py-2 rounded-2xl ${
                      message.role === 'user' 
                        ? 'bg-sb-green text-white' 
                        : 'bg-sb-gray-light text-gray-800'
                    }`}>
                      <p className="text-sm">{message.content}</p>
                      <p className="text-xs opacity-70 mt-1">
                        {message.timestamp.toLocaleTimeString('fr-FR', { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
              
              {/* Indicateur de frappe */}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center"
                >
                  <div className="bg-sb-gray-light p-2 rounded-full mr-2">
                    <Bot className="w-4 h-4 text-sb-green" />
                  </div>
                  <div className="bg-sb-gray-light px-4 py-2 rounded-2xl">
                    <div className="flex space-x-1">
                      <motion.div
                        animate={{ opacity: [0.4, 1, 0.4] }}
                        transition={{ repeat: Infinity, duration: 1.5 }}
                        className="w-2 h-2 bg-sb-gray-dark rounded-full"
                      />
                      <motion.div
                        animate={{ opacity: [0.4, 1, 0.4] }}
                        transition={{ repeat: Infinity, duration: 1.5, delay: 0.2 }}
                        className="w-2 h-2 bg-sb-gray-dark rounded-full"
                      />
                      <motion.div
                        animate={{ opacity: [0.4, 1, 0.4] }}
                        transition={{ repeat: Infinity, duration: 1.5, delay: 0.4 }}
                        className="w-2 h-2 bg-sb-gray-dark rounded-full"
                      />
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Zone de saisie */}
            <div className="border-t border-sb-gray-border p-4">
              <div className="flex items-center bg-sb-gray-light/30 rounded-lg">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Tapez votre message..."
                  className="flex-1 bg-transparent px-4 py-3 outline-none"
                />
                <button
                  onClick={handleSend}
                  className="p-3 text-sb-green hover:bg-sb-green hover:text-white rounded-lg transition-colors"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
              
              {/* Suggestions rapides */}
              <div className="flex flex-wrap gap-2 mt-3">
                {['Obtenir un devis', 'Réserver', 'Nos services'].map((suggestion) => (
                  <button
                    key={suggestion}
                    onClick={() => setInput(suggestion)}
                    className="px-3 py-1 bg-sb-orange/10 text-sb-orange rounded-full text-sm hover:bg-sb-orange hover:text-white transition-colors"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}