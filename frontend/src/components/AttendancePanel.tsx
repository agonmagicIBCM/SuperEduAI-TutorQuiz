import { useState } from 'react'
import { illustrativeAttendance } from '../data/gradesAttendanceDemo'
import Icon from './Icon'

function AttendancePanel() {
  const [showAll, setShowAll] = useState(false)
  const { attendedSessions, totalSessions, weeklyTrend, recentRecords } = illustrativeAttendance
  const attendanceRate = Math.round((attendedSessions / totalSessions) * 100)
  const records = showAll ? recentRecords : recentRecords.slice(0, 2)

  return (
    <section className="academic-panel attendance-panel" id="attendance-dashboard" aria-labelledby="attendance-title">
      <div className="academic-panel__header">
        <div>
          <span className="eyebrow">Illustrative data</span>
          <h2 id="attendance-title">Attendance</h2>
        </div>
        <span className="academic-panel__icon"><Icon name="calendar" size={17} /></span>
      </div>
      <div className="attendance-summary">
        <strong>{attendanceRate}<span>%</span></strong>
        <span><b>Overall attendance</b><small>{attendedSessions} of {totalSessions} example sessions</small></span>
      </div>
      <div className="attendance-trend" role="img" aria-label={`Illustrative weekly attendance: ${weeklyTrend.map((week) => `${week.week} ${week.rate}%`).join(', ')}`}>
        {weeklyTrend.map((week) => (
          <div className="attendance-trend__item" key={week.week}>
            <span className="attendance-trend__bar"><i style={{ height: `${week.rate}%` }} /></span>
            <small>{week.week}</small>
          </div>
        ))}
      </div>
      <p className="attendance-trend__caption">Weekly sample attendance · illustrative only</p>
      <div className="attendance-records">
        <h3>Recent sessions <span>Examples</span></h3>
        {records.map((record) => (
          <div className="attendance-record" key={record.id}>
            <span className="attendance-record__day">{record.day}</span>
            <span className="attendance-record__session">{record.session}</span>
            <span className={`attendance-record__status${record.status === 'Attended' ? ' is-attended' : ' is-missed'}`}>
              <i aria-hidden="true" />{record.status}
            </span>
          </div>
        ))}
      </div>
      <button className="academic-panel__action" type="button" onClick={() => setShowAll((current) => !current)} aria-expanded={showAll}>
        {showAll ? 'Show fewer sessions' : 'View attendance'} <Icon name="arrow" size={15} />
      </button>
    </section>
  )
}

export default AttendancePanel
