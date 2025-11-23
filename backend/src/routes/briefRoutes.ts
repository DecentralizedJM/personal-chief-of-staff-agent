import { Router } from "express";
import { getDaily, getWeekly } from "../controllers/briefController";

export const briefRouter = Router();

briefRouter.get("/daily", getDaily);
briefRouter.get("/weekly", getWeekly);

