import { Header } from "@/components/header";
import { HeroSection } from "@/components/hero-section";
import { FeaturedCars } from "@/components/featured-cars";
import { AboutSection } from "@/components/about-section";
import { Testimonials } from "@/components/testimonials";
import { CTASection } from "@/components/cta-section";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <HeroSection />
        <FeaturedCars />
        <AboutSection />
        <Testimonials />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
