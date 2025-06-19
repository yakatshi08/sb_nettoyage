/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Palette principale SB-Nettoyage
        'sb-green': {
          DEFAULT: '#006400', // Vert foncé principal
          hover: '#004d00',   // Vert hover
          light: '#00850018', // Vert très clair pour fonds
        },
        'sb-orange': {
          DEFAULT: '#FFA500', // Orange principal
          light: '#FFB84D',   // Orange clair états actifs
          hover: '#FF9500',   // Orange hover
        },
        'sb-gray': {
          light: '#D3D3D3',   // Gris clair fonds
          border: '#BDBDBD',  // Gris bordures
          dark: '#666666',    // Gris texte secondaire
        }
      },
      fontFamily: {
        sans: ['Inter', 'Roboto', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-slow': 'bounce 2s infinite',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      boxShadow: {
        'sb': '0 4px 20px rgba(0, 100, 0, 0.1)',
        'sb-hover': '0 8px 30px rgba(0, 100, 0, 0.15)',
        'orange': '0 4px 20px rgba(255, 165, 0, 0.2)',
      },
      backgroundImage: {
        'gradient-sb': 'linear-gradient(135deg, #006400 0%, #004d00 100%)',
        'gradient-orange': 'linear-gradient(135deg, #FFA500 0%, #FFB84D 100%)',
      },
    },
  },
  plugins: [],
}