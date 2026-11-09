export type Weekday = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday'

export type SampleClass = {
  id: string
  weekday: Weekday
  startTime: string
  endTime: string
  subject: string
}

// Illustrative sample timetable only. This is not an IBCM schedule.
export const illustrativeTimetable: SampleClass[] = [
  { id: 'monday-se', weekday: 'Monday', startTime: '09:00', endTime: '10:30', subject: 'Software Engineering' },
  { id: 'monday-web', weekday: 'Monday', startTime: '13:00', endTime: '14:30', subject: 'Web Development' },
  { id: 'tuesday-db', weekday: 'Tuesday', startTime: '10:00', endTime: '11:30', subject: 'Databases' },
  { id: 'tuesday-pm', weekday: 'Tuesday', startTime: '14:00', endTime: '15:30', subject: 'Project Management' },
  { id: 'wednesday-ai', weekday: 'Wednesday', startTime: '09:30', endTime: '11:00', subject: 'Artificial Intelligence' },
  { id: 'wednesday-se', weekday: 'Wednesday', startTime: '12:30', endTime: '14:00', subject: 'Software Engineering' },
  { id: 'thursday-web', weekday: 'Thursday', startTime: '10:00', endTime: '11:30', subject: 'Web Development' },
  { id: 'thursday-db', weekday: 'Thursday', startTime: '13:00', endTime: '14:30', subject: 'Databases' },
  { id: 'friday-pm', weekday: 'Friday', startTime: '09:00', endTime: '10:30', subject: 'Project Management' },
  { id: 'friday-ai', weekday: 'Friday', startTime: '12:00', endTime: '13:30', subject: 'Artificial Intelligence' },
]

export const weekdays: Weekday[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
