import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { 
  Upload as UploadIcon, 
  FileText, 
  Image, 
  FileUp,
  X,
  Check,
  Loader2,
  Sparkles
} from "lucide-react";

const Upload = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFiles = Array.from(e.dataTransfer.files);
    setFiles(prev => [...prev, ...droppedFiles]);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      setFiles(prev => [...prev, ...selectedFiles]);
    }
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleProcess = () => {
    setIsProcessing(true);
    // TODO: Implement AI processing
    setTimeout(() => setIsProcessing(false), 2000);
  };

  const getFileIcon = (type: string) => {
    if (type.includes("pdf")) return FileText;
    if (type.includes("image")) return Image;
    return FileUp;
  };

  return (
    <DashboardLayout>
      <div className="p-6 lg:p-8 max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl lg:text-3xl font-bold text-foreground mb-2">
            Upload Study Materials
          </h1>
          <p className="text-muted-foreground">
            Upload PDFs, images, or text files and let AI generate study resources.
          </p>
        </div>

        {/* Upload Zone */}
        <div
          className={`relative rounded-2xl border-2 border-dashed transition-all p-8 lg:p-12 text-center ${
            isDragging 
              ? "border-primary bg-primary-light" 
              : "border-border hover:border-primary/50 bg-card"
          }`}
          onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
        >
          <input
            type="file"
            multiple
            accept=".pdf,.png,.jpg,.jpeg,.txt,.doc,.docx"
            onChange={handleFileSelect}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          
          <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
            <UploadIcon className="w-8 h-8 text-primary" />
          </div>
          
          <h3 className="text-lg font-semibold text-foreground mb-2">
            Drag & drop files here
          </h3>
          <p className="text-muted-foreground mb-4">
            or click to browse your computer
          </p>
          
          <div className="flex flex-wrap items-center justify-center gap-2 text-sm text-muted-foreground">
            <span className="px-3 py-1 rounded-full bg-muted">PDF</span>
            <span className="px-3 py-1 rounded-full bg-muted">Images</span>
            <span className="px-3 py-1 rounded-full bg-muted">Text files</span>
            <span className="px-3 py-1 rounded-full bg-muted">Word docs</span>
          </div>
        </div>

        {/* File List */}
        {files.length > 0 && (
          <div className="mt-6">
            <h3 className="text-sm font-medium text-foreground mb-3">
              Files to process ({files.length})
            </h3>
            <div className="space-y-2">
              {files.map((file, index) => {
                const FileIcon = getFileIcon(file.type);
                return (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 rounded-xl bg-card border border-border"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary-light flex items-center justify-center">
                        <FileIcon className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground text-sm">{file.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {(file.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => removeFile(index)}
                      className="p-2 rounded-lg hover:bg-muted text-muted-foreground hover:text-destructive transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Actions */}
        {files.length > 0 && (
          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <Button 
              variant="hero" 
              size="lg" 
              className="flex-1"
              onClick={handleProcess}
              disabled={isProcessing}
            >
              {isProcessing ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Processing with AI...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  Generate Study Materials
                </>
              )}
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => setFiles([])}
            >
              Clear All
            </Button>
          </div>
        )}

        {/* What happens next */}
        <div className="mt-12 p-6 rounded-2xl bg-muted/50 border border-border">
          <h3 className="font-semibold text-foreground mb-4">What happens next?</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { step: "1", title: "AI Extracts Content", desc: "We analyze your documents and extract key information" },
              { step: "2", title: "Generate Resources", desc: "AI creates quizzes, flashcards, and cheat sheets" },
              { step: "3", title: "Start Studying", desc: "Access your personalized study materials instantly" },
            ].map((item, i) => (
              <div key={i} className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-sm flex-shrink-0">
                  {item.step}
                </div>
                <div>
                  <h4 className="font-medium text-foreground text-sm mb-1">{item.title}</h4>
                  <p className="text-xs text-muted-foreground">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Upload;