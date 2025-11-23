import { PromptDefinition, WorkflowDefinition, NotionField } from './types';

// --- PROMPTS ---
export const SYSTEM_PROMPTS: PromptDefinition[] = [
  {
    name: "Task Extraction",
    filename: "task_extraction.txt",
    description: "Extracts structured tasks from raw text input (email, chat, voice transcript).",
    content: `You are an expert Chief of Staff. Your goal is to extract actionable tasks from the following input.
Input Type: \${INPUT_TYPE} (Email, Meeting Notes, Chat, Voice)
Input Text:
"""
\${INPUT_TEXT}
"""

Instructions:
1. Identify every distinct task, obligation, or follow-up item.
2. For each task, extract:
   - Title: Concise summary (start with a verb).
   - Description: Context and details.
   - Due Date: ISO 8601 format (YYYY-MM-DD) if mentioned, otherwise null.
   - Priority: 'High', 'Medium', or 'Low' based on urgency and tone.
   - Category: 'Work', 'Personal', 'Health', 'Finance', or 'Other'.

Output strictly valid JSON in this format:
{
  "tasks": [
    {
      "title": "...",
      "description": "...",
      "dueDate": "...",
      "priority": "...",
      "category": "..."
    }
  ]
}`
  },
  {
    name: "Meeting to Tasks",
    filename: "meeting_to_tasks.txt",
    description: "Converts meeting transcripts into tasks and a summary.",
    content: `Analyze the following meeting transcript.
Transcript:
"""
\${TRANSCRIPT}
"""

Output a structured JSON summary containing:
1. "summary": A brief paragraph describing the meeting outcomes.
2. "tasks": An array of action items assigned to specific people (or the user).
`
  },
  {
    name: "Daily Briefing",
    filename: "daily_briefing.txt",
    description: "Generates a morning briefing from pending tasks and calendar events.",
    content: `You are my Personal Chief of Staff. It is 8:00 AM.
Here is my agenda for today:
\${CALENDAR_EVENTS}

Here are my high-priority tasks from Notion:
\${NOTION_TASKS}

Generate a concise, motivating Daily Briefing message for Telegram.
- Start with a quick "Good morning" and a motivation quote.
- List the "Big 3" things I must accomplish today.
- Warn me about any back-to-back meetings.
- End with "Let's win the day."
`
  },
  {
    name: "Weekly Review",
    filename: "weekly_briefing.txt",
    description: "Summarizes the past week and prepares for the next.",
    content: `Analyze my completed tasks for the week:
\${COMPLETED_TASKS}

Analyze my upcoming week's schedule:
\${UPCOMING_EVENTS}

Generate a Weekly Review Summary.
1. meaningful achievements from last week.
2. The primary focus for the upcoming week.
3. Suggest a time block strategy for the busiest day.
`
  }
];

