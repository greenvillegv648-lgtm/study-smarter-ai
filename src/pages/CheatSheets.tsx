import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import { 
  FileText, 
  Download, 
  Printer, 
  Copy, 
  Check,
  Sparkles,
  BookOpen
} from "lucide-react";
import { useState } from "react";

const sampleCheatSheet = {
  title: "Organic Chemistry Ch. 4-6",
  sections: [
    {
      title: "Key Concepts",
      items: [
        "Cellular respiration produces ATP through glucose breakdown",
        "Photosynthesis converts light energy to chemical energy",
        "Mitochondria is the powerhouse of the cell",
        "ATP synthase creates ATP using proton gradient",
      ],
    },
    {
      title: "Important Formulas",
      items: [
        "Photosynthesis: 6CO₂ + 6H₂O + light → C₆H₁₂O₆ + 6O₂",
        "Cellular Respiration: C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O + ATP",
        "ATP Yield: ~36-38 ATP per glucose molecule",
      ],
    },
    {
      title: "Definitions",
      items: [
        "Glycolysis: Breakdown of glucose into pyruvate (cytoplasm)",
        "Krebs Cycle: Citric acid cycle in mitochondrial matrix",
        "Electron Transport Chain: Final stage of cellular respiration",
        "Chloroplast: Organelle where photosynthesis occurs",
      ],
    },
    {
      title: "Key Comparisons",
      items: [
        "Aerobic vs Anaerobic: Requires oxygen vs doesn't require oxygen",
        "Light vs Dark reactions: Light-dependent vs Calvin cycle",
        "Anabolism vs Catabolism: Building up vs breaking down molecules",
      ],
    },
  ],
};

const CheatSheets = () => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    // TODO: Copy content to clipboard
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <DashboardLayout>
      <div className="p-6 lg:p-8 max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-foreground mb-1">Cheat Sheets</h1>
            <p className="text-muted-foreground">
              AI-generated one-page summaries of your study materials
            </p>
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={handleCopy}>
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              {copied ? "Copied!" : "Copy"}
            </Button>
            <Button variant="outline" size="sm">
              <Printer className="w-4 h-4" />
              Print
            </Button>
            <Button variant="hero" size="sm">
              <Download className="w-4 h-4" />
              Download PDF
            </Button>
          </div>
        </div>

        {/* Cheat Sheet Preview */}
        <div className="bg-card rounded-2xl border border-border overflow-hidden shadow-lg">
          {/* Sheet Header */}
          <div className="bg-gradient-to-r from-primary to-primary/80 p-6 text-primary-foreground">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-xl font-bold">{sampleCheatSheet.title}</h2>
                <p className="text-primary-foreground/80 text-sm">One-Page Summary</p>
              </div>
            </div>
          </div>

          {/* Sheet Content */}
          <div className="p-6 lg:p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {sampleCheatSheet.sections.map((section, index) => (
                <div 
                  key={index} 
                  className="p-4 rounded-xl bg-muted/30 border border-border"
                >
                  <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-md bg-primary/10 text-primary text-xs flex items-center justify-center font-bold">
                      {index + 1}
                    </span>
                    {section.title}
                  </h3>
                  <ul className="space-y-2">
                    {section.items.map((item, i) => (
                      <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Sheet Footer */}
          <div className="px-6 lg:px-8 py-4 bg-muted/30 border-t border-border flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Sparkles className="w-4 h-4 text-primary" />
              Generated by Study Booster AI
            </div>
            <span className="text-sm text-muted-foreground">Page 1 of 1</span>
          </div>
        </div>

        {/* Other Cheat Sheets */}
        <div className="mt-8">
          <h3 className="text-lg font-semibold text-foreground mb-4">Your Cheat Sheets</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { title: "US History - Civil War", pages: 1, date: "Yesterday" },
              { title: "Calculus Formulas", pages: 2, date: "3 days ago" },
              { title: "Biology Midterm", pages: 1, date: "1 week ago" },
            ].map((sheet, index) => (
              <div 
                key={index}
                className="p-4 rounded-xl bg-card border border-border hover:border-primary/30 hover:shadow-lg transition-all cursor-pointer"
              >
                <div className="w-10 h-10 rounded-lg bg-primary-light flex items-center justify-center mb-3">
                  <FileText className="w-5 h-5 text-primary" />
                </div>
                <h4 className="font-medium text-foreground mb-1">{sheet.title}</h4>
                <p className="text-sm text-muted-foreground">
                  {sheet.pages} page{sheet.pages > 1 ? "s" : ""} • {sheet.date}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CheatSheets;
