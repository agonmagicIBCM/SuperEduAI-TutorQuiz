# SuperEduAI
SuperEduAI is a proposed integrated educational platform for International Business College of Mitrovica (IBCM). The platform aims to unify educational resources, academic activities, student progress information, and AI-powered learning assistance in one system.

## Repository structure
| Folder | Purpose | Group |
|---|---|---|
| /frontend | React UI | G4 |
| /backend | FastAPI | G5 |
| /database | Schema, migrations | G6 |
| /ai | Tutor and quiz engine | G7 |
| /docs | SRS, contracts, diagrams | G1, G2, G3 |
| /tests | QA scripts | G9 |
| /.github | CI/CD, templates | G8 |

## Collaboration rules
- All changes go through pull requests.
- Every PR needs at least one review before merge.
- Only stable code reaches `main`.
- Branch names: `g<number>/<short-description>`, e.g. `g5/auth-api`.

## AI Integration - G7

The student app now has a working tutor chat and a practice quiz. Both use Groq. The Groq key stays in `backend/.env` as `GROQ_API_KEY`. The browser never sees the key. The page calls our backend, and the backend calls Groq.

The tutor only helps with the courses on the student's schedule: Software Engineering, Web Development, Databases, Artificial Intelligence, Project Management, and Human Computer Interaction. A question about another subject is refused. Quizzes are practice, not graded exams. Each quiz has 5 questions and four choices: A, B, C, and D.

### Files

| File | What it does |
|---|---|
| `backend/app/services/ai_service.py` | Talks to Groq, limits answers to enrolled courses, builds the quiz, and stores the correct answers |
| `backend/app/routers/ai.py` | Exposes `GET /ai/status`, `POST /ai/tutor`, `POST /ai/quiz`, and `POST /ai/quiz/answer` |
| `backend/app/schemas/ai.py` | Describes the request and response shapes |
| `backend/app/main.py` | Connects the AI routes to the API |
| `backend/.env.example` | Shows where `GROQ_API_KEY` and `GROQ_MODEL` go |
| `frontend/src/api/ai.ts` | Sends the chat and quiz requests to the backend |
| `frontend/src/App.tsx` | Keeps the conversation and sends each new student message |
| `frontend/src/components/TutorPanel.tsx` | The chat box on the dashboard and the AI Tutor page |
| `frontend/src/components/tutorMarkdown.ts` | Turns the reply's bold text, lists, and tables into formatted text |
| `frontend/src/components/QuizPanel.tsx` | The quiz page: one question and four answer buttons |
| `frontend/src/pages/StudentSections.tsx` | Opens the tutor page and the Quizzes & Exams page |
| `frontend/src/pages/DashboardPage.tsx` | Shows the same tutor on the front page |
| `frontend/vite.config.ts` | Sends `/api` calls from the page to the backend on port 8000 |

### How a chat message is created

1. The student types a question, or taps a suggested prompt, and can focus the chat on one course.
2. The page adds that message to the conversation and sends the recent messages to `POST /api/ai/tutor`.
3. The backend checks the chosen course is one the student attends.
4. It builds a short instruction for Groq: tutor only those courses, explain briefly, and use simple Markdown.
5. It sends that instruction plus the conversation to Groq's chat API.
6. Groq's reply comes back. The page renders it, so `**bold**` and tables appear as formatted text.

### How a quiz is created

1. The student picks a course and clicks Create quiz.
2. The page sends that course to `POST /api/ai/quiz`.
3. The backend refuses the request if the course is not on the schedule.
4. It asks Groq for JSON with exactly 5 questions. Each question has options A–D, one correct letter, and a short explanation.
5. The backend checks that JSON. If it is invalid, it asks Groq once more.
6. It saves the quiz in memory and sends the questions to the page without the correct answers.
7. When the student presses A, B, C, or D, the page calls `POST /api/ai/quiz/answer`. The backend compares the choice with the stored answer and returns whether it was right, plus the explanation.
8. After the fifth question, the page shows the score.
