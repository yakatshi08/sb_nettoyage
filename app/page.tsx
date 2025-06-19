import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

export default function HomePage() {
  return (
    <>
      <Header />
      <main className="min-h-screen p-8">
        <h1 className="text-4xl font-bold text-sb-green">
          Bienvenue sur SB-Nettoyage
        </h1>
        <p className="mt-4 text-lg">
          Site en construction...
        </p>
      </main>
      <Footer />
    </>
  )
}