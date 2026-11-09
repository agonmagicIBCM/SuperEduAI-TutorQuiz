import json
import os
import re
from collections import OrderedDict
from dataclasses import dataclass
from pathlib import Path
from uuid import uuid4

import httpx
from dotenv import load_dotenv

from app.schemas.ai import QuizChoice

load_dotenv(dotenv_path=Path(__file__).resolve().parents[2] / ".env")

GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions"
GROQ_MODEL = os.getenv("GROQ_MODEL", "openai/gpt-oss-20b")

# Courses this student preview attends. The tutor and quizzes refuse anything else.
ENROLLED_COURSES: dict[str, str] = {
    "software-engineering": "Software Engineering",
    "web-development": "Web Development",
    "databases": "Databases",
    "artificial-intelligence": "Artificial Intelligence",
    "project-management": "Project Management",
    "human-computer-interaction": "Human Computer Interaction",
}

QUIZ_SIZE = 5
_MAX_STORED_QUIZZES = 40


class AiError(Exception):
    def __init__(self, message: str, status_code: int = 502) -> None:
        super().__init__(message)
        self.status_code = status_code


@dataclass
class GeneratedQuestion:
    prompt: str
    options: dict[str, str]
    correct: QuizChoice
    explanation: str


@dataclass
class StoredQuestion:
    id: str
    prompt: str
    options: dict[str, str]
    correct: QuizChoice
    explanation: str


@dataclass
class StoredQuiz:
    id: str
    course_id: str
    course_title: str
    questions: list[StoredQuestion]


_quizzes: OrderedDict[str, StoredQuiz] = OrderedDict()


def groq_configured() -> bool:
    key = os.getenv("GROQ_API_KEY", "").strip()
    return bool(key) and not key.startswith("your-")


def require_course(course_id: str | None) -> str:
    if not course_id:
        raise AiError("Choose one of the courses you attend.", 400)
    title = ENROLLED_COURSES.get(course_id)
    if title is None:
        allowed = ", ".join(ENROLLED_COURSES.values())
        raise AiError(f"That course is not on your schedule. You can study: {allowed}.", 400)
    return title


def _message_text(message: dict) -> str:
    content = message.get("content")
    if isinstance(content, str):
        return content.strip()
    if isinstance(content, list):
        parts: list[str] = []
        for part in content:
            if isinstance(part, str):
                parts.append(part)
            elif isinstance(part, dict) and isinstance(part.get("text"), str):
                parts.append(part["text"])
        return "\n".join(parts).strip()
    return ""


def _provider_error(response: httpx.Response) -> AiError:
    if response.status_code in {401, 403}:
        return AiError("Groq rejected the API key. Check GROQ_API_KEY in backend/.env.", 502)
    if response.status_code == 404:
        return AiError("The Groq model was not found. Set GROQ_MODEL in backend/.env.", 502)
    return AiError("Groq could not complete that request.", 502)


async def _complete(messages: list[dict], *, temperature: float, max_tokens: int, json_mode: bool = False) -> str:
    api_key = os.getenv("GROQ_API_KEY", "").strip()
    if not api_key:
        raise AiError("Add GROQ_API_KEY to backend/.env and restart the API.", 503)

    payload: dict = {
        "model": GROQ_MODEL,
        "messages": messages,
        "temperature": temperature,
        "max_tokens": max_tokens,
    }
    if json_mode:
        payload["response_format"] = {"type": "json_object"}

    try:
        async with httpx.AsyncClient(timeout=60) as client:
            response = await client.post(
                GROQ_API_URL,
                headers={"Authorization": f"Bearer {api_key}", "Content-Type": "application/json"},
                json=payload,
            )
    except httpx.HTTPError as error:
        raise AiError("The tutor could not reach Groq.") from error

    if response.status_code == 400 and json_mode:
        return await _complete(messages, temperature=temperature, max_tokens=max_tokens, json_mode=False)
    if response.status_code >= 400:
        raise _provider_error(response)

    try:
        data = response.json()
        text = _message_text(data["choices"][0]["message"])
    except (KeyError, IndexError, TypeError, ValueError) as error:
        raise AiError("Groq returned a reply the tutor could not read.") from error

    if not text:
        raise AiError("Groq returned an empty reply.")
    return text


def _clip(value: object, limit: int) -> str:
    if not isinstance(value, str):
        raise TypeError("A quiz field was missing.")
    text = " ".join(value.split())
    if not text:
        raise ValueError("A quiz field was empty.")
    return text[:limit]


def _options_from(raw: object) -> dict[str, str]:
    letters = ("A", "B", "C", "D")
    if isinstance(raw, list) and len(raw) == 4:
        raw = dict(zip(letters, raw, strict=True))
    if not isinstance(raw, dict):
        raise TypeError("Each question needs four options.")
    normalized = {str(key).strip().upper(): value for key, value in raw.items()}
    return {letter: _clip(normalized.get(letter), 220) for letter in letters}


def _correct_letter(raw: object, options: dict[str, str]) -> QuizChoice:
    if not isinstance(raw, str):
        raise TypeError("Each question needs one correct answer.")
    choice = raw.strip().upper()
    if choice in options:
        return choice  # type: ignore[return-value]
    for letter, text in options.items():
        if raw.strip().casefold() == text.casefold():
            return letter  # type: ignore[return-value]
    raise ValueError("The correct answer must be A, B, C, or D.")


