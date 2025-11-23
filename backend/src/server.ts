import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { ingestContent } from "./services/ingestController";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Health check
app.get("/", (req, res) => {
  res.json({
    status: "OK",
    message: "Personal Chief-of-Staff Agent running.",
  });
});

// MAIN INGEST ENDPOINT (this is what n8n calls)
app.post("/ingest", ingestContent);

// Port for Railway
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("🔥 Server running on port:", PORT);
});
