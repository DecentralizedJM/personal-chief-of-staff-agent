import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

import taskRoutes from "./routes/taskRoutes";
import briefRoutes from "./routes/briefRoutes";
import ingestRoutes from "./routes/ingestRoutes";
import statusRoutes from "./routes/statusRoutes";

app.use("/api/tasks", taskRoutes);
app.use("/api/briefing", briefRoutes);
app.use("/api/ingest", ingestRoutes);
app.use("/api/status", statusRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Backend running on http://localhost:${PORT}`);
});
