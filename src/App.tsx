import React, { useState } from 'react';
import { 
  Menu, 
  X, 
  ArrowRight, 
  CheckCircle, 
  Users, 
  Building2, 
  Home, 
  Phone,
  Mail,
  MapPin,
  Star,
  Calendar,
  Clock,
  Shield,
  Sparkles,
  Award,
  Bot,
  Calculator,
  CreditCard,
  Briefcase
} from 'lucide-react';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-300 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <div className="bg-orange-500 p-2 rounded-lg">
                <Sparkles className="h-6 w-6 text-white" />
              </div>
              <div className="ml-3">
                <span className="text-xl font-bold text-green-800">Save BOULAY</span>
                <div className="text-sm text-orange-500 font-medium">Sb-Nettoyage</div>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              <a href="#accueil" className="text-gray-600 hover:text-green-800 font-medium transition-colors">
                Accueil
              </a>
              <a href="#services" className="text-gray-600 hover:text-green-800 font-medium transition-colors">
                Services
              </a>
              <a href="#secteurs" className="text-gray-600 hover:text-green-800 font-medium transition-colors">
                Secteurs
              </a>
              <a href="#reservation" className="text-gray-600 hover:text-green-800 font-medium transition-colors">
                Réservation
              </a>
              <a href="#contact" className="text-gray-600 hover:text-green-800 font-medium transition-colors">
                Contact
              </a>
            </nav>

            {/* CTA Buttons */}
            <div className="hidden md:flex space-x-3">
              <button className="border-2 border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white px-4 py-2 rounded-lg font-medium transition-colors">
                Devis Gratuit
              </button>
              <button className="bg-green-800 hover:bg-green-900 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                Réserver Maintenant
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={toggleMenu}
                className="text-gray-600 hover:text-green-800 transition-colors"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden border-t border-gray-300 py-4">
              <nav className="flex flex-col space-y-4">
                <a href="#accueil" className="text-gray-600 hover:text-green-800 font-medium transition-colors">
                  Accueil
                </a>
                <a href="#services" className="text-gray-600 hover:text-green-800 font-medium transition-colors">
                  Services
                </a>
                <a href="#secteurs" className="text-gray-600 hover:text-green-800 font-medium transition-colors">
                  Secteurs
                </a>
                <a href="#reservation" className="text-gray-600 hover:text-green-800 font-medium transition-colors">
                  Réservation
                </a>
                <a href="#contact" className="text-gray-600 hover:text-green-800 font-medium transition-colors">
                  Contact
                </a>
                <div className="flex flex-col space-y-2 pt-4">
                  <button className="border-2 border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white px-4 py-2 rounded-lg font-medium transition-colors">
                    Devis Gratuit
                  </button>
                  <button className="bg-green-800 hover:bg-green-900 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                    Réserver Maintenant
                  </button>
                </div>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section id="accueil" className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-green-800 mb-6">
              Nettoyage Professionnel<br />
              <span className="text-orange-500">Commercial & Industriel</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Save BOULAY vous accompagne avec des solutions de nettoyage sur mesure pour entreprises, 
              collectivités et particuliers. Réservation en ligne, devis automatisé et IA conversationnelle.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-green-800 hover:bg-green-900 text-white px-8 py-4 rounded-lg font-medium text-lg transition-colors flex items-center justify-center group">
                Réserver un Service
                <Calendar className="ml-2 h-5 w-5 text-orange-500 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="border-2 border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white px-8 py-4 rounded-lg font-medium text-lg transition-colors flex items-center justify-center">
                Devis Automatique
                <Calculator className="ml-2 h-5 w-5" />
              </button>
            </div>
            
            {/* AI Assistant Badge */}
            <div className="mt-8 inline-flex items-center bg-orange-100 px-4 py-2 rounded-full">
              <Bot className="h-5 w-5 text-orange-500 mr-2" />
              <span className="text-orange-600 font-medium">Premier site du secteur avec IA conversationnelle</span>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="bg-gray-200 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-green-800 mb-4">
              Nos Services de Nettoyage
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Solutions complètes adaptées à tous vos besoins professionnels et particuliers
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Service 1 - Commercial */}
            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-lg transition-shadow">
              <div className="bg-orange-100 w-16 h-16 rounded-lg flex items-center justify-center mb-6">
                <Building2 className="h-8 w-8 text-orange-500" />
              </div>
              <h3 className="text-xl font-bold text-green-800 mb-4">Nettoyage Commercial</h3>
              <p className="text-gray-600 mb-6">
                Services professionnels pour bureaux, commerces et espaces de travail avec maintenance régulière.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center text-gray-600">
                  <CheckCircle className="h-4 w-4 text-orange-500 mr-2" />
                  Bureaux et open-spaces
                </li>
                <li className="flex items-center text-gray-600">
                  <CheckCircle className="h-4 w-4 text-orange-500 mr-2" />
                  Commerces et boutiques
                </li>
                <li className="flex items-center text-gray-600">
                  <CheckCircle className="h-4 w-4 text-orange-500 mr-2" />
                  Maintenance quotidienne
                </li>
              </ul>
            </div>

            {/* Service 2 - Industriel */}
            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-lg transition-shadow">
              <div className="bg-orange-100 w-16 h-16 rounded-lg flex items-center justify-center mb-6">
                <Briefcase className="h-8 w-8 text-orange-500" />
              </div>
              <h3 className="text-xl font-bold text-green-800 mb-4">Nettoyage Industriel</h3>
              <p className="text-gray-600 mb-6">
                Solutions spécialisées pour environnements industriels avec équipements professionnels.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center text-gray-600">
                  <CheckCircle className="h-4 w-4 text-orange-500 mr-2" />
                  Usines et ateliers
                </li>
                <li className="flex items-center text-gray-600">
                  <CheckCircle className="h-4 w-4 text-orange-500 mr-2" />
                  Entrepôts logistiques
                </li>
                <li className="flex items-center text-gray-600">
                  <CheckCircle className="h-4 w-4 text-orange-500 mr-2" />
                  Nettoyage spécialisé
                </li>
              </ul>
            </div>

            {/* Service 3 - Particuliers */}
            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-lg transition-shadow">
              <div className="bg-orange-100 w-16 h-16 rounded-lg flex items-center justify-center mb-6">
                <Home className="h-8 w-8 text-orange-500" />
              </div>
              <h3 className="text-xl font-bold text-green-800 mb-4">Nettoyage Particuliers</h3>
              <p className="text-gray-600 mb-6">
                Services personnalisés pour maisons et appartements avec flexibilité horaire.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center text-gray-600">
                  <CheckCircle className="h-4 w-4 text-orange-500 mr-2" />
                  Maisons individuelles
                </li>
                <li className="flex items-center text-gray-600">
                  <CheckCircle className="h-4 w-4 text-orange-500 mr-2" />
                  Appartements
                </li>
                <li className="flex items-center text-gray-600">
                  <CheckCircle className="h-4 w-4 text-orange-500 mr-2" />
                  Horaires flexibles
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Secteurs Section */}
      <section id="secteurs" className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-green-800 mb-4">
              Nos Secteurs d'Intervention
            </h2>
            <p className="text-xl text-gray-600">
              Une expertise reconnue dans tous les domaines
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center p-6 bg-gray-200 rounded-xl hover:bg-orange-100 transition-colors">
              <Building2 className="h-12 w-12 text-orange-500 mx-auto mb-4" />
              <h3 className="font-bold text-green-800 mb-2">Entreprises B2B</h3>
              <p className="text-gray-600 text-sm">Bureaux, commerces, industries</p>
            </div>
            
            <div className="text-center p-6 bg-gray-200 rounded-xl hover:bg-orange-100 transition-colors">
              <Home className="h-12 w-12 text-orange-500 mx-auto mb-4" />
              <h3 className="font-bold text-green-800 mb-2">Particuliers B2C</h3>
              <p className="text-gray-600 text-sm">Maisons, appartements</p>
            </div>
            
            <div className="text-center p-6 bg-gray-200 rounded-xl hover:bg-orange-100 transition-colors">
              <Users className="h-12 w-12 text-orange-500 mx-auto mb-4" />
              <h3 className="font-bold text-green-800 mb-2">Collectivités</h3>
              <p className="text-gray-600 text-sm">Administrations, écoles, hôpitaux</p>
            </div>
            
            <div className="text-center p-6 bg-gray-200 rounded-xl hover:bg-orange-100 transition-colors">
              <Shield className="h-12 w-12 text-orange-500 mx-auto mb-4" />
              <h3 className="font-bold text-green-800 mb-2">Secteurs Spécialisés</h3>
              <p className="text-gray-600 text-sm">Médical, alimentaire, laboratoires</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gray-200 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-green-800 mb-4">
              Fonctionnalités Innovantes
            </h2>
            <p className="text-xl text-gray-600">
              Une expérience digitale moderne et automatisée
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-sm text-center">
              <Calendar className="h-12 w-12 text-orange-500 mx-auto mb-4" />
              <h3 className="font-bold text-green-800 mb-2">Réservation en Ligne</h3>
              <p className="text-gray-600 text-sm">Calendrier interactif pour programmer vos services</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm text-center">
              <Calculator className="h-12 w-12 text-orange-500 mx-auto mb-4" />
              <h3 className="font-bold text-green-800 mb-2">Devis Automatique</h3>
              <p className="text-gray-600 text-sm">Génération instantanée de devis personnalisés</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm text-center">
              <CreditCard className="h-12 w-12 text-orange-500 mx-auto mb-4" />
              <h3 className="font-bold text-green-800 mb-2">Paiement Sécurisé</h3>
              <p className="text-gray-600 text-sm">Transactions en ligne sécurisées et simplifiées</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm text-center">
              <Bot className="h-12 w-12 text-orange-500 mx-auto mb-4" />
              <h3 className="font-bold text-green-800 mb-2">IA Conversationnelle</h3>
              <p className="text-gray-600 text-sm">Assistant intelligent pour vos questions 24/7</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl md:text-4xl font-bold text-green-800 mb-2">500+</div>
              <div className="text-gray-600 font-medium">Clients Satisfaits</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-green-800 mb-2">15</div>
              <div className="text-gray-600 font-medium">Années d'Expérience</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-green-800 mb-2">24/7</div>
              <div className="text-gray-600 font-medium">Service Client</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-green-800 mb-2">100%</div>
              <div className="text-gray-600 font-medium">Satisfaction Garantie</div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-gray-200 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-green-800 mb-4">
              Témoignages Clients
            </h2>
            <p className="text-xl text-gray-600">
              La satisfaction de nos clients est notre priorité
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-orange-500">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-orange-500 fill-current" />
                ))}
              </div>
              <p className="text-gray-600 mb-4">
                "Service impeccable et équipe très professionnelle. La réservation en ligne est un vrai plus !"
              </p>
              <div>
                <div className="font-bold text-green-800">Marie Dubois</div>
                <div className="text-gray-500 text-sm">Directrice, TechCorp</div>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-orange-500">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-orange-500 fill-current" />
                ))}
              </div>
              <p className="text-gray-600 mb-4">
                "Excellent rapport qualité-prix. L'IA conversationnelle répond à toutes nos questions rapidement."
              </p>
              <div>
                <div className="font-bold text-green-800">Pierre Martin</div>
                <div className="text-gray-500 text-sm">Gérant, Commerce Local</div>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-orange-500">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-orange-500 fill-current" />
                ))}
              </div>
              <p className="text-gray-600 mb-4">
                "Ponctualité et qualité au rendez-vous. Le système de devis automatique est très pratique."
              </p>
              <div>
                <div className="font-bold text-green-800">Sophie Laurent</div>
                <div className="text-gray-500 text-sm">Responsable, Clinique Médicale</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reservation Section */}
      <section id="reservation" className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-green-800 mb-4">
              Réservation & Devis
            </h2>
            <p className="text-xl text-gray-600">
              Réservez votre service en quelques clics ou obtenez un devis instantané
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Reservation Form */}
            <div className="bg-gray-200 p-8 rounded-xl">
              <h3 className="text-2xl font-bold text-green-800 mb-6">Réserver un Service</h3>
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-green-800 mb-2">
                      Type de Client
                    </label>
                    <select className="w-full px-4 py-3 rounded-lg border border-gray-400 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors">
                      <option>Entreprise (B2B)</option>
                      <option>Particulier (B2C)</option>
                      <option>Collectivité</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-green-800 mb-2">
                      Type de Service
                    </label>
                    <select className="w-full px-4 py-3 rounded-lg border border-gray-400 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors">
                      <option>Nettoyage Commercial</option>
                      <option>Nettoyage Industriel</option>
                      <option>Nettoyage Particulier</option>
                      <option>Maintenance Régulière</option>
                    </select>
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-green-800 mb-2">
                      Date Souhaitée
                    </label>
                    <input 
                      type="date" 
                      className="w-full px-4 py-3 rounded-lg border border-gray-400 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-green-800 mb-2">
                      Heure Préférée
                    </label>
                    <select className="w-full px-4 py-3 rounded-lg border border-gray-400 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors">
                      <option>Matin (8h-12h)</option>
                      <option>Après-midi (12h-17h)</option>
                      <option>Soir (17h-20h)</option>
                    </select>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-green-800 mb-2">
                    Surface à Nettoyer (m²)
                  </label>
                  <input 
                    type="number" 
                    className="w-full px-4 py-3 rounded-lg border border-gray-400 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                    placeholder="Ex: 100"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-green-800 mb-2">
                    Informations Complémentaires
                  </label>
                  <textarea 
                    rows={4}
                    className="w-full px-4 py-3 rounded-lg border border-gray-400 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                    placeholder="Décrivez vos besoins spécifiques..."
                  ></textarea>
                </div>
                
                <button 
                  type="submit"
                  className="w-full bg-green-800 hover:bg-green-900 text-white py-4 rounded-lg font-medium transition-colors flex items-center justify-center group"
                >
                  Réserver Maintenant
                  <Calendar className="ml-2 h-5 w-5 text-orange-500 group-hover:scale-110 transition-transform" />
                </button>
              </form>
            </div>

            {/* Quick Quote */}
            <div>
              <h3 className="text-2xl font-bold text-green-800 mb-6">Devis Automatique</h3>
              
              <div className="bg-orange-100 p-6 rounded-xl mb-6">
                <div className="flex items-center mb-4">
                  <Calculator className="h-8 w-8 text-orange-500 mr-3" />
                  <h4 className="text-lg font-bold text-green-800">Calculateur Instantané</h4>
                </div>
                <p className="text-gray-600 mb-4">
                  Obtenez un devis personnalisé en temps réel grâce à notre système automatisé.
                </p>
                <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-medium transition-colors">
                  Calculer mon Devis
                </button>
              </div>

              <div className="space-y-4">
                <div className="flex items-center p-4 bg-white rounded-lg border border-gray-300">
                  <Clock className="h-6 w-6 text-orange-500 mr-3" />
                  <div>
                    <div className="font-bold text-green-800">Réponse Immédiate</div>
                    <div className="text-gray-600 text-sm">Devis généré en moins de 2 minutes</div>
                  </div>
                </div>
                
                <div className="flex items-center p-4 bg-white rounded-lg border border-gray-300">
                  <CreditCard className="h-6 w-6 text-orange-500 mr-3" />
                  <div>
                    <div className="font-bold text-green-800">Paiement Sécurisé</div>
                    <div className="text-gray-600 text-sm">Transactions protégées et simplifiées</div>
                  </div>
                </div>
                
                <div className="flex items-center p-4 bg-white rounded-lg border border-gray-300">
                  <Shield className="h-6 w-6 text-orange-500 mr-3" />
                  <div>
                    <div className="font-bold text-green-800">Garantie Qualité</div>
                    <div className="text-gray-600 text-sm">Satisfaction 100% garantie</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="bg-gray-200 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-green-800 mb-4">
              Contactez-nous
            </h2>
            <p className="text-xl text-gray-600">
              Notre équipe est à votre disposition pour tous vos projets
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div>
              <h3 className="text-2xl font-bold text-green-800 mb-8">Save BOULAY - Sb-Nettoyage</h3>
              
              <div className="space-y-6">
                <div className="flex items-center">
                  <div className="bg-orange-100 p-3 rounded-lg mr-4">
                    <Phone className="h-6 w-6 text-orange-500" />
                  </div>
                  <div>
                    <div className="font-bold text-green-800">Téléphone</div>
                    <div className="text-gray-600">+33 1 23 45 67 89</div>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="bg-orange-100 p-3 rounded-lg mr-4">
                    <Mail className="h-6 w-6 text-orange-500" />
                  </div>
                  <div>
                    <div className="font-bold text-green-800">Email</div>
                    <div className="text-gray-600">contact@sb-nettoyage.fr</div>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="bg-orange-100 p-3 rounded-lg mr-4">
                    <MapPin className="h-6 w-6 text-orange-500" />
                  </div>
                  <div>
                    <div className="font-bold text-green-800">Adresse</div>
                    <div className="text-gray-600">Zone d'intervention étendue<br />Région Parisienne et environs</div>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="bg-orange-100 p-3 rounded-lg mr-4">
                    <Bot className="h-6 w-6 text-orange-500" />
                  </div>
                  <div>
                    <div className="font-bold text-green-800">Assistant IA</div>
                    <div className="text-gray-600">Disponible 24h/24 pour vos questions</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white p-8 rounded-xl">
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-green-800 mb-2">
                      Prénom
                    </label>
                    <input 
                      type="text" 
                      className="w-full px-4 py-3 rounded-lg border border-gray-400 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                      placeholder="Votre prénom"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-green-800 mb-2">
                      Nom
                    </label>
                    <input 
                      type="text" 
                      className="w-full px-4 py-3 rounded-lg border border-gray-400 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                      placeholder="Votre nom"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-green-800 mb-2">
                    Email
                  </label>
                  <input 
                    type="email" 
                    className="w-full px-4 py-3 rounded-lg border border-gray-400 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                    placeholder="votre@email.com"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-green-800 mb-2">
                    Type de Demande
                  </label>
                  <select className="w-full px-4 py-3 rounded-lg border border-gray-400 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors">
                    <option>Demande de devis</option>
                    <option>Information sur les services</option>
                    <option>Réclamation</option>
                    <option>Partenariat</option>
                    <option>Autre</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-green-800 mb-2">
                    Message
                  </label>
                  <textarea 
                    rows={5}
                    className="w-full px-4 py-3 rounded-lg border border-gray-400 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                    placeholder="Décrivez votre demande..."
                  ></textarea>
                </div>
                
                <button 
                  type="submit"
                  className="w-full bg-green-800 hover:bg-green-900 text-white py-4 rounded-lg font-medium transition-colors flex items-center justify-center group"
                >
                  Envoyer le Message
                  <ArrowRight className="ml-2 h-5 w-5 text-orange-500 group-hover:translate-x-1 transition-transform" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-green-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            {/* Company Info */}
            <div>
              <div className="flex items-center mb-4">
                <div className="bg-orange-500 p-2 rounded-lg">
                  <Sparkles className="h-6 w-6 text-white" />
                </div>
                <div className="ml-3">
                  <span className="text-xl font-bold">Save BOULAY</span>
                  <div className="text-sm text-orange-400 font-medium">Sb-Nettoyage</div>
                </div>
              </div>
              <p className="text-green-200 mb-4">
                Votre partenaire de confiance pour tous vos besoins de nettoyage professionnel et particulier.
              </p>
            </div>

            {/* Services */}
            <div>
              <h4 className="text-lg font-bold mb-4">Services</h4>
              <ul className="space-y-2 text-green-200">
                <li><a href="#" className="hover:text-orange-400 transition-colors">Nettoyage Commercial</a></li>
                <li><a href="#" className="hover:text-orange-400 transition-colors">Nettoyage Industriel</a></li>
                <li><a href="#" className="hover:text-orange-400 transition-colors">Nettoyage Particuliers</a></li>
                <li><a href="#" className="hover:text-orange-400 transition-colors">Maintenance Régulière</a></li>
              </ul>
            </div>

            {/* Secteurs */}
            <div>
              <h4 className="text-lg font-bold mb-4">Secteurs</h4>
              <ul className="space-y-2 text-green-200">
                <li><a href="#" className="hover:text-orange-400 transition-colors">Entreprises B2B</a></li>
                <li><a href="#" className="hover:text-orange-400 transition-colors">Particuliers B2C</a></li>
                <li><a href="#" className="hover:text-orange-400 transition-colors">Collectivités</a></li>
                <li><a href="#" className="hover:text-orange-400 transition-colors">Secteurs Spécialisés</a></li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-lg font-bold mb-4">Contact</h4>
              <ul className="space-y-2 text-green-200">
                <li className="flex items-center">
                  <Phone className="h-4 w-4 text-orange-500 mr-2" />
                  +33 1 23 45 67 89
                </li>
                <li className="flex items-center">
                  <Mail className="h-4 w-4 text-orange-500 mr-2" />
                  contact@sb-nettoyage.fr
                </li>
                <li className="flex items-center">
                  <Bot className="h-4 w-4 text-orange-500 mr-2" />
                  Assistant IA 24/7
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-green-700 mt-8 pt-8 text-center">
            <p className="text-green-200">
              © 2024 Save BOULAY - Sb-Nettoyage. Tous droits réservés. | Premier site du secteur avec IA conversationnelle
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;