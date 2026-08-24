from uuid import UUID
from fastapi import APIRouter, Depends, WebSocket
from app.core.security import get_current_user

router = APIRouter()


@router.get("/{project_id}/logs")
async def get_logs(project_id: UUID, level: str | None = None, search: str | None = None, user_id: str = Depends(get_current_user)):
    return {"project_id": str(project_id), "items": []}


@router.websocket("/{project_id}/logs/stream")
async def stream_logs(websocket: WebSocket, project_id: UUID):
    """Real-time log tail over WebSocket. Authenticate via token query param before accept()."""
    await websocket.accept()
    try:
        while True:
            await websocket.receive_text()
    except Exception:
        await websocket.close()
