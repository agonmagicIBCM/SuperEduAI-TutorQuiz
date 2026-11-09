
from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials

from app.core.security import decode_access_token


security = HTTPBearer()


def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(security)
):
    token = credentials.credentials

    try:
        payload = decode_access_token(token)

        email = payload.get("sub")
        role = payload.get("role")

        if not email or role not in {"student", "professor", "admin"}:
            raise ValueError("Invalid token payload")

        return {
            "email": email,
            "role": role
        }

    except ValueError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired authentication token",
            headers={"WWW-Authenticate": "Bearer"}
        )


def require_role(required_role: str):
    def role_checker(
        current_user: dict = Depends(get_current_user)
    ):
        if current_user["role"] != required_role:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="You do not have permission to access this resource"
            )

        return current_user

    return role_checker

