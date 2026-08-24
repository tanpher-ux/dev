from uuid import UUID
from fastapi import APIRouter, Depends
from app.core.security import get_current_user

router = APIRouter()


@router.get("")
async def list_projects(user_id: str = Depends(get_current_user), page: int = 1, page_size: int = 20, status: str | None = None):
    """Paginated, filterable list of the user's projects."""
    return {"items": [], "page": page, "page_size": page_size, "total": 0}


@router.post("")
async def create_project(user_id: str = Depends(get_current_user)):
    return {"message": "Project created."}


@router.get("/{project_id}")
async def get_project(project_id: UUID, user_id: str = Depends(get_current_user)):
    return {"id": str(project_id)}


@router.patch("/{project_id}")
async def update_project(project_id: UUID, user_id: str = Depends(get_current_user)):
    return {"id": str(project_id), "updated": True}


@router.delete("/{project_id}")
async def delete_project(project_id: UUID, user_id: str = Depends(get_current_user)):
    return {"id": str(project_id), "deleted": True}