// --- N8N WORKFLOWS ---
export const N8N_WORKFLOWS: WorkflowDefinition[] = [
  {
    name: "Workflow A: Intake",
    filename: "intake.json",
    description: "Webhook listener that sends data to Gemini for extraction.",
    json: {
      "name": "A - Intake Pipeline",
      "nodes": [
        {
          "parameters": { "path": "intake", "responseMode": "lastNode", "options": {} },
          "name": "Webhook",
          "type": "n8n-nodes-base.webhook",
          "typeVersion": 1,
          "position": [100, 300]
        },
        {
          "parameters": {
            "method": "POST",
            "url": "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}",
            "bodyParametersUi": { "parameter": [ { "name": "contents", "value": "={{ {\"parts\": [{\"text\": $json.body.text}]} }}" } ] },
            "options": {}
          },
          "name": "Gemini Extraction",
          "type": "n8n-nodes-base.httpRequest",
          "typeVersion": 3,
          "position": [300, 300]
        },
        {
          "parameters": { "jsCode": "return JSON.parse(items[0].json.candidates[0].content.parts[0].text);" },
          "name": "Parse JSON",
          "type": "n8n-nodes-base.code",
          "typeVersion": 1,
          "position": [500, 300]
        }
      ],
      "connections": {
        "Webhook": { "main": [ [ { "node": "Gemini Extraction", "type": "main", "index": 0 } ] ] },
        "Gemini Extraction": { "main": [ [ { "node": "Parse JSON", "type": "main", "index": 0 } ] ] }
      }
    }
  },
  {
    name: "Workflow B: Task Manager",
    filename: "task_manager.json",
    description: "Takes JSON tasks and pushes them to Notion.",
    json: {
      "name": "B - Task Manager",
      "nodes": [
        {
          "parameters": {},
          "name": "Start",
          "type": "n8n-nodes-base.start",
          "typeVersion": 1,
          "position": [100, 300]
        },
        {
          "parameters": {
            "resource": "databasePage",
            "operation": "create",
            "databaseId": "${NOTION_DB_ID}",
            "propertiesUi": {
              "propertyValues": [
                { "key": "Name", "title": "={{$json.title}}" },
                { "key": "Status", "selectValue": "To Do" },
                { "key": "Priority", "selectValue": "={{$json.priority}}" }
              ]
            }
          },
          "name": "Notion Create",
          "type": "n8n-nodes-base.notion",
          "typeVersion": 2,
          "position": [300, 300]
        }
      ],
      "connections": {
        "Start": { "main": [ [ { "node": "Notion Create", "type": "main", "index": 0 } ] ] }
      }
    }
  },
  {
    name: "Workflow C: Reminders & Briefings",
    filename: "reminders_and_briefings.json",
    description: "Cron job for daily summaries via Telegram.",
    json: {
      "name": "C - Daily Briefing",
      "nodes": [
        {
          "parameters": { "triggerTimes": { "item": [ { "hour": 8, "minute": 0 } ] } },
          "name": "Daily Cron",
          "type": "n8n-nodes-base.cron",
          "typeVersion": 1,
          "position": [100, 300]
        },
        {
          "parameters": {
            "resource": "databasePage",
            "operation": "getAll",
            "databaseId": "${NOTION_DB_ID}",
            "filterType": "manual",
            "filters": { "conditions": [ { "key": "Status", "condition": "equals", "selectValue": "To Do" } ] }
          },
          "name": "Get Notion Tasks",
          "type": "n8n-nodes-base.notion",
          "typeVersion": 2,
          "position": [300, 300]
        },
        {
          "parameters": {
            "chatId": "${TELEGRAM_CHAT_ID}",
            "text": "={{$json.text}}"
          },
          "name": "Telegram Sender",
          "type": "n8n-nodes-base.telegram",
          "typeVersion": 1,
          "position": [700, 300]
        }
      ],
      "connections": {
        "Daily Cron": { "main": [ [ { "node": "Get Notion Tasks", "type": "main", "index": 0 } ] ] },
        "Get Notion Tasks": { "main": [ [ { "node": "Telegram Sender", "type": "main", "index": 0 } ] ] }
      }
    }
  }
];

// --- NOTION SCHEMA ---
export const NOTION_SCHEMA: NotionField[] = [
  { name: "Task", type: "Title", options: [] },
  { name: "Description", type: "Rich Text", options: [] },
  { name: "Priority", type: "Select", options: ["High", "Medium", "Low"] },
  { name: "Status", type: "Status", options: ["To Do", "In Progress", "Done"] },
  { name: "Due Date", type: "Date", options: [] },
  { name: "Category", type: "Select", options: ["Work", "Personal", "Health", "Finance"] },
  { name: "Source", type: "Select", options: ["Email", "Telegram", "Meeting"] }
];

// --- REPO STRUCTURE ---
export const REPO_STRUCTURE = {
  "name": "personal-chief-of-staff-agent",
  "children": [
    {
      "name": "workflows",
      "children": ["intake.json", "task_manager.json", "reminders_and_briefings.json"]
    },
    {
      "name": "prompts",
      "children": ["task_extraction.txt", "meeting_to_tasks.txt", "daily_briefing.txt", "weekly_briefing.txt"]
    },
    {
      "name": "config",
      "children": ["notion_schema.json", "telegram_commands.json"]
    },
    { "name": "docs", "children": ["README.md", "SETUP.md"] },
    { "name": ".env.example" }
  ]
};

// --- README ---
export const README_CONTENT = `# Personal Chief-of-Staff Agent

## Overview
This agent acts as your second brain. It ingests messages, emails, and meeting notes, converts them into structured Notion tasks, and sends you daily briefings via Telegram.

## Architecture
1. **Intake**: Webhook receives text -> Gemini 2.5 Flash extracts JSON.
2. **Storage**: Notion Database stores tasks with Priority/Status.
3. **Execution**: n8n handles routing and logic.
4. **Interface**: Telegram Bot for input and daily summaries.

## Setup
1. **Gemini**: Get API Key from Google AI Studio.
2. **Notion**: Create an Integration, share DB with it.
3. **Telegram**: Talk to @BotFather, get Token.
4. **n8n**: Import the workflows from the \`/workflows\` folder.

## Usage
- Forward an email to the unique email hook.
- Send a voice note to your Telegram Bot.
- Wake up to a formatted daily plan.
`;
