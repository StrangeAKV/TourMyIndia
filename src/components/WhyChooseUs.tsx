import { Shield, Clock, Award, Headphones, CreditCard, Users } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "100% Safe Travel",
    description: "All our tours are designed with your safety as top priority",
  },
  {
    icon: Clock,
    title: "24/7 Support",
    description: "Round the clock assistance throughout your journey",
  },
  {
    icon: Award,
    title: "Best Price Guarantee",
    description: "We offer competitive prices with no hidden charges",
  },
  {
    icon: Headphones,
    title: "Expert Guides",
    description: "Knowledgeable local guides for authentic experiences",
  },
  {
    icon: CreditCard,
    title: "Easy Payment",
    description: "Flexible payment options including EMI",
  },
  {
    icon: Users,
    title: "Happy Travelers",
    description: "Over 100,000+ satisfied customers worldwide",
  },
];

export function WhyChooseUs() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-display font-bold mb-4">
            Why Choose <span className="text-gradient">Tour My India</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Experience the difference with India's most trusted travel partner
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="text-center group cursor-pointer"
              >
                <div className="w-16 h-16 mx-auto mb-4 bg-accent rounded-2xl flex items-center justify-center group-hover:bg-primary group-hover:shadow-glow transition-all duration-300">
                  <Icon className="w-8 h-8 text-primary group-hover:text-primary-foreground transition-colors" />
                </div>
                <h3 className="font-semibold text-foreground mb-1 text-sm">
                  {feature.title}
                </h3>
                <p className="text-xs text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
