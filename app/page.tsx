"use client"

import { HeroSection } from "@/components/hero-section"
import { SearchForm } from "@/components/search-form"
import { FeatureGrid } from "@/components/feature-grid"
import { StatsSection } from "@/components/stats-section"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
      <Header />
      <HeroSection />
      <SearchForm />
      <FeatureGrid />
      <StatsSection />
      <Footer />
    </div>
  )
}
