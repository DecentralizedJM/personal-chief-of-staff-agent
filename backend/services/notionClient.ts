import axios from "axios";

export const addTaskToNotion = async (task: any) => {
  try {
    const NOTION_DB = process.env.NOTION_DATABASE_ID;

    await axios.post(
      "https://api.notion.com/v1/pages",
      {
        parent: { database_id: NOTION_DB },
        properties: {
          Name: {
            title: [{ text: { content: task.title } }],
          },
          Due: {
            date: { start: task.due },
          },
          Source: {
            rich_text: [{ text: { content: task.source } }],
          },
        },
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.NOTION_SECRET}`,
          "Notion-Version": "2022-06-28",
        },
      }
    );
  } catch (err) {
    console.error("🔥 Notion Error:", err);
  }
};
