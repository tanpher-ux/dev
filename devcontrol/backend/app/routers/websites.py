from uuid import UUID
from fastapi import APIRouter, Depends
from pydantic import BaseModel, HttpUrl
from app.core.security import get_current_user

router = APIRouter()


class WebsiteCreate(BaseModel):
    name: str
    url: HttpUrl
    project_id: UUID | None = None
    check_interval_seconds: int = 300
    expected_status_code: int = 200


@router.get("")
async def list_websites(user_id: str = Depends(get_current_user)):
    return {"items": []}


@router.post("")
async def add_website(payload: WebsiteCreate, user_id: str = Depends(get_current_user)):
    return {"name": payload.name, "url": str(payload.url), "status": "created"}


@router.get("/{website_id}")
async def get_website(website_id: UUID, user_id: str = Depends(get_current_user)):
    return {"id": str(website_id)}


@router.delete("/{website_id}")
async def delete_website(website_id: UUID, user_id: str = Depends(get_current_user)):
    return {"id": str(website_id), "deleted": True}
