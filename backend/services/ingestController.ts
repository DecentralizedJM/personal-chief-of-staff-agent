import { Request, Response } from "express";
import { extractTasksFromGemini } from "./geminiClient";
import { addTaskToNotion } from "./notionClient";
import { sendTelegramMessage } from "./telegramClient";

export const ingestContent = async (req: Request, res: Response) => {
  try {
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({
        error: true,
        message: "Missing text",
      });
    }

    console.log("📩 Incoming text:", text);

    // 1. Get Gemini structured task
    const geminiResult = await extractTasksFromGemini(text);

    if (geminiResult.error) {
      return res.status(500).json({
        error: true,
        message: "Gemini failed",
        details: geminiResult.details,
      });
    }

    let parsed;
    try {
      parsed = JSON.parse(geminiResult.output);
    } catch (err) {
      return res.status(400).json({
        error: true,
        message: "Gemini returned non-JSON output",
        raw: geminiResult.output,
      });
    }

    console.log("🧠 Parsed Task:", parsed);

    // 2. Agent Routing Logic
    if (parsed.task_type === "reminder") {
      await addTaskToNotion({
        title: parsed.content,
        due: parsed.date,
        source: text,
      });

      await sendTelegramMessage(
        `📌 Reminder added:\n${parsed.content}\n⏳ Due: ${parsed.date}`
      );

      return res.json({
        success: true,
        agent_action: "created_reminder",
        data: parsed,
      });
    }

    if (parsed.task_type === "message") {
      await sendTelegramMessage(`📨 ${parsed.content}`);

      return res.json({
        success: true,
        agent_action: "sent_telegram_message",
        data: parsed,
      });
    }

    // Default fallback
    return res.json({
      success: true,
      message: "Task understood but no matching handler implemented.",
      parsed,
    });
  } catch (error) {
    console.error("🔥 Error in ingestContent:", error);
    return res.status(500).json({
      error: true,
      message: "Internal server error",
      details: error,
    });
  }
};
