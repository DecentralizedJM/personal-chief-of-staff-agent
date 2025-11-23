````{"id":"90211","variant":"standard","title":"README.md (Updated with AI Studio Info)"}
# Personal Chief-of-Staff Agent Dashboard  

A clean, reactive dashboard built to monitor, control, and visualize the **Personal Chief-of-Staff Agent** system.  
This UI works alongside the automation engine (n8n + Gemini + Notion + Telegram + Google Calendar), giving you a single place to track tasks, briefs, reminders, and system health.

---

## 🌐 AI Studio Version

This contains everything you need to run your app locally.

**View your app in AI Studio:**  
https://ai.studio/apps/drive/13Dqi8WdQdXDXQXG1tY_4QMggk75B8B4m

---

## 🚀 Overview

This dashboard shows:

- Tasks extracted by Gemini  
- Meeting follow-ups  
- Daily & weekly briefings  
- Time-blocked calendar windows  
- Priority heat-maps  
- Integration status for Notion, Telegram, Calendar, and n8n  

Built with:

- **React + TypeScript**  
- **Vite**  
- **Gemini API**  
- **API service modules**

---

## 📂 Project Structure

```
personal-chief-of-staff-agent-dashboard/
│
├── components/         
├── pages/              
├── services/           
├── types.ts            
├── constants.ts        
├── metadata.json       
├── App.tsx             
├── index.tsx           
├── index.html          
├── package.json        
├── tsconfig.json       
├── vite.config.ts      
├── .env.local          
└── README.md           
```

---

## 🧩 Features

### ✔ Real-time Task View  
Sorted by priority, due date, and source.

### ✔ Meeting Follow-Ups  
Automatic insights extracted from transcripts.

### ✔ Daily Briefing  
Agenda, tasks, sentiment, overdue items.

### ✔ Weekly Summary  
Macro view of your week, based on your agent’s output.

### ✔ System Health Dashboard  
Status indicators for all integrations.

---

## 📦 Installation

### **Prerequisites**
- Node.js 18+  
- Gemini API key  
- Backend endpoints from your Chief-of-Staff agent (n8n or custom API)

### **Run locally**
```bash
npm install
npm run dev
```

### **Environment**
In `.env.local`:

```
GEMINI_API_KEY=your_key_here
VITE_BACKEND_URL=http://localhost:3000
```

---

## 🔧 Configuration

Endpoints inside `/services` define how the dashboard communicates with your backend agent:

- `/tasks`
- `/briefing/daily`
- `/briefing/weekly`
- `/calendar/timeblocks`
- `/agent/status`

Update these to match your backend URL or n8n instance.

---

## 🛠 Build for Production

```bash
npm run build
```

Deploy `/dist` to:

- Vercel  
- Cloudflare Pages  
- Netlify  
- AI Studio hosting  

---

## 🔐 Security Notes

- Do not commit `.env.local`  
- Never expose API keys  
- All requests should be proxied via backend  

---

## 📄 License  
MIT

---

## 🙌 Acknowledgements  
Companion UI for the **Personal-Chief-of-Staff Agent** built with Gemini + n8n.
````
