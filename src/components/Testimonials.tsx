import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Ashish Verma",
    location: "Ranchi",
    rating: 5,
    text: "An absolutely incredible experience! The Golden Triangle tour was perfectly organized. Every hotel, every guide, every experience was top-notch.",
    tour: "Golden Triangle Tour",
  },
  {
    name: "Vivek Kumar",
    location: "Vishakapatnam",
    rating: 5,
    text: "Kerala backwaters tour was a dream come true. The houseboat experience and the attention to detail from the team was exceptional.",
    tour: "Kerala Backwaters",
  },
  {
    name: "Swastik Soni",
    location: "Bhilai",
    rating: 5,
    text: "First time in India and it exceeded all expectations! Tour My India made everything seamless. The Ladakh trip was life-changing.",
    tour: "Leh Ladakh Adventure",
  },
];

export function Testimonials() {
  return (
    <section className="py-20 bg-accent/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-display font-bold mb-4">
            What Our <span className="text-gradient">Travelers Say</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Don't just take our word for it. Here's what our happy travelers
            have to say about their experiences with us.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-card rounded-2xl p-6 border border-border card-hover relative"
            >
              <Quote className="absolute top-6 right-6 w-10 h-10 text-primary/10" />
              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                ))}
              </div>
              <p className="text-foreground mb-6 relative z-10">
                "{testimonial.text}"
              </p>
              <div className="border-t border-border pt-4">
                <p className="font-semibold text-foreground">{testimonial.name}</p>
                <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                <p className="text-sm text-primary font-medium mt-1">
                  {testimonial.tour}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
