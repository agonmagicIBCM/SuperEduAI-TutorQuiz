
from fastapi import APIRouter, Depends

from app.dependencies import require_role

router = APIRouter(
    prefix="/roles",
    tags=["Role Authorization"]
)


@router.get("/student")
def student_dashboard(
    user: dict = Depends(require_role("student"))
):
    return {
        "message": "Welcome to the student dashboard",
        "user": user
    }


@router.get("/professor")
def lecturer_dashboard(
    user: dict = Depends(require_role("professor"))
):
    return {
        "message": "Welcome to the professor dashboard",
        "user": user
    }


@router.get("/admin")
def admin_dashboard(
    user: dict = Depends(require_role("admin"))
):
    return {
        "message": "Welcome to the admin dashboard",
        "user": user
    }
