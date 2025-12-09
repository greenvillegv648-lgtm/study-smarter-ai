import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { 
  Brain, 
  ChevronRight, 
  Check, 
  X, 
  RotateCcw,
  Trophy,
  Target,
  Clock
} from "lucide-react";

const sampleQuiz = {
  title: "Organic Chemistry Ch. 4-6",
  questions: [
    {
      id: 1,
      type: "multiple_choice",
      question: "What is the main function of mitochondria in a cell?",
      options: ["ATP production", "Protein synthesis", "Cell division", "DNA replication"],
      correct: 0,
    },
    {
      id: 2,
      type: "true_false",
      question: "Photosynthesis occurs in the mitochondria of plant cells.",
      options: ["True", "False"],
      correct: 1,
    },
    {
      id: 3,
      type: "short_answer",
      question: "Describe the process of cellular respiration in 2-3 sentences.",
      correct: null,
    },
  ],
};

const Quizzes = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);
  const [textAnswer, setTextAnswer] = useState("");

  const question = sampleQuiz.questions[currentQuestion];

  const handleAnswer = (index: number) => {
    if (showResult) return;
    setSelectedAnswer(index);
  };

  const handleSubmit = () => {
    if (selectedAnswer === null && question.type !== "short_answer") return;
    
    setShowResult(true);
    if (question.type !== "short_answer" && selectedAnswer === question.correct) {
      setScore(prev => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestion < sampleQuiz.questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setSelectedAnswer(null);
      setShowResult(false);
      setTextAnswer("");
    } else {
      setQuizComplete(true);
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setQuizComplete(false);
    setTextAnswer("");
  };

  if (quizComplete) {
    const percentage = Math.round((score / sampleQuiz.questions.length) * 100);
    return (
      <DashboardLayout>
        <div className="p-6 lg:p-8 max-w-2xl mx-auto">
          <div className="text-center py-12">
            <div className="w-20 h-20 rounded-2xl bg-success/10 flex items-center justify-center mx-auto mb-6">
              <Trophy className="w-10 h-10 text-success" />
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Quiz Complete!</h1>
            <p className="text-muted-foreground mb-8">Great job on completing the quiz.</p>
            
            <div className="p-6 rounded-2xl bg-card border border-border mb-8">
              <div className="text-5xl font-bold gradient-text mb-2">{percentage}%</div>
              <p className="text-muted-foreground">
                You got {score} out of {sampleQuiz.questions.length} questions correct
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button variant="hero" onClick={handleRestart}>
                <RotateCcw className="w-4 h-4" />
                Try Again
              </Button>
              <Button variant="outline">
                Review Answers
              </Button>
            </div>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="p-6 lg:p-8 max-w-3xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-foreground mb-1">{sampleQuiz.title}</h1>
            <p className="text-muted-foreground">Teacher-style quiz questions</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Target className="w-4 h-4" />
              <span>{currentQuestion + 1} / {sampleQuiz.questions.length}</span>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="h-2 bg-muted rounded-full mb-8 overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-300"
            style={{ width: `${((currentQuestion + 1) / sampleQuiz.questions.length) * 100}%` }}
          />
        </div>

        {/* Question Card */}
        <div className="bg-card rounded-2xl border border-border p-6 lg:p-8 mb-6">
          {/* Question Type Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-light text-primary text-xs font-medium mb-4">
            <Brain className="w-3 h-3" />
            {question.type === "multiple_choice" && "Multiple Choice"}
            {question.type === "true_false" && "True / False"}
            {question.type === "short_answer" && "Short Answer"}
          </div>

          {/* Question */}
          <h2 className="text-xl font-semibold text-foreground mb-6">
            {question.question}
          </h2>

          {/* Options */}
          {question.type !== "short_answer" ? (
            <div className="space-y-3">
              {question.options?.map((option, index) => {
                const isSelected = selectedAnswer === index;
                const isCorrect = index === question.correct;
                const showCorrectWrong = showResult && isSelected;

                return (
                  <button
                    key={index}
                    onClick={() => handleAnswer(index)}
                    disabled={showResult}
                    className={`w-full p-4 rounded-xl border-2 text-left transition-all flex items-center justify-between ${
                      showResult
                        ? isCorrect
                          ? "border-success bg-success-light"
                          : isSelected
                            ? "border-destructive bg-destructive/10"
                            : "border-border bg-muted/30"
                        : isSelected
                          ? "border-primary bg-primary-light"
                          : "border-border hover:border-primary/50 bg-card hover:bg-muted/50"
                    }`}
                  >
                    <span className={`font-medium ${showResult && isCorrect ? "text-success" : showResult && isSelected && !isCorrect ? "text-destructive" : "text-foreground"}`}>
                      {option}
                    </span>
                    {showResult && isCorrect && (
                      <Check className="w-5 h-5 text-success" />
                    )}
                    {showResult && isSelected && !isCorrect && (
                      <X className="w-5 h-5 text-destructive" />
                    )}
                  </button>
                );
              })}
            </div>
          ) : (
            <textarea
              value={textAnswer}
              onChange={(e) => setTextAnswer(e.target.value)}
              placeholder="Type your answer here..."
              className="w-full p-4 rounded-xl border-2 border-border bg-card focus:border-primary focus:outline-none resize-none h-32 text-foreground"
            />
          )}
        </div>

        {/* Actions */}
        <div className="flex justify-between">
          <Button 
            variant="ghost" 
            onClick={handleRestart}
          >
            <RotateCcw className="w-4 h-4" />
            Restart
          </Button>
          
          {!showResult ? (
            <Button 
              variant="hero" 
              onClick={handleSubmit}
              disabled={selectedAnswer === null && question.type !== "short_answer"}
            >
              Submit Answer
            </Button>
          ) : (
            <Button variant="hero" onClick={handleNext}>
              {currentQuestion < sampleQuiz.questions.length - 1 ? "Next Question" : "Finish Quiz"}
              <ChevronRight className="w-4 h-4" />
            </Button>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Quizzes;