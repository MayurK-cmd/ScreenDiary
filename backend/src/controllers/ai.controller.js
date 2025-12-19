import { supabase } from "../config/supabase.js";
import { buildPrompt } from "../utils/promptBuilder.js";
import { getGeminiResponse } from "../services/gemini.service.js";

export async function getRecommendations(req, res) {
  try {
    const { userId } = req.body;

    const { data } = await supabase
      .from("user_movies")
      .select("rating, movies(title, genres)")
      .eq("user_id", userId)
      .eq("status", "watched");

    if (!data || data.length === 0) {
      return res.status(400).json({
        error: "No watched movies found for recommendations"
      });
    }

    const prompt = buildPrompt(data);
    const recommendations = await getGeminiResponse(prompt);

    await supabase.from("ai_recommendations").insert({
      user_id: userId,
      recommendations
    });

    res.json(recommendations);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: err.message || "AI recommendation failed"
    });
  }
}
