from typing import NoReturn

from fastapi import APIRouter, HTTPException

from app.schemas.ai import (
    EnrolledCourse,
    QuizAnswerRequest,
    QuizAnswerResult,
    QuizCreated,
    QuizOptionSet,
    QuizQuestionPublic,
    QuizRequest,
    TutorReply,
    TutorRequest,
    TutorStatus,
)
from app.services.ai_service import (
    ENROLLED_COURSES,
    GROQ_MODEL,
    AiError,
    create_quiz,
    grade_answer,
    groq_configured,
    tutor_reply,
)

router = APIRouter(prefix="/ai", tags=["AI tutor"])


def _raise_ai_error(error: AiError) -> NoReturn:
    raise HTTPException(status_code=error.status_code, detail=str(error)) from error


@router.get("/status", response_model=TutorStatus)
def tutor_status() -> TutorStatus:
    return TutorStatus(
        configured=groq_configured(),
        model=GROQ_MODEL,
        courses=[EnrolledCourse(id=course_id, title=title) for course_id, title in ENROLLED_COURSES.items()],
    )


@router.post("/tutor", response_model=TutorReply)
async def tutor(request: TutorRequest) -> TutorReply:
    try:
        reply = await tutor_reply(
            [(message.role, message.text) for message in request.messages],
            request.course_id,
        )
    except AiError as error:
        _raise_ai_error(error)
    return TutorReply(reply=reply)


@router.post("/quiz", response_model=QuizCreated)
async def quiz(request: QuizRequest) -> QuizCreated:
    try:
        created = await create_quiz(request.course_id)
    except AiError as error:
        _raise_ai_error(error)
    return QuizCreated(
        quiz_id=created.id,
        course_id=created.course_id,
        course_title=created.course_title,
        questions=[
            QuizQuestionPublic(
                id=question.id,
                prompt=question.prompt,
                options=QuizOptionSet(**question.options),
            )
            for question in created.questions
        ],
    )


@router.post("/quiz/answer", response_model=QuizAnswerResult)
def answer_quiz(request: QuizAnswerRequest) -> QuizAnswerResult:
    try:
        correct, correct_choice, explanation = grade_answer(
            request.quiz_id,
            request.question_id,
            request.choice,
        )
    except AiError as error:
        _raise_ai_error(error)
    return QuizAnswerResult(correct=correct, correct_choice=correct_choice, explanation=explanation)
