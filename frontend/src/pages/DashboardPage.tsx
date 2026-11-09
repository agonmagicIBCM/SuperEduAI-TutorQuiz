import { useEffect, useRef, useState } from 'react'
import { sampleAnnouncements, sampleAssignment, sampleCourses, sampleLearning } from '../data/dashboardDemo'
import type { AppSection, TutorMessage } from '../types/dashboard'
import AttendancePanel from '../components/AttendancePanel'
import Button from '../components/Button'
import CourseCard from '../components/CourseCard'
import GradesPanel from '../components/GradesPanel'
import Icon from '../components/Icon'
import ProgressBar from '../components/ProgressBar'
import SolarLearningHero from '../components/SolarLearningHero'
import StudyPlannerPanel from '../components/StudyPlannerPanel'
import TutorPanel from '../components/TutorPanel'
import type { Theme } from '../types/theme'

type DashboardPageProps = {
  onNavigate: (section: AppSection) => void
  onOpenCourse: (courseId: string) => void
  tutorMessages: TutorMessage[]
  tutorCourseId: string
  onTutorCourseChange: (courseId: string) => void
  tutorSending: boolean
  tutorError: string | null
  tutorConfigured: boolean | null
  onRetryTutor: () => void
  onSendTutorMessage: (message: string, courseId: string) => void
  theme: Theme
}

const TUTOR_PREFERENCE_KEY = 'ibcm-supereduai-tutor-panel'

function readTutorPreference() {
  try {
    const preference = window.localStorage.getItem(TUTOR_PREFERENCE_KEY)
    if (preference === 'open') return true
    if (preference === 'minimized') return false
  } catch {
    // Use a viewport-based default when local storage is unavailable.
  }
  return window.matchMedia('(min-width: 981px)').matches
}

