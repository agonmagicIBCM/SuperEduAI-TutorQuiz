from typing import Literal

from pydantic import BaseModel, Field

QuizChoice = Literal["A", "B", "C", "D"]
TutorRole = Literal["student", "tutor"]


class TutorTurn(BaseModel):
    role: TutorRole
    text: str = Field(min_length=1, max_length=2000)


class TutorRequest(BaseModel):
    messages: list[TutorTurn] = Field(min_length=1, max_length=12)
    course_id: str | None = None


class TutorReply(BaseModel):
    reply: str


class QuizRequest(BaseModel):
    course_id: str = Field(min_length=1, max_length=80)


class QuizOptionSet(BaseModel):
    A: str
    B: str
    C: str
    D: str


class QuizQuestionPublic(BaseModel):
    id: str
    prompt: str
    options: QuizOptionSet


class QuizCreated(BaseModel):
    quiz_id: str
    course_id: str
    course_title: str
    questions: list[QuizQuestionPublic]


class QuizAnswerRequest(BaseModel):
    quiz_id: str
    question_id: str
    choice: QuizChoice


class QuizAnswerResult(BaseModel):
    correct: bool
    correct_choice: QuizChoice
    explanation: str


class EnrolledCourse(BaseModel):
    id: str
    title: str


class TutorStatus(BaseModel):
    configured: bool
    model: str
    courses: list[EnrolledCourse]
