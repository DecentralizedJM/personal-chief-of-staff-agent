import express from "express";
import { getSystemStatus } from "../controllers/statusController";

const router = express.Router();

router.get("/", getSystemStatus);

export default router;
