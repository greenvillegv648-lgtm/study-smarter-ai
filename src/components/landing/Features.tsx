import { 
  Upload, 
  Brain, 
  Layers, 
  FileText, 
  Target, 
  MessageSquareText,
  Sparkles,
  Zap
} from "lucide-react";

const features = [
  {
    icon: Upload,
    title: "Smart Upload",
    description: "Upload PDFs, photos of notes, worksheets, or text files. Our AI extracts content instantly.",
    color: "primary",
  },
  {
    icon: Brain,
    title: "Teacher-Style Quizzes",
    description: "AI generates multiple choice, short answer, true/false, and essay questions that match real exam patterns.",
    color: "accent",
  },
  {
    icon: Layers,
    title: "Adaptive Flashcards",
    description: "Get flashcards organized by difficulty—easy, medium, and hard—with clear explanations on every card.",
    color: "success",
  },
  {
    icon: FileText,
    title: "One-Page Cheat Sheets",
    description: "AI compresses your material into a single, beautifully formatted page with key points and formulas.",
    color: "warning",
  },
  {
    icon: Target,
    title: "Test Predictions",
    description: "See which topics are most likely to appear on your exam based on pattern analysis.",
    color: "primary",
  },
  {
    icon: MessageSquareText,
    title: "Homework Helper",
    description: "Get step-by-step reasoning and practice questions—never just copy-paste answers.",
    color: "accent",
  },
];

const Features = () => {
  return (
    <section id="features" className="py-24 bg-muted/30 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-accent/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-light border border-primary/20 mb-6">
            <Zap className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Powerful Features</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Everything You Need to
            <span className="gradient-text block">Study Smarter</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            From upload to exam day, Study Booster Pro has you covered with AI tools designed specifically for students.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group p-6 rounded-2xl bg-card border border-border hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={`w-12 h-12 rounded-xl bg-${feature.color}/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <feature.icon className={`w-6 h-6 text-${feature.color}`} />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-foreground">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-card border border-border shadow-sm">
            <Sparkles className="w-5 h-5 text-primary" />
            <span className="text-foreground font-medium">New features added every week</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;