import { Phone, Mail, MapPin, Facebook, Instagram, Twitter, Youtube } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Footer() {
  return (
    <footer className="bg-foreground text-primary-foreground">
      {/* CTA Section */}
      <div className="bg-primary py-12">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-2xl lg:text-3xl font-display font-bold mb-4 text-primary-foreground">
            Ready to Explore India?
          </h3>
          <p className="text-primary-foreground/80 mb-6 max-w-xl mx-auto">
            Let us help you plan the perfect Indian adventure. Get in touch with
            our travel experts today.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="tel:+91-7488524281">
              <Button variant="hero-outline" size="lg" className="gap-2">
                <Phone className="w-5 h-5" />
                Call Now
              </Button>
            </a>
            <a href="mailto:ashishkumarverma2109@gmail.com">
              <Button
                size="lg"
                className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 gap-2"
              >
                <Mail className="w-5 h-5" />
                Send Enquiry
              </Button>
            </a>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Company Info */}
            <div>
              <h4 className="text-xl font-display font-bold mb-4">
                <span className="text-primary">Tour</span>MyIndia
              </h4>
              <p className="text-primary-foreground/70 mb-4 text-sm">
                One of India's most trusted travel companies, offering
                custom-crafted tour packages since 2005.
              </p>
              <div className="flex gap-3">
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-primary transition-colors"
                >
                  <Facebook className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-primary transition-colors"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-primary transition-colors"
                >
                  <Twitter className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-primary transition-colors"
                >
                  <Youtube className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h5 className="font-semibold mb-4">Quick Links</h5>
              <ul className="space-y-2 text-sm text-primary-foreground/70">
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    India Tours
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    International Tours
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Destination Wedding
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Travel Blog
                  </a>
                </li>
              </ul>
            </div>

            {/* Popular Destinations */}
            <div>
              <h5 className="font-semibold mb-4">Popular Destinations</h5>
              <ul className="space-y-2 text-sm text-primary-foreground/70">
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Rajasthan Tours
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Kerala Tours
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Ladakh Tours
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Goa Tours
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Kashmir Tours
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h5 className="font-semibold mb-4">Contact Us</h5>
              <ul className="space-y-3 text-sm text-primary-foreground/70">
                <li className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span>
                    Chouhan Green Valley, Bhilai - 490020
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-primary flex-shrink-0" />
                  <a href="tel:+91-7488524281" className="hover:text-primary">
                    +91-7488524281
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-primary flex-shrink-0" />
                  <a
                    href="mailto:ashishkumarverma2109@gmail.com"
                    className="hover:text-primary"
                  >
                    ashishkumarverma2109@gmail.com
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-primary-foreground/10 py-6">
        <div className="container mx-auto px-4 text-center text-sm text-primary-foreground/60">
          <p>© 2025 Tour My India. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
