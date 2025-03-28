/**
 * Home Page Component
 * 
 * The main landing page of the Best Buy Autos Prestige website.
 * Composed of multiple sections that showcase different aspects of the business.
 * Uses a modular component structure for maintainability and reusability.
 */

import { Header } from "@/components/header";
import { HeroSection } from "@/components/hero-section";
import { FeaturedCars } from "@/components/featured-cars";
import { AboutSection } from "@/components/about-section";
import { Testimonials } from "@/components/testimonials";
import { CTASection } from "@/components/cta-section";
import { Footer } from "@/components/footer";

/**
 * Home Component
 * 
 * The root component of the landing page that assembles all sections.
 * Uses a flex column layout to ensure footer stays at bottom.
 * 
 * Component Structure:
 * - Header: Navigation and branding
 * - HeroSection: Main banner with key messaging
 * - FeaturedCars: Showcase of highlighted vehicles
 * - AboutSection: Company information and value proposition
 * - Testimonials: Customer reviews and feedback
 * - CTASection: Call-to-action for user engagement
 * - Footer: Site links and contact information
 */
export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header with navigation */}
      <Header />

      {/* Main content area */}
      <main className="flex-grow">
        {/* Hero section with main banner */}
        <HeroSection />

        {/* Featured vehicles showcase */}
        <FeaturedCars />

        {/* About us section */}
        <AboutSection />

        {/* Customer testimonials */}
        <Testimonials />

        {/* Call-to-action section */}
        <CTASection />
      </main>

      {/* Footer with site links */}
      <Footer />
    </div>
  );
}
