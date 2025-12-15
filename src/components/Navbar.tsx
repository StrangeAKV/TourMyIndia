import { useState, useEffect } from "react";
import { Menu, X, Phone, MapPin, User, LogOut, Bookmark } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const navData = {
  destinations: [
    { label: "Rajasthan", href: "/destination/rajasthan", description: "Royal palaces & desert safaris" },
    { label: "Kerala", href: "/destination/kerala", description: "Backwaters & tea plantations" },
    { label: "Ladakh", href: "/destination/ladakh", description: "Mountain adventures" },
    { label: "Goa", href: "/destination/goa", description: "Beaches & nightlife" },
    { label: "Kashmir", href: "/destination/kashmir", description: "Paradise on Earth" },
    { label: "Varanasi", href: "/destination/varanasi", description: "Spiritual capital" },
  ],
  holidayIdeas: [
    { label: "Honeymoon Tours", href: "/destination/honeymoon", description: "Romantic getaways" },
    { label: "Family Holidays", href: "/destination/family", description: "Fun for all ages" },
    { label: "Adventure Tours", href: "/destination/adventure", description: "Thrilling experiences" },
    { label: "Cultural Tours", href: "/destination/cultural", description: "Heritage & traditions" },
    { label: "Wildlife Safaris", href: "/destination/wildlife", description: "Explore Indian wildlife" },
  ],
  packages: [
    { label: "Golden Triangle", href: "/destination/golden-triangle", description: "Delhi-Agra-Jaipur" },
    { label: "South India", href: "/destination/south-india", description: "Temple & beaches" },
    { label: "Himalayan Explorer", href: "/destination/himalayan-explorer", description: "Mountain trails" },
    { label: "Royal Rajasthan", href: "/destination/royal-rajasthan", description: "Palace & forts" },
    { label: "Spiritual India", href: "/destination/spiritual", description: "Holy destinations" },
  ],
  placesToStay: [
    { label: "Heritage Hotels", href: "/destination/heritage-hotels", description: "Stay in palaces" },
    { label: "Beach Resorts", href: "/destination/beach-resorts", description: "Coastal luxury" },
    { label: "Hill Stations", href: "/destination/hill-stations", description: "Mountain retreats" },
    { label: "Houseboats", href: "/destination/houseboats", description: "Kerala backwaters" },
  ],
  weekendGetaways: [
    { label: "From Delhi", href: "/destination/weekend-delhi", description: "Quick escapes from Delhi" },
    { label: "From Mumbai", href: "/destination/weekend-mumbai", description: "Mumbai getaways" },
    { label: "From Bangalore", href: "/destination/weekend-bangalore", description: "Bangalore escapes" },
    { label: "From Chennai", href: "/destination/weekend-chennai", description: "Chennai nearby trips" },
  ],
};

