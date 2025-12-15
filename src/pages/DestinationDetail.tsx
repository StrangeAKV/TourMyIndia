import { useParams, Link } from "react-router-dom";
import { ArrowLeft, MapPin, Calendar, Clock, Star, Users, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import heroTajMahal from "@/assets/hero-taj-mahal.jpg";
import heroKerala from "@/assets/hero-kerala.jpg";
import heroLadakh from "@/assets/hero-ladakh.jpg";
import spiritualVaranasi from "@/assets/spiritual-varanasi.jpg";
import beachGoa from "@/assets/beach-goa.jpg";
import heritageJaipur from "@/assets/heritage-jaipur.jpg";
import wildlifeTiger from "@/assets/wildlife-tiger.jpg";
import trekkingHimalaya from "@/assets/trekking-himalaya.jpg";

const destinationsData: Record<string, {
  name: string;
  tagline: string;
  image: string;
  gallery: string[];
  description: string;
  highlights: string[];
  bestTime: string;
  duration: string;
  price: string;
  rating: number;
  reviews: number;
}> = {
  "golden-triangle": {
    name: "Golden Triangle Tour",
    tagline: "Delhi • Agra • Jaipur",
    image: heroTajMahal,
    gallery: [heroTajMahal, heritageJaipur],
    description: "Experience the magic of India's most iconic destinations. The Golden Triangle Tour takes you through the bustling streets of Delhi, the timeless beauty of the Taj Mahal in Agra, and the royal heritage of Jaipur. This classic tour offers a perfect introduction to India's rich history, vibrant culture, and architectural marvels.",
    highlights: [
      "Visit the iconic Taj Mahal at sunrise",
      "Explore the magnificent Amber Fort in Jaipur",
      "Walk through the historic Red Fort in Delhi",
      "Experience local bazaars and street food",
      "Stay in heritage hotels with royal hospitality",
      "Guided tours with expert local guides"
    ],
    bestTime: "October to March",
    duration: "6 Nights - 7 Days",
    price: "₹35,999",
    rating: 4.9,
    reviews: 2847
  },
  "kerala": {
    name: "Kerala Backwaters",
    tagline: "God's Own Country",
    image: heroKerala,
    gallery: [heroKerala],
    description: "Discover the serene beauty of Kerala's backwaters, lush tea plantations, and pristine beaches. Experience the unique houseboat stays, Ayurvedic treatments, and the rich cultural heritage of South India. Kerala offers a perfect blend of nature, wellness, and tranquility.",
    highlights: [
      "Overnight stay in traditional houseboats",
      "Visit tea and spice plantations in Munnar",
      "Experience authentic Ayurvedic spa treatments",
      "Watch traditional Kathakali dance performances",
      "Explore Cochin's historic Fort Kochi area",
      "Relax on pristine Kovalam beaches"
    ],
    bestTime: "September to March",
    duration: "5 Nights - 6 Days",
    price: "₹28,999",
    rating: 4.8,
    reviews: 1923
  },
  "ladakh": {
    name: "Leh Ladakh Adventure",
    tagline: "Land of High Passes",
    image: heroLadakh,
    gallery: [heroLadakh, trekkingHimalaya],
    description: "Embark on an unforgettable adventure to the roof of the world. Ladakh offers breathtaking landscapes, ancient monasteries, and thrilling mountain passes. Experience the unique Tibetan Buddhist culture and witness some of the most spectacular scenery on Earth.",
    highlights: [
      "Drive through Khardung La - world's highest motorable pass",
      "Camp by the stunning Pangong Lake",
      "Visit ancient monasteries in Leh and surroundings",
      "Experience Nubra Valley's sand dunes and Bactrian camels",
      "Witness magnetic hill phenomenon",
      "Interact with warm local Ladakhi communities"
    ],
    bestTime: "June to September",
    duration: "7 Nights - 8 Days",
    price: "₹45,999",
    rating: 4.9,
    reviews: 1567
  },
  "varanasi": {
    name: "Spiritual Varanasi",
    tagline: "The Eternal City",
    image: spiritualVaranasi,
    gallery: [spiritualVaranasi],
    description: "Discover the spiritual heart of India in Varanasi, one of the world's oldest living cities. Experience the mesmerizing Ganga Aarti, explore ancient temples, and witness the timeless rituals along the sacred Ganges River.",
    highlights: [
      "Witness the enchanting Ganga Aarti ceremony",
      "Sunrise boat ride on the Ganges",
      "Visit the sacred Kashi Vishwanath Temple",
      "Explore ancient ghats and their stories",
      "Experience Buddhist pilgrimage at Sarnath",
      "Taste authentic Banarasi cuisine"
    ],
    bestTime: "October to March",
    duration: "3 Nights - 4 Days",
    price: "₹18,999",
    rating: 4.7,
    reviews: 1245
  },
  "goa": {
    name: "Goa Beach Holiday",
    tagline: "Sun, Sand & Sea",
    image: beachGoa,
    gallery: [beachGoa],
    description: "Relax on pristine beaches, explore Portuguese heritage, and experience vibrant nightlife in India's favorite beach destination. Goa offers the perfect blend of relaxation, adventure, and cultural exploration.",
    highlights: [
      "Relax on beautiful Calangute and Baga beaches",
      "Explore Old Goa's UNESCO World Heritage churches",
      "Enjoy water sports and adventure activities",
      "Experience vibrant beach shacks and nightlife",
      "Visit spice plantations and waterfalls",
      "Savor Goan seafood and Portuguese cuisine"
    ],
    bestTime: "November to February",
    duration: "4 Nights - 5 Days",
    price: "₹22,999",
    rating: 4.6,
    reviews: 2156
  },
  "rajasthan": {
    name: "Royal Rajasthan",
    tagline: "Land of Kings",
    image: heritageJaipur,
    gallery: [heritageJaipur, heroTajMahal],
    description: "Journey through the land of maharajas, magnificent forts, and colorful culture. Rajasthan offers an unparalleled experience of royal India with its grand palaces, desert landscapes, and warm hospitality.",
    highlights: [
      "Stay in authentic heritage palace hotels",
      "Desert safari in Jaisalmer's Thar Desert",
      "Explore Mehrangarh Fort in Jodhpur",
      "Boat ride on Lake Pichola in Udaipur",
      "Visit the stunning City Palace complexes",
      "Experience traditional Rajasthani folk performances"
    ],
    bestTime: "October to March",
    duration: "8 Nights - 9 Days",
    price: "₹52,999",
    rating: 4.9,
    reviews: 1834
  },
  "wildlife": {
    name: "Wildlife Safari Tours",
    tagline: "Into the Wild",
    image: wildlifeTiger,
    gallery: [wildlifeTiger],
    description: "Experience India's incredible wildlife in world-renowned national parks. Track Bengal tigers, spot leopards, and encounter diverse species in their natural habitats. India's wildlife sanctuaries offer some of the best safari experiences in Asia.",
    highlights: [
      "Tiger safari in Ranthambore National Park",
      "Spot one-horned rhinos in Kaziranga",
      "Birdwatching in Bharatpur Bird Sanctuary",
      "Jungle walks and nature trails",
      "Stay in luxury wildlife lodges",
      "Expert naturalist guides"
    ],
    bestTime: "October to June",
    duration: "4 Nights - 5 Days",
    price: "₹38,999",
    rating: 4.8,
    reviews: 987
  },
  "heritage": {
    name: "Heritage India Tours",
    tagline: "Timeless Treasures",
    image: heritageJaipur,
    gallery: [heritageJaipur, heroTajMahal, spiritualVaranasi],
    description: "Discover India's magnificent architectural heritage spanning thousands of years. From ancient temples to Mughal monuments, explore UNESCO World Heritage sites and hidden gems that tell the story of India's glorious past.",
    highlights: [
      "Visit UNESCO World Heritage Sites",
      "Explore ancient cave temples of Ajanta and Ellora",
      "Discover Hampi's magnificent ruins",
      "Tour grand Mughal monuments",
      "Experience living heritage in old cities",
      "Expert heritage walks with historians"
    ],
    bestTime: "October to March",
    duration: "6 Nights - 7 Days",
    price: "₹42,999",
    rating: 4.8,
    reviews: 1123
  },
  "trekking": {
    name: "Himalayan Trekking",
    tagline: "Conquer the Peaks",
    image: trekkingHimalaya,
    gallery: [trekkingHimalaya, heroLadakh],
    description: "Challenge yourself with treks through the majestic Himalayas. From beginner-friendly trails to challenging expeditions, experience the thrill of high-altitude trekking with stunning views, pristine nature, and genuine mountain hospitality.",
    highlights: [
      "Trek to Valley of Flowers in Uttarakhand",
      "Roopkund Trek to the mysterious skeleton lake",
      "Chadar Trek on frozen Zanskar River",
      "Hampta Pass crossing adventure",
      "Camping under starlit mountain skies",
      "Experienced mountain guides and support"
    ],
    bestTime: "May to October",
    duration: "5 Nights - 6 Days",
    price: "₹32,999",
    rating: 4.9,
    reviews: 756
  },
  "beach": {
    name: "Beach Holidays",
    tagline: "Tropical Paradise",
    image: beachGoa,
    gallery: [beachGoa],
    description: "Escape to India's stunning coastline with pristine beaches, azure waters, and tropical vibes. From Goa's lively shores to Andaman's untouched islands, discover your perfect beach getaway.",
    highlights: [
      "Relax on pristine sandy beaches",
      "Snorkeling and scuba diving adventures",
      "Sunset cruises and water sports",
      "Beachside dining and fresh seafood",
      "Island hopping in Andaman & Lakshadweep",
      "Luxury beach resort stays"
    ],
    bestTime: "November to March",
    duration: "4 Nights - 5 Days",
    price: "₹25,999",
    rating: 4.7,
    reviews: 1432
  }
};

const DestinationDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const destination = destinationsData[slug || ""] || destinationsData["golden-triangle"];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[400px]">
        <img
          src={destination.image}
          alt={destination.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8 lg:p-16">
          <div className="container mx-auto">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-primary-foreground/80 hover:text-primary-foreground mb-4 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>
            <h1 className="text-4xl lg:text-6xl font-display font-bold text-primary-foreground mb-2">
              {destination.name}
            </h1>
            <p className="text-xl text-primary-foreground/80">{destination.tagline}</p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <div className="mb-8">
                <h2 className="text-2xl font-display font-bold mb-4">About This Tour</h2>
                <p className="text-muted-foreground leading-relaxed">
                  {destination.description}
                </p>
              </div>

              {/* Gallery */}
              <div className="mb-8">
                <h3 className="text-xl font-display font-bold mb-4">Photo Gallery</h3>
                <div className="grid grid-cols-2 gap-4">
                  {destination.gallery.map((img, index) => (
                    <div key={index} className="relative aspect-video rounded-xl overflow-hidden">
                      <img
                        src={img}
                        alt={`${destination.name} ${index + 1}`}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Highlights */}
              <div>
                <h3 className="text-xl font-display font-bold mb-4">Tour Highlights</h3>
                <div className="grid md:grid-cols-2 gap-3">
                  {destination.highlights.map((highlight, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-4 h-4 text-primary" />
                      </div>
                      <span className="text-foreground">{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-card border border-border rounded-2xl p-6 sticky top-24">
                {/* Rating */}
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${i < Math.floor(destination.rating) ? "fill-primary text-primary" : "text-muted"}`}
                      />
                    ))}
                  </div>
                  <span className="font-semibold">{destination.rating}</span>
                  <span className="text-muted-foreground">({destination.reviews} reviews)</span>
                </div>

                {/* Price */}
                <div className="mb-6">
                  <span className="text-sm text-muted-foreground">Starting from</span>
                  <p className="text-3xl font-bold text-primary">{destination.price}</p>
                  <span className="text-sm text-muted-foreground">per person</span>
                </div>

                {/* Details */}
                <div className="space-y-4 mb-6">
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Duration</p>
                      <p className="font-medium">{destination.duration}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Best Time to Visit</p>
                      <p className="font-medium">{destination.bestTime}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Users className="w-5 h-5 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Group Size</p>
                      <p className="font-medium">2-15 travelers</p>
                    </div>
                  </div>
                </div>

                {/* CTA */}
                <Button variant="hero" className="w-full mb-3">
                  Book Now
                </Button>
                <Button variant="outline" className="w-full">
                  Send Enquiry
                </Button>

                {/* Contact */}
                <div className="mt-6 pt-6 border-t border-border text-center">
                  <p className="text-sm text-muted-foreground mb-2">Need help planning?</p>
                  <a
                    href="tel:+91-9212777225"
                    className="text-primary font-semibold hover:underline"
                  >
                    +91-9212777225
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default DestinationDetail;
