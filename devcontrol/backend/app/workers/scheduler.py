"""
Background workers that keep running independently of any open browser tab.

Uses APScheduler's AsyncIOScheduler inside the FastAPI process for a simple
single-instance deployment. For multi-instance/production scale, swap this
for Celery + Redis (or RQ) so jobs are distributed and durable.
"""
import logging

from apscheduler.schedulers.asyncio import AsyncIOScheduler

from app.core.config import settings
from app.workers import dev_system_jobs, monitoring_jobs

logger = logging.getLogger("devcontrol.scheduler")
scheduler = AsyncIOScheduler()


async def start_background_workers() -> None:
    # Developer System Manager
    scheduler.add_job(dev_system_jobs.poll_local_processes, "interval", seconds=10, id="poll_processes")
    scheduler.add_job(dev_system_jobs.poll_docker_containers, "interval", seconds=15, id="poll_docker")
    scheduler.add_job(dev_system_jobs.poll_deployment_status, "interval", seconds=10, id="poll_deployments")
    scheduler.add_job(dev_system_jobs.run_scheduled_backups, "cron", hour=6, minute=0, id="scheduled_backups")

    # Website Monitoring
    scheduler.add_job(monitoring_jobs.run_website_checks, "interval", seconds=settings.DEFAULT_CHECK_INTERVAL_SECONDS, id="website_checks")
    scheduler.add_job(monitoring_jobs.check_ssl_certificates, "cron", hour="*/6", id="ssl_checks")
    scheduler.add_job(monitoring_jobs.check_domain_expiry, "cron", hour=3, minute=0, id="domain_checks")
    scheduler.add_job(monitoring_jobs.deliver_pending_notifications, "interval", seconds=30, id="notify_deliver")

    scheduler.start()
    logger.info("Background workers started.")


async def stop_background_workers() -> None:
    scheduler.shutdown(wait=False)
    logger.info("Background workers stopped.")
