import { useState } from "react";
import { ChevronLeft, ChevronRight, Footprints, Landmark, Mountain, Palmtree } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import wildlifeTiger from "@/assets/wildlife-tiger.jpg";
import heritageJaipur from "@/assets/heritage-jaipur.jpg";
import trekkingHimalaya from "@/assets/trekking-himalaya.jpg";
import beachGoa from "@/assets/beach-goa.jpg";

const categories = [
  {
    icon: Footprints,
    title: "Wildlife",
    packages: "70+ Packages",
    image: wildlifeTiger,
    description: "Explore India's diverse wildlife sanctuaries and national parks",
    slug: "wildlife",
  },
  {
    icon: Landmark,
    title: "Heritage",
    packages: "25+ Packages",
    image: heritageJaipur,
    description: "Discover ancient monuments and royal palaces",
    slug: "heritage",
  },
  {
    icon: Mountain,
    title: "Trekking",
    packages: "70+ Packages",
    image: trekkingHimalaya,
    description: "Adventure through the mighty Himalayas",
    slug: "trekking",
  },
  {
    icon: Palmtree,
    title: "Beach",
    packages: "40+ Packages",
    image: beachGoa,
    description: "Relax on pristine beaches and tropical shores",
    slug: "beach",
  },
];

export function CategoryCards() {
  const [startIndex, setStartIndex] = useState(0);
  const visibleCards = 3;

  const nextCards = () => {
    setStartIndex((prev) => (prev + 1) % categories.length);
  };

  const prevCards = () => {
    setStartIndex((prev) => (prev - 1 + categories.length) % categories.length);
  };

  const getVisibleCategories = () => {
    const result = [];
    for (let i = 0; i < visibleCards; i++) {
      result.push(categories[(startIndex + i) % categories.length]);
    }
    return result;
  };

  return (
    <section className="flex-1 flex flex-col justify-center px-4 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl lg:text-5xl font-display leading-tight mb-4">
          Let us plan you a
          <br />
          perfect <span className="text-gradient">India Holiday</span>
        </h1>
        <p className="text-muted-foreground max-w-lg">
          Tour My India, one of the best travel agencies in India, offers
          custom-crafted tour packages for unforgettable holiday experiences
          across the country.
        </p>
      </div>

      {/* Category Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {getVisibleCategories().map((category, index) => {
          const Icon = category.icon;
          return (
            <Link
              key={`${category.title}-${index}`}
              to={`/destination/${category.slug}`}
              className="group bg-card rounded-xl border border-border overflow-hidden card-hover cursor-pointer block"
            >
              <div className="p-4 flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-foreground">{category.title}</h3>
                  <p className="text-sm text-muted-foreground">{category.packages}</p>
                </div>
                <Icon className="w-8 h-8 text-primary opacity-70" />
              </div>
              <div className="relative h-48 overflow-hidden">
                <img
                  src={category.image}
                  alt={category.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <p className="text-sm text-foreground">{category.description}</p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Navigation */}
      <div className="flex gap-2">
        <Button
          variant="outline"
          size="icon"
          onClick={prevCards}
          className="rounded-full"
        >
          <ChevronLeft className="w-5 h-5" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={nextCards}
          className="rounded-full"
        >
          <ChevronRight className="w-5 h-5" />
        </Button>
      </div>
    </section>
  );
}
