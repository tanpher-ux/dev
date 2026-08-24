from sqlalchemy import String, Integer, ForeignKey, Boolean, Float
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column

from app.models.base import Base, TimestampMixin, uuid_pk


class Website(Base, TimestampMixin):
    __tablename__ = "websites"

    id = uuid_pk()
    owner_id: Mapped[UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("users.id"), index=True)
    project_id: Mapped[UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("projects.id"), nullable=True)
    name: Mapped[str] = mapped_column(String(255))
    url: Mapped[str] = mapped_column(String(1024))
    check_interval_seconds: Mapped[int] = mapped_column(Integer, default=300)
    expected_status_code: Mapped[int] = mapped_column(Integer, default=200)
    is_active: Mapped[bool] = mapped_column(Boolean, default=True)
    current_status: Mapped[str] = mapped_column(String(20), default="Online")


class WebsiteCheck(Base, TimestampMixin):
    __tablename__ = "website_checks"

    id = uuid_pk()
    website_id: Mapped[UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("websites.id"), index=True)
    status_code: Mapped[int] = mapped_column(Integer, nullable=True)
    response_time_ms: Mapped[int] = mapped_column(Integer, nullable=True)
    success: Mapped[bool] = mapped_column(Boolean)
    error_message: Mapped[str] = mapped_column(String(512), nullable=True)


class WebsiteIncident(Base, TimestampMixin):
    __tablename__ = "website_incidents"

    id = uuid_pk()
    website_id: Mapped[UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("websites.id"), index=True)
    started_at_snapshot: Mapped[str] = mapped_column(String(64))
    recovered_at_snapshot: Mapped[str] = mapped_column(String(64), nullable=True)
    error_summary: Mapped[str] = mapped_column(String(512))
    status: Mapped[str] = mapped_column(String(20), default="Ongoing")


class SSLCertificate(Base, TimestampMixin):
    __tablename__ = "ssl_certificates"

    id = uuid_pk()
    website_id: Mapped[UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("websites.id"), index=True)
    issuer: Mapped[str] = mapped_column(String(255), nullable=True)
    valid_until: Mapped[str] = mapped_column(String(64), nullable=True)
    days_remaining: Mapped[int] = mapped_column(Integer, nullable=True)
    status: Mapped[str] = mapped_column(String(20), default="Valid")


class Domain(Base, TimestampMixin):
    __tablename__ = "domains"

    id = uuid_pk()
    website_id: Mapped[UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("websites.id"), index=True)
    domain_name: Mapped[str] = mapped_column(String(255))
    expires_at: Mapped[str] = mapped_column(String(64), nullable=True)
    days_remaining: Mapped[int] = mapped_column(Integer, nullable=True)
    is_manual_entry: Mapped[bool] = mapped_column(Boolean, default=False)


class Notification(Base, TimestampMixin):
    __tablename__ = "notifications"

    id = uuid_pk()
    owner_id: Mapped[UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("users.id"), index=True)
    website_id: Mapped[UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("websites.id"), nullable=True)
    severity: Mapped[str] = mapped_column(String(20))
    title: Mapped[str] = mapped_column(String(255))
    message: Mapped[str] = mapped_column(String(512))
    is_read: Mapped[bool] = mapped_column(Boolean, default=False)


class NotificationSettings(Base, TimestampMixin):
    __tablename__ = "notification_settings"

    id = uuid_pk()
    owner_id: Mapped[UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("users.id"), unique=True)
    notify_down: Mapped[bool] = mapped_column(Boolean, default=True)
    notify_recovery: Mapped[bool] = mapped_column(Boolean, default=True)
    notify_slow: Mapped[bool] = mapped_column(Boolean, default=True)
    notify_ssl_expiry: Mapped[bool] = mapped_column(Boolean, default=True)
    notify_domain_expiry: Mapped[bool] = mapped_column(Boolean, default=True)
    channel_email: Mapped[bool] = mapped_column(Boolean, default=True)
    channel_whatsapp: Mapped[bool] = mapped_column(Boolean, default=False)
