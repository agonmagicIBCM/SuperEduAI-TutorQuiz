
import os

from fastapi import APIRouter, HTTPException, status
from pydantic import BaseModel, EmailStr

from app.core.security import (
    hash_password,
    verify_password,
    create_access_token
)


router = APIRouter(
    prefix="/auth",
    tags=["Authentication"]
)


class LoginRequest(BaseModel):
    email: EmailStr
    password: str


def get_required_password(variable_name: str) -> str:
    password = os.getenv(variable_name)

    if not password:
        raise RuntimeError(
            f"{variable_name} environment variable is not configured"
        )

    return password


# Temporary test accounts.
# Passwords are loaded from the local .env file and hashed.
test_users = {
    "student@example.com": {
        "email": "student@example.com",
        "role": "student",
        "hashed_password": hash_password(
            get_required_password("STUDENT_PASSWORD")
        )
    },
    "professor@example.com": {
        "email": "professor@example.com",
        "role": "professor",
        "hashed_password": hash_password(
            get_required_password("PROFESSOR_PASSWORD")
        )
    },
    "admin@example.com": {
        "email": "admin@example.com",
        "role": "admin",
        "hashed_password": hash_password(
            get_required_password("ADMIN_PASSWORD")
        )
    }
}


@router.post("/login")
def login(user: LoginRequest):

    account = test_users.get(user.email)

    if account is None or not verify_password(
        user.password,
        account["hashed_password"]
    ):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password"
        )

    access_token = create_access_token(
        data={
            "sub": account["email"],
            "role": account["role"]
        }
    )

    return {
        "access_token": access_token,
        "token_type": "bearer"
    }
