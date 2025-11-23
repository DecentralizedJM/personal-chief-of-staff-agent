import axios from "axios";

const GEMINI_URL =
  "https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash-latest:generateContent";

export const extractTasks = async (text: string) => {
  try {
    const payload = {
      contents: [
        {
          parts: [{ text }],
        },
      ],
    };

    const response = await axios.post(GEMINI_URL, payload, {
      params: { key: process.env.GEMINI_API_KEY },
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (error: any) {
    console.error("🔥 Gemini Error:", error.response?.data || error.message);
    return {
      error: true,
      message: "Gemini request failed",
      details: error.response?.data || error.message,
    };
  }
};

export const generateDailyBrief = async () => {
  return { brief: "Daily brief generated using Gemini." };
};

export const generateWeeklyBrief = async () => {
  return { brief: "Weekly brief generated using Gemini." };
};