def parse_quiz_document(raw: str) -> list[GeneratedQuestion]:
    text = raw.strip()
    if text.startswith("```"):
        text = re.sub(r"^```(?:json)?\s*", "", text)
        text = re.sub(r"\s*```$", "", text)
    try:
        payload = json.loads(text)
    except json.JSONDecodeError:
        start = text.find("{")
        end = text.rfind("}")
        if start == -1 or end <= start:
            raise ValueError("The model did not return a quiz.")
        payload = json.loads(text[start : end + 1])

    if isinstance(payload, list):
        questions = payload
    elif isinstance(payload, dict):
        questions = payload.get("questions", payload.get("quiz"))
    else:
        questions = None
    if not isinstance(questions, list) or len(questions) != QUIZ_SIZE:
        raise ValueError("The quiz must contain exactly 5 questions.")

    parsed: list[GeneratedQuestion] = []
    for item in questions:
        if not isinstance(item, dict):
            raise TypeError("A quiz question was incomplete.")
        options = _options_from(item.get("options", item.get("choices")))
        parsed.append(
            GeneratedQuestion(
                prompt=_clip(item.get("prompt", item.get("question")), 400),
                options=options,
                correct=_correct_letter(item.get("correct", item.get("answer")), options),
                explanation=_clip(item.get("explanation", "Review this idea in your course notes."), 500),
            )
        )
    return parsed


def _tutor_messages(history: list[tuple[str, str]], course_id: str | None) -> list[dict]:
    titles = ", ".join(ENROLLED_COURSES.values())
    focus = ""
    if course_id:
        focus = f" The student is focused on {require_course(course_id)}."
    system = (
        "You are SuperEduAI, a tutor for one university student. "
        f"You may only help with the courses this student attends: {titles}."
        f"{focus} "
        "If the question is outside those courses, do not answer it. "
        "Say that you can only tutor the courses they attend, then name those courses. "
        "Explain ideas clearly, use a short example, and keep the reply under about 180 words. "
        "Use Markdown: **bold** for key terms, italics for a term you are defining, and bullet lists for steps. "
        "When a comparison helps, add a Markdown table with each row on its own line, including a | --- | separator row. "
        "Guide the student. Do not write a finished graded assignment for them."
    )
    messages: list[dict] = [{"role": "system", "content": system}]
    for role, text in history[-12:]:
        cleaned = text.strip()
        if cleaned:
            messages.append({"role": "user" if role == "student" else "assistant", "content": cleaned[:2000]})
    if len(messages) == 1 or messages[-1]["role"] != "user":
        raise AiError("Write a question for the tutor.", 400)
    return messages


async def tutor_reply(history: list[tuple[str, str]], course_id: str | None) -> str:
    if course_id:
        require_course(course_id)
    reply = await _complete(_tutor_messages(history, course_id), temperature=0.4, max_tokens=700)
    return reply


def _remember_quiz(quiz: StoredQuiz) -> None:
    _quizzes[quiz.id] = quiz
    while len(_quizzes) > _MAX_STORED_QUIZZES:
        _quizzes.popitem(last=False)


async def create_quiz(course_id: str) -> StoredQuiz:
    title = require_course(course_id)
    instructions = (
        "Return JSON only, with exactly 5 questions, in this shape: "
        '{"questions":[{"prompt":"","options":{"A":"","B":"","C":"","D":""},"correct":"A","explanation":""}]}. '
        "Each question has one correct letter. The other options must be plausible but wrong. "
        f"Every question must be about the university course {title} and nothing else."
    )
    messages = [
        {"role": "system", "content": "You write short practice quizzes for university students. Return JSON only."},
        {"role": "user", "content": instructions},
    ]
    last_error = "The quiz could not be created."
    for _ in range(2):
        raw = await _complete(messages, temperature=0.3, max_tokens=2200, json_mode=True)
        try:
            generated = parse_quiz_document(raw)
        except (ValueError, TypeError, json.JSONDecodeError) as error:
            last_error = str(error)
            messages.append({"role": "assistant", "content": raw[:4000]})
            messages.append({"role": "user", "content": f"That JSON was invalid: {last_error}. Return the quiz JSON again."})
            continue
        quiz = StoredQuiz(
            id=str(uuid4()),
            course_id=course_id,
            course_title=title,
            questions=[
                StoredQuestion(
                    id=str(uuid4()),
                    prompt=item.prompt,
                    options=item.options,
                    correct=item.correct,
                    explanation=item.explanation,
                )
                for item in generated
            ],
        )
        _remember_quiz(quiz)
        return quiz
    raise AiError(last_error)


def grade_answer(quiz_id: str, question_id: str, choice: QuizChoice) -> tuple[bool, QuizChoice, str]:
    quiz = _quizzes.get(quiz_id)
    if quiz is None:
        raise AiError("That quiz is no longer available. Create a new one.", 404)
    question = next((item for item in quiz.questions if item.id == question_id), None)
    if question is None:
        raise AiError("That question is not part of this quiz.", 404)
    return choice == question.correct, question.correct, question.explanation
