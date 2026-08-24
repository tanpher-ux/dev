# DevControl

**Manage Your Code. Monitor Your Web.**

DevControl is a unified operations platform for developers, freelancers, and agencies,
combining two systems in one dashboard:

1. **Developer System Manager** — projects, local servers, Docker, Git, deployments,
   a secure file browser, real-time logs, and automated backups.
2. **Website Monitoring & Uptime System** — uptime checks, response-time tracking,
   SSL certificate expiry, domain expiry, incident history, and email/WhatsApp alerts.

---

## Stack

| Layer | Technology |
|---|---|
| Frontend | React 18 + TypeScript + Vite + Tailwind CSS |
| Backend | Python + FastAPI + WebSockets + APScheduler workers |
| Database | PostgreSQL |
| Infra | Docker + Docker Compose + Nginx |
| Auth | JWT (OAuth2 password flow) + bcrypt password hashing |

## Project Structure

```
devcontrol/
├── frontend/                  React + TypeScript + Vite + Tailwind SPA
│   └── src/
│       ├── components/        Sidebar, Topbar, shared UI primitives
│       ├── pages/              One page per module (Projects, Docker, Websites, SSL, …)
│       └── data/                Demo data (swap for real API calls)
├── backend/                   FastAPI application
│   └── app/
│       ├── core/                Config, JWT/security, logging, command whitelist
│       ├── models/               SQLAlchemy models (12 dev-system + 7 monitoring tables)
│       ├── routers/              REST endpoints, grouped by module
│       ├── workers/              APScheduler background jobs (polling, checks, alerts)
│       └── db/                    Async SQLAlchemy session
├── infra/
│   ├── nginx/                  Reverse proxy config (routes / , /api, /ws)
│   └── db/                     Postgres init SQL
└── docker-compose.yml
```

## Getting Started (Docker)

```bash
cp backend/.env.example backend/.env    # edit SECRET_KEY, SMTP, WhatsApp creds, etc.
docker compose up --build
```

- Frontend: http://localhost
- API: http://localhost/api
- API health check: http://localhost/api/health

## Getting Started (local dev, no Docker)

**Frontend**
```bash
cd frontend
npm install
npm run dev        # http://localhost:5173
```

**Backend**
```bash
cd backend
python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env   # point DATABASE_URL at a local Postgres instance
uvicorn app.main:app --reload
```

## Security Notes

- All system-level actions (starting/stopping servers, Docker control, Git
  operations) go through a fixed **command whitelist** (`app/core/command_whitelist.py`) —
  arbitrary shell execution is never exposed through the API.
- Project file access is sandboxed to `ALLOWED_PROJECT_ROOT`.
- Backups exclude `.env`, private keys, and credentials by default.
- Notification credentials (SMTP, WhatsApp API tokens) live only in backend
  environment variables and are never returned to the frontend.
- Passwords are hashed with bcrypt; sessions are JWT-based.

## Status

This repository is a complete, production-shaped scaffold: the frontend is a fully
built, styled UI wired to realistic demo data, and the backend has its full API
surface, database models, and background-worker structure in place. Wire the
routers to the database (SQLAlchemy queries + Alembic migrations) and connect
the frontend's `fetch` calls to `/api/*` to go live.
