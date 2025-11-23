import express from "express";
import bodyParser from "body-parser";
import { ingestRouter } from "./routes/ingestRoutes";
import { briefRouter } from "./routes/briefRoutes";
import { statusRouter } from "./routes/statusRoutes";

const app = express();
app.use(bodyParser.json());

app.use("/ingest", ingestRouter);
app.use("/brief", briefRouter);
app.use("/status", statusRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log("Backend running on", port));

