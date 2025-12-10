import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useStudyMaterials } from "@/hooks/useStudyMaterials";
import { SubscriptionModal } from "@/components/SubscriptionModal";
import { 
  Upload as UploadIcon, 
  FileText, 
  Image, 
  FileUp,
  X,
  Loader2,
  Sparkles,
  AlertCircle
} from "lucide-react";

const Upload = () => {
  const navigate = useNavigate();
  const { hasAccess, freeCredits, isSubscribed } = useAuth();
  const { uploadAndGenerate, loading } = useStudyMaterials();
  const [files, setFiles] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);

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

  const handleProcess = async () => {
    if (!hasAccess) {
      setShowSubscriptionModal(true);
      return;
    }

    const materialId = await uploadAndGenerate(files);
    if (materialId) {
      setFiles([]);
      navigate(`/quizzes/${materialId}`);
    }
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

        {/* Credits Banner */}
        {!isSubscribed && (
          <div className={`mb-6 p-4 rounded-xl ${freeCredits > 0 ? 'bg-primary-light border-primary/20' : 'bg-warning-light border-warning/30'} border flex items-start gap-3`}>
            <AlertCircle className={`w-5 h-5 ${freeCredits > 0 ? 'text-primary' : 'text-warning'} mt-0.5 flex-shrink-0`} />
            <div>
              <h4 className="font-medium text-foreground mb-1">
                {freeCredits > 0 ? `${freeCredits} free generation remaining` : "Free trial used"}
              </h4>
              <p className="text-sm text-muted-foreground">
                {freeCredits > 0 
                  ? "This will use your free credit to generate quizzes, flashcards, and more."
                  : "Subscribe to continue generating study materials."}
              </p>
            </div>
          </div>
        )}

        {/* Upload Zone */}
        <div
          className={`relative rounded-2xl border-2 border-dashed transition-all p-8 lg:p-12 text-center ${
            isDragging ? "border-primary bg-primary-light" : "border-border hover:border-primary/50 bg-card"
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
          
          <h3 className="text-lg font-semibold text-foreground mb-2">Drag & drop files here</h3>
          <p className="text-muted-foreground mb-4">or click to browse your computer</p>
          
          <div className="flex flex-wrap items-center justify-center gap-2 text-sm text-muted-foreground">
            <span className="px-3 py-1 rounded-full bg-muted">PDF</span>
            <span className="px-3 py-1 rounded-full bg-muted">Images</span>
            <span className="px-3 py-1 rounded-full bg-muted">Text files</span>
          </div>
        </div>

        {/* File List */}
        {files.length > 0 && (
          <div className="mt-6">
            <h3 className="text-sm font-medium text-foreground mb-3">Files to process ({files.length})</h3>
            <div className="space-y-2">
              {files.map((file, index) => {
                const FileIcon = getFileIcon(file.type);
                return (
                  <div key={index} className="flex items-center justify-between p-4 rounded-xl bg-card border border-border">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary-light flex items-center justify-center">
                        <FileIcon className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground text-sm">{file.name}</p>
                        <p className="text-xs text-muted-foreground">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                      </div>
                    </div>
                    <button onClick={() => removeFile(index)} className="p-2 rounded-lg hover:bg-muted text-muted-foreground hover:text-destructive transition-colors">
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
            <Button variant="hero" size="lg" className="flex-1" onClick={handleProcess} disabled={loading}>
              {loading ? (
                <><Loader2 className="w-5 h-5 animate-spin" />Processing with AI...</>
              ) : (
                <><Sparkles className="w-5 h-5" />Generate Study Materials</>
              )}
            </Button>
            <Button variant="outline" size="lg" onClick={() => setFiles([])}>Clear All</Button>
          </div>
        )}
      </div>

      <SubscriptionModal open={showSubscriptionModal} onOpenChange={setShowSubscriptionModal} />
    </DashboardLayout>
  );
};

export default Upload;
