import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Upload, Brain, Sparkles, Zap } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-light via-background to-accent-light opacity-60" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse-soft" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/20 rounded-full blur-3xl animate-pulse-soft delay-1000" />
      
      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:50px_50px]" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-light border border-primary/20 mb-8 animate-fade-in">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">AI-Powered Study Tools</span>
          </div>

          {/* Headline */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 animate-slide-up" style={{ animationDelay: "0.1s" }}>
            Upload Notes,
            <br />
            <span className="gradient-text">Ace Your Exams</span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-slide-up" style={{ animationDelay: "0.2s" }}>
            Transform any study material into quizzes, flashcards, and cheat sheets instantly. 
            Our AI creates teacher-style questions so you're always exam-ready.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-slide-up" style={{ animationDelay: "0.3s" }}>
            <Link to="/signup">
              <Button variant="hero" size="xl" className="group">
                Start Studying Free
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to="/#features">
              <Button variant="outline" size="xl">
                See How It Works
              </Button>
            </Link>
          </div>

          {/* Feature Pills */}
          <div className="flex flex-wrap items-center justify-center gap-3 animate-slide-up" style={{ animationDelay: "0.4s" }}>
            {[
              { icon: Upload, text: "Upload Any Format" },
              { icon: Brain, text: "AI Quiz Generator" },
              { icon: Zap, text: "Instant Results" },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2 px-4 py-2 rounded-full bg-card border border-border shadow-sm">
                <item.icon className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-foreground">{item.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Floating Cards Preview */}
        <div className="mt-16 relative max-w-5xl mx-auto animate-slide-up" style={{ animationDelay: "0.5s" }}>
          <div className="relative">
            {/* Main Dashboard Preview Card */}
            <div className="bg-card rounded-2xl shadow-xl border border-border p-6 md:p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-3 h-3 rounded-full bg-destructive/60" />
                <div className="w-3 h-3 rounded-full bg-warning/60" />
                <div className="w-3 h-3 rounded-full bg-success/60" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Stats Cards */}
                {[
                  { label: "Quizzes Created", value: "247", color: "primary" },
                  { label: "Flashcards Made", value: "1,892", color: "accent" },
                  { label: "Study Hours Saved", value: "156", color: "success" },
                ].map((stat, i) => (
                  <div key={i} className={`p-4 rounded-xl bg-${stat.color}-light/50 border border-${stat.color}/10`}>
                    <p className="text-2xl md:text-3xl font-bold text-foreground">{stat.value}</p>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Floating Quiz Card */}
            <div className="absolute -right-4 md:-right-8 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-0 w-64 p-4 bg-card rounded-xl shadow-lg border border-border animate-float hidden lg:block">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Brain className="w-4 h-4 text-primary" />
                </div>
                <span className="font-semibold text-sm">Quiz Question</span>
              </div>
              <p className="text-sm text-muted-foreground mb-3">What is the main function of mitochondria?</p>
              <div className="space-y-2">
                {["ATP production", "Protein synthesis", "Cell division"].map((opt, i) => (
                  <div key={i} className={`text-xs p-2 rounded-lg ${i === 0 ? "bg-success/10 text-success border border-success/20" : "bg-muted"}`}>
                    {opt}
                  </div>
                ))}
              </div>
            </div>

            {/* Floating Flashcard */}
            <div className="absolute -left-4 md:-left-8 bottom-8 translate-y-4 md:translate-y-0 -translate-x-4 md:translate-x-0 w-56 p-4 bg-card rounded-xl shadow-lg border border-border animate-float hidden lg:block" style={{ animationDelay: "1s" }}>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-accent" />
                </div>
                <span className="font-semibold text-sm">Flashcard</span>
              </div>
              <p className="text-sm font-medium mb-2">Photosynthesis</p>
              <p className="text-xs text-muted-foreground">The process by which plants convert light energy into chemical energy...</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;