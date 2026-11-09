import { useMemo, useState } from 'react'
import { illustrativeTimetable, weekdays, type SampleClass, type Weekday } from '../data/timetableDemo'
import Button from '../components/Button'
import Icon from '../components/Icon'

function mondayOfWeek(date: Date, offset: number) {
  const monday = new Date(date.getFullYear(), date.getMonth(), date.getDate())
  const weekdayIndex = (monday.getDay() + 6) % 7
  monday.setDate(monday.getDate() - weekdayIndex + offset * 7)
  return monday
}

function dateForDay(monday: Date, dayIndex: number) {
  const date = new Date(monday)
  date.setDate(monday.getDate() + dayIndex)
  return date
}

function formatShortDate(date: Date) {
  return new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'short' }).format(date)
}

function minutesAfterMidnight(time: string) {
  const [hours, minutes] = time.split(':').map(Number)
  return (hours ?? 0) * 60 + (minutes ?? 0)
}

function ClassEntry({ item }: { item: SampleClass }) {
  return (
    <article className="timetable-class">
      <span className="timetable-class__time">{item.startTime}<span aria-hidden="true">–</span>{item.endTime}</span>
      <h3>{item.subject}</h3>
      <span className="timetable-class__note">Illustrative class</span>
    </article>
  )
}

function TimetablePage() {
  const [today] = useState(() => new Date())
  const todayIndex = (today.getDay() + 6) % 7
  const todayName = weekdays[todayIndex]
  const [weekOffset, setWeekOffset] = useState(0)
  const [selectedDay, setSelectedDay] = useState<Weekday>(todayName ?? 'Monday')
  const monday = useMemo(() => mondayOfWeek(today, weekOffset), [today, weekOffset])
  const weekEnd = dateForDay(monday, 4)
  const rangeLabel = `${formatShortDate(monday)} – ${formatShortDate(weekEnd)}`
  const currentMinutes = today.getHours() * 60 + today.getMinutes()
  const todaysClasses = todayName
    ? illustrativeTimetable.filter((item) => item.weekday === todayName)
    : []
  const upcomingClasses = weekOffset === 0
    ? todaysClasses.filter((item) => minutesAfterMidnight(item.startTime) >= currentMinutes)
    : []

  function moveWeek(offset: number) {
    setWeekOffset((current) => current + offset)
    setSelectedDay('Monday')
  }

  return (
    <main className="section-page timetable-page page-enter">
      <div className="section-page__intro timetable-page__intro">
        <div><span className="sample-badge">Illustrative schedule</span><h2>Timetable</h2><p>Example classes for layout preview only. This is not a verified IBCM schedule; rooms and locations have not been provided.</p></div>
        <div className="timetable-week-control" aria-label="Choose timetable week">
          <Button type="button" variant="secondary" aria-label="Previous week" onClick={() => moveWeek(-1)}><Icon className="is-previous" name="chevron" size={18} /></Button>
          <strong>{rangeLabel}</strong>
          <Button type="button" variant="secondary" aria-label="Next week" onClick={() => moveWeek(1)}><Icon name="chevron" size={18} /></Button>
        </div>
      </div>

      <section className="today-agenda" aria-labelledby="today-agenda-title">
        <div className="today-agenda__heading"><span className="today-agenda__icon"><Icon name="calendar" size={19} /></span><div><span className="eyebrow">Today's agenda · example data</span><h2 id="today-agenda-title">{todayName ? `${todayName}, ${formatShortDate(today)}` : 'Weekend'}</h2></div></div>
        {upcomingClasses.length ? (
          <div className="today-agenda__list">{upcomingClasses.map((item) => <ClassEntry item={item} key={item.id} />)}</div>
        ) : (
          <p className="timetable-empty">{todayName ? 'No more illustrative classes scheduled today.' : 'No sample classes are scheduled for today.'}</p>
        )}
      </section>

      <section className="timetable-week" aria-label={`Illustrative weekday classes, ${rangeLabel}`}>
        <div className="timetable-day-selector" role="group" aria-label="Select a day">
          {weekdays.map((day, index) => {
            const date = dateForDay(monday, index)
            const isToday = weekOffset === 0 && day === todayName
            return <button type="button" className={selectedDay === day ? 'is-selected' : ''} key={day} aria-pressed={selectedDay === day} aria-current={isToday ? 'date' : undefined} onClick={() => setSelectedDay(day)}><span>{day.slice(0, 3)}</span><strong>{date.getDate()}</strong></button>
          })}
        </div>
        {weekdays.map((day, index) => {
          const date = dateForDay(monday, index)
          const dayClasses = illustrativeTimetable.filter((item) => item.weekday === day)
          const isToday = weekOffset === 0 && day === todayName
          return (
            <section className={`timetable-day${isToday ? ' is-today' : ''}${selectedDay === day ? ' is-selected' : ''}`} key={day} aria-labelledby={`timetable-${day.toLowerCase()}`}>
              <header className="timetable-day__header"><h2 id={`timetable-${day.toLowerCase()}`}>{day}</h2><time dateTime={date.toISOString().slice(0, 10)}>{formatShortDate(date)}</time>{isToday && <span>Today</span>}</header>
              <div className="timetable-day__classes">
                {dayClasses.length ? dayClasses.map((item) => <ClassEntry item={item} key={item.id} />) : <p className="timetable-empty">No illustrative classes.</p>}
              </div>
            </section>
          )
        })}
      </section>
      <p className="timetable-source-note">All classes shown are illustrative examples, not college records.</p>
    </main>
  )
}

export default TimetablePage
