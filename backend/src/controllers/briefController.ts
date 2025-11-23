import { Request, Response } from "express";
import { generateDailyBrief, generateWeeklyBrief } from "../services/gemini";

export const getDailyBrief = async (req: Request, res: Response) => {
  const brief = await generateDailyBrief();
  res.json({ brief });
};

export const getWeeklyBrief = async (req: Request, res: Response) => {
  const brief = await generateWeeklyBrief();
  res.json({ brief });
};
