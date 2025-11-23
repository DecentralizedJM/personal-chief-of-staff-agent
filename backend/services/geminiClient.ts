import axios from "axios";

const GEMINI_URL =
  "https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash-latest:generateContent";

export const extractTasksFromGemini = async (text: string) => {
  try {
    const payload = {
      contents: [{ parts: [{ text }] }],
    };

    const response = await axios.post(GEMINI_URL, payload, {
      params: { key: process.env.GEMINI_API_KEY },
      headers: {
        "Content-Type": "application/json",
      },
    });

    const raw =
      response.data?.candidates?.[0]?.content?.parts?.[0]?.text || null;

    return {
      error: false,
      output: raw,
    };
  } catch (err: any) {
    console.error("🔥 Gemini API Error:", err.response?.data || err.message);

    return {
      error: true,
      details: err.response?.data || err.message,
    };
  }
};
