import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { 
  Layers, 
  ChevronLeft, 
  ChevronRight, 
  RotateCcw,
  Sparkles,
  Check,
  X
} from "lucide-react";
import { cn } from "@/lib/utils";

const sampleFlashcards = [
  {
    id: 1,
    front: "Mitochondria",
    back: "The powerhouse of the cell. Responsible for producing ATP through cellular respiration. Has its own DNA and double membrane structure.",
    difficulty: "easy",
  },
  {
    id: 2,
    front: "Photosynthesis",
    back: "The process by which plants convert light energy, water, and carbon dioxide into glucose and oxygen. Occurs in chloroplasts.",
    difficulty: "medium",
  },
  {
    id: 3,
    front: "Krebs Cycle",
    back: "Also known as the citric acid cycle. A series of chemical reactions used to release stored energy through the oxidation of acetyl-CoA derived from carbohydrates, fats, and proteins.",
    difficulty: "hard",
  },
  {
    id: 4,
    front: "ATP Synthase",
    back: "An enzyme that creates ATP from ADP and inorganic phosphate using the energy from a proton gradient across the inner mitochondrial membrane.",
    difficulty: "hard",
  },
  {
    id: 5,
    front: "Cellular Respiration",
    back: "The process of breaking down glucose to produce ATP. Includes glycolysis, the Krebs cycle, and oxidative phosphorylation.",
    difficulty: "medium",
  },
];

const Flashcards = () => {
  const [currentCard, setCurrentCard] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [knownCards, setKnownCards] = useState<number[]>([]);
  const [unknownCards, setUnknownCards] = useState<number[]>([]);
  const [filter, setFilter] = useState<"all" | "easy" | "medium" | "hard">("all");

  const filteredCards = sampleFlashcards.filter(
    card => filter === "all" || card.difficulty === filter
  );

  const card = filteredCards[currentCard];

  const handleFlip = () => setIsFlipped(!isFlipped);

  const handleNext = () => {
    if (currentCard < filteredCards.length - 1) {
      setCurrentCard(prev => prev + 1);
      setIsFlipped(false);
    }
  };

  const handlePrev = () => {
    if (currentCard > 0) {
      setCurrentCard(prev => prev - 1);
      setIsFlipped(false);
    }
  };

  const handleKnown = () => {
    setKnownCards(prev => [...prev, card.id]);
    handleNext();
  };

  const handleUnknown = () => {
    setUnknownCards(prev => [...prev, card.id]);
    handleNext();
  };

  const handleRestart = () => {
    setCurrentCard(0);
    setIsFlipped(false);
    setKnownCards([]);
    setUnknownCards([]);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy": return "bg-success-light text-success";
      case "medium": return "bg-warning-light text-warning";
      case "hard": return "bg-destructive/10 text-destructive";
      default: return "bg-muted text-muted-foreground";
    }
  };

  return (
    <DashboardLayout>
      <div className="p-6 lg:p-8 max-w-3xl mx-auto">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-foreground mb-1">Flashcards</h1>
            <p className="text-muted-foreground">
              {filteredCards.length} cards • {knownCards.length} known • {unknownCards.length} learning
            </p>
          </div>
          
          {/* Difficulty Filter */}
          <div className="flex gap-2">
            {["all", "easy", "medium", "hard"].map((level) => (
              <button
                key={level}
                onClick={() => { setFilter(level as any); setCurrentCard(0); setIsFlipped(false); }}
                className={cn(
                  "px-4 py-2 rounded-lg text-sm font-medium transition-all capitalize",
                  filter === level 
                    ? "bg-primary text-primary-foreground" 
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                )}
              >
                {level}
              </button>
            ))}
          </div>
        </div>

        {/* Progress */}
        <div className="flex items-center gap-4 mb-6">
          <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-primary to-accent transition-all"
              style={{ width: `${((currentCard + 1) / filteredCards.length) * 100}%` }}
            />
          </div>
          <span className="text-sm text-muted-foreground font-medium">
            {currentCard + 1} / {filteredCards.length}
          </span>
        </div>

        {/* Flashcard */}
        {card && (
          <div 
            className="perspective-1000 cursor-pointer mb-6"
            onClick={handleFlip}
          >
            <div 
              className={cn(
                "relative w-full h-80 transition-transform duration-500 transform-style-preserve-3d",
                isFlipped && "rotate-y-180"
              )}
              style={{ 
                transformStyle: "preserve-3d",
                transform: isFlipped ? "rotateY(180deg)" : "rotateY(0)"
              }}
            >
              {/* Front */}
              <div 
                className="absolute inset-0 bg-card rounded-2xl border border-border p-8 flex flex-col items-center justify-center backface-hidden shadow-lg"
                style={{ backfaceVisibility: "hidden" }}
              >
                <div className={cn("px-3 py-1 rounded-full text-xs font-medium mb-4", getDifficultyColor(card.difficulty))}>
                  {card.difficulty}
                </div>
                <Layers className="w-8 h-8 text-primary mb-4" />
                <h2 className="text-2xl font-bold text-foreground text-center">{card.front}</h2>
                <p className="text-sm text-muted-foreground mt-4">Click to flip</p>
              </div>
              
              {/* Back */}
              <div 
                className="absolute inset-0 bg-gradient-to-br from-primary to-primary/80 rounded-2xl border border-primary/20 p-8 flex flex-col items-center justify-center shadow-lg"
                style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
              >
                <Sparkles className="w-8 h-8 text-primary-foreground/80 mb-4" />
                <p className="text-lg text-primary-foreground text-center leading-relaxed">{card.back}</p>
              </div>
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="flex items-center justify-between mb-6">
          <Button 
            variant="outline" 
            onClick={handlePrev}
            disabled={currentCard === 0}
          >
            <ChevronLeft className="w-4 h-4" />
            Previous
          </Button>
          
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              onClick={handleUnknown}
              className="border-destructive/30 text-destructive hover:bg-destructive/10"
            >
              <X className="w-4 h-4" />
              Still Learning
            </Button>
            <Button 
              variant="success"
              onClick={handleKnown}
              className="bg-success text-success-foreground hover:bg-success/90"
            >
              <Check className="w-4 h-4" />
              Got It!
            </Button>
          </div>
          
          <Button 
            variant="outline" 
            onClick={handleNext}
            disabled={currentCard >= filteredCards.length - 1}
          >
            Next
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>

        {/* Restart */}
        <div className="text-center">
          <Button variant="ghost" onClick={handleRestart}>
            <RotateCcw className="w-4 h-4" />
            Restart Deck
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Flashcards;