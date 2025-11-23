import { Router } from "express";
import { ingestContent } from "../controllers/ingestController";

export const ingestRouter = Router();

ingestRouter.post("/", ingestContent);

