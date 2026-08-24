from uuid import UUID
from fastapi import APIRouter, Depends
from app.core.security import get_current_user

router = APIRouter()


@router.get("/{project_id}/backups")
async def list_backups(project_id: UUID, user_id: str = Depends(get_current_user)):
    return {"project_id": str(project_id), "items": []}


@router.post("/{project_id}/backups")
async def create_backup(project_id: UUID, user_id: str = Depends(get_current_user)):
    """Archive the project directory, excluding .env / keys / credentials unless explicitly configured."""
    return {"project_id": str(project_id), "status": "In Progress"}


@router.get("/{project_id}/backups/{backup_id}/download")
async def download_backup(project_id: UUID, backup_id: UUID, user_id: str = Depends(get_current_user)):
    return {"backup_id": str(backup_id)}


@router.post("/{project_id}/backups/{backup_id}/restore")
async def restore_backup(project_id: UUID, backup_id: UUID, user_id: str = Depends(get_current_user)):
    return {"backup_id": str(backup_id), "status": "Restoring"}


@router.delete("/{project_id}/backups/{backup_id}")
async def delete_backup(project_id: UUID, backup_id: UUID, user_id: str = Depends(get_current_user)):
    return {"backup_id": str(backup_id), "deleted": True}
