import { Request, Response } from "express";

export const getSystemStatus = async (req: Request, res: Response) => {
  res.json({
    status: "online",
    timestamp: new Date().toISOString(),
  });
};
