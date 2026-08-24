from uuid import UUID
from fastapi import APIRouter, Depends
from app.core.security import get_current_user

router = APIRouter()


@router.get("/{project_id}/deployments")
async def list_deployments(project_id: UUID, user_id: str = Depends(get_current_user), page: int = 1):
    return {"project_id": str(project_id), "items": [], "page": page}


@router.post("/{project_id}/deployments")
async def trigger_deployment(project_id: UUID, environment: str, user_id: str = Depends(get_current_user)):
    return {"project_id": str(project_id), "environment": environment, "status": "Queued"}


@router.get("/{project_id}/deployments/{deployment_id}/logs")
async def deployment_logs(project_id: UUID, deployment_id: UUID, user_id: str = Depends(get_current_user)):
    return {"deployment_id": str(deployment_id), "lines": []}
