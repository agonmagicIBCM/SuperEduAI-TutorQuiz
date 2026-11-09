import { sampleAssignment, sampleCourses } from '../data/dashboardDemo'
import type { AppSection, Course, TutorMessage } from '../types/dashboard'
import Button from '../components/Button'
import CourseCard from '../components/CourseCard'
import Icon from '../components/Icon'
import QuizPanel from '../components/QuizPanel'
import TutorPanel from '../components/TutorPanel'
import GradesPanel from '../components/GradesPanel'
import TimetablePage from './TimetablePage'

type StudentSectionsProps = {
  section: Exclude<AppSection, 'Dashboard'>
  selectedCourse: Course | null
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
}

function CourseCatalog({ onOpenCourse }: Pick<StudentSectionsProps, 'onOpenCourse'>) {
  return (
    <main className="section-page page-enter">
      <div className="section-page__intro"><span className="sample-badge">Sample catalog</span><h2>Explore your courses</h2><p>These example course names are not loaded from an IBCM catalog.</p></div>
      <div className="course-grid course-grid--catalog">{sampleCourses.map((course) => <CourseCard key={course.id} course={course} onOpen={onOpenCourse} />)}</div>
    </main>
  )
}

function CoursePreview({ course, onNavigate }: { course: Course; onNavigate: (section: AppSection) => void }) {
  return (
    <main className="section-page page-enter">
      <Button variant="quiet" type="button" onClick={() => onNavigate('My Courses')}><Icon name="arrow" size={16} /> Back to courses</Button>
      <section className="course-preview-card">
        <span className={`course-card__icon course-card__icon--${course.icon}`}><Icon name={course.icon} size={24} /></span>
        <span className="sample-badge">Course preview</span>
        <h2>{course.title}</h2>
        <p>Course content, syllabus, assignments, and synced progress are not connected in this frontend preview.</p>
        <Button type="button" variant="secondary" onClick={() => onNavigate('My Courses')}>Browse sample courses</Button>
      </section>
    </main>
  )
}

function AssignmentsPage({ onNavigate }: { onNavigate: (section: AppSection) => void }) {
  return (
    <main className="section-page page-enter">
      <div className="section-page__intro"><span className="sample-badge">Sample item</span><h2>Assignments</h2><p>Assignment schedules and submissions are not connected.</p></div>
      <article className="assignment-preview">
        <span className="assignment-preview__icon"><Icon name="assignment" size={22} /></span>
        <div className="assignment-preview__body"><span className="sample-label">Example assignment</span><h3>{sampleAssignment.title}</h3><p>{sampleAssignment.courseTitle} <span aria-hidden="true">·</span> {sampleAssignment.dueDate ? `Due ${sampleAssignment.dueDate}` : 'Due date not provided'}</p></div>
        <Button variant="secondary" type="button" onClick={() => onNavigate('My Courses')}>View course <Icon name="arrow" size={16} /></Button>
      </article>
    </main>
  )
}

function GradesPage() {
  return (
    <main className="section-page grades-page page-enter">
      <div className="section-page__intro"><span className="sample-badge">Illustrative grades</span><h2>Grades</h2><p>Example scores for interface preview only. They are not student records and are not connected to IBCM systems.</p></div>
      <GradesPanel expanded />
    </main>
  )
}

const sectionDescriptions: Record<Exclude<AppSection, 'Dashboard' | 'My Courses' | 'AI Tutor' | 'Assignments' | 'Grades' | 'Timetable' | 'Quizzes & Exams'>, string> = {
  Resources: 'Learning resources have not been connected or provided yet.',
  Messages: 'Messaging is not connected. No conversations are available in this preview.',
  Profile: 'Student account details are not connected. This preview does not manage accounts.',
  Help: 'Help content and support contacts have not been provided yet.',
}

function PlaceholderPage({ section }: { section: keyof typeof sectionDescriptions }) {
  return (
    <main className="section-page page-enter">
      <section className="empty-section">
        <span className="empty-section__icon"><Icon name="book" size={23} /></span>
        <span className="sample-badge">Not connected</span>
        <h2>{section}</h2>
        <p>{sectionDescriptions[section]}</p>
      </section>
    </main>
  )
}

function StudentSections({
  section,
  selectedCourse,
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
}: StudentSectionsProps) {
  if (section === 'AI Tutor') {
    return (
      <main className="section-page section-page--tutor page-enter">
        <div className="section-page__intro">
          <span className="sample-badge">Your courses</span>
          <h2>Your learning assistant</h2>
          <p>Ask about a course you attend. The tutor will not answer questions from other subjects.</p>
        </div>
        <TutorPanel
          messages={tutorMessages}
          courses={sampleCourses}
          courseId={tutorCourseId}
          onCourseChange={onTutorCourseChange}
          sending={tutorSending}
          error={tutorError}
          configured={tutorConfigured}
          onRetry={onRetryTutor}
          onSend={onSendTutorMessage}
        />
      </main>
    )
  }
  if (section === 'Quizzes & Exams') {
    return (
      <main className="section-page page-enter">
        <QuizPanel courses={sampleCourses} initialCourseId={tutorCourseId} />
      </main>
    )
  }
  if (section === 'My Courses') {
    return selectedCourse ? <CoursePreview course={selectedCourse} onNavigate={onNavigate} /> : <CourseCatalog onOpenCourse={onOpenCourse} />
  }
  if (section === 'Assignments') return <AssignmentsPage onNavigate={onNavigate} />
  if (section === 'Grades') return <GradesPage />
  if (section === 'Timetable') return <TimetablePage />
  return <PlaceholderPage section={section} />
}

export default StudentSections
