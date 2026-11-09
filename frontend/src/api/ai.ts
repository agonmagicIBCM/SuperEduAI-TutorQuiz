import type { QuizChoice, TutorMessage } from '../types/dashboard'

export type TutorStatus = {
  configured: boolean
  model: string
  courses: { id: string; title: string }[]
}

export type QuizQuestion = {
  id: string
  prompt: string
  options: Record<QuizChoice, string>
}

export type PracticeQuiz = {
  quizId: string
  courseId: string
  courseTitle: string
  questions: QuizQuestion[]
}

export type QuizFeedback = {
  correct: boolean
  correctChoice: QuizChoice
  explanation: string
}

async function readError(response: Response) {
  try {
    const body = await response.json()
    if (typeof body?.detail === 'string' && body.detail.trim()) return body.detail
  } catch {
    // The status text below is enough when the body is not JSON.
  }
  if (response.status === 503) return 'Add GROQ_API_KEY to backend/.env and restart the API.'
  return 'The learning service could not complete that request.'
}

async function postJson<T>(path: string, payload: unknown): Promise<T> {
  let response: Response
  try {
    response = await fetch(path, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
  } catch {
    throw new Error('The API is not running. Start the backend, then try again.')
  }
  if (!response.ok) throw new Error(await readError(response))
  return response.json() as Promise<T>
}

export async function getTutorStatus(): Promise<TutorStatus> {
  let response: Response
  try {
    response = await fetch('/api/ai/status')
  } catch {
    throw new Error('The API is not running. Start the backend, then refresh this page.')
  }
  if (!response.ok) throw new Error(await readError(response))
  return response.json() as Promise<TutorStatus>
}

export async function askTutor(messages: TutorMessage[], courseId: string) {
  const result = await postJson<{ reply: string }>('/api/ai/tutor', {
    course_id: courseId || null,
    messages: messages.map((message) => ({ role: message.role, text: message.text })),
  })
  return result.reply
}

export async function createQuiz(courseId: string) {
  const result = await postJson<{
    quiz_id: string
    course_id: string
    course_title: string
    questions: QuizQuestion[]
  }>('/api/ai/quiz', { course_id: courseId })
  return {
    quizId: result.quiz_id,
    courseId: result.course_id,
    courseTitle: result.course_title,
    questions: result.questions,
  } satisfies PracticeQuiz
}

export async function answerQuiz(quizId: string, questionId: string, choice: QuizChoice) {
  const result = await postJson<{
    correct: boolean
    correct_choice: QuizChoice
    explanation: string
  }>('/api/ai/quiz/answer', {
    quiz_id: quizId,
    question_id: questionId,
    choice,
  })
  return {
    correct: result.correct,
    correctChoice: result.correct_choice,
    explanation: result.explanation,
  } satisfies QuizFeedback
}
