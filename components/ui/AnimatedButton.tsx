'use client'

import { motion, HTMLMotionProps } from 'framer-motion'
import { LucideIcon } from 'lucide-react'
import { forwardRef } from 'react'

interface AnimatedButtonProps extends HTMLMotionProps<"button"> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  icon?: LucideIcon
  iconPosition?: 'left' | 'right'
  fullWidth?: boolean
  loading?: boolean
}

const AnimatedButton = forwardRef<HTMLButtonElement, AnimatedButtonProps>(
  ({ 
    children, 
    variant = 'primary', 
    size = 'md',
    icon: Icon,
    iconPosition = 'left',
    fullWidth = false,
    loading = false,
    className = '',
    disabled,
    ...props 
  }, ref) => {
    
    const variants = {
      primary: 'bg-sb-green text-white hover:bg-sb-green-hover focus:ring-sb-green/20',
      secondary: 'bg-sb-orange text-white hover:bg-sb-orange-hover focus:ring-sb-orange/20',
      outline: 'border-2 border-sb-green text-sb-green hover:bg-sb-green hover:text-white focus:ring-sb-green/20',
      ghost: 'text-sb-green hover:bg-sb-green/10 focus:ring-sb-green/20'
    }
    
    const sizes = {
      sm: 'px-4 py-2 text-sm',
      md: 'px-6 py-3 text-base',
      lg: 'px-8 py-4 text-lg'
    }
    
    const iconSizes = {
      sm: 'w-4 h-4',
      md: 'w-5 h-5',
      lg: 'w-6 h-6'
    }
    
    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: disabled || loading ? 1 : 1.05 }}
        whileTap={{ scale: disabled || loading ? 1 : 0.95 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        className={`
          ${variants[variant]}
          ${sizes[size]}
          ${fullWidth ? 'w-full' : ''}
          inline-flex items-center justify-center
          font-semibold rounded-lg
          transition-all duration-300
          focus:outline-none focus:ring-4
          disabled:opacity-50 disabled:cursor-not-allowed
          ${className}
        `}
        disabled={disabled || loading}
        {...props}
      >
        {loading ? (
          <>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className={`${iconSizes[size]} mr-2`}
            >
              <svg className="animate-spin" fill="none" viewBox="0 0 24 24">
                <circle 
                  className="opacity-25" 
                  cx="12" 
                  cy="12" 
                  r="10" 
                  stroke="currentColor" 
                  strokeWidth="4"
                />
                <path 
                  className="opacity-75" 
                  fill="currentColor" 
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
            </motion.div>
            Chargement...
          </>
        ) : (
          <>
            {Icon && iconPosition === 'left' && (
              <Icon className={`${iconSizes[size]} mr-2`} />
            )}
            {children}
            {Icon && iconPosition === 'right' && (
              <Icon className={`${iconSizes[size]} ml-2`} />
            )}
          </>
        )}
      </motion.button>
    )
  }
)

AnimatedButton.displayName = 'AnimatedButton'

export default AnimatedButton