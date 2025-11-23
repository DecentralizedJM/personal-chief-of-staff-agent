import { GoogleGenAI } from "@google/genai";
import { SYSTEM_PROMPTS } from "../constants";

export const testTaskExtraction = async (apiKey: string, inputText: string) => {
  if (!apiKey) throw new Error("API Key is required");

  const ai = new GoogleGenAI({ apiKey });
  const promptTemplate = SYSTEM_PROMPTS.find(p => p.name === "Task Extraction")?.content || "";
  
  // Replace placeholders
  const fullPrompt = promptTemplate
    .replace("${INPUT_TYPE}", "Simulation")
    .replace("${INPUT_TEXT}", inputText);

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: fullPrompt,
      config: {
        responseMimeType: "application/json"
      }
    });
    
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    throw error;
  }
};

export const generateBriefingPreview = async (apiKey: string, tasks: any[]) => {
  if (!apiKey) throw new Error("API Key is required");

  const ai = new GoogleGenAI({ apiKey });
  const promptTemplate = SYSTEM_PROMPTS.find(p => p.name === "Daily Briefing")?.content || "";
  
  const tasksString = JSON.stringify(tasks, null, 2);
  const fullPrompt = promptTemplate
    .replace("${CALENDAR_EVENTS}", "9:00 AM - Team Sync\n2:00 PM - Client Call")
    .replace("${NOTION_TASKS}", tasksString);

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: fullPrompt,
    });
    
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    throw error;
  }
};
