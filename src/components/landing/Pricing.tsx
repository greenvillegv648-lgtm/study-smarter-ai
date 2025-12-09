import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Check, Sparkles, Zap, Crown } from "lucide-react";

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    description: "Perfect for trying out Study Booster",
    icon: Zap,
    features: [
      "3 document uploads per month",
      "5 quiz questions per document",
      "Basic flashcard generation",
      "Community support",
    ],
    cta: "Start Free",
    variant: "outline" as const,
    popular: false,
  },
  {
    name: "Pro",
    price: "$9",
    period: "per month",
    description: "Everything you need to ace your exams",
    icon: Sparkles,
    features: [
      "Unlimited uploads",
      "Unlimited quiz questions",
      "Advanced flashcard modes",
      "One-page cheat sheets",
      "Test prediction AI",
      "Homework helper",
      "Priority support",
    ],
    cta: "Get Pro",
    variant: "hero" as const,
    popular: true,
  },
  {
    name: "Team",
    price: "$29",
    period: "per month",
    description: "Perfect for study groups and classes",
    icon: Crown,
    features: [
      "Everything in Pro",
      "Up to 10 team members",
      "Shared study materials",
      "Collaborative quizzes",
      "Admin dashboard",
      "Dedicated support",
    ],
    cta: "Contact Sales",
    variant: "outline" as const,
    popular: false,
  },
];

const Pricing = () => {
  return (
    <section id="pricing" className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary-light/20 to-background" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-light border border-accent/20 mb-6">
            <Crown className="w-4 h-4 text-accent" />
            <span className="text-sm font-medium text-accent">Simple Pricing</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Choose Your
            <span className="gradient-text block">Study Plan</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Start free and upgrade when you're ready. No hidden fees, cancel anytime.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative p-6 rounded-2xl border transition-all duration-300 hover:-translate-y-1 ${
                plan.popular
                  ? "bg-card border-primary shadow-xl shadow-primary/10"
                  : "bg-card border-border hover:border-primary/30 hover:shadow-lg"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-primary text-primary-foreground text-xs font-semibold shadow-lg">
                  Most Popular
                </div>
              )}

              <div className="flex items-center gap-3 mb-4">
                <div className={`w-10 h-10 rounded-xl ${plan.popular ? "bg-primary" : "bg-muted"} flex items-center justify-center`}>
                  <plan.icon className={`w-5 h-5 ${plan.popular ? "text-primary-foreground" : "text-muted-foreground"}`} />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">{plan.name}</h3>
                </div>
              </div>

              <div className="mb-4">
                <span className="text-4xl font-bold text-foreground">{plan.price}</span>
                <span className="text-muted-foreground">/{plan.period}</span>
              </div>

              <p className="text-sm text-muted-foreground mb-6">{plan.description}</p>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${plan.popular ? "bg-primary/10" : "bg-muted"}`}>
                      <Check className={`w-3 h-3 ${plan.popular ? "text-primary" : "text-muted-foreground"}`} />
                    </div>
                    <span className="text-sm text-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              <Link to="/signup">
                <Button variant={plan.variant} className="w-full">
                  {plan.cta}
                </Button>
              </Link>
            </div>
          ))}
        </div>

        {/* Money Back Guarantee */}
        <div className="mt-12 text-center">
          <p className="text-muted-foreground text-sm">
            <span className="text-success font-medium">✓ 7-day money-back guarantee</span>
            {" · "}No credit card required for free plan
          </p>
        </div>
      </div>
    </section>
  );
};

export default Pricing;