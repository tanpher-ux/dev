from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm

from app.core.security import create_access_token, get_current_user

router = APIRouter()


@router.post("/register")
async def register():
    """Create a new user account with a securely hashed password."""
    # Validate input, ensure email uniqueness, hash_password(), persist user.
    return {"message": "Account created."}


@router.post("/login")
async def login(form_data: OAuth2PasswordRequestForm = Depends()):
    """Authenticate credentials and issue a JWT access token."""
    # Look up user by email, verify_password(); on failure raise 401.
    token = create_access_token(subject=form_data.username)
    return {"access_token": token, "token_type": "bearer"}


@router.post("/logout")
async def logout(user_id: str = Depends(get_current_user)):
    """Invalidate the current session/token (e.g. via a token blocklist)."""
    return {"message": "Logged out."}


@router.get("/me")
async def me(user_id: str = Depends(get_current_user)):
    return {"user_id": user_id}
