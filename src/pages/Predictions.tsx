import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import { 
  Target, 
  TrendingUp, 
  AlertTriangle, 
  ChevronRight,
  Brain,
  Sparkles,
  BarChart3
} from "lucide-react";
import { cn } from "@/lib/utils";

const predictions = {
  title: "Biology Final Exam",
  date: "December 15, 2024",
  topics: [
    {
      priority: "high",
      topic: "Cellular Respiration",
      confidence: 95,
      reason: "Heavily emphasized in notes, multiple practice problems",
      subtopics: ["Glycolysis", "Krebs Cycle", "Electron Transport Chain"],
    },
    {
      priority: "high",
      topic: "Photosynthesis",
      confidence: 90,
      reason: "Detailed diagrams in notes, comparison questions likely",
      subtopics: ["Light Reactions", "Calvin Cycle", "C3 vs C4 Plants"],
    },
    {
      priority: "high",
      topic: "DNA Replication",
      confidence: 88,
      reason: "Recent chapter focus, complex process often tested",
      subtopics: ["Enzymes involved", "Leading vs Lagging strand"],
    },
    {
      priority: "medium",
      topic: "Cell Division",
      confidence: 75,
      reason: "Covered in multiple lectures, diagram-heavy topic",
      subtopics: ["Mitosis phases", "Meiosis", "Cancer connections"],
    },
    {
      priority: "medium",
      topic: "Protein Synthesis",
      confidence: 70,
      reason: "Builds on DNA content, application questions likely",
      subtopics: ["Transcription", "Translation", "Codons"],
    },
    {
      priority: "low",
      topic: "Evolution & Natural Selection",
      confidence: 45,
      reason: "Briefly covered, may appear as bonus question",
      subtopics: ["Darwin's theory", "Evidence of evolution"],
    },
  ],
};

const getPriorityStyles = (priority: string) => {
  switch (priority) {
    case "high":
      return { bg: "bg-destructive/10", border: "border-destructive/30", text: "text-destructive", icon: AlertTriangle };
    case "medium":
      return { bg: "bg-warning-light", border: "border-warning/30", text: "text-warning", icon: TrendingUp };
    case "low":
      return { bg: "bg-muted", border: "border-border", text: "text-muted-foreground", icon: Target };
    default:
      return { bg: "bg-muted", border: "border-border", text: "text-muted-foreground", icon: Target };
  }
};

const Predictions = () => {
  return (
    <DashboardLayout>
      <div className="p-6 lg:p-8 max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-foreground mb-1">Test Predictions</h1>
            <p className="text-muted-foreground">
              AI analysis of likely exam topics based on your study materials
            </p>
          </div>
          <Button variant="hero">
            <Sparkles className="w-4 h-4" />
            Generate New Prediction
          </Button>
        </div>

        {/* Prediction Overview */}
        <div className="bg-card rounded-2xl border border-border p-6 mb-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <Brain className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-foreground">{predictions.title}</h2>
                <p className="text-muted-foreground">Predicted for {predictions.date}</p>
              </div>
            </div>
            <div className="text-right hidden lg:block">
              <p className="text-sm text-muted-foreground">Based on</p>
              <p className="font-semibold text-foreground">5 uploaded documents</p>
            </div>
          </div>

          {/* Priority Legend */}
          <div className="flex flex-wrap gap-4 p-4 rounded-xl bg-muted/50">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-destructive" />
              <span className="text-sm text-foreground">High Priority</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-warning" />
              <span className="text-sm text-foreground">Medium Priority</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-muted-foreground" />
              <span className="text-sm text-foreground">Low Priority</span>
            </div>
          </div>
        </div>

        {/* Topics List */}
        <div className="space-y-4">
          {predictions.topics.map((topic, index) => {
            const styles = getPriorityStyles(topic.priority);
            const PriorityIcon = styles.icon;

            return (
              <div 
                key={index}
                className={cn(
                  "rounded-2xl border p-5 transition-all hover:shadow-lg cursor-pointer",
                  styles.bg,
                  styles.border
                )}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center", styles.bg)}>
                        <PriorityIcon className={cn("w-4 h-4", styles.text)} />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">{topic.topic}</h3>
                        <p className="text-sm text-muted-foreground capitalize">{topic.priority} Priority</p>
                      </div>
                    </div>
                    
                    <p className="text-sm text-muted-foreground mb-3">
                      {topic.reason}
                    </p>
                    
                    <div className="flex flex-wrap gap-2">
                      {topic.subtopics.map((sub, i) => (
                        <span 
                          key={i}
                          className="px-3 py-1 rounded-full bg-background text-xs font-medium text-foreground border border-border"
                        >
                          {sub}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="flex items-center gap-2 mb-1">
                      <BarChart3 className="w-4 h-4 text-muted-foreground" />
                      <span className="text-lg font-bold text-foreground">{topic.confidence}%</span>
                    </div>
                    <p className="text-xs text-muted-foreground">confidence</p>
                  </div>
                </div>
                
                <div className="mt-4 pt-4 border-t border-border/50 flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    {topic.subtopics.length} subtopics to review
                  </span>
                  <Button variant="ghost" size="sm" className="gap-1">
                    Study this topic
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Tip */}
        <div className="mt-8 p-4 rounded-xl bg-primary-light border border-primary/20">
          <div className="flex items-start gap-3">
            <Sparkles className="w-5 h-5 text-primary mt-0.5" />
            <div>
              <h4 className="font-medium text-foreground mb-1">Pro Tip</h4>
              <p className="text-sm text-muted-foreground">
                Focus on high-priority topics first. The AI predicts these based on emphasis, 
                repetition, and common testing patterns from your uploaded materials.
              </p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Predictions;