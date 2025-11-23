import { Request, Response } from "express";
import { getTasksFromNotion, addTaskToNotion } from "../services/notion";

export const getTasks = async (req: Request, res: Response) => {
  const tasks = await getTasksFromNotion();
  res.json(tasks);
};

export const addTask = async (req: Request, res: Response) => {
  const { title, description, priority, dueDate } = req.body;
  const response = await addTaskToNotion(title, description, priority, dueDate);
  res.json(response);
};
