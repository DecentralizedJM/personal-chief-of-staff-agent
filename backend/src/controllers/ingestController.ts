import { Request, Response } from "express";
import { extractTasks } from "../services/gemini";

export const ingestContent = async (req: Request, res: Response) => {
  const { text } = req.body;
  const result = await extractTasks(text);
  res.json(result);
};
