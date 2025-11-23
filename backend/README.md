# Personal Chief-of-Staff Backend

> **⚠️ STATUS: DORMANT**  
> This backend is **not deployed** to any hosting service.  
> It exists for local development and testing only.

---

## Overview

This Express.js backend provides API endpoints for the Personal Chief-of-Staff Agent system, integrating with:

- **Notion** - Task management and databases
- **Telegram** - Bot notifications and updates
- **Google Calendar** - Event scheduling and time-blocking
- **Gemini AI** - Natural language processing and task extraction

---

## Current Status

**The backend is currently dormant:**
- ❌ Not deployed to Railway, Vercel, or any cloud service
- ❌ Not connected to the frontend in production
- ✅ Available for local development only
- ✅ All integrations can be tested locally with proper API keys

---

## Local Development Setup

### Prerequisites

- Node.js 18+
- API keys for:
  - Notion API token
  - Telegram Bot token
  - Gemini API key

### Installation

```bash
cd backend
npm install
```

### Environment Configuration

Create a `.env` file in the `backend/` directory:

```env
PORT=3000
NOTION_TOKEN=your_notion_token_here
NOTION_DATABASE_ID=your_database_id_here
TELEGRAM_BOT_TOKEN=your_telegram_bot_token_here
GEMINI_API_KEY=your_gemini_api_key_here
```

See `.env.example` for reference.

### Run Locally

```bash
# Development mode with auto-reload
npm run dev

# Build TypeScript
npm run build

# Run production build
npm start
```

The server will run on `http://localhost:3000`.

---

## API Endpoints

### Task Management
- `POST /ingest` - Ingest and process tasks
- `GET /tasks` - Retrieve tasks

### Briefings
- `GET /brief/daily` - Generate daily briefing
- `GET /brief/weekly` - Generate weekly summary

### System Status
- `GET /status` - Check integration health

---

## Architecture

```
backend/
├── src/
│   ├── server.ts              # Express app entry point
│   ├── controllers/           # Request handlers
│   │   ├── briefController.ts
│   │   ├── ingestController.ts
│   │   ├── statusController.ts
│   │   └── taskController.ts
│   ├── routes/                # API route definitions
│   │   ├── briefRoutes.ts
│   │   ├── ingestRoutes.ts
│   │   ├── statusRoutes.ts
│   │   └── taskRoutes.ts
│   └── services/              # Integration services
│       ├── calendar.ts
│       ├── gemini.ts
│       ├── notion.ts
│       └── telegram.ts
└── services/                  # Legacy/alternative services
    ├── geminiClient.ts
    ├── ingestController.ts
    ├── notionClient.ts
    └── telegramClient.ts
```

---

## Deployment (Future)

If you want to deploy this backend in the future:

### Railway
1. Connect your GitHub repo to Railway
2. Add environment variables in Railway dashboard
3. Deploy from the `backend/` directory

### Other Options
- **Vercel** (serverless functions)
- **Heroku** (dyno-based hosting)
- **Google Cloud Run** (containerized)
- **AWS Lambda** (serverless)

**Note:** Deployment is currently disabled. Update this README when deployment is configured.

---

## Security Notes

- Never commit `.env` files (already in `.gitignore`)
- Rotate API keys regularly
- Use environment-specific keys for dev/prod
- Implement rate limiting before production deployment

---

## License

MIT
