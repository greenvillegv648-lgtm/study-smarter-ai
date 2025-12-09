import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { 
  MessageSquareText, 
  Send, 
  Loader2,
  Sparkles,
  BookOpen,
  AlertCircle,
  Lightbulb
} from "lucide-react";

const Homework = () => {
  const [question, setQuestion] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState<{
    reasoning: string[];
    explanation: string;
    practiceQuestion: string;
  } | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim()) return;
    
    setIsLoading(true);
    
    // Simulate AI response
    setTimeout(() => {
      setResponse({
        reasoning: [
          "First, identify the key elements: we have a quadratic equation 2x² + 5x - 3 = 0",
          "We can use the quadratic formula: x = (-b ± √(b²-4ac)) / 2a",
          "Here, a = 2, b = 5, c = -3",
          "Calculate the discriminant: b² - 4ac = 25 - 4(2)(-3) = 25 + 24 = 49",
          "Since discriminant is positive, we have two real solutions",
          "x = (-5 ± 7) / 4, giving us x = 0.5 or x = -3",
        ],
        explanation: "This quadratic equation has two solutions because the discriminant (b² - 4ac) is positive. We used the quadratic formula which works for any quadratic equation in the form ax² + bx + c = 0. The ± symbol means we calculate both the addition and subtraction to get both roots.",
        practiceQuestion: "Try solving: 3x² - 7x + 2 = 0 using the same method. What are the two solutions?",
      });
      setIsLoading(false);
    }, 2000);
  };

  return (
    <DashboardLayout>
      <div className="p-6 lg:p-8 max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-foreground mb-1">Homework Helper</h1>
          <p className="text-muted-foreground">
            Get step-by-step explanations without copy-paste answers
          </p>
        </div>

        {/* Warning Banner */}
        <div className="mb-6 p-4 rounded-xl bg-warning-light border border-warning/30 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-warning mt-0.5 flex-shrink-0" />
          <div>
            <h4 className="font-medium text-foreground mb-1">Academic Integrity Notice</h4>
            <p className="text-sm text-muted-foreground">
              Study Booster helps you learn concepts, not cheat. Our AI provides reasoning 
              and explanations designed to help you understand—not copy-paste answers.
            </p>
          </div>
        </div>

        {/* Input Area */}
        <form onSubmit={handleSubmit} className="mb-8">
          <div className="bg-card rounded-2xl border border-border overflow-hidden">
            <textarea
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Paste your homework question here... For example: 'Solve the quadratic equation: 2x² + 5x - 3 = 0'"
              className="w-full p-4 lg:p-6 border-0 resize-none h-40 focus:outline-none text-foreground bg-transparent placeholder:text-muted-foreground"
            />
            <div className="px-4 pb-4 flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <BookOpen className="w-4 h-4" />
                <span>Supports math, science, history, and more</span>
              </div>
              <Button 
                type="submit" 
                variant="hero"
                disabled={!question.trim() || isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Thinking...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Get Help
                  </>
                )}
              </Button>
            </div>
          </div>
        </form>

        {/* Response */}
        {response && (
          <div className="space-y-6 animate-slide-up">
            {/* Step-by-step Reasoning */}
            <div className="bg-card rounded-2xl border border-border p-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                  <MessageSquareText className="w-4 h-4 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground">Step-by-Step Reasoning</h3>
              </div>
              
              <div className="space-y-3">
                {response.reasoning.map((step, index) => (
                  <div key={index} className="flex gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-bold text-primary">{index + 1}</span>
                    </div>
                    <p className="text-foreground">{step}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Explanation */}
            <div className="bg-card rounded-2xl border border-border p-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-success/10 flex items-center justify-center">
                  <Lightbulb className="w-4 h-4 text-success" />
                </div>
                <h3 className="font-semibold text-foreground">Why This Works</h3>
              </div>
              <p className="text-muted-foreground leading-relaxed">{response.explanation}</p>
            </div>

            {/* Practice Question */}
            <div className="bg-gradient-to-r from-primary to-primary/80 rounded-2xl p-6 text-primary-foreground">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="w-5 h-5" />
                <h3 className="font-semibold">Practice Question</h3>
              </div>
              <p className="text-primary-foreground/90 mb-4">{response.practiceQuestion}</p>
              <Button className="bg-white text-primary hover:bg-white/90">
                Try This Question
              </Button>
            </div>
          </div>
        )}

        {/* Example Questions */}
        {!response && !isLoading && (
          <div className="mt-8">
            <h3 className="text-sm font-medium text-muted-foreground mb-3">Try these examples:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {[
                "Explain the causes of World War I",
                "How do I balance this chemical equation: H₂ + O₂ → H₂O",
                "What's the difference between mitosis and meiosis?",
                "Help me understand the Pythagorean theorem",
              ].map((example, index) => (
                <button
                  key={index}
                  onClick={() => setQuestion(example)}
                  className="p-3 rounded-xl bg-card border border-border hover:border-primary/30 text-left text-sm text-muted-foreground hover:text-foreground transition-all"
                >
                  "{example}"
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Homework;