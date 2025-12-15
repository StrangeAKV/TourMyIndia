import { Navbar } from "@/components/Navbar";
import { HeroCarousel } from "@/components/HeroCarousel";
import { CategoryCards } from "@/components/CategoryCards";
import { PopularPackages } from "@/components/PopularPackages";
import { Destinations } from "@/components/Destinations";
import { WhyChooseUs } from "@/components/WhyChooseUs";
import { Testimonials } from "@/components/Testimonials";
import { Footer } from "@/components/Footer";
import { AITravelPlanner } from "@/components/AITravelPlanner";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-20 min-h-screen flex flex-col lg:flex-row">
        <HeroCarousel />
        <CategoryCards />
      </section>

      <PopularPackages />
      <AITravelPlanner />
      <Destinations />
      <WhyChooseUs />
      <Testimonials />
      <Footer />
    </div>
  );
};

export default Index;
