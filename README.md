# Personal Chief-of-Staff Agent Dashboard

A clean, reactive dashboard built to monitor, control, and visualize the **Personal Chief-of-Staff Agent** system.
This UI works alongside the automation engine (n8n + Gemini + Notion + Telegram + Google Calendar), giving you a single place to track tasks, briefs, reminders, and system health.

> **⚠️ BACKEND STATUS: DORMANT**  
> The backend is **not currently deployed** to any hosting service (Railway, Vercel, etc.).  
> It exists in the `/backend` folder for local development only.  
> See the [Backend README](./backend/README.md) for local setup instructions.

---

## 🌐 AI Studio Version

This contains everything you need to run your app locally.

**View your app in AI Studio:**
[https://ai.studio/apps/drive/13Dqi8WdQdXDXQXG1tY_4QMggk75B8B4m](https://ai.studio/apps/drive/13Dqi8WdQdXDXQXG1tY_4QMggk75B8B4m)

---

## 🚀 Overview

This dashboard shows:

* Tasks extracted by Gemini
* Meeting follow-ups
* Daily & weekly briefings
* Time-blocked calendar windows
* Priority heat-maps
* Integration status for Notion, Telegram, Calendar, and n8n

Built with:

* **React + TypeScript**
* **Vite**
* **Gemini API**
* **API service modules**

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

* Node.js 18+
* Gemini API key
* **Backend is currently dormant** - frontend runs standalone for simulation/testing

### **Run locally**

```bash
npm install
npm run dev
```

### **Environment**

In `.env.local`:

```
GEMINI_API_KEY=your_key_here
# VITE_BACKEND_URL is not needed - backend is dormant
```

### **Optional: Run Backend Locally**

The backend exists but is **not deployed**. To run it locally for testing:

```bash
cd backend
npm install
npm run dev
```

See [backend/README.md](./backend/README.md) for details.

---

## 🔧 Configuration

The dashboard currently runs **standalone** with simulated data and Gemini API integration.

The backend in `/backend` is **dormant** (not deployed). It contains endpoints for:

* `/tasks`
* `/briefing/daily`
* `/briefing/weekly`
* `/calendar/timeblocks`
* `/agent/status`

These are available for local development only. See [backend/README.md](./backend/README.md) for setup.

---

## 🛠 Build for Production

```bash
npm run build
```

Deploy `/dist` to:

* Vercel
* Cloudflare Pages
* Netlify
* AI Studio hosting

**Note:** Frontend-only deployment. Backend is dormant and not deployed.

---

## 🔐 Security Notes

* Do not commit `.env.local`
* Never expose API keys
* All requests should be proxied via backend

---

## 📄 License

MIT

---

## 🙌 Acknowledgements

Companion UI for the **Personal-Chief-of-Staff Agent** built with Gemini + n8n.
