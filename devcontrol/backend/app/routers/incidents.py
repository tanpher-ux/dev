from uuid import UUID
from fastapi import APIRouter, Depends
from app.core.security import get_current_user

router = APIRouter()


@router.get("/{website_id}/incidents")
async def list_incidents(website_id: UUID, user_id: str = Depends(get_current_user)):
    return {"website_id": str(website_id), "items": []}


@router.get("/incidents/all")
async def all_incidents(user_id: str = Depends(get_current_user), active_only: bool = False):
    return {"items": []}
