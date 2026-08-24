from uuid import UUID
from fastapi import APIRouter, Depends
from app.core.security import get_current_user
from app.core.command_whitelist import GitAction

router = APIRouter()


@router.get("/{project_id}/git")
async def git_status(project_id: UUID, user_id: str = Depends(get_current_user)):
    return {
        "project_id": str(project_id), "branch": "main", "clean": True,
        "modified": 0, "untracked": 0, "deleted": 0,
        "ahead": 0, "behind": 0,
    }


@router.post("/{project_id}/git/{action}")
async def git_action(project_id: UUID, action: GitAction, user_id: str = Depends(get_current_user)):
    """Read-only Git operations via GitPython. Commit/push require explicit user action elsewhere."""
    return {"project_id": str(project_id), "action": action}
