from uuid import UUID
from fastapi import APIRouter, Depends
from pydantic import BaseModel
from datetime import date
from app.core.security import get_current_user

router = APIRouter()


class ManualDomainExpiry(BaseModel):
    expires_at: date


@router.get("/{website_id}/domain")
async def domain_status(website_id: UUID, user_id: str = Depends(get_current_user)):
    return {"website_id": str(website_id), "expires_at": None, "days_remaining": None, "source": "rdap"}


@router.put("/{website_id}/domain")
async def set_manual_domain_expiry(website_id: UUID, payload: ManualDomainExpiry, user_id: str = Depends(get_current_user)):
    """Fallback for registrars/TLDs where automated WHOIS/RDAP lookup is unavailable."""
    return {"website_id": str(website_id), "expires_at": str(payload.expires_at), "source": "manual"}
