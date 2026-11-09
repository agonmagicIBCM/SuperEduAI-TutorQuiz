import { useCallback, useEffect, useState } from 'react'
import './App.css'
import { askTutor, getTutorStatus } from './api/ai'
import AppLayout from './layouts/AppLayout'
import DashboardPage from './pages/DashboardPage'
import StudentSections from './pages/StudentSections'
import { sampleCourses } from './data/dashboardDemo'
import type { AppSection, Course, TutorMessage } from './types/dashboard'
import { isTheme, themeOptions, type Theme } from './types/theme'
import LoginScreen from './components/LoginScreen'

const THEME_STORAGE_KEY = 'ibcm-supereduai-theme'

function App() {
  const [theme, setTheme] = useState<Theme>(() => {
    const initialTheme = document.documentElement.dataset.theme
    return isTheme(initialTheme) ? initialTheme : 'light'
  })
  const [activeSection, setActiveSection] = useState<AppSection>('Dashboard')
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null)
  const [tutorMessages, setTutorMessages] = useState<TutorMessage[]>([])
  const [tutorCourseId, setTutorCourseId] = useState('')
  const [tutorSending, setTutorSending] = useState(false)
  const [tutorError, setTutorError] = useState<string | null>(null)
  const [tutorConfigured, setTutorConfigured] = useState<boolean | null>(null)
  const [signedIn, setSignedIn] = useState(false)

  const refreshTutorStatus = useCallback(() => {
    setTutorConfigured(null)
    setTutorError(null)
    getTutorStatus()
      .then((status) => {
        setTutorConfigured(status.configured)
        if (!status.configured) {
          setTutorError('Add GROQ_API_KEY to backend/.env and restart the API.')
        }
      })
      .catch((caught: unknown) => {
        setTutorConfigured(false)
        setTutorError(caught instanceof Error ? caught.message : 'The tutor is unavailable.')
      })
  }, [])

  useEffect(() => {
    if (signedIn) refreshTutorStatus()
  }, [signedIn, refreshTutorStatus])

  function applyTheme(nextTheme: Theme) {
    document.documentElement.dataset.theme = nextTheme
    document.documentElement.style.colorScheme = nextTheme === 'light' ? 'light' : 'dark'
    setTheme(nextTheme)
    const browserColor = themeOptions.find((option) => option.id === nextTheme)?.browserColor ?? '#190F1D'
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', browserColor)

    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, nextTheme)
    } catch {
      // The theme remains usable for the current session when storage is blocked.
    }
  }

  function navigate(section: AppSection) {
    setActiveSection(section)
    setSelectedCourse(null)
  }

  function openCourse(courseId: string) {
    const course = sampleCourses.find((item) => item.id === courseId)
    if (!course) return
    setSelectedCourse(course)
    setTutorCourseId(courseId)
    setActiveSection('My Courses')
  }

  function sendTutorMessage(message: string, courseId: string) {
    const cleanedMessage = message.trim()
    if (!cleanedMessage || tutorSending) return
    const studentMessage: TutorMessage = { id: window.crypto.randomUUID(), role: 'student', text: cleanedMessage }
    const history = [...tutorMessages, studentMessage]
    setTutorMessages(history)
    setTutorSending(true)
    setTutorError(null)
    askTutor(history, courseId)
      .then((reply) => {
        setTutorConfigured(true)
        setTutorMessages((current) => [
          ...current,
          { id: window.crypto.randomUUID(), role: 'tutor', text: reply },
        ])
      })
      .catch((caught: unknown) => {
        setTutorError(caught instanceof Error ? caught.message : 'The tutor could not reply.')
      })
      .finally(() => setTutorSending(false))
  }

  return (
    !signedIn ? <LoginScreen onSignIn={() => setSignedIn(true)} /> :
    <AppLayout
      activeSection={activeSection}
      courses={sampleCourses}
      onNavigate={navigate}
      onOpenCourse={openCourse}
      theme={theme}
      onThemeChange={applyTheme}
      onSignOut={() => setSignedIn(false)}
    >
      {activeSection === 'Dashboard' ? (
        <DashboardPage
          onNavigate={navigate}
          onOpenCourse={openCourse}
          tutorMessages={tutorMessages}
          tutorCourseId={tutorCourseId}
          onTutorCourseChange={setTutorCourseId}
          tutorSending={tutorSending}
          tutorError={tutorError}
          tutorConfigured={tutorConfigured}
          onRetryTutor={refreshTutorStatus}
          onSendTutorMessage={sendTutorMessage}
          theme={theme}
        />
      ) : (
        <StudentSections
          section={activeSection}
          selectedCourse={selectedCourse}
          onNavigate={navigate}
          onOpenCourse={openCourse}
          tutorMessages={tutorMessages}
          tutorCourseId={tutorCourseId}
          onTutorCourseChange={setTutorCourseId}
          tutorSending={tutorSending}
          tutorError={tutorError}
          tutorConfigured={tutorConfigured}
          onRetryTutor={refreshTutorStatus}
          onSendTutorMessage={sendTutorMessage}
        />
      )}
    </AppLayout>
  )
}

export default App
