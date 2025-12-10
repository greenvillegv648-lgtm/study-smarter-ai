import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { CreditCard, Check, Crown, Sparkles, Zap } from "lucide-react";

const PAYPAL_PRO_URL = "https://www.paypal.com/ncp/payment/MQGLAZJRTXQ6Y";
const PAYPAL_TEAM_URL = "https://www.paypal.com/ncp/payment/RBXL9KAJ8GL2L";

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    icon: Zap,
    features: ["1 free study material generation", "Basic quiz questions", "Basic flashcards"],
    current: false,
  },
  {
    name: "Pro",
    price: "$9",
    period: "per month",
    icon: Sparkles,
    features: ["Unlimited uploads", "Unlimited quiz questions", "Advanced flashcard modes", "One-page cheat sheets", "Test prediction AI", "Homework helper", "Priority support"],
    current: false,
    popular: true,
    paypalUrl: PAYPAL_PRO_URL,
  },
  {
    name: "Team",
    price: "$29",
    period: "per month",
    icon: Crown,
    features: ["Everything in Pro", "Up to 10 team members", "Shared study materials", "Collaborative quizzes", "Admin dashboard"],
    current: false,
    paypalUrl: PAYPAL_TEAM_URL,
  },
];

const Billing = () => {
  const { profile, isSubscribed } = useAuth();

  const handleSubscribe = (paypalUrl: string) => {
    window.open(paypalUrl, "_blank");
  };

  const currentPlanName = isSubscribed ? (profile?.subscription_plan === "team" ? "Team" : "Pro") : "Free";

  return (
    <DashboardLayout>
      <div className="p-6 lg:p-8 max-w-5xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl lg:text-3xl font-bold text-foreground mb-2">Billing & Subscription</h1>
          <p className="text-muted-foreground">Manage your plan and payment methods</p>
        </div>

        {/* Current Plan */}
        <div className="bg-gradient-to-r from-primary to-primary/80 rounded-2xl p-6 mb-8 text-primary-foreground">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur flex items-center justify-center">
                {isSubscribed ? <Sparkles className="w-6 h-6" /> : <Zap className="w-6 h-6" />}
              </div>
              <div>
                <p className="text-primary-foreground/80 text-sm">Current Plan</p>
                <h2 className="text-2xl font-bold">{currentPlanName} Plan</h2>
              </div>
            </div>
            <div className="text-left lg:text-right">
              <p className="text-primary-foreground/80 text-sm">
                {isSubscribed ? "Subscription active" : "Free tier"}
              </p>
              <p className="font-semibold">{isSubscribed ? "Unlimited access" : "1 free credit"}</p>
            </div>
          </div>
        </div>

        {/* Plan Comparison */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-foreground mb-4">Available Plans</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {plans.map((plan) => {
              const isCurrent = currentPlanName === plan.name;
              return (
                <div key={plan.name} className={`relative p-5 rounded-2xl border transition-all ${isCurrent ? "bg-primary-light border-primary shadow-lg" : "bg-card border-border hover:border-primary/30"}`}>
                  {plan.popular && !isCurrent && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-semibold">Popular</div>
                  )}
                  {isCurrent && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-success text-success-foreground text-xs font-semibold">Current</div>
                  )}
                  
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-10 h-10 rounded-xl ${isCurrent ? "bg-primary" : "bg-muted"} flex items-center justify-center`}>
                      <plan.icon className={`w-5 h-5 ${isCurrent ? "text-primary-foreground" : "text-muted-foreground"}`} />
                    </div>
                    <h4 className="font-semibold text-foreground">{plan.name}</h4>
                  </div>

                  <div className="mb-4">
                    <span className="text-3xl font-bold text-foreground">{plan.price}</span>
                    <span className="text-muted-foreground">/{plan.period}</span>
                  </div>

                  <ul className="space-y-2 mb-6">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        <Check className={`w-4 h-4 mt-0.5 ${isCurrent ? "text-primary" : "text-muted-foreground"}`} />
                        <span className="text-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {isCurrent ? (
                    <Button variant="outline" className="w-full" disabled>Current Plan</Button>
                  ) : plan.paypalUrl ? (
                    <Button variant="hero" className="w-full" onClick={() => handleSubscribe(plan.paypalUrl!)}>
                      Subscribe with PayPal
                    </Button>
                  ) : (
                    <Button variant="outline" className="w-full" disabled>Free Tier</Button>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="p-4 rounded-xl bg-muted/50 border border-border text-center">
          <p className="text-sm text-muted-foreground">
            Payments are securely processed via PayPal. After subscribing, your account will be automatically upgraded.
          </p>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Billing;
