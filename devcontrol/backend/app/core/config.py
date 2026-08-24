from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    ENVIRONMENT: str = "development"
    SECRET_KEY: str
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60

    DATABASE_URL: str

    ALLOWED_ORIGINS: list[str] = ["http://localhost:5173"]

    DEFAULT_CHECK_INTERVAL_SECONDS: int = 300
    SSL_WARNING_DAYS: int = 30
    SSL_URGENT_DAYS: int = 14
    SSL_CRITICAL_DAYS: int = 7

    SMTP_HOST: str | None = None
    SMTP_PORT: int = 587
    SMTP_USER: str | None = None
    SMTP_PASSWORD: str | None = None
    SMTP_FROM: str | None = None

    WHATSAPP_API_URL: str | None = None
    WHATSAPP_API_TOKEN: str | None = None

    ALLOWED_PROJECT_ROOT: str = "/data/projects"
    BACKUP_STORAGE_PATH: str = "/data/backups"

    model_config = SettingsConfigDict(env_file=".env", extra="ignore")


settings = Settings()
