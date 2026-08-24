from uuid import UUID
from fastapi import APIRouter, Depends, HTTPException
from app.core.security import get_current_user
from app.core.command_whitelist import ServerAction

router = APIRouter()


@router.post("/{project_id}/servers/{action}")
async def control_server(project_id: UUID, action: ServerAction, user_id: str = Depends(get_current_user)):
    """
    Start/stop/restart a project's dev server, or fetch its logs.
    `action` is constrained to ServerAction — any other value is rejected
    by FastAPI's enum validation before this function body runs.
    """
    # Dispatch to a fixed, parameterized executor per ServerAction member.
    # Never build a shell string from client input.
    return {"project_id": str(project_id), "action": action, "status": "ok"}


@router.get("/{project_id}/servers/status")
async def server_status(project_id: UUID, user_id: str = Depends(get_current_user)):
    return {"project_id": str(project_id), "status": "Running", "port": 5173, "pid": 1234}
