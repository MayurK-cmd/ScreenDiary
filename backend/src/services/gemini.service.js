import fetch from "node-fetch";
import { ENV } from "../config/env.js";

export async function getGeminiResponse(prompt) {
  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${ENV.GEMINI_API_KEY}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }]
      })
    }
  );

  

  const data = await res.json();

  // 🔴 Defensive checks
  if (!data.candidates || data.candidates.length === 0) {
    console.error("Gemini raw response:", data);
    throw new Error("Gemini returned no candidates");
  }

  const rawText = data.candidates[0]?.content?.parts?.[0]?.text;

  if (!rawText) {
    console.error("Gemini raw response:", data);
    throw new Error("Gemini response text missing");
  }

  // 🔧 Extract JSON safely
  try {
    const jsonMatch = rawText.match(/\[.*\]/s);
    if (!jsonMatch) throw new Error("No JSON array found");

    return JSON.parse(jsonMatch[0]);
  } catch (err) {
    console.error("Failed to parse Gemini output:", rawText);
    throw new Error("Invalid JSON from Gemini");
  }
}
