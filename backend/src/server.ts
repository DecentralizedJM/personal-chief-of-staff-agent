import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import axios from "axios";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Health check
app.get("/", (req, res) => {
  res.json({ status: "OK", message: "Personal Chief-of-Staff Agent running." });
});

// Gemini Task Extractor
app.post("/extract", async (req, res) => {
  try {
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({ error: "Text is required." });
    }

    const GEMINI_URL =
      "https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash-latest:generateContent";

    const response = await axios.post(
      `${GEMINI_URL}?key=${process.env.GEMINI_API_KEY}`,
      {
        contents: [
          {
            parts: [
              {
                text:
                  "Extract all tasks from this message. Return as a JSON array of strings. " +
                  "Message: " +
                  text,
              },
            ],
          },
        ],
      }
    );

    const output =
      response.data?.candidates?.[0]?.content?.parts?.[0]?.text || "[]";

    res.json({ tasks: JSON.parse(output) });
  } catch (err) {
    console.error("Gemini Error =>", err.response?.data || err);
    res.status(500).json({ error: "Failed to extract tasks." });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
