from sqlalchemy import String, Integer, ForeignKey, Text, JSON
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column

from app.models.base import Base, TimestampMixin, uuid_pk


class Project(Base, TimestampMixin):
    __tablename__ = "projects"

    id = uuid_pk()
    owner_id: Mapped[UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("users.id"), index=True)
    name: Mapped[str] = mapped_column(String(255))
    description: Mapped[str] = mapped_column(Text, default="")
    local_path: Mapped[str] = mapped_column(String(512))
    git_repo_url: Mapped[str] = mapped_column(String(512), default="")
    git_branch: Mapped[str] = mapped_column(String(255), default="main")
    tech_stack: Mapped[list] = mapped_column(JSON, default=list)
    environment: Mapped[str] = mapped_column(String(50), default="Development")
    dev_command: Mapped[str] = mapped_column(String(255), default="")
    dev_port: Mapped[int] = mapped_column(Integer, default=3000)
    deploy_config: Mapped[dict] = mapped_column(JSON, default=dict)
    status: Mapped[str] = mapped_column(String(50), default="Active")


class ProjectProcess(Base, TimestampMixin):
    __tablename__ = "project_processes"

    id = uuid_pk()
    project_id: Mapped[UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("projects.id"), index=True)
    pid: Mapped[int] = mapped_column(Integer, nullable=True)
    port: Mapped[int] = mapped_column(Integer, nullable=True)
    status: Mapped[str] = mapped_column(String(50), default="Stopped")


class DockerContainerModel(Base, TimestampMixin):
    __tablename__ = "docker_containers"

    id = uuid_pk()
    project_id: Mapped[UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("projects.id"), nullable=True)
    container_id: Mapped[str] = mapped_column(String(128))
    name: Mapped[str] = mapped_column(String(255))
    image: Mapped[str] = mapped_column(String(255))
    status: Mapped[str] = mapped_column(String(50))
    ports: Mapped[str] = mapped_column(String(255), default="")


class DockerImageModel(Base, TimestampMixin):
    __tablename__ = "docker_images"

    id = uuid_pk()
    repository: Mapped[str] = mapped_column(String(255))
    tag: Mapped[str] = mapped_column(String(100))
    size_mb: Mapped[int] = mapped_column(Integer, default=0)


class GitRepository(Base, TimestampMixin):
    __tablename__ = "git_repositories"

    id = uuid_pk()
    project_id: Mapped[UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("projects.id"), index=True)
    remote_url: Mapped[str] = mapped_column(String(512))
    current_branch: Mapped[str] = mapped_column(String(255))
    is_clean: Mapped[bool] = mapped_column(default=True)


class GitActivity(Base, TimestampMixin):
    __tablename__ = "git_activity"

    id = uuid_pk()
    project_id: Mapped[UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("projects.id"), index=True)
    commit_hash: Mapped[str] = mapped_column(String(64))
    message: Mapped[str] = mapped_column(Text)
    author: Mapped[str] = mapped_column(String(255))


class Deployment(Base, TimestampMixin):
    __tablename__ = "deployments"

    id = uuid_pk()
    project_id: Mapped[UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("projects.id"), index=True)
    environment: Mapped[str] = mapped_column(String(50))
    version: Mapped[str] = mapped_column(String(100))
    commit_hash: Mapped[str] = mapped_column(String(64))
    status: Mapped[str] = mapped_column(String(50), default="Queued")
    duration_seconds: Mapped[int] = mapped_column(Integer, nullable=True)


class DeploymentLog(Base, TimestampMixin):
    __tablename__ = "deployment_logs"

    id = uuid_pk()
    deployment_id: Mapped[UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("deployments.id"), index=True)
    line: Mapped[str] = mapped_column(Text)


class ProjectFile(Base, TimestampMixin):
    __tablename__ = "project_files"

    id = uuid_pk()
    project_id: Mapped[UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("projects.id"), index=True)
    relative_path: Mapped[str] = mapped_column(String(1024))
    is_directory: Mapped[bool] = mapped_column(default=False)


class SystemLog(Base, TimestampMixin):
    __tablename__ = "system_logs"

    id = uuid_pk()
    project_id: Mapped[UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("projects.id"), nullable=True)
    source: Mapped[str] = mapped_column(String(100))
    level: Mapped[str] = mapped_column(String(20))
    message: Mapped[str] = mapped_column(Text)


class ProjectBackup(Base, TimestampMixin):
    __tablename__ = "project_backups"

    id = uuid_pk()
    project_id: Mapped[UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("projects.id"), index=True)
    file_path: Mapped[str] = mapped_column(String(1024))
    size_bytes: Mapped[int] = mapped_column(Integer, default=0)
    status: Mapped[str] = mapped_column(String(50), default="In Progress")
