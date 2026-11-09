export type CourseGrade = {
  courseId: string
  courseTitle: string
  grade: number
}

export type SampleAssessment = {
  id: string
  title: string
  courseTitle: string
  grade: number | null
  status: 'Completed' | 'Upcoming'
  dueDate: string | null
}

export type AttendanceRecord = {
  id: string
  session: string
  day: string
  status: 'Attended' | 'Missed'
}

export const illustrativeGrades = {
  courses: [
    { courseId: 'software-engineering', courseTitle: 'Software Engineering', grade: 89 },
    { courseId: 'web-development', courseTitle: 'Web Development', grade: 93 },
    { courseId: 'databases', courseTitle: 'Databases', grade: 84 },
    { courseId: 'artificial-intelligence', courseTitle: 'Artificial Intelligence', grade: 91 },
    { courseId: 'project-management', courseTitle: 'Project Management', grade: 88 },
  ] satisfies CourseGrade[],
  assessments: [
    { id: 'assessment-design', title: 'Interface design review', courseTitle: 'Web Development', grade: 93, status: 'Completed', dueDate: null },
    { id: 'assessment-model', title: 'Data model exercise', courseTitle: 'Databases', grade: 84, status: 'Completed', dueDate: null },
    { id: 'assessment-proposal', title: 'Project proposal', courseTitle: 'Software Engineering', grade: null, status: 'Upcoming', dueDate: null },
  ] satisfies SampleAssessment[],
}

export const illustrativeAttendance = {
  attendedSessions: 47,
  totalSessions: 50,
  weeklyTrend: [
    { week: 'W1', rate: 92 },
    { week: 'W2', rate: 100 },
    { week: 'W3', rate: 88 },
    { week: 'W4', rate: 96 },
    { week: 'W5', rate: 94 },
  ],
  recentRecords: [
    { id: 'attendance-1', session: 'Software Engineering', day: 'Mon', status: 'Attended' },
    { id: 'attendance-2', session: 'Web Development', day: 'Tue', status: 'Attended' },
    { id: 'attendance-3', session: 'Databases', day: 'Wed', status: 'Missed' },
    { id: 'attendance-4', session: 'Artificial Intelligence', day: 'Thu', status: 'Attended' },
    { id: 'attendance-5', session: 'Project Management', day: 'Fri', status: 'Attended' },
  ] satisfies AttendanceRecord[],
}
