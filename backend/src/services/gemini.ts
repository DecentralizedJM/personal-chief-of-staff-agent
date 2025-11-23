import { Request, Response } from "express";
import { extractTasks } from "../services/gemini";
import { addTaskToNotion } from "../services/notion";
import { sendTelegramMessage } from "../services/telegram";

export const ingestContent = async (req: Request, res: Response) => {
  try {
    const { text } = req.body;
    if (!text) {
      return res.status(400).json({ error: true, message: "Missing text" });
    }

    console.log("📩 Received:", text);

    // 1. Call Gemini
    const geminiResult = await extractTasks(text);

    if (geminiResult.error) {
      return res.status(500).json({
        error: true,
        message: "Gemini failed",
        details: geminiResult.details
      });
    }

    // 2. Extract structured task from Gemini
    // Expected format example:
    // {
    //   task_type: "reminder",
    //   action: "send_report",
    //   date: "2025-11-26",
    //   content: "Bitcoin report"
    // }
    const task = geminiResult?.candidates?.[0]?.content?.parts?.[0]?.text;
    let parsed: any;

    try {
      parsed = JSON.parse(task);
    } catch (e) {
      return res.status(400).json({
        error: true,
        message: "Gemini returned non-JSON output",
        raw: task
      });
    }

    console.log("🧠 Parsed Task:", parsed);

    // 3. Agent Decision Logic
    if (parsed.task_type === "reminder") {
      await addTaskToNotion({
        title: parsed.content,
        due: parsed.date,
        source: text
      });

      await sendTelegramMessage(
        `📌 New reminder added:\n${parsed.content}\n⏳ Due: ${parsed.date}`
      );

      return res.json({
        success: true,
        agent_action: "created_reminder",
        data: parsed
      });
    }

    if (parsed.task_type === "message") {
      await sendTelegramMessage(`📨 ${parsed.content}`);

      return res.json({
        success: true,
        agent_action: "sent_telegram_message",
        data: parsed
      });
    }

    // Default fallback
    return res.json({
      success: true,
      message: "Task understood but no matching action implemented.",
      parsed
    });

  } catch (error) {
    console.log("🔥 Error in ingestContent", error);
    return res.status(500).json({
      error: true,
      message: "Internal server error",
      details: error
    });
  }
};
