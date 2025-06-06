import { SearchForm } from "@/components/search-form"
import { FeatureGrid } from "@/components/feature-grid"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { HeroSection } from "@/components/hero-section"
import { StatsSection } from "@/components/stats-section"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
      <Header />
      <HeroSection />
      <main className="container mx-auto px-4">
        <SearchForm />
        <FeatureGrid />
        <StatsSection />
      </main>
      <Footer />
    </div>
  )
}
