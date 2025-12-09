import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import { 
  CreditCard, 
  Check, 
  Crown,
  Sparkles,
  Zap,
  ArrowRight,
  Download
} from "lucide-react";

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    icon: Zap,
    features: [
      "3 document uploads per month",
      "5 quiz questions per document",
      "Basic flashcard generation",
    ],
    current: false,
  },
  {
    name: "Pro",
    price: "$9",
    period: "per month",
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
    current: true,
    popular: true,
  },
  {
    name: "Team",
    price: "$29",
    period: "per month",
    icon: Crown,
    features: [
      "Everything in Pro",
      "Up to 10 team members",
      "Shared study materials",
      "Collaborative quizzes",
      "Admin dashboard",
    ],
    current: false,
  },
];

const invoices = [
  { date: "Nov 1, 2024", amount: "$9.00", status: "Paid" },
  { date: "Oct 1, 2024", amount: "$9.00", status: "Paid" },
  { date: "Sep 1, 2024", amount: "$9.00", status: "Paid" },
];

const Billing = () => {
  return (
    <DashboardLayout>
      <div className="p-6 lg:p-8 max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl lg:text-3xl font-bold text-foreground mb-2">
            Billing & Subscription
          </h1>
          <p className="text-muted-foreground">
            Manage your plan and payment methods
          </p>
        </div>

        {/* Current Plan */}
        <div className="bg-gradient-to-r from-primary to-primary/80 rounded-2xl p-6 mb-8 text-primary-foreground">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur flex items-center justify-center">
                <Sparkles className="w-6 h-6" />
              </div>
              <div>
                <p className="text-primary-foreground/80 text-sm">Current Plan</p>
                <h2 className="text-2xl font-bold">Pro Plan</h2>
              </div>
            </div>
            <div className="text-left lg:text-right">
              <p className="text-primary-foreground/80 text-sm">Next billing date</p>
              <p className="font-semibold">December 1, 2024</p>
            </div>
          </div>
        </div>

        {/* Plan Comparison */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-foreground mb-4">Available Plans</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {plans.map((plan, index) => (
              <div
                key={index}
                className={`relative p-5 rounded-2xl border transition-all ${
                  plan.current
                    ? "bg-primary-light border-primary shadow-lg"
                    : "bg-card border-border hover:border-primary/30"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-semibold">
                    Current
                  </div>
                )}
                
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-10 h-10 rounded-xl ${plan.current ? "bg-primary" : "bg-muted"} flex items-center justify-center`}>
                    <plan.icon className={`w-5 h-5 ${plan.current ? "text-primary-foreground" : "text-muted-foreground"}`} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">{plan.name}</h4>
                  </div>
                </div>

                <div className="mb-4">
                  <span className="text-3xl font-bold text-foreground">{plan.price}</span>
                  <span className="text-muted-foreground">/{plan.period}</span>
                </div>

                <ul className="space-y-2 mb-6">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <Check className={`w-4 h-4 mt-0.5 ${plan.current ? "text-primary" : "text-muted-foreground"}`} />
                      <span className="text-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>

                {plan.current ? (
                  <Button variant="outline" className="w-full" disabled>
                    Current Plan
                  </Button>
                ) : (
                  <Button variant={plan.name === "Team" ? "outline" : "hero"} className="w-full">
                    {plan.name === "Free" ? "Downgrade" : "Upgrade"}
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Payment Method */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-card rounded-2xl border border-border p-6">
            <h3 className="font-semibold text-foreground mb-4">Payment Method</h3>
            <div className="flex items-center justify-between p-4 rounded-xl bg-muted/50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-foreground flex items-center justify-center">
                  <CreditCard className="w-5 h-5 text-background" />
                </div>
                <div>
                  <p className="font-medium text-foreground">•••• •••• •••• 4242</p>
                  <p className="text-sm text-muted-foreground">Expires 12/25</p>
                </div>
              </div>
              <Button variant="ghost" size="sm">Edit</Button>
            </div>
          </div>

          {/* Billing Address */}
          <div className="bg-card rounded-2xl border border-border p-6">
            <h3 className="font-semibold text-foreground mb-4">Billing Address</h3>
            <div className="p-4 rounded-xl bg-muted/50">
              <p className="text-foreground">Alex Smith</p>
              <p className="text-muted-foreground text-sm">
                123 University Ave<br />
                San Francisco, CA 94102<br />
                United States
              </p>
            </div>
            <Button variant="ghost" size="sm" className="mt-3">
              Update Address
            </Button>
          </div>
        </div>

        {/* Invoice History */}
        <div className="bg-card rounded-2xl border border-border overflow-hidden">
          <div className="p-6 border-b border-border">
            <h3 className="font-semibold text-foreground">Invoice History</h3>
          </div>
          <div className="divide-y divide-border">
            {invoices.map((invoice, index) => (
              <div key={index} className="p-4 flex items-center justify-between hover:bg-muted/50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                    <CreditCard className="w-5 h-5 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{invoice.date}</p>
                    <p className="text-sm text-muted-foreground">Pro Plan - Monthly</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="font-medium text-foreground">{invoice.amount}</p>
                    <p className="text-sm text-success">{invoice.status}</p>
                  </div>
                  <Button variant="ghost" size="sm">
                    <Download className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Billing;