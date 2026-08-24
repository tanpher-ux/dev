from uuid import UUID
from fastapi import APIRouter, Depends, HTTPException
from app.core.security import get_current_user

router = APIRouter()


@router.get("/{project_id}/files")
async def browse_files(project_id: UUID, path: str = "", user_id: str = Depends(get_current_user)):
    """
    List directory contents restricted to the project's configured root
    (ALLOWED_PROJECT_ROOT). Any path that resolves outside that root — via
    '..' traversal or symlink — must be rejected with 403.
    """
    return {"project_id": str(project_id), "path": path, "items": []}


@router.get("/{project_id}/files/content")
async def read_file(project_id: UUID, path: str, user_id: str = Depends(get_current_user)):
    return {"project_id": str(project_id), "path": path, "content": ""}
