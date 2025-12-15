import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import heroTajMahal from "@/assets/hero-taj-mahal.jpg";
import heroKerala from "@/assets/hero-kerala.jpg";
import heroLadakh from "@/assets/hero-ladakh.jpg";

const slides = [
  {
    image: heroTajMahal,
    title: "Golden Triangle Tour",
    subtitle: "Delhi • Agra • Jaipur",
    duration: "6 Nights - 7 Days",
    slug: "golden-triangle",
  },
  {
    image: heroKerala,
    title: "Kerala Backwaters",
    subtitle: "God's Own Country",
    duration: "5 Nights - 6 Days",
    slug: "kerala",
  },
  {
    image: heroLadakh,
    title: "Leh Ladakh Adventure",
    subtitle: "Land of High Passes",
    duration: "7 Nights - 8 Days",
    slug: "ladakh",
  },
];

export function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () =>
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <section className="relative h-[70vh] min-h-[500px] w-full lg:w-[45%] overflow-hidden rounded-none lg:rounded-2xl">
      {slides.map((slide, index) => (
        <Link
          key={index}
          to={`/destination/${slide.slug}`}
          className={`absolute inset-0 transition-opacity duration-700 block ${
            index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover"
          />
          <div className="image-overlay" />
          <div className="absolute bottom-0 left-0 right-0 p-8 text-primary-foreground">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-2 animate-fade-up">
              {slide.title}
            </h2>
            <p className="text-lg opacity-90 mb-1">{slide.subtitle}</p>
            <p className="text-sm opacity-75">{slide.duration}</p>
          </div>
        </Link>
      ))}

      {/* Navigation Arrows */}
      <div className="absolute bottom-8 right-8 flex gap-2 z-20">
        <Button
          variant="hero-outline"
          size="icon"
          onClick={(e) => { e.preventDefault(); prevSlide(); }}
          className="rounded-full"
        >
          <ChevronLeft className="w-5 h-5" />
        </Button>
        <Button
          variant="hero-outline"
          size="icon"
          onClick={(e) => { e.preventDefault(); nextSlide(); }}
          className="rounded-full"
        >
          <ChevronRight className="w-5 h-5" />
        </Button>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-8 flex gap-2 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={(e) => { e.preventDefault(); setCurrentSlide(index); }}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? "w-8 bg-primary-foreground"
                : "w-2 bg-primary-foreground/50"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
