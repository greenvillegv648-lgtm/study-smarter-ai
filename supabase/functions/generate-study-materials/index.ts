import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

    if (!LOVABLE_API_KEY) {
      console.error("LOVABLE_API_KEY not configured");
      throw new Error("AI service not configured");
    }

    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Create Supabase client
    const supabase = createClient(SUPABASE_URL!, SUPABASE_SERVICE_ROLE_KEY!);

    // Get user from token
    const token = authHeader.replace("Bearer ", "");
    const { data: { user }, error: userError } = await supabase.auth.getUser(token);
    
    if (userError || !user) {
      console.error("Auth error:", userError);
      return new Response(JSON.stringify({ error: "Invalid token" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const { content, materialId, type } = await req.json();

    if (!content || !materialId) {
      return new Response(JSON.stringify({ error: "Content and materialId are required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Check if user has credits or active subscription
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("free_credits, subscription_status")
      .eq("id", user.id)
      .maybeSingle();

    if (profileError) {
      console.error("Profile fetch error:", profileError);
      throw new Error("Failed to fetch user profile");
    }

    const hasAccess = profile?.subscription_status === "active" || (profile?.free_credits || 0) > 0;
    
    if (!hasAccess) {
      return new Response(JSON.stringify({ 
        error: "No credits remaining", 
        requiresSubscription: true 
      }), {
        status: 403,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    console.log(`Generating study materials for user ${user.id}, type: ${type || 'all'}`);

    // Deduct credit if using free credits (not subscription)
    if (profile?.subscription_status !== "active" && profile && profile.free_credits > 0) {
      const { error: updateError } = await supabase
        .from("profiles")
        .update({ free_credits: profile.free_credits - 1 })
        .eq("id", user.id);

      if (updateError) {
        console.error("Failed to deduct credit:", updateError);
      }
    }

    const systemPrompt = `You are an expert educational content creator. Generate high-quality study materials based on the provided content. Your responses must be teacher-style, matching real exam patterns and curriculum standards.

Return a JSON object with this exact structure:
{
  "quizzes": [
    {
      "id": 1,
      "type": "multiple_choice" | "true_false" | "short_answer",
      "question": "Question text",
      "options": ["Option A", "Option B", "Option C", "Option D"] (for multiple_choice/true_false only),
      "correct": 0 (index for multiple_choice, 0/1 for true_false, null for short_answer),
      "explanation": "Why this is the correct answer"
    }
  ],
  "flashcards": [
    {
      "id": 1,
      "front": "Term or question",
      "back": "Definition or answer",
      "difficulty": "easy" | "medium" | "hard"
    }
  ],
  "cheat_sheet": {
    "sections": [
      {
        "title": "Section title",
        "items": ["Key point 1", "Key point 2"]
      }
    ]
  },
  "predictions": [
    {
      "priority": "high" | "medium" | "low",
      "topic": "Topic name",
      "confidence": 85,
      "reason": "Why this is likely to appear",
      "subtopics": ["Subtopic 1", "Subtopic 2"]
    }
  ]
}

Generate:
- 8-10 quiz questions (mix of types)
- 10-15 flashcards (mix of difficulties)
- 4-5 cheat sheet sections with key points
- 5-8 test predictions with priorities

Make questions feel like what a real teacher would ask based on curriculum patterns.`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: `Generate comprehensive study materials from this content:\n\n${content.substring(0, 15000)}` }
        ],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI Gateway error:", response.status, errorText);
      
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded. Please try again later." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "AI service requires payment. Please add credits." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      throw new Error("AI generation failed");
    }

    const aiData = await response.json();
    const generatedContent = aiData.choices?.[0]?.message?.content;

    if (!generatedContent) {
      throw new Error("No content generated");
    }

    // Parse the JSON from the response
    let studyMaterials;
    try {
      // Try to extract JSON from the response
      const jsonMatch = generatedContent.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        studyMaterials = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error("No JSON found in response");
      }
    } catch (parseError) {
      console.error("Failed to parse AI response:", parseError);
      console.log("Raw response:", generatedContent);
      throw new Error("Failed to parse generated content");
    }

    // Update the study material in the database
    const { error: updateError } = await supabase
      .from("study_materials")
      .update({
        quizzes: studyMaterials.quizzes,
        flashcards: studyMaterials.flashcards,
        cheat_sheet: studyMaterials.cheat_sheet,
        predictions: studyMaterials.predictions,
        extracted_content: content.substring(0, 5000),
      })
      .eq("id", materialId)
      .eq("user_id", user.id);

    if (updateError) {
      console.error("Failed to save materials:", updateError);
      throw new Error("Failed to save generated materials");
    }

    console.log("Successfully generated and saved study materials");

    return new Response(JSON.stringify({ 
      success: true, 
      materials: studyMaterials,
      creditsRemaining: profile?.subscription_status === "active" ? "unlimited" : Math.max(0, (profile?.free_credits || 0) - 1)
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });

  } catch (error: unknown) {
    console.error("Error in generate-study-materials:", error);
    const message = error instanceof Error ? error.message : "Generation failed";
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
