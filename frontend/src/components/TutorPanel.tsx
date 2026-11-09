import { useEffect, useRef, useState, type FormEvent, type KeyboardEvent } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import type { Course, TutorMessage } from '../types/dashboard'
import Button from './Button'
import Icon from './Icon'
import { normalizeTutorMarkdown } from './tutorMarkdown'

const suggestedPrompts = [
  'Explain a software design pattern',
  'What is database normalization?',
  'Help me review an agile project plan',
]

function TutorMessageText({ text }: { text: string }) {
  return (
    <div className="chat-message__text">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          a: ({ href, children }) => {
            const safe = href && /^(https?:|mailto:)/i.test(href) ? href : undefined
            return safe
              ? <a href={safe} target="_blank" rel="noreferrer">{children}</a>
              : <span>{children}</span>
          },
          table: ({ children }) => (
            <div className="chat-message__table-wrap">
              <table>{children}</table>
            </div>
          ),
        }}
      >
        {normalizeTutorMarkdown(text)}
      </ReactMarkdown>
    </div>
  )
}

type TutorPanelProps = {
  messages: TutorMessage[]
  courses: Course[]
  courseId: string
  onCourseChange: (courseId: string) => void
  onSend: (message: string, courseId: string) => void
  sending?: boolean
  error?: string | null
  configured?: boolean | null
  onRetry?: () => void
  compact?: boolean
  onMinimize?: () => void
  mobileDrawer?: boolean
}

