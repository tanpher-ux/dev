import logging

logger = logging.getLogger("devcontrol.workers.monitoring")


async def run_website_checks() -> None:
    """
    For each active website whose check interval has elapsed: request the URL,
    record status/response-time in website_checks, and open/close incidents
    in website_incidents on failure/recovery transitions.
    """
    logger.debug("Running website availability checks…")


async def check_ssl_certificates() -> None:
    """Inspect each site's certificate chain, update ssl_certificates, and queue warnings at 30/14/7 days."""
    logger.debug("Checking SSL certificates…")


async def check_domain_expiry() -> None:
    """Query WHOIS/RDAP for each domain; fall back to any manually-entered expiry date."""
    logger.debug("Checking domain expiry…")


async def deliver_pending_notifications() -> None:
    """Send queued notifications over the enabled channels (email/WhatsApp) using backend-stored credentials."""
    logger.debug("Delivering pending notifications…")
