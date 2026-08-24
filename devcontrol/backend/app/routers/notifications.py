from uuid import UUID
from fastapi import APIRouter, Depends
from pydantic import BaseModel
from app.core.security import get_current_user

router = APIRouter()


class NotificationSettingsUpdate(BaseModel):
    notify_down: bool = True
    notify_recovery: bool = True
    notify_slow: bool = True
    notify_ssl_expiry: bool = True
    notify_domain_expiry: bool = True
    channel_email: bool = True
    channel_whatsapp: bool = False


@router.get("")
async def list_notifications(user_id: str = Depends(get_current_user), unread_only: bool = False):
    return {"items": []}


@router.patch("/{notification_id}/read")
async def mark_read(notification_id: UUID, user_id: str = Depends(get_current_user)):
    return {"id": str(notification_id), "read": True}


@router.delete("/{notification_id}")
async def delete_notification(notification_id: UUID, user_id: str = Depends(get_current_user)):
    return {"id": str(notification_id), "deleted": True}


@router.get("/settings")
async def get_settings(user_id: str = Depends(get_current_user)):
    return NotificationSettingsUpdate()


@router.put("/settings")
async def update_settings(payload: NotificationSettingsUpdate, user_id: str = Depends(get_current_user)):
    """Notification credentials (SMTP, WhatsApp API tokens) live only in backend env vars — never returned here."""
    return payload