function TutorPanel({
  messages,
  courses,
  courseId,
  onCourseChange,
  onSend,
  sending = false,
  error = null,
  configured = null,
  onRetry,
  compact = false,
  onMinimize,
  mobileDrawer = false,
}: TutorPanelProps) {
  const [draft, setDraft] = useState('')
  const panelRef = useRef<HTMLElement>(null)
  const conversationRef = useRef<HTMLOListElement>(null)
  const focusedCourse = courses.find((course) => course.id === courseId)
  const prompts = focusedCourse
    ? [
        `Explain a core idea from ${focusedCourse.title}`,
        `Give me a short example from ${focusedCourse.title}`,
        `What should I review next in ${focusedCourse.title}?`,
      ]
    : suggestedPrompts
  const statusLabel = sending
    ? 'Thinking'
    : error
      ? 'Unavailable'
      : configured
        ? 'Connected'
        : configured === false
          ? 'Needs API key'
          : 'Checking'
  const notice = error
    ?? (configured
      ? 'This tutor only helps with the courses you attend.'
      : configured === false
        ? 'Add GROQ_API_KEY to backend/.env, restart the API, then check the connection.'
        : 'Checking the tutor connection.')

  useEffect(() => {
    const conversation = conversationRef.current
    if (conversation) conversation.scrollTop = conversation.scrollHeight
  }, [messages, sending])

  function submitMessage(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const message = draft.trim()
    if (!message || sending || configured === false) return
    onSend(message, courseId)
    setDraft('')
  }

  function keepKeyboardFocusInDrawer(event: KeyboardEvent<HTMLElement>) {
    if (!mobileDrawer || event.key !== 'Tab') return
    const controls = panelRef.current?.querySelectorAll<HTMLElement>(
      'button:not(:disabled), input:not(:disabled), [href], [tabindex]:not([tabindex="-1"])',
    )
    if (!controls?.length) return
    const first = controls[0]
    const last = controls[controls.length - 1]
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault()
      last.focus()
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault()
      first.focus()
    }
  }

  return (
    <section
      ref={panelRef}
      className={`tutor-panel${compact ? ' tutor-panel--compact' : ''}${mobileDrawer ? ' is-mobile-drawer' : ''}`}
      aria-labelledby={compact ? 'dashboard-tutor-title' : 'tutor-title'}
      role={mobileDrawer ? 'dialog' : undefined}
      aria-modal={mobileDrawer ? true : undefined}
      onKeyDown={keepKeyboardFocusInDrawer}
    >
      <div className="tutor-panel__heading">
        <div className="tutor-panel__identity">
          <span className="tutor-panel__icon"><Icon name="sparkle" size={20} /></span>
          <div>
            <span className="eyebrow">Learning support</span>
            <h2 id={compact ? 'dashboard-tutor-title' : 'tutor-title'}>AI Tutor</h2>
          </div>
        </div>
        <span className={`connection-status${sending ? ' is-busy' : error || configured === false ? ' is-error' : configured ? ' is-live' : ''}`}>
          <span className="status-dot" /> {statusLabel}
        </span>
        {onMinimize && (
          <button className="tutor-panel__close" type="button" aria-label={mobileDrawer ? 'Close AI Tutor' : 'Minimize AI Tutor'} onClick={onMinimize}>
            <Icon name="close" size={17} />
          </button>
        )}
      </div>
      <p className={`tutor-panel__notice${error || configured === false ? ' is-error' : ''}`}>{notice}</p>
      {configured === false && onRetry && (
        <Button type="button" variant="secondary" className="tutor-panel__retry" onClick={onRetry}>Check connection</Button>
      )}
      <label className="tutor-course" htmlFor={compact ? 'dashboard-tutor-course' : 'tutor-course'}>
        <span>Course</span>
        <select
          id={compact ? 'dashboard-tutor-course' : 'tutor-course'}
          value={courseId}
          onChange={(event) => onCourseChange(event.target.value)}
        >
          <option value="">All my courses</option>
          {courses.map((course) => (
            <option key={course.id} value={course.id}>{course.title}</option>
          ))}
        </select>
      </label>

      <ol ref={conversationRef} className="tutor-conversation" role="log" aria-live="polite" aria-label="Tutor conversation">
        {messages.length === 0 ? (
          <li className="tutor-empty-state">
            <span className="tutor-empty-state__symbol"><Icon name="messages" size={20} /></span>
            <p>Your conversation will appear here.</p>
            <span>Choose a suggested prompt or write your own.</span>
          </li>
        ) : messages.slice(compact ? -4 : -12).map((message) => (
          <li className={`chat-message chat-message--${message.role}`} key={message.id}>
            <span className="chat-message__avatar" aria-hidden="true">
              <Icon name={message.role === 'student' ? 'profile' : 'sparkle'} size={15} />
            </span>
            <div className="chat-message__content">
              <span className="chat-message__author">{message.role === 'student' ? 'You' : 'AI Tutor'}</span>
              {message.role === 'student' ? <p>{message.text}</p> : <TutorMessageText text={message.text} />}
            </div>
          </li>
        ))}
        {sending && (
          <li className="chat-message chat-message--tutor">
            <span className="chat-message__avatar" aria-hidden="true"><Icon name="sparkle" size={15} /></span>
            <div className="chat-message__content">
              <span className="chat-message__author">AI Tutor</span>
              <p>Thinking about your course…</p>
            </div>
          </li>
        )}
      </ol>

      <form className="tutor-composer" onSubmit={submitMessage}>
        <label className="visually-hidden" htmlFor={compact ? 'dashboard-tutor-message' : 'tutor-message'}>Message the AI Tutor</label>
        <input
          id={compact ? 'dashboard-tutor-message' : 'tutor-message'}
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          placeholder={focusedCourse ? `Ask about ${focusedCourse.title}...` : 'Ask about one of your courses...'}
          maxLength={500}
          disabled={sending || configured === false}
        />
        <Button type="submit" aria-label="Send message" disabled={!draft.trim() || sending || configured === false}>
          <span className="tutor-composer__send-label">Send</span>
          <Icon name="send" size={17} />
        </Button>
      </form>
      <div className="suggested-prompts" aria-label="Suggested prompts">
        <span className="suggested-prompts__label">Try asking</span>
        <div className="suggested-prompts__list">
          {prompts.slice(0, compact ? 2 : 3).map((prompt) => (
            <button type="button" key={prompt} disabled={sending || configured === false} onClick={() => onSend(prompt, courseId)}>
              {prompt}
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}

export default TutorPanel
