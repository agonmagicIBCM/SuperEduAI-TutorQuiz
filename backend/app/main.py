
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr

from app.routers.ai import router as ai_router
from app.routers.auth import router as auth_router
from app.routers.roles import router as roles_router


class StudentCreate(BaseModel):
    name: str
    age: int
    email: EmailStr 

app = FastAPI(
    title="University Platform API",
    description="Backend API for our university project",
    version="0.1.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router)
app.include_router(roles_router)
app.include_router(ai_router)

@app.get("/")
def root():
    return {"message": "University Platform API is running"}


@app.get("/health")
def health_check():
    return {"status": "ok"}

@app.get("/courses")
def get_courses():
    return {
        "courses": ["Python", "Mathematics", "Computer Science"]
    }

@app.get("/students")
def get_students():
    return {
        "students": ["Student 1", "Student 2", "Student 3"]
    }

@app.post("/students")
def create_student(student: StudentCreate):
    return {
        "message": "Student received successfully",
        "student": student
    }

