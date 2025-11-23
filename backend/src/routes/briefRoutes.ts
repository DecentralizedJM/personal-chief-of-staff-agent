import express from "express";
import { getDailyBrief, getWeeklyBrief } from "../controllers/briefController";

const router = express.Router();

router.get("/daily", getDailyBrief);
router.get("/weekly", getWeeklyBrief);

export default router;
