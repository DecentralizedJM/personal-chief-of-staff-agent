import { Client } from "@notionhq/client";

const notion = new Client({ auth: process.env.NOTION_TOKEN });

export const getTasksFromNotion = async () => {
  const results = await notion.databases.query({
    database_id: process.env.NOTION_DB_ID!,
  });
  return results.results;
};

export const addTaskToNotion = async (
  title: string,
  description: string,
  priority: string,
  dueDate: string
) => {
  const response = await notion.pages.create({
    parent: { database_id: process.env.NOTION_DB_ID! },
    properties: {
      Name: { title: [{ text: { content: title } }] },
      Description: { rich_text: [{ text: { content: description } }] },
      Priority: { select: { name: priority } },
      "Due Date": { date: { start: dueDate } },
    },
  });

  return response;
};
