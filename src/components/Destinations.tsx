import { MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import heroTajMahal from "@/assets/hero-taj-mahal.jpg";
import heroKerala from "@/assets/hero-kerala.jpg";
import heroLadakh from "@/assets/hero-ladakh.jpg";
import spiritualVaranasi from "@/assets/spiritual-varanasi.jpg";
import beachGoa from "@/assets/beach-goa.jpg";
import heritageJaipur from "@/assets/heritage-jaipur.jpg";

const destinations = [
  { name: "Rajasthan", image: heritageJaipur, tours: "45+ Tours", slug: "rajasthan" },
  { name: "Kerala", image: heroKerala, tours: "32+ Tours", slug: "kerala" },
  { name: "Ladakh", image: heroLadakh, tours: "28+ Tours", slug: "ladakh" },
  { name: "Goa", image: beachGoa, tours: "25+ Tours", slug: "goa" },
  { name: "Varanasi", image: spiritualVaranasi, tours: "18+ Tours", slug: "varanasi" },
  { name: "Agra", image: heroTajMahal, tours: "22+ Tours", slug: "golden-triangle" },
];

export function Destinations() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-display font-bold mb-4">
            Top <span className="text-gradient">Destinations</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover the most sought-after travel destinations in India, from
            royal palaces to serene backwaters.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {destinations.map((dest, index) => (
            <Link
              key={index}
              to={`/destination/${dest.slug}`}
              className="group relative aspect-[3/4] rounded-2xl overflow-hidden cursor-pointer card-hover block"
            >
              <img
                src={dest.image}
                alt={dest.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4 text-primary-foreground">
                <h3 className="font-display font-semibold text-lg">{dest.name}</h3>
                <div className="flex items-center gap-1 text-sm opacity-80">
                  <MapPin className="w-3 h-3" />
                  {dest.tours}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
