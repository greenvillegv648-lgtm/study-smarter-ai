import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Pre-Med Student",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    content: "Study Booster saved my organic chemistry grade. The AI quizzes felt exactly like what my professor would ask. I went from a C to an A-!",
    rating: 5,
  },
  {
    name: "Marcus Johnson",
    role: "High School Senior",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    content: "The flashcard feature is incredible. I uploaded my AP History notes and had 100+ perfectly organized cards in minutes. Game changer for studying.",
    rating: 5,
  },
  {
    name: "Emily Rodriguez",
    role: "Law Student",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
    content: "The test prediction feature is scary accurate. It highlighted exactly what my contracts professor focused on. Highly recommend for law school!",
    rating: 5,
  },
];

const Testimonials = () => {
  return (
    <section id="testimonials" className="py-24 bg-muted/30 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-success-light border border-success/20 mb-6">
            <Star className="w-4 h-4 text-success fill-success" />
            <span className="text-sm font-medium text-success">Student Reviews</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Loved by
            <span className="gradient-text block">50,000+ Students</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            See what students are saying about their improved grades with Study Booster Pro.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="p-6 rounded-2xl bg-card border border-border hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
            >
              {/* Quote Icon */}
              <Quote className="w-8 h-8 text-primary/20 mb-4" />

              {/* Content */}
              <p className="text-foreground leading-relaxed mb-6">
                "{testimonial.content}"
              </p>

              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-warning fill-warning" />
                ))}
              </div>

              {/* Author */}
              <div className="flex items-center gap-3">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold text-foreground text-sm">{testimonial.name}</p>
                  <p className="text-muted-foreground text-xs">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          {[
            { value: "50K+", label: "Active Students" },
            { value: "1M+", label: "Quizzes Created" },
            { value: "4.9", label: "App Store Rating" },
            { value: "89%", label: "Grade Improvement" },
          ].map((stat, index) => (
            <div key={index} className="text-center p-4 rounded-xl bg-card border border-border">
              <p className="text-3xl font-bold gradient-text">{stat.value}</p>
              <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;