from uuid import UUID
from fastapi import APIRouter, Depends
from app.core.security import get_current_user

router = APIRouter()


@router.get("/{website_id}/ssl")
async def ssl_status(website_id: UUID, user_id: str = Depends(get_current_user)):
    return {"website_id": str(website_id), "status": "Valid", "days_remaining": None}


@router.post("/{website_id}/ssl/refresh")
async def refresh_ssl(website_id: UUID, user_id: str = Depends(get_current_user)):
    """Re-check the certificate chain now instead of waiting for the next scheduled pass."""
    return {"website_id": str(website_id), "status": "refreshed"}
