import { generateDailyBrief, generateWeeklyBrief } from "../services/gemini";

export async function getDaily(req, res) {
  const result = await generateDailyBrief();
  res.json(result);
}

export async function getWeekly(req, res) {
  const result = await generateWeeklyBrief();
  res.json(result);
}

