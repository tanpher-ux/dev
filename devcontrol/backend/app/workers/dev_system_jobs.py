import logging

logger = logging.getLogger("devcontrol.workers.devsystem")


async def poll_local_processes() -> None:
    """Check tracked dev-server PIDs, update ProjectProcess.status, emit SystemLog entries."""
    logger.debug("Polling local dev server processes…")


async def poll_docker_containers() -> None:
    """Sync container status/CPU/memory from the Docker SDK into docker_containers."""
    logger.debug("Polling Docker containers…")


async def poll_deployment_status() -> None:
    """Advance queued/building/deploying deployments and stream logs to deployment_logs."""
    logger.debug("Polling deployment status…")


async def run_scheduled_backups() -> None:
    """Daily backup job — archives each active project, excluding secrets, into BACKUP_STORAGE_PATH."""
    logger.info("Running scheduled project backups…")
