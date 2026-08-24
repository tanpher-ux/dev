"""
DevControl API — FastAPI entrypoint.

Combines the Developer System Manager and Website Monitoring & Uptime System
behind a single, authenticated REST + WebSocket API.
"""
from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded

from app.core.config import settings
from app.core.logging_config import configure_logging
from app.workers.scheduler import start_background_workers, stop_background_workers

from app.routers import (
    auth,
    projects,
    servers,
    docker_router,
    git_router,
    deployments,
    files,
    logs,
    backups,
    websites,
    checks,
    incidents,
    ssl_router,
    domains,
    notifications,
)

limiter = Limiter(key_func=get_remote_address)


@asynccontextmanager
async def lifespan(app: FastAPI):
    configure_logging()
    await start_background_workers()
    yield
    await stop_background_workers()


app = FastAPI(
    title="DevControl API",
    description="Developer System Manager + Website Monitoring & Uptime System",
    version="1.0.0",
    lifespan=lifespan,
)

app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Developer System Manager
app.include_router(auth.router, prefix="/api/auth", tags=["auth"])
app.include_router(projects.router, prefix="/api/projects", tags=["projects"])
app.include_router(servers.router, prefix="/api/projects", tags=["servers"])
app.include_router(docker_router.router, prefix="/api/docker", tags=["docker"])
app.include_router(git_router.router, prefix="/api/projects", tags=["git"])
app.include_router(deployments.router, prefix="/api/projects", tags=["deployments"])
app.include_router(files.router, prefix="/api/projects", tags=["files"])
app.include_router(logs.router, prefix="/api/projects", tags=["logs"])
app.include_router(backups.router, prefix="/api/projects", tags=["backups"])

# Website Monitoring & Uptime System
app.include_router(websites.router, prefix="/api/websites", tags=["websites"])
app.include_router(checks.router, prefix="/api/websites", tags=["checks"])
app.include_router(incidents.router, prefix="/api/websites", tags=["incidents"])
app.include_router(ssl_router.router, prefix="/api/websites", tags=["ssl"])
app.include_router(domains.router, prefix="/api/websites", tags=["domains"])
app.include_router(notifications.router, prefix="/api/notifications", tags=["notifications"])


@app.get("/api/health", tags=["system"])
async def health_check():
    return {"status": "ok", "service": "devcontrol-api"}
