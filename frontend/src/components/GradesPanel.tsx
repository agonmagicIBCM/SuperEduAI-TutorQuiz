import { useState } from 'react'
import { illustrativeGrades } from '../data/gradesAttendanceDemo'
import Icon from './Icon'

type GradesPanelProps = {
  expanded?: boolean
  onViewAll?: () => void
}

function GradesPanel({ expanded = false, onViewAll }: GradesPanelProps) {
  const [showAll, setShowAll] = useState(false)
  const average = Math.round(
    illustrativeGrades.courses.reduce((total, course) => total + course.grade, 0) /
      illustrativeGrades.courses.length,
  )
  const assessments = expanded || showAll
    ? illustrativeGrades.assessments
    : illustrativeGrades.assessments.slice(0, 2)

  return (
    <section className="academic-panel grades-panel" id="grades-dashboard" aria-labelledby="grades-title">
      <div className="academic-panel__header">
        <div>
          <span className="eyebrow">Illustrative data</span>
          <h2 id="grades-title">Grades</h2>
        </div>
        <span className="academic-panel__icon"><Icon name="check" size={17} /></span>
      </div>
      <div className="grade-average">
        <strong>{average}<span>%</span></strong>
        <div><b>Overall average</b><small>Example scores · not student records</small></div>
      </div>
      <div className="grade-list" aria-label="Illustrative course grades">
        {illustrativeGrades.courses.map((course) => (
          <div className="grade-row" key={course.courseId}>
            <span>{course.courseTitle}</span>
            <div className="grade-track" role="meter" aria-label={`${course.courseTitle} illustrative grade`} aria-valuemin={0} aria-valuemax={100} aria-valuenow={course.grade}>
              <span style={{ width: `${course.grade}%` }} />
            </div>
            <strong>{course.grade}%</strong>
          </div>
        ))}
      </div>
      <div className="assessment-preview">
        <h3>Recent assessments <span>Examples</span></h3>
        {assessments.map((assessment) => (
          <div className="assessment-row" key={assessment.id}>
            <span><b>{assessment.title}</b><small>{assessment.courseTitle}</small></span>
            <span className={`assessment-row__result${assessment.status === 'Upcoming' ? ' is-upcoming' : ''}`}>
              <strong>{assessment.grade === null ? '—' : `${assessment.grade}%`}</strong>
              <small>{assessment.status}{assessment.dueDate ? ` · ${assessment.dueDate}` : ''}</small>
            </span>
          </div>
        ))}
      </div>
      {!expanded && (
        <button className="academic-panel__action" type="button" onClick={() => onViewAll ? onViewAll() : setShowAll((current) => !current)} aria-expanded={onViewAll ? undefined : showAll}>
          {onViewAll ? 'View all grades' : showAll ? 'Show fewer grades' : 'View all grades'} <Icon name="arrow" size={15} />
        </button>
      )}
    </section>
  )
}

export default GradesPanel
