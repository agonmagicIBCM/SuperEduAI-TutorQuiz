import json

import pytest

from app.services.ai_service import parse_quiz_document, require_course


def _question(correct: str) -> dict:
    return {
        "prompt": "Which idea belongs in this course?",
        "options": {"A": "Alpha", "B": "Beta", "C": "Gamma", "D": "Delta"},
        "correct": correct,
        "explanation": "Beta matches the course idea.",
    }


def test_parse_quiz_document_accepts_fenced_json():
    payload = {"questions": [_question(letter) for letter in "ABCDA"]}
    raw = f"```json\n{json.dumps(payload)}\n```"
    questions = parse_quiz_document(raw)
    assert len(questions) == 5
    assert questions[1].correct == "B"
    assert questions[0].options["A"] == "Alpha"


def test_parse_quiz_document_rejects_the_wrong_count():
    with pytest.raises(ValueError, match="exactly 5"):
        parse_quiz_document(json.dumps({"questions": [_question("A")]}))


def test_unknown_course_is_rejected():
    with pytest.raises(Exception, match="not on your schedule"):
        require_course("chemistry")
