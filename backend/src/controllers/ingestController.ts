import { extractTasks } from "../services/gemini";

export async function ingestContent(req, res) {
  try {
    const { text } = req.body;
    const tasks = await extractTasks(text);
    res.json({ tasks });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