export function Navbar() {
  const { user, signOut } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const ListItem = ({ href, label, description }: { href: string; label: string; description: string }) => (
    <li>
      <NavigationMenuLink asChild>
        <Link
          to={href}
          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
        >
          <div className="text-sm font-medium leading-none">{label}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {description}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  );

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-background/95 backdrop-blur-md shadow-soft"
          : "bg-transparent"
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="relative">
              <span className="text-2xl font-display font-bold text-primary">
                Tour
              </span>
              <span className="text-2xl font-display font-bold text-foreground">
                MyIndia
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <NavigationMenu className="hidden lg:flex">
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className={cn(
                  "bg-transparent",
                  isScrolled ? "text-foreground" : "text-foreground"
                )}>
                  Destinations
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] bg-background">
                    {navData.destinations.map((item) => (
                      <ListItem key={item.label} {...item} />
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger className={cn(
                  "bg-transparent",
                  isScrolled ? "text-foreground" : "text-foreground"
                )}>
                  Holiday Ideas
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 bg-background">
                    {navData.holidayIdeas.map((item) => (
                      <ListItem key={item.label} {...item} />
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger className={cn(
                  "bg-transparent",
                  isScrolled ? "text-foreground" : "text-foreground"
                )}>
                  Packages
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 bg-background">
                    {navData.packages.map((item) => (
                      <ListItem key={item.label} {...item} />
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger className={cn(
                  "bg-transparent",
                  isScrolled ? "text-foreground" : "text-foreground"
                )}>
                  Places to Stay
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 bg-background">
                    {navData.placesToStay.map((item) => (
                      <ListItem key={item.label} {...item} />
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger className={cn(
                  "bg-transparent",
                  isScrolled ? "text-foreground" : "text-foreground"
                )}>
                  Weekend Getaways
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 bg-background">
                    {navData.weekendGetaways.map((item) => (
                      <ListItem key={item.label} {...item} />
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          {/* Right Side Actions */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href="tel:+91-9212777225"
              className="flex items-center gap-2 text-sm font-medium text-foreground hover:text-primary transition-colors"
            >
              <Phone className="w-4 h-4 text-primary" />
              +91-7488524281
            </a>
            
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="gap-2">
                    <User className="w-4 h-4" />
                    Account
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48 bg-background">
                  <DropdownMenuItem asChild>
                    <Link to="/saved-plans" className="flex items-center gap-2 cursor-pointer">
                      <Bookmark className="w-4 h-4" />
                      My Saved Plans
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem 
                    onClick={() => signOut()}
                    className="flex items-center gap-2 cursor-pointer text-destructive"
                  >
                    <LogOut className="w-4 h-4" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link to="/auth">
                <Button variant="outline" className="gap-2">
                  <User className="w-4 h-4" />
                  Sign In
                </Button>
              </Link>
            )}
            
            <Button variant="hero" size="default" className="gap-2">
              <MapPin className="w-4 h-4" />
              Plan Your Trip
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden absolute top-20 left-0 right-0 bg-background shadow-card animate-fade-in max-h-[80vh] overflow-y-auto">
            <nav className="flex flex-col p-4 gap-2">
              <MobileNavSection title="Destinations" items={navData.destinations} onClose={() => setIsMobileMenuOpen(false)} />
              <MobileNavSection title="Holiday Ideas" items={navData.holidayIdeas} onClose={() => setIsMobileMenuOpen(false)} />
              <MobileNavSection title="Packages" items={navData.packages} onClose={() => setIsMobileMenuOpen(false)} />
              <MobileNavSection title="Places to Stay" items={navData.placesToStay} onClose={() => setIsMobileMenuOpen(false)} />
              <MobileNavSection title="Weekend Getaways" items={navData.weekendGetaways} onClose={() => setIsMobileMenuOpen(false)} />
              <hr className="my-2 border-border" />
              
              {user ? (
                <>
                  <Link
                    to="/saved-plans"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-2 p-2 text-sm font-medium"
                  >
                    <Bookmark className="w-4 h-4 text-primary" />
                    My Saved Plans
                  </Link>
                  <button
                    onClick={() => {
                      signOut();
                      setIsMobileMenuOpen(false);
                    }}
                    className="flex items-center gap-2 p-2 text-sm font-medium text-destructive"
                  >
                    <LogOut className="w-4 h-4" />
                    Sign Out
                  </button>
                </>
              ) : (
                <Link
                  to="/auth"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-2 p-2 text-sm font-medium"
                >
                  <User className="w-4 h-4 text-primary" />
                  Sign In
                </Link>
              )}
              
              <a
                href="tel:+91-7488524281"
                className="flex items-center gap-2 p-2 text-sm font-medium"
              >
                <Phone className="w-4 h-4 text-primary" />
                +91-7488524281
              </a>
              <Button variant="hero" className="w-full gap-2">
                <MapPin className="w-4 h-4" />
                Plan Your Trip
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}

function MobileNavSection({ 
  title, 
  items, 
  onClose 
}: { 
  title: string; 
  items: { label: string; href: string; description: string }[];
  onClose: () => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="border-b border-border pb-2">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full p-2 text-foreground font-medium"
      >
        {title}
        <span className={cn("transition-transform", isOpen && "rotate-180")}>▼</span>
      </button>
      {isOpen && (
        <div className="pl-4 space-y-1">
          {items.map((item) => (
            <Link
              key={item.label}
              to={item.href}
              onClick={onClose}
              className="block p-2 text-sm text-muted-foreground hover:text-primary"
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
