import { useState } from 'react'
import { answerQuiz, createQuiz, type PracticeQuiz, type QuizFeedback } from '../api/ai'
import type { Course, QuizChoice } from '../types/dashboard'
import Button from './Button'
import Icon from './Icon'
import ProgressBar from './ProgressBar'

const choices: QuizChoice[] = ['A', 'B', 'C', 'D']

type QuizPanelProps = {
  courses: Course[]
  initialCourseId?: string
}

function QuizPanel({ courses, initialCourseId = '' }: QuizPanelProps) {
  const startingCourse = courses.some((course) => course.id === initialCourseId) ? initialCourseId : courses[0]?.id ?? ''
  const [courseId, setCourseId] = useState(startingCourse)
  const [quiz, setQuiz] = useState<PracticeQuiz | null>(null)
  const [index, setIndex] = useState(0)
  const [feedback, setFeedback] = useState<QuizFeedback | null>(null)
  const [selected, setSelected] = useState<QuizChoice | null>(null)
  const [score, setScore] = useState(0)
  const [finished, setFinished] = useState(false)
  const [loading, setLoading] = useState(false)
  const [grading, setGrading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const question = quiz?.questions[index]
  const progress = quiz ? ((finished ? quiz.questions.length : index) / quiz.questions.length) * 100 : 0

  async function startQuiz() {
    if (!courseId || loading) return
    setLoading(true)
    setError(null)
    try {
      const created = await createQuiz(courseId)
      setQuiz(created)
      setFeedback(null)
      setSelected(null)
      setFinished(false)
      setIndex(0)
      setScore(0)
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : 'The quiz could not be created.')
    } finally {
      setLoading(false)
    }
  }

  async function choose(choice: QuizChoice) {
    if (!quiz || !question || feedback || grading) return
    setSelected(choice)
    setGrading(true)
    setError(null)
    try {
      const result = await answerQuiz(quiz.quizId, question.id, choice)
      setFeedback(result)
      if (result.correct) setScore((current) => current + 1)
    } catch (caught) {
      setSelected(null)
      setError(caught instanceof Error ? caught.message : 'That answer could not be checked.')
    } finally {
      setGrading(false)
    }
  }

  function continueQuiz() {
    if (!quiz) return
    if (index + 1 >= quiz.questions.length) {
      setFinished(true)
      return
    }
    setIndex((current) => current + 1)
    setFeedback(null)
    setSelected(null)
  }

  function resetQuiz() {
    setQuiz(null)
    setFeedback(null)
    setSelected(null)
    setFinished(false)
    setIndex(0)
    setScore(0)
    setError(null)
  }

  return (
    <section className="quiz-panel" aria-labelledby="quiz-title">
      <div className="section-page__intro">
        <span className="sample-badge">Practice quiz</span>
        <h2 id="quiz-title">Quizzes & Exams</h2>
        <p>Create a 5-question quiz for a course you attend. Each question has four choices. This is practice, not a graded exam.</p>
      </div>

      {!quiz && (
        <form
          className="quiz-setup"
          onSubmit={(event) => {
            event.preventDefault()
            void startQuiz()
          }}
        >
          <label htmlFor="quiz-course">Subject</label>
          <select id="quiz-course" value={courseId} onChange={(event) => setCourseId(event.target.value)}>
            {courses.map((course) => (
              <option key={course.id} value={course.id}>{course.title}</option>
            ))}
          </select>
          <Button type="submit" disabled={!courseId || loading}>
            {loading ? 'Writing questions…' : 'Create quiz'}
          </Button>
        </form>
      )}

      {quiz && (
        <article className="quiz-card">
          <div className="quiz-card__meta">
            <span className="eyebrow">{quiz.courseTitle}</span>
            <strong>{finished ? 'Complete' : `Question ${index + 1} of ${quiz.questions.length}`}</strong>
          </div>
          <ProgressBar value={progress} label={`${quiz.courseTitle} quiz progress`} />

          {finished ? (
            <div className="quiz-result">
              <span className="quiz-result__score">{score}/{quiz.questions.length}</span>
              <h3>{score === quiz.questions.length ? 'Every answer was correct.' : `You answered ${score} of ${quiz.questions.length} correctly.`}</h3>
              <p>Start another quiz on the same subject, or choose a different course you attend.</p>
              <div className="quiz-result__actions">
                <Button type="button" onClick={() => void startQuiz()} disabled={loading}>{loading ? 'Writing questions…' : 'Try again'}</Button>
                <Button type="button" variant="secondary" onClick={resetQuiz}>Choose a subject</Button>
              </div>
            </div>
          ) : question && (
            <div className="quiz-question">
              <h3>{question.prompt}</h3>
              <div className="quiz-options" role="group" aria-label="Answer choices">
                {choices.map((choice) => {
                  const showCorrect = feedback?.correctChoice === choice
                  const showWrong = Boolean(feedback) && selected === choice && !feedback?.correct
                  return (
                    <button
                      key={choice}
                      type="button"
                      className={`quiz-option${showCorrect ? ' is-correct' : ''}${showWrong ? ' is-wrong' : ''}`}
                      disabled={Boolean(feedback) || grading}
                      onClick={() => void choose(choice)}
                    >
                      <span className="quiz-option__letter">{choice}</span>
                      <span>{question.options[choice]}</span>
                    </button>
                  )
                })}
              </div>
              {feedback && (
                <div className={`quiz-feedback${feedback.correct ? ' is-correct' : ' is-wrong'}`}>
                  <strong>{feedback.correct ? 'Correct' : `The answer is ${feedback.correctChoice}`}</strong>
                  <p>{feedback.explanation}</p>
                  <Button type="button" onClick={continueQuiz}>
                    {index + 1 === quiz.questions.length ? 'See score' : 'Next question'}
                    <Icon name="arrow" size={16} />
                  </Button>
                </div>
              )}
            </div>
          )}
        </article>
      )}

      {error && <p className="quiz-error" role="alert">{error}</p>}
    </section>
  )
}

export default QuizPanel
