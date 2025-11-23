import axios from "axios";

export const extractTasks = async (text: string) => {
  const response = await axios.post(
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent",
    {
      contents: [{ parts: [{ text }] }],
    },
    {
      params: { key: process.env.GEMINI_API_KEY },
    }
  );

  return response.data;
};

export const generateDailyBrief = async () => {
  return `Daily brief generated via Gemini: ${new Date().toDateString()}`;
};

export const generateWeeklyBrief = async () => {
  return `Weekly brief generated via Gemini: Week ending ${new Date().toDateString()}`;
};