function DashboardPage({
  onNavigate,
  onOpenCourse,
  tutorMessages,
  tutorCourseId,
  onTutorCourseChange,
  tutorSending,
  tutorError,
  tutorConfigured,
  onRetryTutor,
  onSendTutorMessage,
  theme,
}: DashboardPageProps) {
  const continueCourse = sampleLearning.course
  const tutorLauncher = useRef<HTMLButtonElement>(null)
  const panelWasOpen = useRef(false)
  const focusTutorOnOpen = useRef(false)
  const [tutorOpen, setTutorOpen] = useState(readTutorPreference)
  const [mobileViewport, setMobileViewport] = useState(() => window.matchMedia('(max-width: 980px)').matches)
  const mobileDrawerOpen = mobileViewport && tutorOpen

  useEffect(() => {
    const viewport = window.matchMedia('(max-width: 980px)')
    const updateViewport = () => setMobileViewport(viewport.matches)
    viewport.addEventListener('change', updateViewport)
    return () => viewport.removeEventListener('change', updateViewport)
  }, [])

  useEffect(() => {
    if (tutorOpen) {
      panelWasOpen.current = true
      if (focusTutorOnOpen.current || mobileDrawerOpen) {
        document.querySelector<HTMLInputElement>('.tutor-panel--compact .tutor-composer input')?.focus({ preventScroll: true })
        focusTutorOnOpen.current = false
      }
      if (mobileDrawerOpen) document.body.style.overflow = 'hidden'
      return () => { document.body.style.overflow = '' }
    }
    if (panelWasOpen.current) {
      panelWasOpen.current = false
      tutorLauncher.current?.focus()
    }
    document.body.style.overflow = ''
  }, [tutorOpen, mobileDrawerOpen])

  useEffect(() => {
    function closeTutorOnEscape(event: KeyboardEvent) {
      if (event.key === 'Escape' && mobileDrawerOpen) setTutorPanelOpen(false)
    }
    document.addEventListener('keydown', closeTutorOnEscape)
    return () => document.removeEventListener('keydown', closeTutorOnEscape)
  }, [mobileDrawerOpen])

  function setTutorPanelOpen(open: boolean) {
    if (open) focusTutorOnOpen.current = true
    setTutorOpen(open)
    try {
      window.localStorage.setItem(TUTOR_PREFERENCE_KEY, open ? 'open' : 'minimized')
    } catch {
      // The panel remains interactive for the current session.
    }
  }

  return (
    <main className="dashboard-page page-enter">
      <div className="dashboard-columns">
        <div className="dashboard-main-column">
          <SolarLearningHero
            theme={theme}
            onContinue={() => onOpenCourse(continueCourse.id)}
            onAskTutor={() => setTutorPanelOpen(true)}
          />

          <section className="quick-actions" aria-label="Quick actions">
            <button type="button" className="quick-action" onClick={() => onNavigate('Assignments')}>
              <Icon name="assignment" size={17} /><span>Assignments</span><Icon name="arrow" size={14} />
            </button>
            <button type="button" className="quick-action" onClick={() => onNavigate('My Courses')}>
              <Icon name="courses" size={17} /><span>Browse courses</span><Icon name="arrow" size={14} />
            </button>
            <button className="quick-action" type="button" onClick={() => onNavigate('Grades')}>
              <Icon name="check" size={17} /><span>View grades</span><Icon name="arrow" size={14} />
            </button>
            <a className="quick-action" href="#attendance-dashboard">
              <Icon name="calendar" size={17} /><span>Attendance</span><Icon name="arrow" size={14} />
            </a>
          </section>

          <section className="overview-section" aria-labelledby="overview-title">
            <div className="section-title-row">
              <div><span className="eyebrow">Pick up where you left off</span><h2 id="overview-title">Continue learning</h2></div>
              <span className="demo-caption">Illustrative progress</span>
            </div>
            <article className="learning-feature">
              <span className="learning-feature__icon"><Icon name={continueCourse.icon} size={22} /></span>
              <div className="learning-feature__body">
                <span className="learning-feature__label">Current course</span>
                <h3>{continueCourse.title}</h3>
                <div className="learning-feature__progress">
                  <ProgressBar value={sampleLearning.progressPercent} label={`${continueCourse.title} illustrative progress: ${sampleLearning.progressPercent}%`} />
                  <strong>{sampleLearning.progressPercent}%</strong>
                </div>
              </div>
              <Button type="button" variant="secondary" onClick={() => onOpenCourse(continueCourse.id)}>Resume <Icon name="arrow" size={15} /></Button>
            </article>
            <article className="assignment-feature">
              <span className="assignment-feature__icon"><Icon name="assignment" size={18} /></span>
              <div><span className="assignment-feature__eyebrow">Example assignment</span><h3>{sampleAssignment.title}</h3><p>{sampleAssignment.courseTitle} · {sampleAssignment.dueDate ? `Due ${sampleAssignment.dueDate}` : 'No due date provided'}</p></div>
              <Button variant="quiet" type="button" onClick={() => onNavigate('Assignments')}>View <Icon name="arrow" size={15} /></Button>
            </article>
          </section>

          <section className="dashboard-section courses-section" aria-labelledby="courses-title">
            <div className="section-title-row">
              <div><span className="eyebrow">Explore your subjects</span><h2 id="courses-title">My courses</h2></div>
              <Button variant="quiet" type="button" onClick={() => onNavigate('My Courses')}>All courses <Icon name="arrow" size={15} /></Button>
            </div>
            <p className="section-caption">Example course catalog · not connected to IBCM</p>
            <div className="course-grid course-grid--dashboard">
              {sampleCourses.map((course) => <CourseCard key={course.id} course={course} onOpen={onOpenCourse} />)}
            </div>
          </section>

          <div className="academic-dashboard">
            <GradesPanel onViewAll={() => onNavigate('Grades')} />
            <AttendancePanel />
          </div>
        </div>

        <aside className="dashboard-aside" aria-label="Study support and updates">
          <div className={`tutor-panel-slot${tutorOpen ? ' is-open' : ''}${mobileDrawerOpen ? ' is-mobile-drawer' : ''}`}>
            {mobileDrawerOpen && <button className="tutor-backdrop" type="button" aria-label="Close AI Tutor panel" onClick={() => setTutorPanelOpen(false)} />}
            {tutorOpen && (
              <TutorPanel
                compact
                mobileDrawer={mobileDrawerOpen}
                messages={tutorMessages}
                courses={sampleCourses}
                courseId={tutorCourseId}
                onCourseChange={onTutorCourseChange}
                sending={tutorSending}
                error={tutorError}
                configured={tutorConfigured}
                onRetry={onRetryTutor}
                onSend={onSendTutorMessage}
                onMinimize={() => setTutorPanelOpen(false)}
              />
            )}
          </div>
          {!tutorOpen && (
            <button className="tutor-launcher" ref={tutorLauncher} type="button" aria-label="Open AI Tutor" aria-expanded={false} onClick={() => setTutorPanelOpen(true)}>
              <Icon name="sparkle" size={20} /><span>Open AI Tutor</span>
            </button>
          )}
          <section id="announcements" className="dashboard-section announcements-panel" aria-labelledby="announcements-title">
            <div className="section-title-row section-title-row--compact">
              <div><span className="eyebrow">Sample updates</span><h2 id="announcements-title">Announcements</h2></div>
              <span className="panel-count" aria-label="Three illustrative announcements">03</span>
            </div>
            <p className="section-caption">Illustrative examples · not verified IBCM notices</p>
            <ul className="announcement-list">
              {sampleAnnouncements.map((announcement) => (
                <li className="announcement-item" key={announcement.id}>
                  <span className="announcement-item__icon"><Icon name={announcement.icon} size={16} /></span>
                  <span>{announcement.title}</span>
                  <Icon className="announcement-item__arrow" name="chevron" size={15} />
                </li>
              ))}
            </ul>
          </section>
          <StudyPlannerPanel onViewAssignments={() => onNavigate('Assignments')} />
        </aside>
      </div>
    </main>
  )
}

export default DashboardPage
