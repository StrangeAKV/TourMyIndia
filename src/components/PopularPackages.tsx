import { MapPin, Calendar, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import heroTajMahal from "@/assets/hero-taj-mahal.jpg";
import heroKerala from "@/assets/hero-kerala.jpg";
import heroLadakh from "@/assets/hero-ladakh.jpg";
import spiritualVaranasi from "@/assets/spiritual-varanasi.jpg";
import beachGoa from "@/assets/beach-goa.jpg";
import heritageJaipur from "@/assets/heritage-jaipur.jpg";

const packages = [
  {
    image: heroTajMahal,
    title: "Golden Triangle Tour",
    location: "Delhi, Agra, Jaipur",
    duration: "6 Nights - 7 Days",
    price: "₹15,999",
    tag: "Best Seller",
    slug: "golden-triangle",
  },
  {
    image: heroKerala,
    title: "Kerala Backwaters",
    location: "Cochin, Munnar, Alleppey",
    duration: "5 Nights - 6 Days",
    price: "₹18,999",
    tag: "Popular",
    slug: "kerala",
  },
  {
    image: heroLadakh,
    title: "Leh Ladakh Adventure",
    location: "Leh, Nubra Valley, Pangong",
    duration: "7 Nights - 8 Days",
    price: "₹25,999",
    tag: "Adventure",
    slug: "ladakh",
  },
  {
    image: spiritualVaranasi,
    title: "Spiritual Varanasi",
    location: "Varanasi, Sarnath",
    duration: "3 Nights - 4 Days",
    price: "₹13,999",
    tag: "Spiritual",
    slug: "varanasi",
  },
  {
    image: beachGoa,
    title: "Goa Beach Holiday",
    location: "North Goa, South Goa",
    duration: "4 Nights - 5 Days",
    price: "₹16,999",
    tag: "Beach",
    slug: "goa",
  },
  {
    image: heritageJaipur,
    title: "Royal Rajasthan",
    location: "Jaipur, Udaipur, Jodhpur",
    duration: "8 Nights - 9 Days",
    price: "₹22,999",
    tag: "Heritage",
    slug: "rajasthan",
  },
];

export function PopularPackages() {
  return (
    <section className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-display font-bold mb-4">
            Popular Tour <span className="text-gradient">Packages</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore our most popular tour packages, handcrafted to give you the
            best travel experience across India's diverse landscapes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {packages.map((pkg, index) => (
            <Link
              key={index}
              to={`/destination/${pkg.slug}`}
              className="group bg-card rounded-2xl overflow-hidden border border-border card-hover block"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="relative h-56 overflow-hidden">
                <img
                  src={pkg.image}
                  alt={pkg.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-primary text-primary-foreground text-xs font-semibold px-3 py-1.5 rounded-full">
                    {pkg.tag}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-display font-semibold mb-2 text-foreground group-hover:text-primary transition-colors">
                  {pkg.title}
                </h3>
                <div className="flex items-center gap-2 text-muted-foreground text-sm mb-2">
                  <MapPin className="w-4 h-4 text-primary" />
                  {pkg.location}
                </div>
                <div className="flex items-center gap-2 text-muted-foreground text-sm mb-4">
                  <Calendar className="w-4 h-4 text-primary" />
                  {pkg.duration}
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-sm text-muted-foreground">Starting from</span>
                    <p className="text-xl font-bold text-primary">{pkg.price}</p>
                  </div>
                  <Button variant="outline" size="sm" className="gap-1 group/btn">
                    View Details
                    <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                  </Button>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="hero" size="lg" className="gap-2">
            View All Packages
            <ArrowRight className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </section>
  );
}
