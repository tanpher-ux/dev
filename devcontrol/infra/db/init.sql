-- Extension needed for gen_random_uuid() used by default UUID PKs.
CREATE EXTENSION IF NOT EXISTS pgcrypto;
-- Tables themselves are created via Alembic migrations (see backend/alembic).
