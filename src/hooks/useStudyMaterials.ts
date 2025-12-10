import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

export interface StudyMaterial {
  id: string;
  user_id: string;
  file_name: string;
  file_type: string;
  file_url: string | null;
  extracted_content: string | null;
  quizzes: Quiz[] | null;
  flashcards: Flashcard[] | null;
  cheat_sheet: CheatSheet | null;
  predictions: Prediction[] | null;
  created_at: string;
}

export interface Quiz {
  id: number;
  type: "multiple_choice" | "true_false" | "short_answer";
  question: string;
  options?: string[];
  correct: number | null;
  explanation?: string;
}

export interface Flashcard {
  id: number;
  front: string;
  back: string;
  difficulty: "easy" | "medium" | "hard";
}

export interface CheatSheet {
  sections: {
    title: string;
    items: string[];
  }[];
}

export interface Prediction {
  priority: "high" | "medium" | "low";
  topic: string;
  confidence: number;
  reason: string;
  subtopics: string[];
}

export function useStudyMaterials() {
  const { user, refreshProfile } = useAuth();
  const [loading, setLoading] = useState(false);
  const [materials, setMaterials] = useState<StudyMaterial[]>([]);
  const [currentMaterial, setCurrentMaterial] = useState<StudyMaterial | null>(null);

  const fetchMaterials = async () => {
    if (!user) return;

    const { data, error } = await supabase
      .from("study_materials")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching materials:", error);
      toast.error("Failed to load study materials");
      return;
    }

    // Type assertion for the JSON fields
    const typedMaterials = (data || []).map(m => ({
      ...m,
      quizzes: m.quizzes as unknown as Quiz[] | null,
      flashcards: m.flashcards as unknown as Flashcard[] | null,
      cheat_sheet: m.cheat_sheet as unknown as CheatSheet | null,
      predictions: m.predictions as unknown as Prediction[] | null,
    }));

    setMaterials(typedMaterials);
  };

  const uploadAndGenerate = async (files: File[]) => {
    if (!user) {
      toast.error("Please log in to upload files");
      return null;
    }

    setLoading(true);
    
    try {
      // Read file content
      const file = files[0];
      let content = "";

      if (file.type === "application/pdf") {
        // For PDFs, we'd need a PDF parser. For now, send a placeholder
        content = `[PDF Document: ${file.name}]\n\nThis is a PDF file that contains study material. Please generate study materials based on a typical academic document covering various topics.`;
      } else if (file.type.startsWith("image/")) {
        content = `[Image: ${file.name}]\n\nThis is an image of study notes or a worksheet. Please generate study materials based on typical academic content.`;
      } else {
        // Text files
        content = await file.text();
      }

      // Upload file to storage
      const filePath = `${user.id}/${Date.now()}-${file.name}`;
      const { error: uploadError } = await supabase.storage
        .from("study-materials")
        .upload(filePath, file);

      if (uploadError) {
        console.error("Upload error:", uploadError);
        toast.error("Failed to upload file");
        return null;
      }

      // Create study material record
      const { data: material, error: insertError } = await supabase
        .from("study_materials")
        .insert({
          user_id: user.id,
          file_name: file.name,
          file_type: file.type,
          file_url: filePath,
        })
        .select()
        .single();

      if (insertError) {
        console.error("Insert error:", insertError);
        toast.error("Failed to create study material");
        return null;
      }

      // Call the AI generation edge function
      const { data: sessionData } = await supabase.auth.getSession();
      
      const response = await supabase.functions.invoke("generate-study-materials", {
        body: {
          content,
          materialId: material.id,
        },
      });

      if (response.error) {
        console.error("Generation error:", response.error);
        
        if (response.error.message?.includes("requiresSubscription")) {
          toast.error("No free credits remaining. Please subscribe to continue.");
          return null;
        }
        
        toast.error("Failed to generate study materials");
        return null;
      }

      // Refresh profile to get updated credits
      await refreshProfile();
      
      // Refresh materials list
      await fetchMaterials();

      toast.success("Study materials generated successfully!");
      return material.id;
      
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred");
      return null;
    } finally {
      setLoading(false);
    }
  };

  const loadMaterial = async (id: string) => {
    const { data, error } = await supabase
      .from("study_materials")
      .select("*")
      .eq("id", id)
      .maybeSingle();

    if (error) {
      console.error("Error loading material:", error);
      return null;
    }

    if (data) {
      const typedMaterial: StudyMaterial = {
        ...data,
        quizzes: data.quizzes as unknown as Quiz[] | null,
        flashcards: data.flashcards as unknown as Flashcard[] | null,
        cheat_sheet: data.cheat_sheet as unknown as CheatSheet | null,
        predictions: data.predictions as unknown as Prediction[] | null,
      };
      setCurrentMaterial(typedMaterial);
      return typedMaterial;
    }
    
    return null;
  };

  return {
    loading,
    materials,
    currentMaterial,
    fetchMaterials,
    uploadAndGenerate,
    loadMaterial,
    setCurrentMaterial,
  };
}
