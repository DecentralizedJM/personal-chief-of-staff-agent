import express from "express";
import { ingestContent } from "../controllers/ingestController";

const router = express.Router();

router.post("/", ingestContent);

export default router;
