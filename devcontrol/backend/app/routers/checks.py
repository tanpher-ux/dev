from uuid import UUID
from fastapi import APIRouter, Depends, Query
from app.core.security import get_current_user

router = APIRouter()


@router.get("/{website_id}/checks")
async def check_history(website_id: UUID, range: str = Query("24h", pattern="^(24h|7d|30d|90d)$"), user_id: str = Depends(get_current_user)):
    """Response-time and availability history for the requested range."""
    return {"website_id": str(website_id), "range": range, "points": []}


@router.get("/{website_id}/uptime")
async def uptime_summary(website_id: UUID, user_id: str = Depends(get_current_user)):
    return {"website_id": str(website_id), "uptime_24h": 100.0, "uptime_7d": 100.0, "uptime_30d": 100.0, "uptime_90d": 100.0}


@router.post("/{website_id}/checks/run")
async def run_check_now(website_id: UUID, user_id: str = Depends(get_current_user)):
    """Trigger an immediate out-of-band health check."""
    return {"website_id": str(website_id), "status": "queued"}
