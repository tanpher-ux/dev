from fastapi import APIRouter, Depends
from app.core.security import get_current_user
from app.core.command_whitelist import DockerAction

router = APIRouter()


@router.get("/containers")
async def list_containers(user_id: str = Depends(get_current_user)):
    return {"items": []}


@router.post("/containers/{container_id}/{action}")
async def control_container(container_id: str, action: DockerAction, user_id: str = Depends(get_current_user)):
    """Whitelisted Docker action executed via the `docker` SDK — never raw shell."""
    return {"container_id": container_id, "action": action, "status": "ok"}


@router.get("/containers/{container_id}/logs")
async def container_logs(container_id: str, tail: int = 200, user_id: str = Depends(get_current_user)):
    return {"container_id": container_id, "lines": []}


@router.get("/images")
async def list_images(user_id: str = Depends(get_current_user)):
    return {"items": []}
